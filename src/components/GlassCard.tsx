import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export const GlassCard = ({ children, className, hover = false }: GlassCardProps) => {
  return (
    <div
      className={cn(
        "bg-card/50 backdrop-blur-glass border border-border rounded-2xl shadow-glass",
        hover && "transition-all duration-300 hover:border-primary/50 hover:shadow-glow-purple",
        className
      )}
    >
      {children}
    </div>
  );
};
