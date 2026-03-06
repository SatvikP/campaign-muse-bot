import { mockPersonas, type Persona } from "@/data/mockCampaignResults";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const personaColors = [
  "bg-postit-coral",
  "bg-postit-sage",
  "bg-postit-blue",
];

const PersonaCard = ({ persona, colorClass }: { persona: Persona; colorClass: string }) => (
  <Card className="border-border/60 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
    <div className={`${colorClass} h-2`} />
    <CardHeader className="pb-3">
      <div className="flex items-center gap-3">
        <span className="text-3xl">{persona.avatar}</span>
        <div>
          <CardTitle className="text-lg font-serif">{persona.name}</CardTitle>
          <p className="text-sm text-muted-foreground">{persona.age}</p>
        </div>
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      <div>
        <p className="text-sm text-foreground/90 leading-relaxed">{persona.description}</p>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
          Psychographics
        </p>
        <p className="text-sm text-foreground/80">{persona.psychographics}</p>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
          Keywords
        </p>
        <div className="flex flex-wrap gap-1.5">
          {persona.keywords.map((kw) => (
            <Badge key={kw} variant="secondary" className="text-xs font-normal rounded-full">
              {kw}
            </Badge>
          ))}
        </div>
      </div>
      <div className="pt-2 border-t border-border">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
          Ad Angle
        </p>
        <p className="text-sm text-foreground/80 italic leading-relaxed">{persona.adAngle}</p>
      </div>
    </CardContent>
  </Card>
);

const CampaignResults = ({ idea }: { idea: string }) => (
  <div className="space-y-8">
    <div className="text-center">
      <p className="text-sm text-muted-foreground mb-2">Campaign idea</p>
      <div className="inline-block bg-postit-yellow/50 px-6 py-3 rounded-lg border border-border">
        <p className="font-serif text-lg text-foreground">"{idea}"</p>
      </div>
    </div>
    <div>
      <h3 className="text-2xl font-serif font-semibold text-foreground text-center mb-6">
        Your Campaign Team's Output
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockPersonas.map((persona, i) => (
          <PersonaCard key={persona.name} persona={persona} colorClass={personaColors[i]} />
        ))}
      </div>
    </div>
  </div>
);

export default CampaignResults;
