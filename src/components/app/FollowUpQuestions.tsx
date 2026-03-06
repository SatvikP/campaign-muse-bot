import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Question = {
  id: string;
  question: string;
  options: string[];
  color: "coral" | "sage" | "blue" | "lavender";
};

interface FollowUpQuestionsProps {
  idea: string;
  onComplete: (answers: Record<string, string>) => void;
}

const colorMap: Record<string, string> = {
  coral: "bg-postit-coral",
  sage: "bg-postit-sage",
  blue: "bg-postit-blue",
  lavender: "bg-postit-lavender",
};

const colorActiveMap: Record<string, string> = {
  coral: "border-postit-coral bg-postit-coral/30",
  sage: "border-postit-sage bg-postit-sage/30",
  blue: "border-postit-blue bg-postit-blue/30",
  lavender: "border-postit-lavender bg-postit-lavender/30",
};

const FollowUpQuestions = ({ idea, onComplete }: FollowUpQuestionsProps) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [otherText, setOtherText] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const { data, error } = await supabase.functions.invoke("campaign-questions", {
          body: { idea },
        });

        if (error) {
          console.error("Error fetching questions:", error);
          toast.error("Couldn't generate custom questions — using defaults");
        }

        if (data?.questions) {
          setQuestions(data.questions);
        }
      } catch (e) {
        console.error("Failed to fetch questions:", e);
        toast.error("Using default questions");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [idea]);

  const selectOption = (questionId: string, option: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
    // Clear "other" text if they pick a chip
    setOtherText((prev) => {
      const next = { ...prev };
      delete next[questionId];
      return next;
    });
  };

  const setOther = (questionId: string, text: string) => {
    setOtherText((prev) => ({ ...prev, [questionId]: text }));
    if (text.trim()) {
      setAnswers((prev) => ({ ...prev, [questionId]: text.trim() }));
    } else {
      setAnswers((prev) => {
        const next = { ...prev };
        delete next[questionId];
        return next;
      });
    }
  };

  const allAnswered = questions.length > 0 && questions.every((q) => answers[q.id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[320px] gap-4">
        <div className="w-8 h-8 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
        <p className="text-muted-foreground text-sm font-serif">
          Preparing your strategic questions...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="text-center">
        <p className="text-muted-foreground text-sm mb-1">
          ✨ A few quick questions to sharpen your brief
        </p>
        <p className="text-foreground/60 text-xs max-w-md mx-auto">
          Your idea: "{idea}"
        </p>
      </div>

      {/* Questions grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {questions.map((q, i) => {
          const isOtherActive = otherText[q.id] !== undefined && !q.options.includes(answers[q.id] || "");

          return (
            <div
              key={q.id}
              className={`${colorMap[q.color]} rounded-xl p-5 shadow-sm space-y-3`}
              style={{
                animation: `fly-in-bottom 0.6s ease-out ${i * 0.15}s both`,
              }}
            >
              <p className="font-serif font-semibold text-foreground text-sm leading-snug">
                {q.question}
              </p>

              <div className="flex flex-wrap gap-2">
                {q.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => selectOption(q.id, opt)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                      answers[q.id] === opt && !isOtherActive
                        ? `${colorActiveMap[q.color]} border-foreground/30 text-foreground shadow-sm`
                        : "bg-background/60 border-border text-foreground/70 hover:bg-background hover:border-foreground/20"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              {/* Other input */}
              <Input
                placeholder="Or type your own..."
                value={otherText[q.id] || ""}
                onChange={(e) => setOther(q.id, e.target.value)}
                className="h-8 text-xs bg-background/40 border-foreground/10 placeholder:text-foreground/30"
              />
            </div>
          );
        })}
      </div>

      {/* Generate button */}
      <div className="flex justify-center pt-2">
        <Button
          onClick={() => onComplete(answers)}
          disabled={!allAnswered}
          className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-8"
          style={{
            animation: allAnswered ? "fly-in-bottom 0.4s ease-out both" : undefined,
          }}
        >
          Generate campaign 🚀
        </Button>
      </div>
    </div>
  );
};

export default FollowUpQuestions;
