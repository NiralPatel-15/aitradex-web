"use client";

import {
  ButtonHTMLAttributes,
  ForwardedRef,
  ReactNode,
  forwardRef,
} from "react";
import clsx from "clsx";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";

type ButtonSize = "small" | "medium" | "large";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: clsx(
    "border-primary",
    "bg-primary",
    "text-white",
    "shadow-sm",
    "hover:-translate-y-0.5",
    "hover:border-primary-hover",
    "hover:bg-primary-hover",
    "hover:shadow-md",
    "active:translate-y-0",
    "active:shadow-sm",
  ),

  secondary: clsx(
    "border-border",
    "bg-surface",
    "text-text-primary",
    "shadow-xs",
    "hover:-translate-y-0.5",
    "hover:border-border-hover",
    "hover:bg-surface-secondary",
    "hover:shadow-sm",
    "active:translate-y-0",
  ),

  outline: clsx(
    "border-primary",
    "bg-transparent",
    "text-primary",
    "hover:-translate-y-0.5",
    "hover:bg-primary-light",
    "hover:shadow-sm",
    "active:translate-y-0",
  ),

  ghost: clsx(
    "border-transparent",
    "bg-transparent",
    "text-text-primary",
    "hover:bg-surface-secondary",
    "hover:text-primary",
    "active:bg-primary-light",
  ),

  danger: clsx(
    "border-danger",
    "bg-danger",
    "text-white",
    "shadow-sm",
    "hover:-translate-y-0.5",
    "hover:brightness-95",
    "hover:shadow-md",
    "active:translate-y-0",
  ),
};

const sizeClasses: Record<ButtonSize, string> = {
  small: clsx("min-h-9", "rounded-md", "px-3.5", "text-sm"),

  medium: clsx("min-h-11", "rounded-lg", "px-5", "text-sm", "sm:text-[15px]"),

  large: clsx("min-h-[52px]", "rounded-xl", "px-6", "text-base"),
};

function ButtonComponent(
  {
    variant = "primary",
    size = "medium",
    fullWidth = false,
    loading = false,
    leftIcon,
    rightIcon,
    children,
    className,
    disabled = false,
    type = "button",
    ...props
  }: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  const isDisabled = disabled || loading;

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      aria-busy={loading}
      className={clsx(
        /* Layout */
        "inline-flex",
        "items-center",
        "justify-center",
        "gap-2",

        /* Sizing */
        "w-fit",
        fullWidth && "w-full",

        /* Typography */
        "font-semibold",
        "leading-none",
        "whitespace-nowrap",

        /* Border */
        "border",

        /* Interaction */
        "select-none",
        "outline-none",
        "transition-all",
        "duration-200",
        "ease-out",

        /* Focus */
        "focus-visible:ring-2",
        "focus-visible:ring-primary/30",
        "focus-visible:ring-offset-2",

        /* Disabled */
        "disabled:pointer-events-none",
        "disabled:cursor-not-allowed",
        "disabled:opacity-50",

        /* Variants */
        variantClasses[variant],

        /* Sizes */
        sizeClasses[size],

        /* Custom classes */
        className,
      )}
      {...props}
    >
      {loading ? (
        <>
          <span
            className={clsx(
              "h-4 w-4",
              "animate-spin",
              "rounded-full",
              "border-2",
              "border-current",
              "border-t-transparent",
            )}
            aria-hidden="true"
          />

          <span>Loading...</span>
        </>
      ) : (
        <>
          {leftIcon && (
            <span
              className="flex shrink-0 items-center justify-center"
              aria-hidden="true"
            >
              {leftIcon}
            </span>
          )}

          <span>{children}</span>

          {rightIcon && (
            <span
              className="flex shrink-0 items-center justify-center"
              aria-hidden="true"
            >
              {rightIcon}
            </span>
          )}
        </>
      )}
    </button>
  );
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(ButtonComponent);

Button.displayName = "Button";

export default Button;
