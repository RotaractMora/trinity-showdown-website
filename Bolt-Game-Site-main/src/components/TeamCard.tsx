import { Card } from "./ui/card";
import {Image as ImageIcon, Users} from "lucide-react";

interface TeamCardProps {
  teamName: string;
  game: string;
  logoUrl?: string;
}

const TeamCard = ({ teamName, game, logoUrl }: TeamCardProps) => {
  const showLogo = Boolean(logoUrl);

  return (
    <Card className="p-6 border-primary/20 hover:border-primary transition-all hover:shadow-lg hover:shadow-primary/20 min-h-[200px] flex flex-col items-center justify-center">
      <div className="mb-4">
        {showLogo ? (
          <img
            src={logoUrl}
            alt={`${teamName} logo`}
            className="w-20 h-20 object-cover rounded-full border-3 border-primary/80"
            onError={(e) => {
              // Replace broken logo with a placeholder icon
              const img = e.currentTarget;
              img.style.display = "none";
              const placeholder = img.parentElement?.querySelector(
                "[data-team-logo-placeholder]"
              ) as HTMLElement | null;
              if (placeholder) placeholder.style.display = "flex";
            }}
          />
        ) : null}

        <div
          data-team-logo-placeholder
          className="w-20 h-20 rounded-full border-2 border-primary/30 bg-primary/5 text-primary/70 items-center justify-center"
          style={{ display: showLogo ? "none" : "flex" }}
          aria-label="Team logo unavailable"
          title="Team logo unavailable"
        >
          <Users className="w-8 h-8" />
        </div>
      </div>

      <h4 className="font-heading font-bold text-primary text-lg text-center mb-2">
        {teamName}
      </h4>
      <p className="text-sm text-muted-foreground text-center">{game}</p>
    </Card>
  );
};

export default TeamCard;

