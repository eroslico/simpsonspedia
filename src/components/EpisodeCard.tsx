import { Tv, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface Episode {
  id: number;
  name: string;
  season: number;
  episode: number;
  airDate?: string;
  description?: string;
  image?: string;
}

interface EpisodeCardProps {
  episode: Episode;
  onClick?: () => void;
}

export function EpisodeCard({ episode, onClick }: EpisodeCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "group bg-card rounded-2xl overflow-hidden cursor-pointer",
        "border-4 border-border shadow-lg",
        "transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:border-secondary"
      )}
    >
      <div className="aspect-video overflow-hidden bg-gradient-to-br from-secondary/30 to-primary/20 relative">
        {episode.image ? (
          <img
            src={episode.image}
            alt={episode.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Tv className="w-12 h-12 text-muted-foreground/40" />
          </div>
        )}
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-heading font-bold shadow-sm">
            S{episode.season} E{episode.episode}
          </span>
          {episode.airDate && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="w-3 h-3" />
              {episode.airDate}
            </span>
          )}
        </div>
        <h3 className="font-heading font-bold text-lg text-foreground line-clamp-2 group-hover:text-secondary transition-colors">
          {episode.name}
        </h3>
        {episode.description && (
          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
            {episode.description}
          </p>
        )}
      </div>
    </div>
  );
}
