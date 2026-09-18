import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, className = "", ...props }, ref) => (
    <div className="w-full">
      <input
        ref={ref}
        aria-invalid={!!error}
        aria-describedby={error ? `${props.id}-error` : undefined}
        className={`w-full rounded-sm border bg-raised px-4 py-3 text-fg placeholder:text-muted focus-visible:outline-none ${
          error ? "border-warn" : "border-line focus:border-accent"
        } ${className}`}
        {...props}
      />
      {error && (
        <p id={`${props.id}-error`} role="alert" className="mt-2 text-sm text-warn">
          {error}
        </p>
      )}
    </div>
  )
);
Input.displayName = "Input";
