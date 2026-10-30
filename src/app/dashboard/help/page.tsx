"use client";

import { useState } from "react";
import {
  Search,
  CircleHelp,
  MessageCircle,
  Mail,
  BookOpen,
  ShieldCheck,
  Wallet,
  TrendingUp,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  Send,
  Headphones,
  FileText,
  CheckCircle2,
  Info,
} from "lucide-react";

const categories = [
  {
    title: "Getting Started",
    description: "Learn the basics of using AITradeX.",
    icon: BookOpen,
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Account & Security",
    description: "Account settings, profile and verification.",
    icon: ShieldCheck,
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "Wallet & Transactions",
    description: "Understand balances and transactions.",
    icon: Wallet,
    color: "bg-violet-50 text-violet-600",
  },
  {
    title: "Markets & Predictions",
    description: "Explore market information and AI insights.",
    icon: TrendingUp,
    color: "bg-orange-50 text-orange-600",
  },
];

const faqs = [
  {
    id: 1,
    category: "Getting Started",
    question: "What is AITradeX?",
    answer:
      "AITradeX is an AI-powered investment and stock market platform designed to help users explore market information, understand investment concepts, analyze stocks and learn through data-driven insights.",
  },
  {
    id: 2,
    category: "Getting Started",
    question: "How do I get started with AITradeX?",
    answer:
      "Create an account, complete your profile and explore the dashboard. You can visit Markets, Watchlist, News and other sections to understand the available platform features.",
  },
  {
    id: 3,
    category: "Account & Security",
    question: "How can I update my profile information?",
    answer:
      "Open the Profile section from the dashboard sidebar. Select Edit Profile, update the available fields and save your changes. Actual account updates will require backend integration.",
  },
  {
    id: 4,
    category: "Account & Security",
    question: "What is KYC verification?",
    answer:
      "KYC stands for Know Your Customer. It is an identity verification process used by financial services. AITradeX currently provides a frontend demonstration of the KYC checklist.",
  },
  {
    id: 5,
    category: "Wallet & Transactions",
    question: "How can I add money to my wallet?",
    answer:
      "Visit the Wallet page to explore the Add Money interface. Actual deposits and payment processing are not enabled in the current frontend demonstration.",
  },
  {
    id: 6,
    category: "Wallet & Transactions",
    question: "Are the displayed wallet transactions real?",
    answer:
      "No. The current wallet page uses sample transaction data for demonstration. Real transactions will require backend and payment integration.",
  },
  {
    id: 7,
    category: "Markets & Predictions",
    question: "Are stock prices displayed in real time?",
    answer:
      "The current dashboard uses illustrative sample market values. Live market prices will be available after the appropriate market data API integration.",
  },
  {
    id: 8,
    category: "Markets & Predictions",
    question: "How do AI stock predictions work?",
    answer:
      "The planned prediction feature will use market data and analytical models to generate insights. Predictions are estimates, not guaranteed outcomes or personalized financial advice.",
  },
];

const supportTopics = [
  "Account and Login",
  "KYC Verification",
  "Wallet and Transactions",
  "Market Data",
  "AI Predictions",
  "Technical Issue",
  "Other",
];

