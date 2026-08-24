import * as React from "react";
import { cn } from "@/lib/utils";

/** Label + control + hint wrapper shared by every form surface. */
export function Field({
  label,
  htmlFor,
  hint,
  className,
  children,
}: {
  label: string;
  htmlFor?: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={htmlFor} className="rule-label">
        {label}
      </label>
      {children}
      {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

export interface SelectFieldProps extends React.ComponentProps<"select"> {
  options: { value: string; label: string }[];
}

/** Native select styled to match Input — safe to wire to real state later. */
export const Select = React.forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ className, options, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          ref={ref}
          className={cn(
            "h-11 w-full appearance-none rounded-sm border border-input bg-card px-3.5 pr-9 text-sm text-foreground transition-colors hover:border-foreground/40 focus-visible:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          {...props}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground"
        >
          ▾
        </span>
      </div>
    );
  },
);
Select.displayName = "Select";
