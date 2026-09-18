import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
}

const variants: Record<string, string> = {
  primary:
    "bg-accent text-bg hover:bg-accent-soft disabled:bg-accent/40 disabled:cursor-not-allowed",
  secondary:
    "border border-line text-fg hover:border-accent hover:text-accent",
  ghost: "text-muted hover:text-fg",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className = "", children, ...props }, ref) => (
    <button
      ref={ref}
      className={`inline-flex items-center justify-center gap-2 rounded-sm px-5 py-3 text-sm font-medium transition-colors duration-150 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
);
Button.displayName = "Button";
