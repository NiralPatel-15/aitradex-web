"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BrainCircuit,
  CheckCircle2,
  Clock3,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";

type Category = "Stocks" | "F&O" | "Baskets" | "AI Trade";
type TradeFilter = "All trades" | "Active" | "Past";

interface Investment {
  name: string;
  symbol: string;
  category: Category;
  signal: string;
  price: string;
  buyRange: string;
  target: string;
  upside: string;
  horizon: string;
  confidence: string;
  risk: "Low" | "Moderate" | "High";
  status: "Active" | "Past";
  positive: boolean;
}

const categories: Category[] = ["Stocks", "F&O", "Baskets", "AI Trade"];

const investments: Investment[] = [
  {
    name: "Reliance Industries",
    symbol: "RELIANCE",
    category: "Stocks",
    signal: "Bullish",
    price: "₹1,245.00",
    buyRange: "₹1,220 – ₹1,250",
    target: "₹1,340",
    upside: "+7.60%",
    horizon: "2–4 weeks",
    confidence: "78%",
    risk: "Moderate",
    status: "Active",
    positive: true,
  },
  {
    name: "HDFC Bank",
    symbol: "HDFCBANK",
    category: "Stocks",
    signal: "Bullish",
    price: "₹1,680.00",
    buyRange: "₹1,650 – ₹1,690",
    target: "₹1,790",
    upside: "+6.55%",
    horizon: "3–5 weeks",
    confidence: "82%",
    risk: "Moderate",
    status: "Active",
    positive: true,
  },
  {
    name: "Infosys",
    symbol: "INFY",
    category: "Stocks",
    signal: "Neutral",
    price: "₹1,520.00",
    buyRange: "₹1,490 – ₹1,530",
    target: "₹1,590",
    upside: "+4.60%",
    horizon: "2–3 weeks",
    confidence: "68%",
    risk: "Low",
    status: "Past",
    positive: true,
  },
  {
    name: "NIFTY 50 Options",
    symbol: "NIFTY",
    category: "F&O",
    signal: "Bullish",
    price: "₹24,850.00",
    buyRange: "Illustrative entry zone",
    target: "₹25,200",
    upside: "+1.40%",
    horizon: "Short term",
    confidence: "72%",
    risk: "High",
    status: "Active",
    positive: true,
  },
  {
    name: "Large Cap Basket",
    symbol: "LARGECAP",
    category: "Baskets",
    signal: "Bullish",
    price: "Sample basket",
    buyRange: "Diversified allocation",
    target: "Long-term growth",
    upside: "Illustrative",
    horizon: "Long term",
    confidence: "75%",
    risk: "Moderate",
    status: "Active",
    positive: true,
  },
];

