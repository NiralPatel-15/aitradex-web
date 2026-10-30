import { ElementType, ReactNode } from "react";
import clsx from "clsx";

export interface SectionProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  spacing?: "small" | "medium" | "large" | "none";
  background?: "default" | "surface" | "secondary";
  id?: string;
}

const spacingClasses = {
  none: "",
  small: "py-12 sm:py-16",
  medium: "py-16 sm:py-20 lg:py-24",
  large: "py-20 sm:py-28 lg:py-32",
};

const backgroundClasses = {
  default: "bg-background",
  surface: "bg-surface",
  secondary: "bg-surface-secondary",
};

export default function Section({
  children,
  className,
  as: Component = "section",
  spacing = "medium",
  background = "default",
  id,
}: SectionProps) {
  return (
    <Component
      id={id}
      className={clsx(
        "w-full",
        spacingClasses[spacing],
        backgroundClasses[background],
        className,
      )}
    >
      {children}
    </Component>
  );
}
