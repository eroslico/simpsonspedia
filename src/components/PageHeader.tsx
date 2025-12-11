import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
}

export function PageHeader({ title, subtitle, icon }: PageHeaderProps) {
  return (
    <div className="text-center mb-8 md:mb-12">
      <div className="inline-flex items-center gap-3 mb-2">
        {icon && <span className="text-4xl md:text-5xl">{icon}</span>}
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground text-shadow-md">
          {title}
        </h1>
      </div>
      {subtitle && (
        <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
