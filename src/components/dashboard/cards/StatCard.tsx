"use client";

import clsx from "clsx";
import { ArrowDownRight, ArrowUpRight, LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  subtitle?: string;
  icon: LucideIcon;
  positive?: boolean;
}

export default function StatCard({
  title,
  value,
  change,
  subtitle,
  icon: Icon,
  positive = true,
}: StatCardProps) {
  return (
    <div
      className="
        rounded-3xl
        border
        border-border
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-md
      "
    >
      {/* Top */}

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-text-secondary">{title}</p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-text-primary">
            {value}
          </h2>
        </div>

        <div
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-primary-light
          "
        >
          <Icon size={28} className="text-primary" />
        </div>
      </div>

      {/* Bottom */}

      {(change || subtitle) && (
        <div className="mt-6 flex items-center justify-between">
          {change ? (
            <div
              className={clsx(
                "flex items-center gap-2 text-sm font-semibold",
                positive ? "text-success" : "text-danger",
              )}
            >
              {positive ? (
                <ArrowUpRight size={18} />
              ) : (
                <ArrowDownRight size={18} />
              )}

              {change}
            </div>
          ) : (
            <p className="text-sm text-text-secondary">{subtitle}</p>
          )}
        </div>
      )}
    </div>
  );
}
