import HeroSection from "@/components/landing/HeroSection";
import PostItCanvas from "@/components/landing/PostItCanvas";
import SignUpSection from "@/components/landing/SignUpSection";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      






      
      <HeroSection />
      <PostItCanvas />
      <SignUpSection />
      <footer className="text-center py-8 text-sm text-muted-foreground">
        Built for brand managers
      </footer>
    </div>);

};

export default Landing;