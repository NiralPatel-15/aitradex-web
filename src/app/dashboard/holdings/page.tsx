"use client";

import { useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Search,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

type HoldingFilter = "All" | "Profit" | "Loss";

interface Holding {
  name: string;
  symbol: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  dayChange: number;
  sector: string;
}

const holdings: Holding[] = [
  {
    name: "Reliance Industries",
    symbol: "RELIANCE",
    quantity: 10,
    averagePrice: 2820.4,
    currentPrice: 2945.6,
    dayChange: 1.85,
    sector: "Energy",
  },
  {
    name: "Tata Motors",
    symbol: "TATAMOTORS",
    quantity: 20,
    averagePrice: 920.5,
    currentPrice: 985.4,
    dayChange: 2.45,
    sector: "Automobile",
  },
  {
    name: "HDFC Bank",
    symbol: "HDFCBANK",
    quantity: 15,
    averagePrice: 1680.25,
    currentPrice: 1742.25,
    dayChange: 0.86,
    sector: "Banking",
  },
  {
    name: "Infosys",
    symbol: "INFY",
    quantity: 12,
    averagePrice: 1620.8,
    currentPrice: 1586.8,
    dayChange: -1.32,
    sector: "Technology",
  },
  {
    name: "ICICI Bank",
    symbol: "ICICIBANK",
    quantity: 18,
    averagePrice: 1210.35,
    currentPrice: 1284.35,
    dayChange: 1.64,
    sector: "Banking",
  },
  {
    name: "Wipro",
    symbol: "WIPRO",
    quantity: 25,
    averagePrice: 510.5,
    currentPrice: 482.65,
    dayChange: -0.72,
    sector: "Technology",
  },
];

const formatCurrency = (value: number) =>
  value.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export default function HoldingsPage() {
  const [filter, setFilter] = useState<HoldingFilter>("All");
  const [search, setSearch] = useState("");

  // Portfolio calculations
  const totalInvested = holdings.reduce(
    (sum, item) => sum + item.averagePrice * item.quantity,
    0,
  );

  const currentValue = holdings.reduce(
    (sum, item) => sum + item.currentPrice * item.quantity,
    0,
  );

  const totalReturns = currentValue - totalInvested;

  const returnPercentage =
    totalInvested > 0 ? (totalReturns / totalInvested) * 100 : 0;

  const profitableCount = holdings.filter(
    (item) => item.currentPrice >= item.averagePrice,
  ).length;

  const lossCount = holdings.length - profitableCount;

  // Search and filter holdings
  const filteredHoldings = holdings.filter((item) => {
    const searchTerm = search.trim().toLowerCase();

    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm) ||
      item.symbol.toLowerCase().includes(searchTerm);

    const profitLoss = (item.currentPrice - item.averagePrice) * item.quantity;

    const matchesFilter =
      filter === "All" ||
      (filter === "Profit" && profitLoss >= 0) ||
      (filter === "Loss" && profitLoss < 0);

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6 pb-8">
      {/* Heading */}
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#00a878]">
            <BriefcaseBusiness size={15} />
            Your investments
          </div>

          <h1 className="mt-1 text-2xl font-bold text-[#17231d]">
            My Holdings
          </h1>

          <p className="mt-1 text-sm text-[#718078]">
            Track the stocks you own and monitor their performance.
          </p>
        </div>

        <span className="w-fit rounded-lg border border-[#dcefe6] bg-[#f0fbf6] px-3 py-2 text-xs font-semibold text-[#00a878]">
          Sample holdings data
        </span>
      </section>

      {/* Summary Cards */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Current Value */}
        <div className="rounded-xl border border-[#e7ece9] bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-[#718078]">Current Value</p>
            <BriefcaseBusiness size={19} className="text-[#00a878]" />
          </div>

          <p className="mt-4 text-2xl font-bold text-[#17231d]">
            {formatCurrency(currentValue)}
          </p>

          <p className="mt-2 text-xs text-[#929d96]">
            Total value of your holdings
          </p>
        </div>

        {/* Invested Amount */}
        <div className="rounded-xl border border-[#e7ece9] bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-[#718078]">
              Invested Amount
            </p>
            <TrendingUp size={19} className="text-[#00a878]" />
          </div>

          <p className="mt-4 text-2xl font-bold text-[#17231d]">
            {formatCurrency(totalInvested)}
          </p>

          <p className="mt-2 text-xs text-[#929d96]">Total purchase value</p>
        </div>

        {/* Overall P&L */}
        <div className="rounded-xl border border-[#e7ece9] bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-[#718078]">Overall P&L</p>

            {totalReturns >= 0 ? (
              <TrendingUp size={19} className="text-[#00a878]" />
            ) : (
              <TrendingDown size={19} className="text-[#d94c4c]" />
            )}
          </div>

          <p
            className={`mt-4 text-2xl font-bold ${
              totalReturns >= 0 ? "text-[#00a878]" : "text-[#d94c4c]"
            }`}
          >
            {totalReturns >= 0 ? "+" : ""}
            {formatCurrency(totalReturns)}
          </p>

          <p className="mt-2 text-xs text-[#929d96]">
            {returnPercentage >= 0 ? "+" : ""}
            {returnPercentage.toFixed(2)}% overall return
          </p>
        </div>

        {/* Total Holdings */}
        <div className="rounded-xl border border-[#e7ece9] bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-[#718078]">Total Holdings</p>
            <BriefcaseBusiness size={19} className="text-[#00a878]" />
          </div>

          <p className="mt-4 text-2xl font-bold text-[#17231d]">
            {holdings.length}
          </p>

          <p className="mt-2 text-xs text-[#929d96]">
            {profitableCount} profitable · {lossCount} at a loss
          </p>
        </div>
      </section>

      {/* Holdings Table */}
      <section className="rounded-2xl border border-[#e7ece9] bg-white p-5 shadow-[0_4px_18px_rgba(20,45,35,0.04)]">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-base font-bold text-[#17231d]">All Holdings</h2>

            <p className="mt-1 text-xs text-[#718078]">
              Detailed breakdown of your investments.
            </p>
          </div>

          {/* Search */}
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#929d96]"
            />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search company or symbol..."
              className="h-10 w-full rounded-xl border border-[#e7ece9] bg-[#fcfdfc] pl-9 pr-3 text-sm text-[#17231d] outline-none transition placeholder:text-[#a0aaa4] focus:border-[#00b887] sm:w-64"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="mt-5 flex flex-wrap gap-2 border-b border-[#edf1ee] pb-3">
          {(["All", "Profit", "Loss"] as HoldingFilter[]).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={`rounded-lg px-4 py-2 text-xs font-semibold transition ${
                filter === item
                  ? "bg-[#e9f8f2] text-[#00a878]"
                  : "text-[#718078] hover:bg-[#f5f8f6]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-212.5 text-left">
            <thead>
              <tr className="border-b border-[#edf1ee] text-[11px] uppercase tracking-wide text-[#929d96]">
                <th className="pb-3 pr-4 font-semibold">Company</th>
                <th className="pb-3 pr-4 font-semibold">Quantity</th>
                <th className="pb-3 pr-4 font-semibold">Avg. Price</th>
                <th className="pb-3 pr-4 font-semibold">LTP</th>
                <th className="pb-3 pr-4 font-semibold">Current Value</th>
                <th className="pb-3 pr-4 font-semibold">P&L</th>
                <th className="pb-3 font-semibold">Day Change</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#edf1ee]">
              {filteredHoldings.map((item) => {
                const invested = item.averagePrice * item.quantity;
                const value = item.currentPrice * item.quantity;
                const profit = value - invested;
                const profitPercent =
                  invested > 0 ? (profit / invested) * 100 : 0;
                const positive = profit >= 0;

                return (
                  <tr
                    key={item.symbol}
                    className="transition hover:bg-[#fbfdfb]"
                  >
                    <td className="py-4 pr-4">
                      <p className="text-sm font-semibold text-[#17231d]">
                        {item.name}
                      </p>

                      <p className="mt-0.5 text-xs text-[#929d96]">
                        {item.symbol} · {item.sector}
                      </p>
                    </td>

                    <td className="py-4 pr-4 text-sm text-[#53645a]">
                      {item.quantity}
                    </td>

                    <td className="py-4 pr-4 text-sm text-[#53645a]">
                      {formatCurrency(item.averagePrice)}
                    </td>

                    <td className="py-4 pr-4 text-sm font-semibold text-[#17231d]">
                      {formatCurrency(item.currentPrice)}
                    </td>

                    <td className="py-4 pr-4 text-sm font-semibold text-[#17231d]">
                      {formatCurrency(value)}
                    </td>

                    <td className="py-4 pr-4">
                      <p
                        className={`text-sm font-semibold ${
                          positive ? "text-[#00a878]" : "text-[#d94c4c]"
                        }`}
                      >
                        {positive ? "+" : ""}
                        {formatCurrency(profit)}
                      </p>

                      <p
                        className={`mt-1 text-xs ${
                          positive ? "text-[#00a878]" : "text-[#d94c4c]"
                        }`}
                      >
                        {positive ? "+" : ""}
                        {profitPercent.toFixed(2)}%
                      </p>
                    </td>

                    <td className="py-4">
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-semibold ${
                          item.dayChange >= 0
                            ? "text-[#00a878]"
                            : "text-[#d94c4c]"
                        }`}
                      >
                        {item.dayChange >= 0 ? (
                          <ArrowUpRight size={14} />
                        ) : (
                          <ArrowDownRight size={14} />
                        )}
                        {item.dayChange > 0 ? "+" : ""}
                        {item.dayChange.toFixed(2)}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Empty State */}
          {filteredHoldings.length === 0 && (
            <div className="py-12 text-center">
              <Search size={22} className="mx-auto text-[#929d96]" />

              <p className="mt-3 text-sm font-semibold text-[#17231d]">
                No holdings found
              </p>

              <p className="mt-1 text-xs text-[#929d96]">
                Try another company name or filter.
              </p>
            </div>
          )}
        </div>

        <p className="mt-4 text-[11px] text-[#929d96]">
          All displayed values are illustrative sample data.
        </p>
      </section>

      {/* Disclaimer */}
      <div className="rounded-xl border border-[#f0eadb] bg-[#fffdf7] p-3 text-xs leading-5 text-[#8a7a57]">
        Holdings, prices and profit/loss figures are sample values for frontend
        development. Actual holdings will be loaded from your authenticated
        AITradeX account after backend integration.
      </div>
    </div>
  );
}
