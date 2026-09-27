import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, className = "", id = "input", ...props }, ref) => (
    <div className="w-full">
      <input
        ref={ref}
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full rounded-md border bg-raised px-4 py-3 text-fg placeholder:text-slate-500 focus-visible:outline-none focus:border-accent dark:placeholder:text-slate-400 ${
          error ? "border-warn" : "border-line"
        } ${className}`}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 text-sm text-warn">
          {error}
        </p>
      )}
    </div>
  )
);
Input.displayName = "Input";
