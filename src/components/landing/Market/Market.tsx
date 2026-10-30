import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  CircleDollarSign,
  Coins,
  TrendingUp,
} from "lucide-react";

const marketData = [
  {
    name: "NIFTY 50",
    label: "Indian Equities",
    price: "25,145.20",
    change: "+152.60",
    percentage: "+0.61%",
    positive: true,
    icon: BarChart3,
  },
  {
    name: "SENSEX",
    label: "Indian Equities",
    price: "82,310.55",
    change: "+231.20",
    percentage: "+0.28%",
    positive: true,
    icon: TrendingUp,
  },
  {
    name: "BANK NIFTY",
    label: "Banking Index",
    price: "56,120.80",
    change: "-52.10",
    percentage: "-0.09%",
    positive: false,
    icon: BarChart3,
  },
  {
    name: "GOLD",
    label: "Commodity",
    price: "₹99,200",
    change: "+0.42%",
    percentage: "+0.42%",
    positive: true,
    icon: Coins,
  },
  {
    name: "BITCOIN",
    label: "Digital Asset",
    price: "₹98,45,000",
    change: "+2.18%",
    percentage: "+2.18%",
    positive: true,
    icon: CircleDollarSign,
  },
  {
    name: "USD / INR",
    label: "Currency",
    price: "87.32",
    change: "-0.08%",
    percentage: "-0.08%",
    positive: false,
    icon: CircleDollarSign,
  },
];

export default function Market() {
  return (
    <section
      id="markets"
      aria-labelledby="market-overview-title"
      className="bg-[#F8FAFC]"
    >
      <div className="mx-auto max-w-300 px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        {/* =====================================================
            SECTION HEADER
        ====================================================== */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00D09C]/20 bg-[#E7FFF8] px-3.5 py-2 text-xs font-bold text-[#00B386]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#00D09C]" />
            LIVE MARKET DATA
          </div>

          <h2
            id="market-overview-title"
            className="mt-5 text-3xl font-bold tracking-tight text-[#101828] sm:text-4xl lg:text-5xl"
          >
            Understand the market at a glance
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[#667085] sm:text-lg sm:leading-8">
            Track key indices, commodities, currencies, and digital assets from
            one simple market overview.
          </p>
        </div>

        {/* =====================================================
            MARKET STATUS
        ====================================================== */}
        <div className="mx-auto mt-10 flex max-w-5xl flex-col items-center justify-between gap-4 rounded-2xl border border-[#E4E7EC] bg-white px-5 py-4 shadow-sm sm:flex-row sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E7FFF8] text-[#00B386]">
              <TrendingUp size={18} />
            </div>

            <div className="text-left">
              <p className="text-sm font-bold text-[#101828]">
                Market overview
              </p>

              <p className="mt-0.5 text-xs text-[#98A2B3]">
                Updated with the latest available market indicators
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-[#F2F4F7] px-3 py-1.5">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#00D09C]" />

            <span className="text-xs font-semibold text-[#667085]">
              Markets active
            </span>
          </div>
        </div>

        {/* =====================================================
            MARKET GRID
        ====================================================== */}
        <div className="mx-auto mt-6 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {marketData.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.name}
                className="group relative overflow-hidden rounded-2xl border border-[#E4E7EC] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#00D09C]/30 hover:shadow-[0_16px_35px_rgba(16,24,40,0.08)] sm:p-6"
              >
                {/* Hover glow */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#00D09C]/5 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                />

                {/* Card header */}
                <div className="relative flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={
                        item.positive
                          ? "flex h-10 w-10 items-center justify-center rounded-xl bg-[#E7FFF8] text-[#00B386]"
                          : "flex h-10 w-10 items-center justify-center rounded-xl bg-[#FEF3F2] text-[#E53935]"
                      }
                    >
                      <Icon size={18} />
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-[#101828]">
                        {item.name}
                      </h3>

                      <p className="mt-0.5 text-[10px] font-medium text-[#98A2B3]">
                        {item.label}
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-semibold text-[#98A2B3]">
                    LIVE
                  </span>
                </div>

                {/* Price */}
                <div className="relative mt-7">
                  <p className="text-2xl font-bold tracking-tight text-[#101828] sm:text-3xl">
                    {item.price}
                  </p>

                  <div className="mt-2 flex items-center gap-2">
                    <span
                      className={
                        item.positive
                          ? "inline-flex items-center gap-1 rounded-full bg-[#E7FFF8] px-2 py-1 text-[10px] font-bold text-[#00B386]"
                          : "inline-flex items-center gap-1 rounded-full bg-[#FEF3F2] px-2 py-1 text-[10px] font-bold text-[#E53935]"
                      }
                    >
                      {item.positive ? (
                        <ArrowUpRight size={11} />
                      ) : (
                        <ArrowDownRight size={11} />
                      )}

                      {item.change}
                    </span>

                    <span
                      className={
                        item.positive
                          ? "text-[10px] font-semibold text-[#00B386]"
                          : "text-[10px] font-semibold text-[#E53935]"
                      }
                    >
                      {item.percentage}
                    </span>
                  </div>
                </div>

                {/* Mini chart */}
                <div className="relative mt-6 h-12 overflow-hidden">
                  <svg
                    viewBox="0 0 240 48"
                    preserveAspectRatio="none"
                    className="h-full w-full"
                    aria-hidden="true"
                  >
                    <path
                      d={
                        item.positive
                          ? "M0 38 C25 35, 30 37, 50 29 S75 34, 95 24 S125 28, 145 18 S175 22, 195 10 S220 15, 240 5"
                          : "M0 10 C25 8, 30 14, 50 12 S75 18, 95 16 S125 25, 145 22 S175 30, 195 28 S220 38, 240 42"
                      }
                      fill="none"
                      stroke={item.positive ? "#00D09C" : "#E53935"}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                {/* Bottom border accent */}
                <div
                  className={
                    item.positive
                      ? "absolute bottom-0 left-0 h-0.5 w-0 bg-[#00D09C] transition-all duration-300 group-hover:w-full"
                      : "absolute bottom-0 left-0 h-0.5 w-0 bg-[#E53935] transition-all duration-300 group-hover:w-full"
                  }
                />
              </article>
            );
          })}
        </div>

        {/* =====================================================
            FOOTNOTE
        ====================================================== */}
        <div className="mx-auto mt-8 flex max-w-5xl items-center justify-center gap-2 text-center text-[11px] text-[#98A2B3]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#00D09C]" />
          Market data displayed for educational and informational purposes.
        </div>
      </div>
    </section>
  );
}
