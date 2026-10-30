"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Check,
  MessageSquare,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const capabilities = [
  "AI-powered stock analysis",
  "Portfolio insights",
  "Market trend intelligence",
  "Educational investment guidance",
];

export default function AI() {
  return (
    <section
      id="ai-assistant"
      aria-labelledby="ai-title"
      className="relative overflow-hidden bg-[#F8FAFC]"
    >
      {/* =====================================================
          SECTION TRANSITION
      ====================================================== */}
      <div className="mx-auto max-w-300 px-4 pt-6 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <span className="h-px flex-1 bg-[#E4E7EC]" />

          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#98A2B3]">
            AI Intelligence
          </span>

          <span className="h-px flex-1 bg-[#E4E7EC]" />
        </div>
      </div>

      {/* =====================================================
          BACKGROUND
      ====================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-45 top-20 h-100 w-100 rounded-full bg-[#00D09C]/5 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-37.5 left-30 h-80 w-80 rounded-full bg-[#00D09C]/5 blur-3xl"
      />

      {/* =====================================================
          CONTENT
      ====================================================== */}
      <div className="relative mx-auto max-w-300 px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          {/* =================================================
              LEFT CONTENT
          ================================================== */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#00D09C]/20 bg-[#E7FFF8] px-3.5 py-2 text-xs font-bold text-[#00B386]">
              <Sparkles size={14} />
              AI POWERED
            </span>

            <h2
              id="ai-title"
              className="mt-6 text-3xl font-bold leading-tight tracking-tight text-[#101828] sm:text-4xl lg:text-5xl"
            >
              Your personal AI investment assistant.
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-[#667085] sm:text-lg sm:leading-8">
              Turn complex market information into clearer insights. Ask
              questions, explore market trends, and understand your portfolio
              with AITradeX.
            </p>

            {/* Capabilities */}
            <ul className="mt-7 space-y-3">
              {capabilities.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-sm font-medium text-[#344054]"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E7FFF8] text-[#00B386]">
                    <Check size={13} strokeWidth={3} />
                  </span>

                  {item}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button
              type="button"
              className="group mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#00D09C] px-6 text-sm font-bold text-white shadow-[0_12px_30px_rgba(0,208,156,0.20)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#00B987] hover:shadow-[0_16px_35px_rgba(0,208,156,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D09C]/40 focus-visible:ring-offset-2"
            >
              Try AI Assistant
              <ArrowRight
                size={17}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </button>

            <p className="mt-3 text-[11px] text-[#98A2B3]">
              AI insights are for educational purposes and are not financial
              advice.
            </p>
          </div>

          {/* =================================================
              AI ASSISTANT VISUAL
          ================================================== */}
          <div className="relative">
            {/* Decorative rings */}
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-105 w-105 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#00D09C]/10"
            />

            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#00D09C]/10"
            />

            {/* Floating AI indicator */}
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -left-2 top-10 z-20 hidden rounded-2xl border border-[#E4E7EC] bg-white p-3 shadow-[0_14px_35px_rgba(16,24,40,0.10)] sm:block lg:-left-8"
            >
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#E7FFF8] text-[#00B386]">
                  <Sparkles size={15} />
                </span>

                {/* <div>
                  <p className="text-[9px] font-bold text-[#101828]">
                    AI Signal
                  </p>

                  <p className="text-[9px] text-[#00B386]">Positive momentum</p>
                </div> */}
              </div>
            </motion.div>

            {/* Floating market indicator */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -right-2 bottom-12 z-20 hidden rounded-2xl border border-[#E4E7EC] bg-white p-3 shadow-[0_14px_35px_rgba(16,24,40,0.10)] sm:block lg:-right-8"
            >
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#E7FFF8] text-[#00B386]">
                  <TrendingUp size={15} />
                </span>

                <div>
                  <p className="text-[9px] font-bold text-[#101828]">
                    Market trend
                  </p>

                  <p className="text-[9px] text-[#00B386]">Bullish · 82%</p>
                </div>
              </div>
            </motion.div>

            {/* =================================================
                CHAT CARD
            ================================================== */}
            <div className="relative z-10 mx-auto max-w-125 overflow-hidden rounded-3xl border border-[#DDE3EA] bg-white shadow-[0_25px_70px_rgba(16,24,40,0.10)]">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#EAECF0] px-5 py-4 sm:px-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00D09C] text-white shadow-sm">
                    <Bot size={19} />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-[#101828]">
                      AITradeX Assistant
                    </p>

                    <div className="mt-0.5 flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#00D09C]" />

                      <span className="text-[10px] text-[#98A2B3]">Online</span>
                    </div>
                  </div>
                </div>

                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F8FAFC] text-[#98A2B3]">
                  <MessageSquare size={15} />
                </div>
              </div>

              {/* Chat */}
              <div className="space-y-5 p-5 sm:p-6">
                {/* User message */}
                <div className="flex justify-end">
                  <div className="max-w-[82%] rounded-2xl rounded-br-md bg-[#EEF4FF] px-4 py-3">
                    <p className="text-xs font-medium leading-5 text-[#344054] sm:text-sm">
                      Should I buy TCS today?
                    </p>
                  </div>
                </div>

                {/* AI message */}
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#E7FFF8] text-[#00B386]">
                    <Sparkles size={14} />
                  </div>

                  <div className="rounded-2xl rounded-tl-md bg-[#F8FAFC] px-4 py-4">
                    <p className="text-xs leading-6 text-[#475467] sm:text-sm sm:leading-7">
                      TCS continues to show stable fundamentals and revenue
                      growth. Current market signals indicate positive momentum,
                      but your decision should consider your goals, risk
                      profile, and independent research.
                    </p>
                  </div>
                </div>

                {/* AI insight */}
                <div className="rounded-2xl border border-[#00D09C]/15 bg-[#F3FFFB] p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-[#00B386] shadow-sm">
                        <TrendingUp size={14} />
                      </span>

                      <span className="text-xs font-bold text-[#344054]">
                        AI Confidence
                      </span>
                    </div>

                    <span className="text-sm font-bold text-[#00B386]">
                      91%
                    </span>
                  </div>

                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#DDF5ED]">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "91%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="h-full rounded-full bg-[#00D09C]"
                    />
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-[#EAECF0] bg-[#FCFCFD] px-5 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#E7FFF8] text-[#00B386]">
                      <Bot size={13} />
                    </div>

                    <span className="text-[10px] font-medium text-[#667085]">
                      AI-powered market intelligence
                    </span>
                  </div>

                  <span className="text-[10px] font-semibold text-[#98A2B3]">
                    AITradeX
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
