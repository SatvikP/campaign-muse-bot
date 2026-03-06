import pushupPenguin from "@/assets/pushup-penguin.gif";

const TeddyBearLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-8">
      <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground text-center">
        Your team of marketers are warming up
      </h2>

      <img
        src={pushupPenguin}
        alt="Penguin doing push-ups"
        className="w-48 h-auto rounded-xl"
      />

      <p className="text-muted-foreground text-center text-lg italic">
        Do some push-ups while the agents do their job 💪
      </p>

      {/* Progress dots */}
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2.5 h-2.5 rounded-full bg-foreground/30"
            style={{
              animation: "pulse-nudge 1.4s ease-in-out infinite",
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default TeddyBearLoader;
