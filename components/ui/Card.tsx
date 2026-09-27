import { HTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padded?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ padded = true, className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={twMerge("rounded-md border border-line bg-raised", padded && "p-5", className)}
      {...props}
    >
      {children}
    </div>
  )
);
Card.displayName = "Card";
