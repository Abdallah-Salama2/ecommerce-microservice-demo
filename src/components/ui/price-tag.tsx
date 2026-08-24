import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * PriceTag — the signature element.
 * A small rotated monospace "physical price tag" chip with a punch hole.
 * Use this EVERYWHERE a price is displayed (cards, PDP, cart, admin).
 */
const priceTagVariants = cva(
  "relative inline-flex select-none items-center gap-1.5 border pl-4 pr-2.5 font-mono tabular-nums leading-none shadow-[var(--shadow-tag)]",
  {
    variants: {
      variant: {
        default: "border-border bg-card text-foreground",
        primary: "border-primary bg-primary text-primary-foreground",
        promo: "border-promo bg-promo text-promo-foreground",
        muted: "border-border bg-muted text-muted-foreground",
      },
      size: {
        sm: "h-6 rounded-sm text-[0.6875rem] -rotate-2",
        md: "h-8 rounded-sm text-sm -rotate-2",
        lg: "h-11 rounded-md pl-6 pr-4 text-xl -rotate-3",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  },
);

export function formatPrice(amount: number, currency = "$") {
  return `${currency}${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export interface PriceTagProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children">,
    VariantProps<typeof priceTagVariants> {
  /** Price in major currency units, e.g. 1240 */
  amount: number;
  /** Optional original price — rendered struck through when higher */
  compareAt?: number | undefined;
  currency?: string | undefined;
}

export const PriceTag = React.forwardRef<HTMLSpanElement, PriceTagProps>(
  ({ amount, compareAt, currency = "$", variant, size, className, ...props }, ref) => {
    const onSale = typeof compareAt === "number" && compareAt > amount;

    return (
      <span
        ref={ref}
        className={cn(priceTagVariants({ variant: onSale ? "promo" : variant, size }), className)}
        {...props}
      >
        {/* punch hole */}
        <span
          aria-hidden="true"
          className={cn(
            "absolute left-1.5 top-1/2 -translate-y-1/2 rounded-full border border-current opacity-60",
            size === "lg" ? "size-2" : "size-1.5",
          )}
        />
        <span className="font-medium">{formatPrice(amount, currency)}</span>
        {onSale ? (
          <span className="text-[0.85em] line-through opacity-60">
            {formatPrice(compareAt, currency)}
          </span>
        ) : null}
      </span>
    );
  },
);
PriceTag.displayName = "PriceTag";

export { priceTagVariants };