export default function HelpPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [openFaq, setOpenFaq] = useState<number | null>(1);
  const [showContactForm, setShowContactForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: "Account and Login",
    message: "",
  });

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      activeCategory === "All" || faq.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setShowContactForm(false);
  };

  return (
    <div className="mx-auto w-full max-w-312.5 space-y-7 pb-10">
      {/* Header */}
      <div>
        <div className="mb-2 flex items-center gap-2 text-xs text-[#94a3b8]">
          <span>Dashboard</span>
          <span>/</span>
          <span className="font-medium text-[#64748b]">Help Center</span>
        </div>

        <h1 className="text-3xl! font-bold! leading-tight! tracking-tight! text-[#172033]!">
          Help Center
        </h1>

        <p className="mt-2 text-sm text-[#64748b]">
          Find answers, explore guides and get help with AITradeX.
        </p>
      </div>

      {/* Hero Search */}
      <section className="relative overflow-hidden rounded-2xl bg-[#082d29] px-6 py-9 text-white sm:px-9 sm:py-11">
        <div className="relative z-10 max-w-2xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-[#b6f5df]">
            <CircleHelp size={14} />
            AITradeX Support
          </div>

          <h2 className="text-2xl font-bold leading-tight sm:text-3xl">
            How can we help you?
          </h2>

          <p className="mt-2 text-sm leading-6 text-white/65">
            Search our help articles and frequently asked questions to find the
            information you need.
          </p>

          <div className="mt-6 flex max-w-xl items-center gap-3 rounded-xl bg-white px-4 py-3">
            <Search size={19} className="shrink-0 text-[#94a3b8]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for help..."
              className="w-full bg-transparent text-sm text-[#172033] outline-none placeholder:text-[#94a3b8]"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="text-xs font-semibold text-[#64748b] hover:text-[#172033]"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        <div className="pointer-events-none absolute -right-12 -top-24 h-72 w-72 rounded-full border-35 border-[#00c896]/10" />
        <div className="pointer-events-none absolute -bottom-36 right-28 h-64 w-64 rounded-full bg-[#00c896]/10 blur-3xl" />
      </section>

      {/* Support Options */}
      <section>
        <div className="mb-4">
          <h2 className="text-lg font-bold text-[#172033]">
            Browse by category
          </h2>
          <p className="mt-1 text-sm text-[#64748b]">
            Find help for different parts of the platform.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <button
                key={category.title}
                type="button"
                onClick={() => {
                  setActiveCategory(category.title);
                  setOpenFaq(null);
                }}
                className="group rounded-2xl border border-[#e8edf2] bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-[#b9e9da] hover:shadow-md"
              >
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${category.color}`}
                >
                  <Icon size={21} />
                </div>

                <h3 className="mt-4 text-sm font-bold text-[#172033]">
                  {category.title}
                </h3>

                <p className="mt-2 text-xs leading-5 text-[#64748b]">
                  {category.description}
                </p>

                <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#00a77c]">
                  Explore articles
                  <ChevronRight
                    size={15}
                    className="transition group-hover:translate-x-1"
                  />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* FAQ */}
      <section className="rounded-2xl border border-[#e8edf2] bg-white p-5 shadow-sm sm:p-7">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-bold text-[#172033]">
              Frequently Asked Questions
            </h2>
            <p className="mt-1 text-sm text-[#64748b]">
              Answers to common questions about AITradeX.
            </p>
          </div>

          <span className="w-fit rounded-full bg-[#e8fbf5] px-3 py-1.5 text-xs font-semibold text-[#009b72]">
            {filteredFaqs.length} Articles
          </span>
        </div>

        {/* FAQ Filters */}
        <div className="scrollbar-hidden mt-6 flex gap-2 overflow-x-auto pb-2">
          {["All", ...categories.map((item) => item.title)].map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => {
                setActiveCategory(category);
                setOpenFaq(null);
              }}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition ${
                activeCategory === category
                  ? "bg-[#00c896] text-white"
                  : "border border-[#e2e8f0] bg-white text-[#64748b] hover:border-[#b9e9da]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="mt-4 divide-y divide-[#edf0f4]">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openFaq === faq.id;

              return (
                <div key={faq.id} className="py-4">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                    className="flex w-full items-center justify-between gap-4 text-left"
                  >
                    <div>
                      <span className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-[#00a77c]">
                        {faq.category}
                      </span>
                      <span className="text-sm font-semibold text-[#172033]">
                        {faq.question}
                      </span>
                    </div>

                    <ChevronDown
                      size={19}
                      className={`shrink-0 text-[#64748b] transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <p className="mt-3 max-w-3xl pr-6 text-sm leading-6 text-[#64748b]">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })
          ) : (
            <div className="py-12 text-center">
              <Search size={28} className="mx-auto text-[#cbd5e1]" />
              <p className="mt-3 text-sm font-semibold text-[#334155]">
                No matching articles found
              </p>
              <p className="mt-1 text-xs text-[#94a3b8]">
                Try another search term or category.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setActiveCategory("All");
                }}
                className="mt-4 text-xs font-semibold text-[#00a77c] hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Contact Support */}
      <section className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-[#e8edf2] bg-white p-6 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8fbf5] text-[#00a77c]">
            <MessageCircle size={21} />
          </div>

          <h3 className="mt-4 text-base font-bold text-[#172033]">
            Still need help?
          </h3>

          <p className="mt-2 text-sm leading-6 text-[#64748b]">
            Tell us what you&apos;re experiencing. You can prepare a support
            request using the form.
          </p>

          <button
            type="button"
            onClick={() => {
              setShowContactForm(true);
              setSubmitted(false);
            }}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#00c896] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#00b386]"
          >
            Contact Support
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="rounded-2xl border border-[#e8edf2] bg-white p-6 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Headphones size={21} />
          </div>

          <h3 className="mt-4 text-base font-bold text-[#172033]">
            Support resources
          </h3>

          <p className="mt-2 text-sm leading-6 text-[#64748b]">
            Explore platform information and learn about the features available
            in AITradeX.
          </p>

          <div className="mt-5 space-y-3">
            <div className="flex items-center gap-3 text-sm text-[#475569]">
              <FileText size={17} className="text-[#00a77c]" />
              Platform documentation
              <span className="ml-auto text-xs text-[#94a3b8]">
                Coming soon
              </span>
            </div>

            <div className="flex items-center gap-3 text-sm text-[#475569]">
              <Mail size={17} className="text-[#00a77c]" />
              Email support
              <span className="ml-auto text-xs text-[#94a3b8]">
                Coming soon
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      {showContactForm && (
        <div className="rounded-2xl border border-[#e8edf2] bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-6 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-[#172033]">
                Submit a Support Request
              </h2>
              <p className="mt-1 text-sm text-[#64748b]">
                Fill in the details below.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowContactForm(false)}
              className="rounded-lg border border-[#e2e8f0] px-3 py-2 text-xs font-semibold text-[#64748b] hover:bg-[#f8fafc]"
            >
              Close
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-[#334155]">
                  Your Name
                </label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Enter your name"
                  className="mt-2 w-full rounded-xl border border-[#e2e8f0] px-4 py-3 text-sm outline-none focus:border-[#00c896]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#334155]">
                  Email Address
                </label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Enter your email"
                  className="mt-2 w-full rounded-xl border border-[#e2e8f0] px-4 py-3 text-sm outline-none focus:border-[#00c896]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#334155]">
                Support Topic
              </label>
              <select
                value={form.topic}
                onChange={(e) => setForm({ ...form, topic: e.target.value })}
                className="mt-2 w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm outline-none focus:border-[#00c896]"
              >
                {supportTopics.map((topic) => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#334155]">
                Describe your issue
              </label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Explain how we can help..."
                className="mt-2 w-full resize-y rounded-xl border border-[#e2e8f0] px-4 py-3 text-sm outline-none focus:border-[#00c896]"
              />
            </div>

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setShowContactForm(false)}
                className="rounded-xl border border-[#e2e8f0] px-5 py-3 text-sm font-semibold text-[#475569] hover:bg-[#f8fafc]"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#00c896] px-5 py-3 text-sm font-semibold text-white hover:bg-[#00b386]"
              >
                <Send size={16} />
                Submit Request
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Submitted Message */}
      {submitted && (
        <div className="flex items-start gap-3 rounded-xl border border-[#b8edda] bg-[#f0fdf7] p-4">
          <CheckCircle2 size={20} className="mt-0.5 text-[#00a77c]" />
          <div>
            <p className="text-sm font-semibold text-[#087b59]">
              Support request prepared successfully
            </p>
            <p className="mt-1 text-xs leading-5 text-[#15805e]">
              This is a frontend demonstration. Your request has not been sent
              to a support team because backend integration is not connected.
            </p>
          </div>
        </div>
      )}

      {/* Demo Notice */}
      <div className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4">
        <Info size={18} className="mt-0.5 shrink-0 text-blue-600" />
        <p className="text-xs leading-5 text-blue-800">
          AITradeX Help Center currently uses demonstration FAQ content. Support
          ticket submission, email communication and live support services will
          require backend integration.
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-center gap-2 pt-2 text-xs text-[#94a3b8]">
        <CircleHelp size={15} />
        AITradeX Help Center
      </div>
    </div>
  );
}
