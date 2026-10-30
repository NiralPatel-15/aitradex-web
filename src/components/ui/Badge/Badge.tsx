import { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type BadgeVariant =
  "default" | "primary" | "success" | "warning" | "danger" | "info" | "outline";

type BadgeSize = "small" | "medium" | "large";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  children: ReactNode;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "border-border bg-surface-secondary text-text-secondary",

  primary: "border-primary/15 bg-primary-light text-primary",

  success: "border-success/15 bg-success-light text-success",

  warning: "border-warning/20 bg-warning-light text-warning",

  danger: "border-danger/15 bg-danger-light text-danger",

  info: "border-info/15 bg-info-light text-info",

  outline: "border-border bg-transparent text-text-primary",
};

const dotClasses: Record<BadgeVariant, string> = {
  default: "bg-text-muted",
  primary: "bg-primary",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
  info: "bg-info",
  outline: "bg-text-secondary",
};

const sizeClasses: Record<BadgeSize, string> = {
  small: "min-h-6 px-2 text-[11px]",
  medium: "min-h-7 px-2.5 text-xs",
  large: "min-h-8 px-3 text-sm",
};

export default function Badge({
  variant = "default",
  size = "medium",
  dot = false,
  children,
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex",
        "w-fit",
        "items-center",
        "justify-center",
        "gap-1.5",
        "rounded-full",
        "border",
        "font-medium",
        "leading-none",
        "whitespace-nowrap",
        "transition-colors",
        "duration-200",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {dot && (
        <span
          className={clsx(
            "h-1.5",
            "w-1.5",
            "shrink-0",
            "rounded-full",
            dotClasses[variant],
          )}
          aria-hidden="true"
        />
      )}

      {children}
    </span>
  );
}
