import {
  Brain,
  ChartNoAxesCombined,
  PieChart,
  ShieldCheck,
  Target,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Recommendations",
    description:
      "Receive intelligent market insights powered by Artificial Intelligence.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Live Market Data",
    description:
      "Monitor stocks, ETFs, mutual funds, and commodities with real-time market information.",
  },
  {
    icon: ShieldCheck,
    title: "Bank-Level Security",
    description:
      "Keep your account and investment data protected with modern security practices.",
  },
  {
    icon: Zap,
    title: "Fast Performance",
    description:
      "Experience a responsive platform designed with modern technologies and efficient architecture.",
  },
  {
    icon: PieChart,
    title: "Portfolio Analytics",
    description:
      "Understand your investment performance through simple and actionable analytics.",
  },
  {
    icon: Target,
    title: "Goal-Based Investing",
    description:
      "Plan and manage investments around your financial goals with intelligent assistance.",
  },
];

export default function Why() {
  return (
    <section aria-labelledby="why-aitradex-title" className="bg-white">
      <div className="mx-auto max-w-300 px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        {/* =====================================================
            SECTION HEADER
        ====================================================== */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#00D09C]/20 bg-[#E7FFF8] px-3.5 py-2 text-xs font-bold text-[#00B386]">
            WHY AITRADEX
          </span>

          <h2
            id="why-aitradex-title"
            className="mt-5 text-3xl font-bold tracking-tight text-[#101828] sm:text-4xl lg:text-5xl"
          >
            Everything you need to invest smarter
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[#667085] sm:text-lg sm:leading-8">
            AITradeX brings artificial intelligence, market intelligence, and
            modern investing tools together in one simple platform.
          </p>
        </div>

        {/* =====================================================
            FEATURE GRID
        ====================================================== */}
        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="group relative overflow-hidden rounded-2xl border border-[#E4E7EC] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#00D09C]/30 hover:shadow-[0_18px_40px_rgba(16,24,40,0.08)] sm:p-7"
              >
                {/* Subtle hover glow */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-[#00D09C]/5 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                />

                {/* Icon */}
                <div className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-[#00D09C]/15 bg-[#E7FFF8] text-[#00B386] transition-all duration-300 group-hover:scale-105 group-hover:bg-[#00D09C] group-hover:text-white">
                  <Icon size={22} strokeWidth={2} />
                </div>

                {/* Content */}
                <div className="relative mt-6">
                  <h3 className="text-base font-bold tracking-tight text-[#101828] sm:text-lg">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[#667085]">
                    {feature.description}
                  </p>
                </div>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#00D09C] transition-all duration-300 group-hover:w-full" />
              </article>
            );
          })}
        </div>

        {/* =====================================================
            BOTTOM HIGHLIGHT
        ====================================================== */}
        <div className="mx-auto mt-10 max-w-5xl rounded-2xl border border-[#00D09C]/15 bg-[#F4FFFB] p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#00B386] shadow-sm">
                <Brain size={18} />
              </div>

              <div>
                <h3 className="text-sm font-bold text-[#101828] sm:text-base">
                  Intelligence built into your investment journey
                </h3>

                <p className="mt-1 text-xs leading-5 text-[#667085] sm:text-sm">
                  Turn complex market information into clearer, more useful
                  insights.
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2 text-xs font-semibold text-[#00B386]">
              <span className="h-2 w-2 rounded-full bg-[#00D09C]" />
              AI-powered
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
