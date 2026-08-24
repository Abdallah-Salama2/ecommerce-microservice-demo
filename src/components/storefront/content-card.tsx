import * as React from "react";
import { cn } from "@/lib/utils";

/** General-purpose editorial content card. */
export function ContentCard({
  eyebrow,
  title,
  children,
  footer,
  className,
  as: As = "div",
}: {
  eyebrow?: string;
  title?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}) {
  return (
    <As
      className={cn(
        "flex flex-col gap-4 border border-border bg-card p-6 sm:p-8 transition-colors hover:border-foreground/25",
        className,
      )}
    >
      {eyebrow ? <span className="rule-label">{eyebrow}</span> : null}
      {title ? (
        <h3 className="font-display text-2xl font-normal leading-tight tracking-tight text-foreground">
          {title}
        </h3>
      ) : null}
      {children ? <div className="text-sm leading-relaxed text-muted-foreground">{children}</div> : null}
      {footer ? <div className="mt-auto pt-2">{footer}</div> : null}
    </As>
  );
}
