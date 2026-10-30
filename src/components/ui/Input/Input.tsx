"use client";

import {
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  useId,
  useState,
} from "react";
import { Eye, EyeOff } from "lucide-react";
import clsx from "clsx";

export interface InputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size"
> {
  label?: string;
  helperText?: string;
  error?: string;
  success?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  required?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      label,
      helperText,
      error,
      success,
      leftIcon,
      rightIcon,
      required = false,
      className,
      type = "text",
      disabled = false,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    const helperId = `${inputId}-helper`;
    const errorId = `${inputId}-error`;
    const successId = `${inputId}-success`;

    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";

    const inputType = isPassword && showPassword ? "text" : type;

    const describedBy = error
      ? errorId
      : success
        ? successId
        : helperText
          ? helperId
          : undefined;

    const hasRightContent = Boolean(rightIcon || isPassword);

    return (
      <div className="flex w-full flex-col gap-2">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium leading-5 text-text-primary"
          >
            {label}

            {required && (
              <span className="ml-1 text-danger" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        <div className="relative w-full">
          {leftIcon && (
            <span
              className={clsx(
                "pointer-events-none absolute left-3.5 top-1/2",
                "-translate-y-1/2",
                "flex items-center justify-center",
                "text-text-muted",
              )}
              aria-hidden="true"
            >
              {leftIcon}
            </span>
          )}

          <input
            id={inputId}
            ref={ref}
            type={inputType}
            disabled={disabled}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={describedBy}
            className={clsx(
              /* Base */
              "block",
              "h-11",
              "w-full",
              "rounded-lg",
              "border",
              "bg-surface",
              "px-3.5",
              "text-sm",
              "text-text-primary",
              "placeholder:text-text-muted",

              /* Typography */
              "leading-5",

              /* Border */
              "border-border",

              /* Shadow */
              "shadow-xs",

              /* Transition */
              "transition-all",
              "duration-200",

              /* Focus */
              "outline-none",
              "focus:border-primary",
              "focus:ring-2",
              "focus:ring-primary/15",

              /* Hover */
              "hover:border-border-hover",

              /* Disabled */
              "disabled:cursor-not-allowed",
              "disabled:bg-surface-secondary",
              "disabled:text-text-muted",
              "disabled:opacity-70",

              /* Left icon */
              leftIcon && "pl-10",

              /* Right icon/password */
              hasRightContent && "pr-10",

              /* Error */
              error && [
                "border-danger",
                "focus:border-danger",
                "focus:ring-danger/15",
              ],

              /* Success */
              success &&
                !error && [
                  "border-success",
                  "focus:border-success",
                  "focus:ring-success/15",
                ],

              className,
            )}
            {...props}
          />

          {isPassword ? (
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              disabled={disabled}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className={clsx(
                "absolute right-2.5 top-1/2",
                "-translate-y-1/2",
                "flex h-8 w-8 items-center justify-center",
                "rounded-md",
                "text-text-muted",
                "transition-colors duration-200",
                "hover:bg-surface-secondary",
                "hover:text-text-primary",
                "focus-visible:outline-none",
                "focus-visible:ring-2",
                "focus-visible:ring-primary/30",
                "disabled:pointer-events-none",
                "disabled:opacity-50",
              )}
            >
              {showPassword ? (
                <EyeOff size={18} strokeWidth={1.8} />
              ) : (
                <Eye size={18} strokeWidth={1.8} />
              )}
            </button>
          ) : (
            rightIcon && (
              <span
                className={clsx(
                  "pointer-events-none absolute right-3.5 top-1/2",
                  "-translate-y-1/2",
                  "flex items-center justify-center",
                  "text-text-muted",
                )}
                aria-hidden="true"
              >
                {rightIcon}
              </span>
            )
          )}
        </div>

        {helperText && !error && !success && (
          <p id={helperId} className="text-xs leading-5 text-text-secondary">
            {helperText}
          </p>
        )}

        {error && (
          <p
            id={errorId}
            className="text-xs leading-5 text-danger"
            role="alert"
          >
            {error}
          </p>
        )}

        {success && !error && (
          <p id={successId} className="text-xs leading-5 text-success">
            {success}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
