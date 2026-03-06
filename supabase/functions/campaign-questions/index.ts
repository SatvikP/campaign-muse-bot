import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const fallbackQuestions = [
  {
    id: "objective",
    question: "What business objective is this campaign serving?",
    options: ["Brand awareness", "Customer acquisition", "Retention / loyalty", "Product launch"],
    color: "coral",
  },
  {
    id: "audience",
    question: "What does this audience care about right now?",
    options: ["Performance & PBs", "Sustainability", "Community & belonging", "Style & identity"],
    color: "sage",
  },
  {
    id: "competitors",
    question: "What are competitors saying and spending right now?",
    options: ["Heavy digital spend", "Influencer-led", "Price war", "Innovation-focused"],
    color: "blue",
  },
  {
    id: "emotion",
    question: "Which emotional territory should we own?",
    options: ["Empowerment", "Belonging", "Rebellion", "Joy & play"],
    color: "lavender",
  },
];

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { idea } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY not configured, using fallback");
      return new Response(JSON.stringify({ questions: fallbackQuestions }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: `You are a senior marketing strategist helping a brand manager plan a campaign. Given a campaign idea, generate exactly 4 follow-up questions to sharpen the brief. Each question should probe a different strategic dimension: business objective, audience insights/trends, competitive landscape, and emotional positioning. Each question must have exactly 4 short answer options (2-4 words each). Make the options specific and relevant to the campaign idea provided.`,
          },
          {
            role: "user",
            content: `Campaign idea: "${idea}"\n\nGenerate 4 strategic follow-up questions with 4 options each.`,
          },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "return_questions",
              description: "Return 4 strategic follow-up questions with options",
              parameters: {
                type: "object",
                properties: {
                  questions: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "string", description: "Short identifier like 'objective', 'audience', 'competitors', 'emotion'" },
                        question: { type: "string", description: "The follow-up question" },
                        options: {
                          type: "array",
                          items: { type: "string" },
                          description: "Exactly 4 short answer options",
                        },
                        color: {
                          type: "string",
                          enum: ["coral", "sage", "blue", "lavender"],
                          description: "Post-it color for this question",
                        },
                      },
                      required: ["id", "question", "options", "color"],
                      additionalProperties: false,
                    },
                  },
                },
                required: ["questions"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "return_questions" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again shortly." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits depleted. Please add credits." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      console.error("AI gateway error:", response.status, await response.text());
      return new Response(JSON.stringify({ questions: fallbackQuestions }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];

    if (toolCall?.function?.arguments) {
      const parsed = JSON.parse(toolCall.function.arguments);
      return new Response(JSON.stringify({ questions: parsed.questions }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Fallback if tool calling didn't work
    return new Response(JSON.stringify({ questions: fallbackQuestions }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("campaign-questions error:", e);
    return new Response(JSON.stringify({ questions: fallbackQuestions }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
