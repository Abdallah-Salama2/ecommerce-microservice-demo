import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium tracking-tight transition-[color,background-color,border-color,transform] duration-200 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90 active:translate-y-px",
        secondary:
          "border border-foreground/25 bg-transparent text-foreground hover:border-foreground hover:bg-foreground/[0.04] active:translate-y-px",
        ghost: "bg-transparent text-foreground hover:bg-accent",
        // aliases kept for shadcn primitives that expect shadcn variant names
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline:
          "border border-foreground/25 bg-transparent text-foreground hover:border-foreground hover:bg-foreground/[0.04]",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        link: "h-auto p-0 text-foreground underline decoration-primary decoration-1 underline-offset-4 hover:text-primary",
      },
      size: {
        sm: "h-9 px-3.5 text-xs",
        default: "h-11 px-6",
        md: "h-11 px-6",
        lg: "h-13 px-8 text-base",
        icon: "size-11",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size }), className)} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
