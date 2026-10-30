import { Bell, Bot, Briefcase, ChartPie, Star, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "AI Trading Assistant",
    description:
      "Ask AI about stocks, market trends, and investment strategies instantly.",
    featured: true,
    accent: "ai",
  },
  {
    icon: TrendingUp,
    title: "Live Market",
    description:
      "Follow market prices across stocks, ETFs, mutual funds, gold, and more.",
    featured: false,
    accent: "market",
  },
  {
    icon: Star,
    title: "Watchlist",
    description:
      "Save your favorite investments and monitor them from one place.",
    featured: false,
    accent: "watchlist",
  },
  {
    icon: Briefcase,
    title: "Portfolio Management",
    description:
      "Track investments, returns, allocation, and overall portfolio performance.",
    featured: false,
    accent: "portfolio",
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    description:
      "Receive useful notifications for price movements and important market events.",
    featured: false,
    accent: "alerts",
  },
  {
    icon: ChartPie,
    title: "Advanced Analytics",
    description:
      "Understand investment performance through clear and interactive analytics.",
    featured: false,
    accent: "analytics",
  },
];

const accentStyles = {
  ai: {
    icon: "bg-[#00D09C] text-white",
    background: "bg-[#F1FFFA]",
  },
  market: {
    icon: "bg-[#EEF4FF] text-[#2962FF]",
    background: "bg-white",
  },
  watchlist: {
    icon: "bg-[#FFF8E7] text-[#D89B00]",
    background: "bg-white",
  },
  portfolio: {
    icon: "bg-[#F3EEFF] text-[#7C4DFF]",
    background: "bg-white",
  },
  alerts: {
    icon: "bg-[#FFF0F0] text-[#E53935]",
    background: "bg-white",
  },
  analytics: {
    icon: "bg-[#EAF8FF] text-[#0088CC]",
    background: "bg-white",
  },
} as const;

export default function Features() {
  return (
    <section
      id="features"
      aria-labelledby="features-title"
      className="relative overflow-hidden bg-[#F8FAFC]"
    >
      {/* =====================================================
          SECTION TRANSITION
      ====================================================== */}
      <div className="mx-auto max-w-300 px-4 pt-6 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <span className="h-px flex-1 bg-[#E4E7EC]" />

          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#98A2B3]">
            Platform
          </span>

          <span className="h-px flex-1 bg-[#E4E7EC]" />
        </div>
      </div>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}
      <div className="mx-auto max-w-300 px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        {/* Header */}
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#00D09C]/20 bg-[#E7FFF8] px-3.5 py-2 text-xs font-bold text-[#00B386]">
              PLATFORM FEATURES
            </span>

            <p className="mt-5 text-sm font-semibold text-[#98A2B3]">
              One platform.
              <br />
              Multiple ways to invest smarter.
            </p>
          </div>

          <div className="lg:text-right">
            <h2
              id="features-title"
              className="text-3xl font-bold tracking-tight text-[#101828] sm:text-4xl lg:text-5xl"
            >
              Everything you need to make better investment decisions.
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-7 text-[#667085] sm:ml-auto sm:text-lg sm:leading-8">
              From AI-powered assistance to portfolio analytics, AITradeX brings
              the tools you need into one intelligent investing experience.
            </p>
          </div>
        </div>

        {/* =====================================================
            FEATURE GRID
        ====================================================== */}
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const styles =
              accentStyles[feature.accent as keyof typeof accentStyles];

            if (feature.featured) {
              return (
                <article
                  key={feature.title}
                  className={`group relative overflow-hidden rounded-3xl border border-[#00D09C]/15 ${styles.background} p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(16,24,40,0.09)] sm:p-8 lg:col-span-2`}
                >
                  {/* Decorative background */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#00D09C]/10 blur-3xl transition-transform duration-700 group-hover:scale-125"
                  />

                  <div className="relative grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
                    <div>
                      <div
                        className={`flex h-14 w-14 items-center justify-center rounded-2xl ${styles.icon} shadow-sm`}
                      >
                        <Icon size={25} strokeWidth={2} />
                      </div>

                      <div className="mt-7">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#00B386]">
                            AI POWERED
                          </span>

                          <span className="h-px w-8 bg-[#00D09C]/40" />
                        </div>

                        <h3 className="mt-3 text-2xl font-bold tracking-tight text-[#101828] sm:text-3xl">
                          {feature.title}
                        </h3>

                        <p className="mt-4 max-w-lg text-sm leading-6 text-[#667085] sm:text-base sm:leading-7">
                          {feature.description}
                        </p>
                      </div>

                      <div className="mt-7 inline-flex items-center gap-2 text-xs font-bold text-[#00B386]">
                        Ask smarter questions
                        <span className="transition-transform duration-200 group-hover:translate-x-1">
                          →
                        </span>
                      </div>
                    </div>

                    {/* AI visual */}
                    <div className="relative hidden min-h-56 items-center justify-center lg:flex">
                      <div className="absolute h-48 w-48 rounded-full border border-[#00D09C]/10" />

                      <div className="absolute h-36 w-36 rounded-full border border-[#00D09C]/15" />

                      <div className="relative w-64 rounded-2xl border border-[#E4E7EC] bg-white p-4 shadow-[0_20px_40px_rgba(16,24,40,0.08)]">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E7FFF8] text-[#00B386]">
                            <Bot size={15} />
                          </div>

                          <div>
                            <p className="text-[10px] font-bold text-[#101828]">
                              AITradeX AI
                            </p>

                            <p className="text-[9px] text-[#98A2B3]">
                              Market assistant
                            </p>
                          </div>

                          <span className="ml-auto h-2 w-2 rounded-full bg-[#00D09C]" />
                        </div>

                        <div className="mt-4 rounded-xl bg-[#F8FAFC] p-3">
                          <p className="text-[9px] leading-4 text-[#667085]">
                            What is the current market sentiment?
                          </p>
                        </div>

                        <div className="mt-2 rounded-xl bg-[#E7FFF8] p-3">
                          <p className="text-[9px] font-medium leading-4 text-[#344054]">
                            Current signals indicate positive momentum across
                            selected sectors.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            }

            return (
              <article
                key={feature.title}
                className={`group relative overflow-hidden rounded-2xl border border-[#E4E7EC] ${styles.background} p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#00D09C]/25 hover:shadow-[0_16px_35px_rgba(16,24,40,0.08)]`}
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${styles.icon} transition-transform duration-300 group-hover:scale-105`}
                >
                  <Icon size={21} strokeWidth={2} />
                </div>

                <h3 className="mt-6 text-base font-bold tracking-tight text-[#101828] sm:text-lg">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#667085]">
                  {feature.description}
                </p>

                {/* Small section number */}
                <span className="absolute right-5 top-5 text-[10px] font-bold text-[#D0D5DD]">
                  0{index + 1}
                </span>

                {/* Bottom accent */}
                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#00D09C] transition-all duration-300 group-hover:w-full" />
              </article>
            );
          })}
        </div>

        {/* =====================================================
            BOTTOM TRUST STRIP
        ====================================================== */}
        <div className="mt-8 flex flex-col gap-4 border-t border-[#E4E7EC] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs font-medium text-[#98A2B3]">
            Designed for modern investors and learners.
          </p>

          <div className="flex flex-wrap items-center gap-5">
            {[
              "AI insights",
              "Live markets",
              "Portfolio tools",
              "Smart alerts",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 text-xs font-semibold text-[#667085]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#00D09C]" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
