import {
  CalendarDays,
  ChartCandlestick,
  ChartNoAxesColumn,
  Coins,
  Fuel,
  Globe,
  Landmark,
  PiggyBank,
} from "lucide-react";

const investments = [
  {
    icon: ChartCandlestick,
    title: "Stocks",
    description: "NSE & BSE listed companies.",
    category: "Equity",
    number: "01",
  },
  {
    icon: Landmark,
    title: "Mutual Funds",
    description: "Professionally managed funds.",
    category: "Funds",
    number: "02",
  },
  {
    icon: ChartNoAxesColumn,
    title: "ETFs",
    description: "Diversified exchange-traded funds.",
    category: "Diversified",
    number: "03",
  },
  {
    icon: PiggyBank,
    title: "SIP",
    description: "Build wealth systematically.",
    category: "Long Term",
    number: "04",
  },
  {
    icon: Coins,
    title: "Gold",
    description: "Explore gold investments.",
    category: "Commodity",
    number: "05",
  },
  {
    icon: Fuel,
    title: "Commodities",
    description: "Gold, Silver, Crude Oil and more.",
    category: "Commodity",
    number: "06",
  },
  {
    icon: Globe,
    title: "US Stocks",
    description: "Explore leading global companies.",
    category: "Global",
    number: "07",
  },
  {
    icon: CalendarDays,
    title: "IPO",
    description: "Discover upcoming opportunities.",
    category: "Primary Market",
    number: "08",
  },
];

export default function Investment() {
  return (
    <section
      id="investments"
      aria-labelledby="investment-title"
      className="relative overflow-hidden bg-white"
    >
      {/* Section divider */}
      <div className="mx-auto max-w-300 px-4 pt-5 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <span className="h-px flex-1 bg-[#E4E7EC]" />

          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#98A2B3]">
            Investments
          </span>

          <span className="h-px flex-1 bg-[#E4E7EC]" />
        </div>
      </div>

      <div className="mx-auto max-w-300 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-[#00D09C]/20 bg-[#E7FFF8] px-3.5 py-2 text-xs font-bold text-[#00B386]">
            INVESTMENT OPTIONS
          </span>

          <h2
            id="investment-title"
            className="mt-4 text-3xl font-bold tracking-tight text-[#101828] sm:text-4xl lg:text-5xl"
          >
            Invest across multiple asset classes.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[#667085] sm:text-base sm:leading-7">
            Explore different investment categories and build a diversified
            portfolio around your financial goals.
          </p>
        </div>

        {/* Investment Grid */}
        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {investments.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="group relative overflow-hidden rounded-2xl border border-[#E4E7EC] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#00D09C]/30 hover:bg-[#F9FFFC] hover:shadow-md"
              >
                {/* Top row */}
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E7FFF8] text-[#00B386] transition-all duration-300 group-hover:bg-[#00D09C] group-hover:text-white">
                    <Icon size={20} strokeWidth={2} />
                  </div>

                  <span className="text-[10px] font-bold tracking-wider text-[#B0B7C3]">
                    {item.number}
                  </span>
                </div>

                {/* Content */}
                <div className="mt-5">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-[#101828]">
                      {item.title}
                    </h3>
                  </div>

                  <span className="mt-2 inline-flex rounded-full bg-[#F2F4F7] px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-[#667085]">
                    {item.category}
                  </span>

                  <p className="mt-3 min-h-10 text-xs leading-5 text-[#667085]">
                    {item.description}
                  </p>
                </div>

                {/* Bottom interaction */}
                <div className="mt-5 flex items-center justify-between border-t border-[#F2F4F7] pt-4">
                  <span className="text-[10px] font-semibold text-[#98A2B3]">
                    Explore
                  </span>

                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#E4E7EC] text-xs text-[#98A2B3] transition-all duration-300 group-hover:border-[#00D09C]/20 group-hover:bg-[#E7FFF8] group-hover:text-[#00B386]">
                    →
                  </span>
                </div>

                {/* Hover accent */}
                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#00D09C] transition-all duration-300 group-hover:w-full" />
              </article>
            );
          })}
        </div>

        {/* Bottom strip */}
        <div className="mt-7 flex flex-col gap-2 border-t border-[#E4E7EC] pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs font-medium text-[#667085]">
            Multiple asset classes. One intelligent platform.
          </p>

          <div className="flex items-center gap-2 text-xs font-semibold text-[#00B386]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00D09C]" />
            Built for diversified investing
          </div>
        </div>
      </div>
    </section>
  );
}
