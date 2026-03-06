import { useState, useEffect } from "react";

const postIts = [
  {
    label: "Target Persona",
    insight: "Marathon Maya — 28, trains 5x/week, values performance over brand",
    color: "bg-postit-coral",
    animation: "fly-in-left",
    delay: "0s",
  },
  {
    label: "Ad Keywords",
    insight: '"lightweight trail running", "carbon plate shoes", "race day gear"',
    color: "bg-postit-sage",
    animation: "fly-in-right",
    delay: "0.3s",
  },
  {
    label: "Campaign Brief",
    insight: "Launch a spring campaign targeting competitive amateur runners",
    color: "bg-postit-blue",
    animation: "fly-in-top",
    delay: "0.6s",
  },
  {
    label: "Social Strategy",
    insight: "Strava challenges + UGC from local running clubs + influencer pacing videos",
    color: "bg-postit-yellow",
    animation: "fly-in-bottom",
    delay: "0.9s",
  },
  {
    label: "Budget Split",
    insight: "40% social, 25% search, 20% influencer, 15% events",
    color: "bg-postit-lavender",
    animation: "fly-in-diagonal",
    delay: "1.2s",
  },
];

const PostItCanvas = () => {
  const [morphed, setMorphed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMorphed(true), 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-canvas rounded-2xl p-8 md:p-12 min-h-[420px] relative overflow-hidden border border-border">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:grid-cols-5">
            {postIts.map((item, i) => (
              <div
                key={i}
                className={`${item.color} transition-all duration-700 ease-out ${
                  morphed
                    ? "rounded-xl shadow-lg p-5"
                    : "rounded-sm shadow-md p-4 rotate-1"
                }`}
                style={{
                  animation: `${item.animation} 0.8s ease-out ${item.delay} both`,
                }}
              >
                <p
                  className={`font-serif font-semibold text-foreground transition-all duration-500 ${
                    morphed ? "text-base mb-3" : "text-sm mb-2"
                  }`}
                >
                  {item.label}
                </p>
                <p
                  className={`text-foreground/80 leading-relaxed transition-all duration-700 ${
                    morphed
                      ? "opacity-100 text-sm max-h-40"
                      : "opacity-0 text-xs max-h-0"
                  }`}
                  style={{ overflow: "hidden" }}
                >
                  {item.insight}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostItCanvas;
