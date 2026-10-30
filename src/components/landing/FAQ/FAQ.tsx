"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqData = [
  {
    question: "What is AITradeX?",
    answer:
      "AITradeX is an AI-powered investment platform designed to help users learn about markets, monitor investments, and access intelligent market insights through web and mobile applications.",
  },
  {
    question: "Is my personal data secure?",
    answer:
      "Yes. AITradeX uses secure authentication, encrypted communication, and modern backend technologies to help protect your personal information.",
  },
  {
    question: "Can I invest in Stocks, ETFs, and Mutual Funds?",
    answer:
      "Yes. AITradeX is designed to support multiple investment categories including Stocks, ETFs, Mutual Funds, SIPs, Gold, Commodities, and IPOs.",
  },
  {
    question: "Does AITradeX provide AI investment suggestions?",
    answer:
      "AITradeX provides AI-generated insights and educational analysis to help users make informed decisions. Users should always conduct their own research before investing.",
  },
  {
    question: "Is there a mobile application?",
    answer:
      "Yes. AITradeX includes a Flutter-based mobile application along with a Next.js website for a seamless experience across devices.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative overflow-hidden bg-white"
    >
      {/* =====================================================
          SECTION TRANSITION
      ====================================================== */}
      <div className="mx-auto max-w-300 px-4 pt-6 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <span className="h-px flex-1 bg-[#E4E7EC]" />

          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#98A2B3]">
            FAQ
          </span>

          <span className="h-px flex-1 bg-[#E4E7EC]" />
        </div>
      </div>

      {/* =====================================================
          CONTENT
      ====================================================== */}
      <div className="mx-auto max-w-300 px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          {/* =================================================
              LEFT INTRO
          ================================================== */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#00D09C]/20 bg-[#E7FFF8] px-3.5 py-2 text-xs font-bold text-[#00B386]">
              <HelpCircle size={14} />
              HAVE QUESTIONS?
            </span>

            <h2
              id="faq-title"
              className="mt-5 text-3xl font-bold tracking-tight text-[#101828] sm:text-4xl lg:text-5xl"
            >
              Frequently asked questions.
            </h2>

            <p className="mt-5 max-w-md text-base leading-7 text-[#667085] sm:text-lg sm:leading-8">
              Everything you need to know about AITradeX, its features, and how
              the platform is designed to support your investment journey.
            </p>

            <div className="mt-8 hidden border-l-2 border-[#00D09C]/20 pl-5 lg:block">
              <p className="text-sm font-semibold leading-6 text-[#344054]">
                Still have questions?
              </p>

              <p className="mt-1 text-xs leading-5 text-[#98A2B3]">
                We&apos;ll continue expanding the AITradeX knowledge base as the
                platform grows.
              </p>
            </div>
          </div>

          {/* =================================================
              ACCORDION
          ================================================== */}
          <div className="space-y-3">
            {faqData.map((item, index) => {
              const isOpen = openIndex === index;
              const questionId = `faq-question-${index}`;
              const answerId = `faq-answer-${index}`;

              return (
                <div
                  key={item.question}
                  className={
                    isOpen
                      ? "overflow-hidden rounded-2xl border border-[#00D09C]/25 bg-[#F8FFFC] shadow-sm transition-all duration-300"
                      : "overflow-hidden rounded-2xl border border-[#E4E7EC] bg-white transition-all duration-300 hover:border-[#00D09C]/20 hover:shadow-sm"
                  }
                >
                  <button
                    id={questionId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => toggleFAQ(index)}
                    className="group flex w-full items-center gap-4 px-5 py-5 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D09C]/40 focus-visible:ring-inset sm:px-6 sm:py-6"
                  >
                    {/* Number */}
                    <span
                      className={
                        isOpen
                          ? "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#00D09C] text-[10px] font-bold text-white transition-colors duration-200"
                          : "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F2F4F7] text-[10px] font-bold text-[#98A2B3] transition-colors duration-200 group-hover:bg-[#E7FFF8] group-hover:text-[#00B386]"
                      }
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* Question */}
                    <span className="flex-1 text-sm font-bold leading-6 text-[#101828] sm:text-base">
                      {item.question}
                    </span>

                    {/* Icon */}
                    <span
                      className={
                        isOpen
                          ? "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E7FFF8] text-[#00B386] transition-transform duration-300"
                          : "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F2F4F7] text-[#667085] transition-transform duration-300 group-hover:bg-[#E7FFF8] group-hover:text-[#00B386]"
                      }
                    >
                      <ChevronDown
                        size={16}
                        className={
                          isOpen
                            ? "rotate-180 transition-transform duration-300"
                            : "transition-transform duration-300"
                        }
                      />
                    </span>
                  </button>

                  {/* Answer */}
                  <div
                    id={answerId}
                    role="region"
                    aria-labelledby={questionId}
                    className={
                      isOpen
                        ? "grid grid-rows-[1fr] transition-[grid-template-rows] duration-300"
                        : "grid grid-rows-[0fr] transition-[grid-template-rows] duration-300"
                    }
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 pb-6 pl-header pr-5 sm:px-6 sm:pb-7 sm:pl-20">
                        <div className="border-l border-[#00D09C]/20 pl-4">
                          <p className="text-sm leading-7 text-[#667085] sm:text-[15px]">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Active accent */}
                  <div
                    className={
                      isOpen
                        ? "h-0.5 w-full bg-[#00D09C] transition-all duration-300"
                        : "h-0.5 w-0 bg-[#00D09C] transition-all duration-300"
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
