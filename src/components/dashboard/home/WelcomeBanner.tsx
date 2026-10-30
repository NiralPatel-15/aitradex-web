"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function WelcomeBanner() {
  return (
    <section className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
      {/* Welcome Content */}
      <div>
        <div className="mb-2 flex items-center gap-2 text-sm font-medium text-[#00a878]">
          <Sparkles size={16} />
          AITradeX Smart Investing
        </div>

        <h1 className="text-2xl font-bold tracking-[-0.8px] text-[#172033] sm:text-3xl lg:text-[34px]">
          Good morning, Niral
        </h1>

        <p className="mt-2 text-sm leading-6 text-[#7b879b] sm:text-[15px]">
          Explore the market, track your investments, and make smarter
          decisions.
        </p>
      </div>

      {/* Explore Button */}
      <Link
        href="/dashboard/markets"
        className="inline-flex h-11 w-fit items-center justify-center gap-2 rounded-xl bg-[#00b887] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#00a477]"
      >
        Explore Markets
        <ArrowRight size={17} />
      </Link>
    </section>
  );
}
