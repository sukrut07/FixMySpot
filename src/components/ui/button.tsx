import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-orange/60 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-orange text-white hover:bg-orange/90 shadow-glow",
        secondary: "border border-border bg-card text-text hover:border-orange/60",
        ghost: "text-muted hover:bg-white/5 hover:text-text",
        danger: "bg-red text-white hover:bg-red/90"
      },
      size: {
        sm: "h-9 px-3",
        md: "h-10 px-4",
        lg: "h-12 px-5"
      }
    },
    defaultVariants: { variant: "primary", size: "md" }
  }
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: false };

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export function buttonClassName({ className, ...props }: (VariantProps<typeof buttonVariants> & { className?: string }) = {}) {
  return cn(buttonVariants(props), className);
}
