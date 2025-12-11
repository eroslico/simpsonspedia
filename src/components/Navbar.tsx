import { Link, useLocation } from "react-router-dom";
import { Users, Tv, MapPin, Home, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Inicio", path: "/", icon: Home },
  { name: "Personajes", path: "/characters", icon: Users },
  { name: "Episodios", path: "/episodes", icon: Tv },
  { name: "Locaciones", path: "/locations", icon: MapPin },
];

export function Navbar() {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-primary shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-2xl md:text-3xl font-heading font-bold text-primary-foreground text-shadow-sm group-hover:animate-wiggle">
              🍩 Simpsonspedia
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg font-heading font-medium transition-all duration-200",
                    isActive
                      ? "bg-secondary text-secondary-foreground shadow-md"
                      : "text-primary-foreground hover:bg-primary-foreground/10"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Mobile nav */}
          <div className="flex md:hidden gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "p-2 rounded-lg transition-all duration-200",
                    isActive
                      ? "bg-secondary text-secondary-foreground"
                      : "text-primary-foreground hover:bg-primary-foreground/10"
                  )}
                >
                  <Icon className="w-5 h-5" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
