const TeddyBearLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-8">
      <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground text-center">
        Your team of marketers are warming up
      </h2>

      {/* SVG Teddy Bear doing push-ups */}
      <div className="relative w-48 h-40">
        <svg
          viewBox="0 0 200 160"
          className="w-full h-full"
          style={{ animation: "pushup 1.6s ease-in-out infinite" }}
        >
          {/* Ears */}
          <circle cx="60" cy="32" r="18" fill="hsl(30 30% 65%)" />
          <circle cx="140" cy="32" r="18" fill="hsl(30 30% 65%)" />
          <circle cx="60" cy="32" r="10" fill="hsl(30 25% 55%)" />
          <circle cx="140" cy="32" r="10" fill="hsl(30 25% 55%)" />

          {/* Head */}
          <ellipse cx="100" cy="50" rx="36" ry="32" fill="hsl(30 35% 72%)" />

          {/* Eyes */}
          <circle cx="86" cy="46" r="4" fill="hsl(30 10% 20%)" />
          <circle cx="114" cy="46" r="4" fill="hsl(30 10% 20%)" />
          <circle cx="87" cy="44" r="1.5" fill="white" />
          <circle cx="115" cy="44" r="1.5" fill="white" />

          {/* Nose */}
          <ellipse cx="100" cy="56" rx="6" ry="4" fill="hsl(30 20% 45%)" />

          {/* Smile */}
          <path
            d="M94 60 Q100 66 106 60"
            fill="none"
            stroke="hsl(30 20% 45%)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Body */}
          <ellipse
            cx="100"
            cy="100"
            rx="44"
            ry="32"
            fill="hsl(30 35% 72%)"
            style={{ animation: "breathe 1.6s ease-in-out infinite" }}
          />

          {/* Arms (extended for push-up) */}
          <rect x="42" y="92" width="16" height="36" rx="8" fill="hsl(30 30% 65%)" transform="rotate(-10 50 92)" />
          <rect x="142" y="92" width="16" height="36" rx="8" fill="hsl(30 30% 65%)" transform="rotate(10 150 92)" />

          {/* Paws */}
          <ellipse cx="46" cy="130" rx="10" ry="6" fill="hsl(30 25% 55%)" />
          <ellipse cx="154" cy="130" rx="10" ry="6" fill="hsl(30 25% 55%)" />

          {/* Ground line */}
          <line x1="20" y1="138" x2="180" y2="138" stroke="hsl(var(--border))" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

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
