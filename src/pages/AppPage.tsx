import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import TeddyBearLoader from "@/components/app/TeddyBearLoader";
import CampaignResults from "@/components/app/CampaignResults";
import FollowUpQuestions from "@/components/app/FollowUpQuestions";
import { useNavigate } from "react-router-dom";

type AppState = "onboarding" | "questions" | "loading" | "results";

const AppPage = () => {
  const [state, setState] = useState<AppState>("onboarding");
  const [idea, setIdea] = useState("");
  const [submittedIdea, setSubmittedIdea] = useState("");
  const [campaignAnswers, setCampaignAnswers] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!idea.trim()) return;
    setSubmittedIdea(idea.trim());
    setState("questions");
  };

  const handleQuestionsComplete = (answers: Record<string, string>) => {
    setCampaignAnswers(answers);
    setState("loading");
    // Simulate agent processing
    setTimeout(() => setState("results"), 4500);
  };

  const handleReset = () => {
    setIdea("");
    setSubmittedIdea("");
    setCampaignAnswers({});
    setState("onboarding");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 max-w-6xl mx-auto">
        <span
          className="font-serif text-xl font-semibold text-foreground cursor-pointer"
          onClick={() => navigate("/")}
        >
          Stride
        </span>
        <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
          Sign out
        </Button>
      </nav>

      <div className="max-w-5xl mx-auto px-6 pb-20">
        {/* Hero */}
        <div className="text-center pt-8 pb-10">
          <h1 className="text-4xl md:text-5xl font-serif font-semibold text-foreground">
            Build your next campaign
          </h1>
          {state === "results" && (
            <Button
              variant="outline"
              className="mt-4 rounded-full"
              onClick={handleReset}
            >
              + New campaign
            </Button>
          )}
        </div>

        {/* Canvas */}
        <div className="bg-canvas rounded-2xl border border-border p-8 md:p-12 min-h-[400px]">
          {state === "onboarding" && (
            <div className="flex flex-col items-center justify-center min-h-[320px] gap-6">
              {/* Nudge */}
              <p
                className="text-muted-foreground text-sm"
                style={{ animation: "pulse-nudge 2s ease-in-out infinite" }}
              >
                ✨ Place a post-it to get started
              </p>

              {/* Post-it input */}
              <div
                className="bg-postit-yellow w-full max-w-md rounded-lg shadow-md p-6 space-y-4"
                style={{ animation: "fly-in-bottom 0.6s ease-out both" }}
              >
                <p className="font-serif font-semibold text-foreground text-lg">
                  Describe the idea you want to test
                </p>
                <Textarea
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  placeholder="e.g. Launch a spring campaign targeting competitive amateur runners with our new carbon plate shoe..."
                  className="bg-postit-yellow/50 border-foreground/10 placeholder:text-foreground/40 text-foreground resize-none min-h-[100px] focus-visible:ring-foreground/20"
                />
                <Button
                  onClick={handleSubmit}
                  disabled={!idea.trim()}
                  className="w-full bg-foreground text-background hover:bg-foreground/90 rounded-full"
                >
                  Stick it on the canvas 📌
                </Button>
              </div>
            </div>
          )}

          {state === "loading" && <TeddyBearLoader />}

          {state === "results" && <CampaignResults idea={submittedIdea} />}
        </div>
      </div>
    </div>
  );
};

export default AppPage;
