import React from "react";
import { cn } from "../../utils/cn";

export const GradientButton = ({
  children,
  className,
  onClick,
  href,
  variant = "default",
  gradient = "from-zinc-900 via-zinc-500 to-zinc-900", // Default gradient
  ...props
}) => {
  const Component = href ? "a" : "button";

  return (
    <Component
      href={href}
      onClick={onClick}
      className={cn(
        "group relative mx-auto flex w-full items-center justify-center overflow-hidden rounded-xl bg-transparent p-[2px] font-bold transition-all duration-300 hover:scale-[1.02] active:scale-95",
        className
      )}
      {...props}
    >
      {/* Animated Gradient Border */}
      <div className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      {/* Static Gradient Background (Customizable) */}
      <span className={cn(
        "absolute inset-[-1000%] animate-[spin_2s_linear_infinite]",
         variant === "variant" ? "bg-zinc-950" : `bg-gradient-to-r ${gradient}` 
      )} />

      {/* Inner Content Container */}
      <span className={cn(
        "relative flex h-full w-full items-center justify-center rounded-[10px] bg-slate-950 px-8 py-4 text-lg text-white backdrop-blur-3xl transition-all duration-300",
        // Hover state: slightly transparent background to let gradient show through
        "group-hover:bg-slate-950/90"
      )}>
        {children}
      </span>
    </Component>
  );
};