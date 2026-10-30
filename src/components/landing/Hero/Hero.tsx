"use client";

import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  Check,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";

const marketTicker = [
  {
    name: "NIFTY 50",
    value: "24,850.30",
    change: "+1.24%",
  },
  {
    name: "SENSEX",
    value: "81,320.50",
    change: "+0.82%",
  },
  {
    name: "BANK NIFTY",
    value: "56,420.15",
    change: "+1.61%",
  },
  {
    name: "NIFTY IT",
    value: "41,280.45",
    change: "+1.42%",
  },
  {
    name: "GOLD",
    value: "₹7,420",
    change: "+0.54%",
  },
];

const portfolioItems = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    value: "$214.36",
    change: "+8.42%",
  },
  {
    symbol: "RELIANCE",
    name: "Reliance Industries",
    value: "₹1,462.80",
    change: "+6.18%",
  },
  {
    symbol: "NIFTY",
    name: "NIFTY 50",
    value: "24,850.30",
    change: "+4.92%",
  },
];

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-white">
      {/* =====================================================
          BACKGROUND
      ====================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute left-1/2 -top-sidebar h-155 w-225 -translate-x-1/2 rounded-full bg-[#00D09C]/6 blur-3xl" />

        <div className="absolute bottom-55 left-1/2 h-125 w-225 -translate-x-1/2 rounded-full bg-[#00D09C]/5 blur-3xl" />

        <div className="absolute inset-x-0 top-0 h-125 bg-[radial-gradient(circle_at_center,rgba(0,208,156,0.07),transparent_60%)]" />
      </div>

      {/* =====================================================
          MARKET TICKER
      ====================================================== */}
      <div className="border-b border-[#EAECF0] bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1280px] items-center gap-6 overflow-hidden px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex shrink-0 items-center gap-2 text-xs font-semibold text-[#667085]">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#00D09C]" />
            Live Markets
          </div>

          <div className="flex min-w-max items-center gap-7">
            {marketTicker.map((market) => (
              <div
                key={market.name}
                className="flex items-center gap-2 whitespace-nowrap text-xs"
              >
                <span className="font-semibold text-[#344054]">
                  {market.name}
                </span>

                <span className="text-[#667085]">{market.value}</span>

                <span className="font-semibold text-[#00B386]">
                  ↑ {market.change}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* =====================================================
          HERO CONTENT
      ====================================================== */}
      <div className="mx-auto flex max-w-300 flex-col items-center px-4 pb-0 pt-16 text-center sm:px-6 sm:pt-20 lg:px-8 lg:pt-24">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-[#00D09C]/20 bg-[#E7FFF8] px-4 py-2 text-xs font-semibold text-[#00B386] sm:text-sm"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#00B386] shadow-sm">
            <Sparkles size={14} />
          </span>
          AI-Powered Investment Platform
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.08 }}
          className="mt-7 max-w-4xl text-4xl font-bold leading-[1.04] tracking-tighter text-[#101828] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[78px]"
        >
          Invest smarter.
          <br />
          <span className="text-[#00D09C]">Grow with AITradeX.</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.16 }}
          className="mt-6 max-w-2xl text-base leading-7 text-[#667085] sm:text-lg sm:leading-8"
        >
          Make smarter investment decisions with AI-powered market intelligence,
          real-time data, and personalized insights across stocks, mutual funds,
          ETFs, gold, and more.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.24 }}
          className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
        >
          <Link
            href="/auth/signup"
            className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#00D09C] px-7 text-sm font-bold text-white shadow-[0_12px_30px_rgba(0,208,156,0.22)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#00B987] hover:shadow-[0_16px_35px_rgba(0,208,156,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D09C]/40 focus-visible:ring-offset-2 sm:w-auto"
          >
            Start Investing
            <ArrowRight
              size={17}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>

          <Link
            href="/markets"
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#D0D5DD] bg-white px-7 text-sm font-bold text-[#1D2939] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#00D09C]/40 hover:bg-[#F8FFFC] hover:text-[#00B386] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D09C]/30 focus-visible:ring-offset-2 sm:w-auto"
          >
            <BarChart3 size={17} />
            Explore Markets
          </Link>
        </motion.div>

        {/* Trust */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.38 }}
          className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-3"
        >
          <div className="flex items-center gap-1 text-warning">
            {Array.from({ length: 5 }).map((_, index) => (
              <span key={index} className="text-sm">
                ★
              </span>
            ))}
          </div>

          <div className="hidden h-5 w-px bg-[#E4E7EC] sm:block" />

          <div className="flex items-center gap-2 text-xs text-[#667085] sm:text-sm">
            <ShieldCheck size={16} className="text-[#00B386]" />

            <span>
              Trusted by{" "}
              <strong className="font-semibold text-[#344054]">10,000+</strong>{" "}
              investors
            </span>
          </div>
        </motion.div>
      </div>

      {/* =====================================================
          LARGE AI TRADEX VISUAL
      ====================================================== */}
      <div className="relative mx-auto mt-14 w-full max-w-[1280px] px-3 sm:mt-16 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative"
        >
          {/* Large glow */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 h-120 w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00D09C]/8 blur-3xl"
          />

          {/* Main visual */}
          <div className="relative overflow-hidden rounded-t-[28px] border border-[#E4E7EC] bg-[#F8FAFC] shadow-[0_-10px_70px_rgba(16,24,40,0.08)] sm:rounded-t-[36px]">
            {/* Browser-style header */}
            <div className="flex h-12 items-center justify-between border-b border-[#E4E7EC] bg-white px-4 sm:h-14 sm:px-6">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#FF6B6B]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#F5C451]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#00D09C]" />
              </div>

              <div className="hidden items-center gap-2 rounded-full border border-[#EAECF0] bg-[#FCFCFD] px-3 py-1.5 text-[10px] font-medium text-[#667085] sm:flex">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#00D09C]" />
                AITradeX Market Intelligence
              </div>

              <div className="h-7 w-20 rounded-lg bg-[#F2F4F7] sm:w-24" />
            </div>

            {/* Dashboard body */}
            <div className="p-4 sm:p-7 lg:p-10">
              {/* Dashboard top row */}
              <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
                {/* Chart */}
                <div className="rounded-2xl border border-[#E4E7EC] bg-white p-4 shadow-sm sm:p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-medium text-[#98A2B3]">
                        Portfolio overview
                      </p>

                      <div className="mt-1 flex flex-wrap items-baseline gap-2">
                        <span className="text-2xl font-bold tracking-tight text-[#101828] sm:text-3xl">
                          ₹5,42,860
                        </span>

                        <span className="rounded-full bg-[#E7FFF8] px-2 py-1 text-[10px] font-bold text-[#00B386]">
                          +12.84%
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 rounded-lg bg-[#F2F4F7] p-1">
                      {["1D", "1W", "1M", "1Y"].map((period, index) => (
                        <span
                          key={period}
                          className={
                            index === 2
                              ? "rounded-md bg-white px-2 py-1 text-[9px] font-bold text-[#00B386] shadow-sm"
                              : "px-2 py-1 text-[9px] font-semibold text-[#98A2B3]"
                          }
                        >
                          {period}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Chart */}
                  <div className="relative mt-6 h-52 overflow-hidden sm:h-64">
                    <div className="absolute inset-0 flex flex-col justify-between">
                      {[1, 2, 3, 4, 5].map((line) => (
                        <span
                          key={line}
                          className="border-t border-[#F2F4F7]"
                        />
                      ))}
                    </div>

                    <svg
                      viewBox="0 0 800 260"
                      preserveAspectRatio="none"
                      className="absolute inset-0 h-full w-full"
                      role="img"
                      aria-label="AITradeX portfolio performance"
                    >
                      <defs>
                        <linearGradient
                          id="heroPortfolioFill"
                          x1="0"
                          x2="0"
                          y1="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#00D09C"
                            stopOpacity="0.25"
                          />

                          <stop
                            offset="100%"
                            stopColor="#00D09C"
                            stopOpacity="0"
                          />
                        </linearGradient>
                      </defs>

                      <path
                        d="M0 220 C55 215, 70 202, 120 205 S175 178, 220 184 S275 150, 320 160 S370 130, 420 140 S470 105, 515 116 S570 82, 620 95 S675 55, 720 67 S765 40, 800 20 V260 H0 Z"
                        fill="url(#heroPortfolioFill)"
                      />

                      <path
                        d="M0 220 C55 215, 70 202, 120 205 S175 178, 220 184 S275 150, 320 160 S370 130, 420 140 S470 105, 515 116 S570 82, 620 95 S675 55, 720 67 S765 40, 800 20"
                        fill="none"
                        stroke="#00D09C"
                        strokeWidth="5"
                        strokeLinecap="round"
                      />

                      <circle cx="800" cy="20" r="7" fill="#00D09C" />

                      <circle
                        cx="800"
                        cy="20"
                        r="13"
                        fill="#00D09C"
                        fillOpacity="0.12"
                      />
                    </svg>

                    {/* AI signal */}
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{
                        duration: 3.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute right-[8%] top-[10%] hidden rounded-xl border border-[#00D09C]/20 bg-white p-3 shadow-lg sm:block"
                    >
                      <div className="flex items-center gap-2">
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#E7FFF8] text-[#00B386]">
                          <BrainCircuit size={14} />
                        </span>

                        <div>
                          <p className="text-[9px] font-medium text-[#98A2B3]">
                            AI Signal
                          </p>

                          <p className="text-[10px] font-bold text-[#101828]">
                            Positive momentum
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Chart footer */}
                  <div className="flex items-center justify-between border-t border-[#F2F4F7] pt-4">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#00D09C]" />
                      <span className="text-[10px] font-medium text-[#667085]">
                        Portfolio
                      </span>
                    </div>

                    <span className="text-[10px] font-semibold text-[#00B386]">
                      +₹61,820 this month
                    </span>
                  </div>
                </div>

                {/* Right information panel */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                  {/* Market sentiment */}
                  <div className="rounded-2xl border border-[#E4E7EC] bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold text-[#344054]">
                        Market sentiment
                      </p>

                      <span className="rounded-full bg-[#E7FFF8] px-2 py-1 text-[9px] font-bold text-[#00B386]">
                        LIVE
                      </span>
                    </div>

                    <div className="mt-5 flex items-end justify-between">
                      <div>
                        <p className="text-2xl font-bold text-[#101828]">
                          Positive
                        </p>

                        <p className="mt-1 text-[10px] text-[#98A2B3]">
                          AI confidence
                        </p>
                      </div>

                      <div className="relative h-16 w-16">
                        <svg
                          viewBox="0 0 64 64"
                          className="h-full w-full -rotate-90"
                        >
                          <circle
                            cx="32"
                            cy="32"
                            r="26"
                            fill="none"
                            stroke="#E7FFF8"
                            strokeWidth="7"
                          />

                          <circle
                            cx="32"
                            cy="32"
                            r="26"
                            fill="none"
                            stroke="#00D09C"
                            strokeWidth="7"
                            strokeLinecap="round"
                            strokeDasharray="163"
                            strokeDashoffset="29"
                          />
                        </svg>

                        <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-[#00B386]">
                          82%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* AI insight */}
                  <div className="rounded-2xl border border-[#00D09C]/15 bg-[#F3FFFB] p-5">
                    <div className="flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-[#00B386] shadow-sm">
                        <Sparkles size={15} />
                      </span>

                      <p className="text-xs font-bold text-[#344054]">
                        AI Market Insight
                      </p>
                    </div>

                    <p className="mt-4 text-sm font-semibold leading-5 text-[#101828]">
                      Strong momentum detected across selected sectors.
                    </p>

                    <p className="mt-2 text-[10px] leading-4 text-[#667085]">
                      AITradeX analyzes market movements to surface useful
                      signals and investment insights.
                    </p>

                    <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-[#00B386]">
                      <TrendingUp size={13} />
                      Bullish signal
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom market cards */}
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {portfolioItems.map((item, index) => (
                  <motion.div
                    key={item.symbol}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.45,
                      delay: 0.55 + index * 0.08,
                    }}
                    className="flex items-center justify-between rounded-2xl border border-[#E4E7EC] bg-white p-4 shadow-sm transition-transform duration-200 hover:-translate-y-1"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F2F4F7] text-[10px] font-bold text-[#344054]">
                        {item.symbol.slice(0, 2)}
                      </div>

                      <div>
                        <p className="text-xs font-bold text-[#101828]">
                          {item.symbol}
                        </p>

                        <p className="mt-0.5 max-w-30 truncate text-[9px] text-[#98A2B3]">
                          {item.name}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-xs font-bold text-[#344054]">
                        {item.value}
                      </p>

                      <p className="mt-1 text-[10px] font-bold text-[#00B386]">
                        {item.change}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Feature strip */}
              <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-[#E4E7EC] pt-5">
                {[
                  "AI-powered insights",
                  "Real-time market data",
                  "Secure platform",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-[10px] font-medium text-[#667085]"
                  >
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#E7FFF8] text-[#00B386]">
                      <Check size={9} strokeWidth={3} />
                    </span>

                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div
        aria-hidden="true"
        className="h-20 bg-linear-to-b from-white to-[#F8FFFC]"
      />
    </section>
  );
}