const HeroSection = () => {
  return (
    <section className="pt-20 pb-12 px-6 text-center max-w-4xl mx-auto">
      <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4">
        For Running Shoe Brand Managers
      </p>
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-semibold leading-tight text-foreground mb-6">
        Build with a team of{" "}
        <span className="italic">smart marketers</span>
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
        An AI-powered campaign planner that turns your ideas into fully formed
        ad campaigns — complete with personas, keywords, and creative briefs.
      </p>
    </section>
  );
};

export default HeroSection;
