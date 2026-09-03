import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[0.625rem] uppercase leading-none tracking-[0.14em] whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "border-border bg-card text-muted-foreground",
        outline: "border-foreground/30 bg-transparent text-foreground",
        instock: "border-primary/25 bg-primary/10 text-primary",
        low: "border-foreground/20 bg-surface text-foreground",
        soldout: "border-border bg-muted text-muted-foreground",
        /** mustard — reserved for sale / promo only */
        sale: "border-promo bg-promo text-promo-foreground",
        /** order status variants matching design system tokens */
        pending: "border-promo/40 bg-promo/15 text-foreground",
        processing: "border-primary/30 bg-primary/10 text-primary",
        confirmed: "border-primary/40 bg-primary/15 text-primary",
        shipped: "border-primary/50 bg-primary/20 text-primary",
        delivered: "border-border bg-surface text-foreground",
        cancelled: "border-destructive/30 bg-destructive/10 text-destructive",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
  VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
