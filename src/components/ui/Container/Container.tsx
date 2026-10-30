import { ElementType, ReactNode } from "react";
import clsx from "clsx";

export interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  size?: "small" | "medium" | "large" | "full";
}

const sizeClasses = {
  small: "max-w-4xl",
  medium: "max-w-6xl",
  large: "max-w-7xl",
  full: "max-w-none",
};

export default function Container({
  children,
  className,
  as: Component = "div",
  size = "large",
}: ContainerProps) {
  return (
    <Component
      className={clsx(
        "mx-auto",
        "w-full",
        "px-4",
        "sm:px-6",
        "lg:px-8",
        "xl:px-10",
        sizeClasses[size],
        className,
      )}
    >
      {children}
    </Component>
  );
}
