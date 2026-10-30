import {
  BrainCircuit,
  ShieldCheck,
  Lightbulb,
  PieChart,
  ArrowUpRight,
} from "lucide-react";

const insights = [
  {
    title: "Portfolio diversification",
    description:
      "Your portfolio has significant banking exposure. Review other sectors to understand your concentration risk.",
    icon: ShieldCheck,
    tag: "Risk analysis",
    color: "bg-[#e9f8f2] text-[#00a878]",
  },
  {
    title: "Market momentum",
    description:
      "Current market indicators show positive momentum. Monitor your watchlist and review relevant market signals.",
    icon: Lightbulb,
    tag: "Market signal",
    color: "bg-[#fff7e6] text-[#c28a28]",
  },
  {
    title: "Asset allocation",
    description:
      "Review your equity allocation against your investment goals and personal risk preferences.",
    icon: PieChart,
    tag: "Portfolio analysis",
    color: "bg-[#eef2ff] text-[#6175d8]",
  },
];

export default function AIInsights() {
  return (
    <section className="rounded-2xl border border-[#e3eee8] bg-white p-5 shadow-[0_4px_18px_rgba(20,45,35,0.04)] sm:p-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e9f8f2] text-[#00a878]">
            <BrainCircuit size={21} />
          </div>

          <div>
            <h2 className="text-base font-bold text-[#17231d]">
              AITradeX Insights
            </h2>
            <p className="mt-0.5 text-xs text-[#718078]">
              AI-assisted observations about your portfolio and markets
            </p>
          </div>
        </div>

        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e9f8f2] px-3 py-1.5 text-xs font-semibold text-[#00a878]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#00a878]" />
          AI Insights
        </span>
      </div>

      {/* Insight Cards */}
      <div className="mt-5 grid grid-cols-1 gap-3 lg:grid-cols-3">
        {insights.map((insight) => {
          const Icon = insight.icon;

          return (
            <article
              key={insight.title}
              className="rounded-xl border border-[#edf1ee] bg-[#fcfdfc] p-4 transition-colors hover:border-[#cce9dc] hover:bg-[#fafffc]"
            >
              <div className="flex items-center justify-between gap-2">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${insight.color}`}
                >
                  <Icon size={18} />
                </div>

                <span className="rounded-full bg-[#f1f5f2] px-2.5 py-1 text-[10px] font-semibold text-[#718078]">
                  {insight.tag}
                </span>
              </div>

              <h3 className="mt-3 text-sm font-bold text-[#17231d]">
                {insight.title}
              </h3>

              <p className="mt-1.5 text-xs leading-5 text-[#718078]">
                {insight.description}
              </p>

              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-[#00a878]">
                View analysis
                <ArrowUpRight size={13} />
              </div>
            </article>
          );
        })}
      </div>

      {/* Disclaimer */}
      <p className="mt-4 border-t border-[#edf1ee] pt-3 text-[11px] leading-5 text-[#929d96]">
        Illustrative insights for UI demonstration. Actual AI-generated
        predictions and analysis will be connected through the backend. This
        content is not financial advice.
      </p>
    </section>
  );
}
