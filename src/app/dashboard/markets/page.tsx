
"use client";

import { useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Clock3,
  Search,
  Star,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { useWatchlist } from "@/lib/watchlist";
type MarketTab = "All Stocks" | "Gainers" | "Losers";

interface Stock {
  name: string;
  symbol: string;
  price: number;
  change: number;
  volume: string;
  sector: string;
}

const indices = [
  {
    name: "NIFTY 50",
    value: "24,850.30",
    change: "+1.24%",
    points: "+304.50",
    positive: true,
  },
  {
    name: "SENSEX",
    value: "81,320.50",
    change: "+0.82%",
    points: "+662.15",
    positive: true,
  },
  {
    name: "BANK NIFTY",
    value: "56,420.15",
    change: "+1.61%",
    points: "+894.20",
    positive: true,
  },
  {
    name: "NIFTY IT",
    value: "38,240.80",
    change: "-0.42%",
    points: "-162.40",
    positive: false,
  },
];

const stocks: Stock[] = [
  {
    name: "Reliance Industries",
    symbol: "RELIANCE",
    price: 2945.6,
    change: 2.48,
    volume: "2.4M",
    sector: "Energy",
  },
  {
    name: "HDFC Bank",
    symbol: "HDFCBANK",
    price: 1742.25,
    change: 3.64,
    volume: "3.1M",
    sector: "Banking",
  },
  {
    name: "Tata Motors",
    symbol: "TATAMOTORS",
    price: 985.4,
    change: 4.82,
    volume: "4.2M",
    sector: "Automobile",
  },
  {
    name: "Infosys",
    symbol: "INFY",
    price: 1586.8,
    change: -1.32,
    volume: "1.8M",
    sector: "Technology",
  },
  {
    name: "ICICI Bank",
    symbol: "ICICIBANK",
    price: 1284.35,
    change: 2.16,
    volume: "2.7M",
    sector: "Banking",
  },
  {
    name: "Wipro",
    symbol: "WIPRO",
    price: 482.65,
    change: -0.86,
    volume: "1.2M",
    sector: "Technology",
  },
  {
    name: "TCS",
    symbol: "TCS",
    price: 4125.3,
    change: 1.42,
    volume: "980K",
    sector: "Technology",
  },
  {
    name: "ITC",
    symbol: "ITC",
    price: 438.75,
    change: -0.64,
    volume: "2.1M",
    sector: "FMCG",
  },
];

const formatPrice = (price: number) =>
  price.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export default function MarketsPage() {
  const [activeTab, setActiveTab] = useState<MarketTab>("All Stocks");
  const [search, setSearch] = useState("");
  const [selectedSector, setSelectedSector] = useState("All Sectors");
  const { symbols: watchlist, toggle: toggleWatchlist } = useWatchlist();

  const sectors = [
    "All Sectors",
    "Banking",
    "Technology",
    "Energy",
    "Automobile",
    "FMCG",
  ];

  const filteredStocks = useMemo(() => {
    return stocks.filter((stock) => {
      const matchesSearch =
        stock.name.toLowerCase().includes(search.toLowerCase()) ||
        stock.symbol.toLowerCase().includes(search.toLowerCase());

      const matchesSector =
        selectedSector === "All Sectors" ||
        stock.sector === selectedSector;

      const matchesTab =
        activeTab === "All Stocks" ||
        (activeTab === "Gainers" && stock.change > 0) ||
        (activeTab === "Losers" && stock.change < 0);

      return matchesSearch && matchesSector && matchesTab;
    });
  }, [activeTab, search, selectedSector]);

  // const toggleWatchlist = (symbol: string) => {
  //   setWatchlist((current) =>
  //     current.includes(symbol)
  //       ? current.filter((item) => item !== symbol)
  //       : [...current, symbol]
  //   );
  // };

  const gainers = stocks.filter((stock) => stock.change > 0);
  const losers = stocks.filter((stock) => stock.change < 0);

  return (
    <div className="space-y-6 pb-6">
      {/* Heading */}
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-[#00a878]">
            <BarChart3 size={15} />
            Market discovery
          </div>

          <h1 className="mt-1 text-2xl font-bold text-[#17231d]">
            Markets
          </h1>

          <p className="mt-1 text-sm text-[#718078]">
            Explore market indices, stocks and daily market movements.
          </p>
        </div>

        <div className="flex w-fit items-center gap-2 rounded-lg border border-[#dcefe6] bg-[#f0fbf6] px-3 py-2 text-xs font-semibold text-[#00a878]">
          <span className="h-2 w-2 rounded-full bg-[#00a878]" />
          Sample market data
        </div>
      </section>

      {/* Market Indices */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-[#17231d]">
              Market Indices
            </h2>
            <p className="mt-1 text-xs text-[#8a9890]">
              Overview of major market benchmarks.
            </p>
          </div>

          <span className="text-xs text-[#929d96]">Daily snapshot</span>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {indices.map((index) => (
            <div
              key={index.name}
              className="rounded-xl border border-[#e7ece9] bg-white p-4 shadow-[0_4px_18px_rgba(20,45,35,0.03)]"
            >
              <p className="text-xs font-semibold text-[#718078]">
                {index.name}
              </p>

              <p className="mt-3 text-xl font-bold tracking-tight text-[#17231d]">
                {index.value}
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1 text-xs font-semibold ${
                    index.positive
                      ? "text-[#00a878]"
                      : "text-[#d94c4c]"
                  }`}
                >
                  {index.positive ? (
                    <ArrowUpRight size={14} />
                  ) : (
                    <ArrowDownRight size={14} />
                  )}
                  {index.change}
                </span>

                <span className="text-xs text-[#929d96]">
                  {index.points} pts
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Market Summary */}
      <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="flex items-center justify-between rounded-xl border border-[#e7ece9] bg-white p-4">
          <div>
            <p className="text-xs text-[#8a9890]">Advancing stocks</p>
            <p className="mt-2 text-xl font-bold text-[#17231d]">
              {gainers.length}
            </p>
            <p className="mt-1 text-xs text-[#00a878]">Sample gainers</p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e9f8f2] text-[#00a878]">
            <TrendingUp size={20} />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-[#e7ece9] bg-white p-4">
          <div>
            <p className="text-xs text-[#8a9890]">Declining stocks</p>
            <p className="mt-2 text-xl font-bold text-[#17231d]">
              {losers.length}
            </p>
            <p className="mt-1 text-xs text-[#d94c4c]">Sample losers</p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff0f0] text-[#d94c4c]">
            <TrendingDown size={20} />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-[#e7ece9] bg-white p-4">
          <div>
            <p className="text-xs text-[#8a9890]">My watchlist</p>
            <p className="mt-2 text-xl font-bold text-[#17231d]">
              {watchlist.length}
            </p>
            <p className="mt-1 text-xs text-[#00a878]">Saved stocks</p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e9f8f2] text-[#00a878]">
            <Star size={20} />
          </div>
        </div>
      </section>

      {/* Stock Explorer */}
      <section className="rounded-2xl border border-[#e7ece9] bg-white p-4 shadow-[0_4px_18px_rgba(20,45,35,0.04)] sm:p-5">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-base font-bold text-[#17231d]">
              Explore Stocks
            </h2>
            <p className="mt-1 text-xs text-[#718078]">
              Search and discover stocks across different sectors.
            </p>
          </div>

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
              className="h-10 w-full rounded-xl border border-[#e7ece9] bg-[#fcfdfc] pl-9 pr-3 text-sm text-[#17231d] outline-none transition placeholder:text-[#a0aaa4] focus:border-[#00b887] sm:w-64"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-b border-[#edf1ee] pb-3">
          <div className="flex gap-2">
            {(["All Stocks", "Gainers", "Losers"] as MarketTab[]).map(
              (tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                    activeTab === tab
                      ? "bg-[#e9f8f2] text-[#00a878]"
                      : "text-[#718078] hover:bg-[#f5f8f6]"
                  }`}
                >
                  {tab}
                </button>
              )
            )}
          </div>

          <select
            value={selectedSector}
            onChange={(event) => setSelectedSector(event.target.value)}
            className="h-9 rounded-lg border border-[#e7ece9] bg-white px-3 text-xs font-medium text-[#53645a] outline-none focus:border-[#00b887]"
          >
            {sectors.map((sector) => (
              <option key={sector} value={sector}>
                {sector}
              </option>
            ))}
          </select>
        </div>

        {/* Stock Table */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-162.5 text-left">
            <thead>
              <tr className="border-b border-[#edf1ee] text-[11px] uppercase tracking-wide text-[#929d96]">
                <th className="pb-3 pr-4 font-semibold">Company</th>
                <th className="pb-3 pr-4 font-semibold">Sector</th>
                <th className="pb-3 pr-4 font-semibold">Price</th>
                <th className="pb-3 pr-4 font-semibold">Change</th>
                <th className="pb-3 pr-4 font-semibold">Volume</th>
                <th className="pb-3 text-right font-semibold">Watchlist</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#edf1ee]">
              {filteredStocks.map((stock) => (
                <tr
                  key={stock.symbol}
                  className="transition hover:bg-[#fbfdfb]"
                >
                  <td className="py-4 pr-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#e9f8f2] text-xs font-bold text-[#00a878]">
                        {stock.symbol.slice(0, 2)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#17231d]">
                          {stock.name}
                        </p>
                        <p className="mt-0.5 text-xs text-[#929d96]">
                          {stock.symbol}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 pr-4 text-xs text-[#718078]">
                    {stock.sector}
                  </td>

                  <td className="py-4 pr-4 text-sm font-semibold text-[#17231d]">
                    {formatPrice(stock.price)}
                  </td>

                  <td className="py-4 pr-4">
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-semibold ${
                        stock.change >= 0
                          ? "text-[#00a878]"
                          : "text-[#d94c4c]"
                      }`}
                    >
                      {stock.change >= 0 ? (
                        <ArrowUpRight size={14} />
                      ) : (
                        <ArrowDownRight size={14} />
                      )}
                      {stock.change > 0 ? "+" : ""}
                      {stock.change.toFixed(2)}%
                    </span>
                  </td>

                  <td className="py-4 pr-4 text-xs text-[#718078]">
                    {stock.volume}
                  </td>

                  <td className="py-4 text-right">
                    <button
                      type="button"
                      onClick={() => toggleWatchlist(stock.symbol)}
                      aria-label={
                        watchlist.includes(stock.symbol)
                          ? `Remove ${stock.name} from watchlist`
                          : `Add ${stock.name} to watchlist`
                      }
                      className={`rounded-lg p-2 transition ${
                        watchlist.includes(stock.symbol)
                          ? "bg-[#e9f8f2] text-[#00a878]"
                          : "text-[#929d96] hover:bg-[#f1f5f2] hover:text-[#00a878]"
                      }`}
                    >
                      <Star
                        size={17}
                        fill={
                          watchlist.includes(stock.symbol)
                            ? "currentColor"
                            : "none"
                        }
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredStocks.length === 0 && (
            <div className="py-12 text-center">
              <Search size={22} className="mx-auto text-[#929d96]" />
              <p className="mt-3 text-sm font-semibold text-[#17231d]">
                No stocks found
              </p>
              <p className="mt-1 text-xs text-[#929d96]">
                Try changing your search or sector filter.
              </p>
            </div>
          )}
        </div>

        <p className="mt-4 text-[11px] text-[#929d96]">
          <Clock3 size={12} className="mr-1 inline" />
          Prices and market movements are illustrative sample data.
        </p>
      </section>

      {/* Market Disclaimer */}
      <div className="rounded-xl border border-[#f0eadb] bg-[#fffdf7] p-3 text-xs leading-5 text-[#8a7a57]">
        Market prices, index values and trading volumes are sample data for
        frontend development. They are not live market quotes. Live market
        information will be connected through the AITradeX backend later.
      </div>
    </div>
  );
}