export default function InvestPage() {
  const [category, setCategory] = useState<Category>("AI Trade");
  const [filter, setFilter] = useState<TradeFilter>("All trades");
  const [search, setSearch] = useState("");

  const filteredInvestments = useMemo(() => {
    return investments.filter((item) => {
      const matchesCategory =
        category === "AI Trade" || item.category === category;

      const matchesFilter = filter === "All trades" || item.status === filter;

      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.symbol.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesFilter && matchesSearch;
    });
  }, [category, filter, search]);

  return (
    <div className="space-y-5 pb-6">
      {/* Page Heading */}
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-[#00a878]">
            <TrendingUp size={15} />
            Investment opportunities
          </div>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#17231d]">
            Invest
          </h1>

          <p className="mt-1 text-sm text-[#718078]">
            Discover opportunities and explore AI-powered market insights.
          </p>
        </div>

        <div className="flex w-fit items-center gap-2 rounded-lg border border-[#dcefe6] bg-[#f0fbf6] px-3 py-2 text-xs font-semibold text-[#00a878]">
          <Sparkles size={15} />
          Smart investing
        </div>
      </section>

      {/* Investment Categories */}
      <section className="rounded-2xl border border-[#e7ece9] bg-white p-3 shadow-[0_4px_18px_rgba(20,45,35,0.04)] sm:p-4">
        <div className="scrollbar-hidden flex gap-2 overflow-x-auto">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`shrink-0 rounded-xl px-5 py-2.5 text-sm font-semibold transition ${
                category === item
                  ? "bg-[#00a878] text-white shadow-sm"
                  : "bg-[#f5f8f6] text-[#718078] hover:bg-[#e9f8f2] hover:text-[#00a878]"
              }`}
            >
              {item === "AI Trade" && (
                <Sparkles size={14} className="mr-1.5 inline" />
              )}
              {item}
            </button>
          ))}
        </div>
      </section>

      {/* AI Trade Banner */}
      <section className="relative overflow-hidden rounded-2xl bg-linear-to-br  from-[#073f32] via-[#087b5b] to-[#00a878] p-5 text-white shadow-[0_8px_24px_rgba(0,120,85,0.12)] sm:p-7">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white">
            <BrainCircuit size={15} />
            AITradeX Intelligence
          </div>

          <h2 className="mt-4 text-xl font-bold sm:text-2xl">
            Smarter insights for your investment journey.
          </h2>

          <p className="mt-2 max-w-xl text-sm leading-6 text-white/80">
            Explore AI-assisted market analysis, potential price targets,
            forecast horizons and risk indicators in one place.
          </p>

          <div className="mt-5 flex flex-wrap gap-3 text-xs font-medium text-white/90">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={15} />
              Market analysis
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={15} />
              Price forecasts
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={15} />
              Risk insights
            </span>
          </div>
        </div>

        <div className="pointer-events-none absolute -right-8 -top-12 hidden h-64 w-64 rounded-full border border-white/10 sm:block">
          <div className="absolute inset-8 rounded-full border border-white/10" />
          <div className="absolute inset-16 rounded-full border border-white/10" />
          <BrainCircuit
            size={90}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white/20"
          />
        </div>
      </section>

      {/* Investment Statistics */}
      <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-[#e7ece9] bg-white p-4">
          <div className="flex items-center gap-2 text-xs text-[#718078]">
            <BarChart3 size={16} className="text-[#00a878]" />
            Available opportunities
          </div>
          <p className="mt-2 text-2xl font-bold text-[#17231d]">
            {investments.filter((item) => item.status === "Active").length}
          </p>
          <p className="mt-1 text-[11px] text-[#929d96]">
            Sample active opportunities
          </p>
        </div>

        <div className="rounded-xl border border-[#e7ece9] bg-white p-4">
          <div className="flex items-center gap-2 text-xs text-[#718078]">
            <TrendingUp size={16} className="text-[#00a878]" />
            Market signals
          </div>
          <p className="mt-2 text-2xl font-bold text-[#17231d]">
            {investments.filter((item) => item.signal === "Bullish").length}
          </p>
          <p className="mt-1 text-[11px] text-[#929d96]">
            Illustrative bullish signals
          </p>
        </div>

        <div className="rounded-xl border border-[#e7ece9] bg-white p-4">
          <div className="flex items-center gap-2 text-xs text-[#718078]">
            <ShieldCheck size={16} className="text-[#00a878]" />
            Risk information
          </div>
          <p className="mt-2 text-lg font-bold text-[#17231d]">Included</p>
          <p className="mt-1 text-[11px] text-[#929d96]">
            Risk labels shown per opportunity
          </p>
        </div>
      </section>

      {/* Investment List */}
      <section className="rounded-2xl border border-[#e7ece9] bg-white p-4 shadow-[0_4px_18px_rgba(20,45,35,0.04)] sm:p-5">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-base font-bold text-[#17231d]">
              {category === "AI Trade"
                ? "AI Trade Opportunities"
                : `${category} Opportunities`}
            </h2>
            <p className="mt-1 text-xs text-[#718078]">
              Explore available market insights and forecast information.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#929d96]"
              />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search stocks..."
                className="h-10 w-full rounded-xl border border-[#e7ece9] bg-[#fcfdfc] pl-9 pr-3 text-sm text-[#17231d] outline-none transition placeholder:text-[#a0aaa4] focus:border-[#00b887] sm:w-52"
              />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="scrollbar-hidden mt-5 flex gap-2 overflow-x-auto border-b border-[#edf1ee] pb-3">
          {(["All trades", "Active", "Past"] as TradeFilter[]).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={`shrink-0 rounded-lg px-3 py-2 text-xs font-semibold transition ${
                filter === item
                  ? "bg-[#e9f8f2] text-[#00a878]"
                  : "text-[#718078] hover:bg-[#f5f8f6]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Opportunity Cards */}
        <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">
          {filteredInvestments.map((item) => (
            <article
              key={item.symbol}
              className="rounded-xl border border-[#edf1ee] bg-[#fcfdfc] p-4 transition hover:border-[#cce8dc]"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e9f8f2] text-sm font-bold text-[#00a878]">
                    {item.symbol.slice(0, 2)}
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-[#17231d]">
                      {item.name}
                    </h3>
                    <p className="mt-0.5 text-xs text-[#8a9890]">
                      {item.symbol} · {item.category}
                    </p>
                  </div>
                </div>

                <span
                  className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                    item.positive
                      ? "bg-[#e9f8f2] text-[#00a878]"
                      : "bg-[#fff0f0] text-[#d94c4c]"
                  }`}
                >
                  {item.signal}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl bg-white p-3 sm:grid-cols-3">
                <div>
                  <p className="text-[10px] text-[#929d96]">Current price</p>
                  <p className="mt-1 text-sm font-semibold text-[#17231d]">
                    {item.price}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] text-[#929d96]">Target</p>
                  <p className="mt-1 text-sm font-semibold text-[#00a878]">
                    {item.target}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] text-[#929d96]">
                    Illustrative upside
                  </p>
                  <p className="mt-1 flex items-center gap-1 text-sm font-semibold text-[#00a878]">
                    <ArrowUpRight size={14} />
                    {item.upside}
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="text-[#8a9890]">Entry range</span>
                  <span className="font-semibold text-[#17231d]">
                    {item.buyRange}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="text-[#8a9890]">Forecast horizon</span>
                  <span className="flex items-center gap-1 font-medium text-[#53645a]">
                    <Clock3 size={13} />
                    {item.horizon}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="text-[#8a9890]">Sample confidence</span>
                  <span className="font-semibold text-[#17231d]">
                    {item.confidence}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="text-[#8a9890]">Risk level</span>
                  <span
                    className={`font-semibold ${
                      item.risk === "High"
                        ? "text-[#d94c4c]"
                        : item.risk === "Moderate"
                          ? "text-[#b7791f]"
                          : "text-[#00a878]"
                    }`}
                  >
                    {item.risk}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-[#edf1ee] pt-3">
                <span className="text-[10px] text-[#929d96]">
                  Illustrative data
                </span>

                <button
                  type="button"
                  onClick={() =>
                    alert(
                      `${item.name}: Detailed prediction analysis will be connected later.`,
                    )
                  }
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#00a878] transition hover:text-[#00865f]"
                >
                  View analysis
                  <ArrowRight size={14} />
                </button>
              </div>
            </article>
          ))}
        </div>

        {filteredInvestments.length === 0 && (
          <div className="py-12 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#f1f5f2] text-[#8a9890]">
              <Search size={20} />
            </div>

            <h3 className="mt-3 text-sm font-semibold text-[#17231d]">
              No opportunities found
            </h3>

            <p className="mt-1 text-xs text-[#8a9890]">
              Try another search or change your selected filter.
            </p>
          </div>
        )}
      </section>

      {/* Disclaimer */}
      <div className="flex items-start gap-2 rounded-xl border border-[#f0eadb] bg-[#fffdf7] p-3">
        <ShieldCheck size={16} className="mt-0.5 shrink-0 text-[#b7791f]" />
        <p className="text-[11px] leading-5 text-[#8a7a57]">
          All investment prices, targets, signals and confidence values on this
          page are illustrative sample data for frontend development. They are
          not live market data, verified model predictions or investment advice.
        </p>
      </div>
    </div>
  );
}
