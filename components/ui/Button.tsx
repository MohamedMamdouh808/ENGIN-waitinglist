import { ButtonHTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const button = cva(
  "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-white hover:bg-accent-soft disabled:cursor-not-allowed disabled:bg-accent/40 dark:text-bg focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        secondary: "border border-line bg-raised text-fg hover:border-accent hover:text-accent",
        ghost: "text-muted hover:text-fg",
      },
    },
    defaultVariants: { variant: "primary" },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, className, children, type = "button", ...props }, ref) => (
    <button ref={ref} type={type} className={twMerge(button({ variant }), className)} {...props}>
      {children}
    </button>
  )
);
Button.displayName = "Button";
