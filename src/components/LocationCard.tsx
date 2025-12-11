import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface Location {
  id: number;
  name: string;
  image?: string;
  town?: string;
}

interface LocationCardProps {
  location: Location;
  onClick?: () => void;
}

export function LocationCard({ location, onClick }: LocationCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "group bg-card rounded-2xl overflow-hidden cursor-pointer",
        "border-4 border-border shadow-lg",
        "transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-accent"
      )}
    >
      <div className="aspect-video overflow-hidden bg-gradient-to-br from-accent/20 to-simpsons-green/10 relative">
        {location.image ? (
          <img
            src={location.image}
            alt={location.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <MapPin className="w-12 h-12 text-accent/40" />
          </div>
        )}
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
      </div>
      <div className="p-4">
        <h3 className="font-heading font-bold text-lg text-foreground group-hover:text-accent transition-colors line-clamp-2">
          {location.name}
        </h3>
        {location.town && (
          <p className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
            <MapPin className="w-4 h-4 text-accent" />
            {location.town}
          </p>
        )}
      </div>
    </div>
  );
}
