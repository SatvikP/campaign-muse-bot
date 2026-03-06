import HeroSection from "@/components/landing/HeroSection";
import PostItCanvas from "@/components/landing/PostItCanvas";
import SignUpSection from "@/components/landing/SignUpSection";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <nav className="flex items-center justify-between px-8 py-5 max-w-6xl mx-auto">
        <span className="font-serif text-xl font-semibold text-foreground">
          Stride
        </span>
        <span className="text-sm text-muted-foreground">
          Marketing Planner
        </span>
      </nav>
      <HeroSection />
      <PostItCanvas />
      <SignUpSection />
      <footer className="text-center py-8 text-sm text-muted-foreground">
        Built for running shoe brand managers
      </footer>
    </div>
  );
};

export default Landing;
