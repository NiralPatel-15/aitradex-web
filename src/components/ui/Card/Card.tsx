"use client";

import { forwardRef, HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type CardPadding = "small" | "medium" | "large";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  footer?: ReactNode;
  padding?: CardPadding;
  hover?: boolean;
  children: ReactNode;
}

const paddingClasses: Record<CardPadding, string> = {
  small: "p-4 sm:p-5",
  medium: "p-5 sm:p-6 lg:p-7",
  large: "p-6 sm:p-8 lg:p-10",
};

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      title,
      subtitle,
      footer,
      padding = "medium",
      hover = false,
      children,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={clsx(
          /* Base */
          "relative",
          "w-full",
          "overflow-hidden",
          "rounded-2xl",
          "border",
          "border-border",
          "bg-surface",
          "text-text-primary",

          /* Shadow */
          "shadow-sm",

          /* Transition */
          "transition-all",
          "duration-300",
          "ease-out",

          /* Hover */
          hover && [
            "hover:-translate-y-1",
            "hover:border-border-hover",
            "hover:shadow-md",
          ],

          /* Padding */
          paddingClasses[padding],

          /* Custom classes */
          className,
        )}
        {...props}
      >
        {(title || subtitle) && (
          <div
            className={clsx(
              "mb-5",
              "flex",
              "flex-col",
              "gap-1.5",
              "border-b",
              "border-border",
              "pb-5",
            )}
          >
            {title && (
              <h2 className="text-lg font-semibold tracking-[-0.01em] text-text-primary sm:text-xl">
                {title}
              </h2>
            )}

            {subtitle && (
              <p className="text-sm leading-6 text-text-secondary">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className="min-w-0">{children}</div>

        {footer && (
          <div
            className={clsx(
              "mt-6",
              "border-t",
              "border-border",
              "pt-5",
              "text-sm",
              "text-text-secondary",
            )}
          >
            {footer}
          </div>
        )}
      </div>
    );
  },
);

Card.displayName = "Card";

export default Card;
