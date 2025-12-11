import { cn } from "@/lib/utils";

interface Character {
  id: number;
  name: string;
  image: string;
  gender?: string;
  occupation?: string;
  firstAppearance?: string;
  voicedBy?: string;
}

interface CharacterCardProps {
  character: Character;
  onClick?: () => void;
}

export function CharacterCard({ character, onClick }: CharacterCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative bg-card rounded-2xl overflow-hidden cursor-pointer",
        "border-4 border-border shadow-lg",
        "transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-primary",
        "animate-bounce-in"
      )}
    >
      <div className="aspect-square overflow-hidden bg-secondary/30">
        <img
          src={character.image}
          alt={character.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      <div className="p-4 bg-card-gradient">
        <h3 className="font-heading font-bold text-lg text-foreground truncate">
          {character.name}
        </h3>
        {character.occupation && (
          <p className="text-sm text-muted-foreground truncate">
            {character.occupation}
          </p>
        )}
      </div>
      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300" />
    </div>
  );
}
