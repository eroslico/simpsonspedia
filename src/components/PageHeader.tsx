import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  gradient?: boolean;
}

export function PageHeader({ title, subtitle, icon, gradient = true }: PageHeaderProps) {
  return (
    <div className="relative mb-12 md:mb-16">
      {/* Background decoration */}
      {gradient && (
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-primary/20 via-secondary/10 to-accent/20 blur-3xl rounded-full" />
        </div>
      )}
      
      <div className="text-center py-8 md:py-12">
        {/* Icon with glow effect */}
        {icon && (
          <div className="relative inline-block mb-4">
            <span className="text-5xl md:text-7xl block animate-bounce-in">
              {icon}
            </span>
            <div className="absolute inset-0 blur-2xl opacity-50 scale-150">
              <span className="text-5xl md:text-7xl block">{icon}</span>
            </div>
          </div>
        )}
        
        {/* Title with animated gradient on hover */}
        <h1 className={cn(
          "text-4xl md:text-5xl lg:text-6xl font-heading font-bold",
          "bg-gradient-to-r from-foreground via-foreground to-foreground bg-clip-text",
          "hover:from-primary hover:via-secondary hover:to-accent hover:text-transparent",
          "transition-all duration-500 cursor-default"
        )}>
          {title}
        </h1>
        
        {/* Subtitle */}
        {subtitle && (
          <p className="mt-4 text-lg md:text-xl text-muted-foreground font-body max-w-2xl mx-auto animate-fade-in">
            {subtitle}
          </p>
        )}
        
        {/* Decorative line */}
        <div className="mt-6 flex items-center justify-center gap-2">
          <div className="h-1 w-12 bg-gradient-to-r from-transparent to-primary rounded-full" />
          <div className="h-1.5 w-24 bg-gradient-to-r from-primary via-secondary to-accent rounded-full" />
          <div className="h-1 w-12 bg-gradient-to-l from-transparent to-accent rounded-full" />
        </div>
      </div>
    </div>
  );
}
