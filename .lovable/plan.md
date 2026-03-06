## Plan: AI-Powered Follow-Up Questions Flow

### Overview

After the user submits their campaign idea, instead of jumping straight to loading/results, introduce a **follow-up questions step** powered by Lovable AI. The AI will ask strategic clarifying questions (presented as interactive chips/cards, similar to Lovable's own onboarding UX), and the user's answers will enrich the campaign brief before generating results.

### New App Flow

```text
onboarding → questions → loading → results
```

### What to Build

**1. New `FollowUpQuestions` component** (`src/components/app/FollowUpQuestions.tsx`)

- Displays questions one at a time (or all at once as a scrollable list) on post-it-style cards
- Each question has 3-4 selectable option chips + an "Other" free-text input
- Questions:
  - "What business objective is this campaign serving?" (Brand awareness, Customer acquisition, Retention/loyalty, Product launch)
  - "What does this audience care about right now?" (Performance & PBs, Sustainability, Community & belonging, Style & identity)
  - "What are competitors saying and spending right now?" (Heavy digital spend, Influencer-led, Price war, Innovation-focused)
  - "Which emotional territory should we own?" (Empowerment, Belonging, Rebellion, Joy & play)
- Animated fly-in like the onboarding post-it
- "Generate campaign" button appears after all questions answered

**2. Edge function for AI-generated questions** (`supabase/functions/campaign-questions/index.ts`)

- Takes the user's campaign idea as input
- Calls Lovable AI (Gemini Flash) with a system prompt to generate 4 contextual follow-up questions with 3-4 options each, based on the user input.
- Returns structured JSON via tool calling
- Falls back to hardcoded questions if AI fails

**3. Update `AppPage.tsx**`

- Add `"questions"` to the `AppState` type
- After idea submission, transition to `"questions"` state (call edge function)
- Pass collected answers + idea to the results/loading phase
- Store answers for future AI-powered campaign generation

**4. Enable Lovable Cloud**

- Required for edge functions and the `LOVABLE_API_KEY`

### Technical Details

- **Edge function** uses Lovable AI gateway with tool calling to return structured question data
- **Component** renders questions as post-it cards with chip-style selectable options, matching the existing design system (postit colors, serif fonts, rounded pills)
- **State shape**: `{ idea: string, answers: Record<string, string> }` passed through the flow
- Questions animate in with staggered `fly-in-bottom` keyframes
- Selected chips get a filled/active state with the postit color palette