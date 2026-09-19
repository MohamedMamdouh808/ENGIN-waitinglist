import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
}

const variants: Record<string, string> = {
  primary:
    "bg-accent text-white dark:text-bg hover:bg-accent-soft disabled:bg-accent/40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
  secondary:
    "border border-line text-fg hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
  ghost: "text-muted hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className = "", children, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={`inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-medium transition-colors duration-150 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
);
Button.displayName = "Button";
