import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Modal + Drawer — one controlled surface, two presentations.
 * Used later for the mini-cart, quick view, and admin forms.
 */
export interface PanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

function PanelShell({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  className,
  contentClassName,
}: PanelProps & { contentClassName: string }) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-foreground/25 backdrop-blur-[2px] data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content className={cn(contentClassName, className)}>
          <div className="flex items-start justify-between gap-6 border-b border-border px-6 py-5">
            <div>
              <DialogPrimitive.Title className="font-display text-xl font-normal tracking-tight">
                {title}
              </DialogPrimitive.Title>
              {description ? (
                <DialogPrimitive.Description className="mt-1 text-sm text-muted-foreground">
                  {description}
                </DialogPrimitive.Description>
              ) : (
                <DialogPrimitive.Description className="sr-only">{title}</DialogPrimitive.Description>
              )}
            </div>
            <DialogPrimitive.Close
              aria-label="Close"
              className="-mr-2 -mt-1 rounded-sm p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <X className="size-4" />
            </DialogPrimitive.Close>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6">{children}</div>

          {footer ? <div className="border-t border-border px-6 py-5">{footer}</div> : null}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export function Drawer(props: PanelProps) {
  return (
    <PanelShell
      {...props}
      contentClassName="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-card shadow-[var(--shadow-lift)] data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:animate-in data-[state=open]:slide-in-from-right data-[state=open]:duration-300"
    />
  );
}

export function Modal(props: PanelProps) {
  return (
    <PanelShell
      {...props}
      contentClassName="fixed left-1/2 top-1/2 z-50 flex max-h-[85vh] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 flex-col rounded-md bg-card shadow-[var(--shadow-lift)] data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
    />
  );
}
