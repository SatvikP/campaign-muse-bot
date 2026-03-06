export interface Persona {
  name: string;
  avatar: string;
  age: string;
  description: string;
  psychographics: string;
  keywords: string[];
  adAngle: string;
}

export const mockPersonas: Persona[] = [
  {
    name: "Marathon Maya",
    avatar: "🏃‍♀️",
    age: "28, Urban Professional",
    description:
      "Trains 5x a week, competes in half-marathons. Values performance and data-driven training. Active on Strava and running forums.",
    psychographics:
      "Achievement-driven, tech-savvy, brand-loyal once convinced by performance data.",
    keywords: [
      "carbon plate running shoes",
      "lightweight marathon shoes",
      "race day performance gear",
      "PR running shoes",
      "sub-3 marathon shoes",
    ],
    adAngle:
      "Show real race-day data comparisons. Feature elite amateur runners breaking PRs. Emphasize the shoe's weight-to-cushion ratio.",
  },
  {
    name: "Trail Tom",
    avatar: "⛰️",
    age: "35, Outdoor Enthusiast",
    description:
      "Weekend trail runner who values durability and grip. Prefers nature over city running. Follows outdoor adventure influencers.",
    psychographics:
      "Adventure-seeking, eco-conscious, values authenticity and sustainability in brands.",
    keywords: [
      "trail running shoes grip",
      "waterproof running shoes",
      "off-road running gear",
      "sustainable trail shoes",
      "mountain running footwear",
    ],
    adAngle:
      "Cinematic trail footage with real runners. Highlight grip technology on wet terrain. Lean into sustainability story of materials.",
  },
  {
    name: "Casual Casey",
    avatar: "👟",
    age: "24, Lifestyle Runner",
    description:
      "Runs 2-3x a week for wellness. Cares about style as much as comfort. Discovers brands through Instagram and TikTok.",
    psychographics:
      "Trend-aware, social-media native, values aesthetics and community belonging.",
    keywords: [
      "stylish running shoes",
      "comfortable daily runners",
      "running shoes for beginners",
      "athleisure running shoes",
      "best looking running shoes 2025",
    ],
    adAngle:
      "Lifestyle-first creative — running to brunch, city jogs at golden hour. UGC-style content from micro-influencers. Colorway drops as limited editions.",
  },
];
