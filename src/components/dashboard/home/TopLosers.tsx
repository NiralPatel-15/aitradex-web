"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowDownRight, RefreshCw, TrendingDown } from "lucide-react";

import {
  formatMarketPercentage,
  formatMarketPrice,
  getMarketData,
  MARKET_INSTRUMENT_NAMES,
  MARKET_INSTRUMENT_SYMBOLS,
  type MarketInstrument,
} from "@/lib/market-data";

type Loser = {
  key: string;
  name: string;
  price: number;
  change: number;
};

function getInitials(name: string) {
  return name
    .replace(/&/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export default function TopLosers() {
  const [losers, setLosers] = useState<Loser[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadLosers = useCallback(async (manual = false) => {
    if (manual) {
      setRefreshing(true);
    }

    try {
      const result = await getMarketData();

      if (!result.success) {
        throw new Error("Unable to load market data.");
      }

      const stocks = Object.entries(result.data ?? {})
        .filter(
          ([key, item]: [string, MarketInstrument]) =>
            key.startsWith("NSE_EQ|") &&
            Number.isFinite(item.last_price) &&
            item.last_price > 0 &&
            Number.isFinite(item.change_percent) &&
            item.change_percent < 0,
        )
        .map(([key, item]) => ({
          key,
          name: MARKET_INSTRUMENT_NAMES[key] ?? key,
          price: item.last_price,
          change: item.change_percent,
        }))
        .sort((a, b) => a.change - b.change)
        .slice(0, 5);

      setLosers(stocks);
      setError(
        stocks.length === 0
          ? "No declining stocks are available in the current API response."
          : null,
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to load market data.",
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    const initialTimer = window.setTimeout(() => {
      void loadLosers();
    }, 0);

    const interval = window.setInterval(() => {
      void loadLosers();
    }, 60_000);

    return () => {
      window.clearTimeout(initialTimer);
      window.clearInterval(interval);
    };
  }, [loadLosers]);

  return (
    <section className="h-full rounded-2xl border border-[#e7ece9] bg-white p-5 shadow-[0_4px_18px_rgba(20,45,35,0.04)]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#fff0f0] text-danger">
              <TrendingDown size={18} />
            </div>

            <h2 className="text-lg font-bold text-[#17231d]">Top Losers</h2>
          </div>

          <p className="mt-1 text-sm text-[#718078]">
            Biggest negative moves among the instruments returned by the API.
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <span className="rounded-full bg-[#fff5f5] px-3 py-1 text-xs font-medium text-danger">
            Live data
          </span>

          <button
            type="button"
            onClick={() => void loadLosers(true)}
            disabled={refreshing}
            aria-label="Refresh top losers"
            title="Refresh market data"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#e7ece9] text-[#718078] transition hover:bg-[#fff5f5] hover:text-danger disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCw size={15} className={refreshing ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      <div className="mt-5 divide-y divide-[#edf1ee]">
        {loading ? (
          <div className="space-y-4 py-3">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between gap-3 py-2"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 animate-pulse rounded-xl bg-gray-100" />

                  <div className="space-y-2">
                    <div className="h-3 w-28 animate-pulse rounded bg-gray-100" />
                    <div className="h-3 w-36 animate-pulse rounded bg-gray-100" />
                  </div>
                </div>

                <div className="h-4 w-20 animate-pulse rounded bg-gray-100" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="py-5">
            <p role="status" className="text-sm text-[#718078]">
              {error}
            </p>

            <button
              type="button"
              onClick={() => void loadLosers(true)}
              disabled={refreshing}
              className="mt-3 text-sm font-semibold text-danger hover:text-[#dc2626] disabled:opacity-50"
            >
              Try again
            </button>
          </div>
        ) : (
          losers.map((stock) => (
            <div
              key={stock.key}
              className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#fff1f1] text-sm font-bold text-[#d94b4b]">
                  {getInitials(stock.name)}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-[#17231d]">
                    {stock.name}
                  </p>

                  <p
                    className="mt-0.5 truncate text-xs text-[#8a9890]"
                    title={stock.key}
                  >
                    {MARKET_INSTRUMENT_SYMBOLS[stock.key] ?? stock.key}
                  </p>
                </div>
              </div>

              <div className="shrink-0 text-right">
                <p className="text-sm font-semibold text-[#17231d]">
                  ₹{formatMarketPrice(stock.price)}
                </p>

                <p className="mt-0.5 inline-flex items-center gap-1 text-xs font-semibold text-danger">
                  <ArrowDownRight size={13} />
                  {formatMarketPercentage(stock.change)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-4 border-t border-[#edf1ee] pt-3">
        <p className="text-xs text-[#8a9890]">
          Live data · Refreshes every 60 seconds
        </p>
      </div>
    </section>
  );
}
