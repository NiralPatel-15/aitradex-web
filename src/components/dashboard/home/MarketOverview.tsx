"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  RefreshCw,
} from "lucide-react";
import NiftyCandlestickChart from "./NiftyCandlestickChart";

/* ----------------------------- Types ----------------------------- */

interface MarketInstrument {
  instrument_key: string;
  last_price: number;
  close_price: number;
  ltq?: number;
  volume?: number;
  change: number;
  change_percent: number;
}

interface MarketApiResponse {
  success: boolean;
  source?: string;
  timestamp?: string;
  data?: Record<string, MarketInstrument>;
  message?: string;
  code?: string;
}

interface MarketCard {
  name: string;
  value: number;
  change: number;
  percentage: number;
  positive: boolean;
  instrumentKey: string;
}

interface HistoricalCandle {
  timestamp: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface HistoricalApiResponse {
  success: boolean;
  source?: string;
  range: string;
  timestamp: string;
  candles: HistoricalCandle[];
  message?: string;
}

/* -------------------------- Configuration ------------------------- */

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
).replace(/\/+$/, "");

const MARKET_DATA_URL = `${API_BASE_URL}/upstox/market-data`;
const MARKET_HISTORY_URL = `${API_BASE_URL}/upstox/market-history`;
const REFRESH_INTERVAL = 60_000;
const TIME_RANGES = ["1D", "1W", "1M", "3M", "6M", "1Y"] as const;

const INSTRUMENT_NAMES: Record<string, string> = {
  "NSE_INDEX|Nifty 50": "NIFTY 50",
  "NSE_EQ|INE002A01018": "Reliance Industries",
  "NSE_EQ|INE040A01034": "HDFC Bank",
  "NSE_EQ|INE467B01029": "TCS",
  "NSE_EQ|INE009A01021": "Infosys",
  "NSE_EQ|INE090A01021": "ICICI Bank",
  "NSE_EQ|INE397D01024": "Bharti Airtel",
  "NSE_EQ|INF204KB14I2": "NIFTYBEES",
};

const PRIORITY_INSTRUMENTS = [
  "NSE_INDEX|Nifty 50",
  "NSE_EQ|INE002A01018",
  "NSE_EQ|INE040A01034",
  "NSE_EQ|INE467B01029",
  "NSE_EQ|INE009A01021",
  "NSE_EQ|INE090A01021",
  "NSE_EQ|INE397D01024",
  "NSE_EQ|INF204KB14I2",
];

/* ---------------------------- Helpers ----------------------------- */

function formatPrice(value: number): string {
  return value.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatChange(value: number): string {
  const sign = value > 0 ? "+" : value < 0 ? "−" : "";
  return `${sign}${Math.abs(value).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatPercentage(value: number): string {
  const sign = value > 0 ? "+" : value < 0 ? "−" : "";
  return `${sign}${Math.abs(value).toFixed(2)}%`;
}

function getMarketCards(data: Record<string, MarketInstrument>): MarketCard[] {
  return PRIORITY_INSTRUMENTS.filter((key) => data[key]).map((key) => {
    const instrument = data[key];

    const change = Number.isFinite(instrument.change)
      ? instrument.change
      : instrument.last_price - instrument.close_price;

    const percentage = Number.isFinite(instrument.change_percent)
      ? instrument.change_percent
      : instrument.close_price !== 0
        ? (change / instrument.close_price) * 100
        : 0;

    return {
      name: INSTRUMENT_NAMES[key] || key,
      value: instrument.last_price,
      change,
      percentage,
      positive: change >= 0,
      instrumentKey: key,
    };
  });
}

/* ------------------------- Main Component ------------------------- */

export default function MarketOverview() {
  const [selectedRange, setSelectedRange] = useState<string>("1D");
  const [historicalCandles, setHistoricalCandles] = useState<
    HistoricalCandle[]
  >([]);
  const [chartLoading, setChartLoading] = useState(true);
  const [chartError, setChartError] = useState<string | null>(null);

  const [marketData, setMarketData] = useState<MarketCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const fetchMarketData = useCallback(async (isInitialLoad = false) => {
    if (isInitialLoad) {
      setLoading(true);
    } else {
      setRefreshing(true);
    }

    try {
      const response = await fetch(MARKET_DATA_URL, {
        method: "GET",
        headers: { Accept: "application/json" },
        cache: "no-store",
      });

      const result = (await response.json()) as MarketApiResponse;

      if (!response.ok || !result.success || !result.data) {
        throw new Error(
          result.message ||
            `Unable to fetch market data (HTTP ${response.status}).`,
        );
      }

      const cards = getMarketCards(result.data);

      if (cards.length === 0) {
        throw new Error(
          "The API responded successfully, but no recognised instruments were returned.",
        );
      }

      setMarketData(cards);
      setError(null);
      setLastUpdated(result.timestamp || new Date().toISOString());
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred while fetching market data.",
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  const fetchHistoricalData = useCallback(
    async (range: string, signal?: AbortSignal) => {
      try {
        const response = await fetch(
          `${MARKET_HISTORY_URL}?range=${encodeURIComponent(range)}`,
          {
            method: "GET",
            headers: { Accept: "application/json" },
            cache: "no-store",
            signal,
          },
        );

        const result = (await response.json()) as HistoricalApiResponse;

        if (!response.ok || !result.success) {
          throw new Error(
            result.message ||
              `Unable to load historical market data (HTTP ${response.status}).`,
          );
        }

        if (!Array.isArray(result.candles) || result.candles.length === 0) {
          setHistoricalCandles([]);
          setChartError(
            "No historical market data is available for this range.",
          );
          return;
        }

        const validCandles = result.candles.filter(
          (candle) =>
            candle &&
            typeof candle.timestamp === "string" &&
            Number.isFinite(Number(candle.open)) &&
            Number.isFinite(Number(candle.high)) &&
            Number.isFinite(Number(candle.low)) &&
            Number.isFinite(Number(candle.close)),
        );

        if (validCandles.length === 0) {
          setHistoricalCandles([]);
          setChartError(
            "The API returned no valid OHLC candles for this range.",
          );
          return;
        }

        setHistoricalCandles(validCandles);
        setChartError(null);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;

        setHistoricalCandles([]);
        setChartError(
          err instanceof Error
            ? err.message
            : "Unable to load historical market data.",
        );
      } finally {
        if (!signal?.aborted) setChartLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    let active = true;

    const timeoutId = window.setTimeout(() => {
      if (active) void fetchMarketData(true);
    }, 0);

    const intervalId = window.setInterval(() => {
      if (active) void fetchMarketData(false);
    }, REFRESH_INTERVAL);

    return () => {
      active = false;
      window.clearTimeout(timeoutId);
      window.clearInterval(intervalId);
    };
  }, [fetchMarketData]);

  useEffect(() => {
    const controller = new AbortController();

    // Defer the request so the effect only schedules external work.
    const timeoutId = window.setTimeout(() => {
      void fetchHistoricalData(selectedRange, controller.signal);
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, [selectedRange, fetchHistoricalData]);

  return (
    <section className="rounded-2xl border border-[#e7ece9] bg-white p-5 shadow-[0_4px_18px_rgba(20,45,35,0.04)] sm:p-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e9f8f2] text-[#00a878]">
              <BarChart3 size={18} />
            </div>
            <h2 className="text-xl font-bold text-[#17231d]">
              Market Overview
            </h2>
          </div>
          <p className="mt-1 text-sm text-[#718078]">
            Track market prices and market movements.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="flex w-fit items-center gap-2 rounded-full bg-[#f2fbf7] px-3 py-1 text-xs font-medium text-[#00a878]">
            <span className="h-2 w-2 rounded-full bg-[#00a878]" />
            Upstox market data
          </span>
          <button
            type="button"
            onClick={() => void fetchMarketData(false)}
            disabled={loading || refreshing}
            aria-label="Refresh market data"
            title="Refresh market data"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e7ece9] text-[#53645a] transition hover:bg-[#f2fbf7] hover:text-[#00a878] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCw size={15} className={refreshing ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {lastUpdated && (
        <p className="mt-3 text-xs text-[#8a9890]">
          Last updated:{" "}
          {new Date(lastUpdated).toLocaleString("en-IN", {
            dateStyle: "medium",
            timeStyle: "medium",
          })}
          {" · "}Refreshes every 60 seconds
        </p>
      )}

      {error && (
        <div
          role="alert"
          className="mt-4 flex flex-col justify-between gap-3 rounded-xl border border-[#f4d5d5] bg-[#fff7f7] p-4 sm:flex-row sm:items-center"
        >
          <div>
            <p className="text-sm font-semibold text-[#b83d3d]">
              Unable to refresh market data
            </p>
            <p className="mt-1 wrap-break-words text-sm text-[#8c5555]">{error}</p>
          </div>
          <button
            type="button"
            onClick={() => void fetchMarketData(false)}
            className="w-fit rounded-lg bg-white px-3 py-2 text-sm font-semibold text-[#b83d3d] ring-1 ring-[#f0cccc] transition hover:bg-[#fff0f0]"
          >
            Try again
          </button>
        </div>
      )}

      {loading ? (
        <div
          className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3"
          aria-label="Loading market data"
        >
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="animate-pulse rounded-xl border border-[#edf1ee] bg-[#fbfcfb] p-4"
            >
              <div className="h-4 w-28 rounded bg-[#e7ece9]" />
              <div className="mt-5 h-7 w-36 rounded bg-[#e7ece9]" />
              <div className="mt-3 h-4 w-24 rounded bg-[#e7ece9]" />
            </div>
          ))}
        </div>
      ) : marketData.length > 0 ? (
        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
          {marketData.map((instrument) => (
            <div
              key={instrument.instrumentKey}
              className="rounded-xl border border-[#edf1ee] bg-[#fbfcfb] p-4 transition-all duration-200 hover:border-[#cceee0] hover:shadow-sm"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold text-[#53645a]">
                  {instrument.name}
                </p>
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full ${
                    instrument.positive
                      ? "bg-[#e9f8f2] text-[#00a878]"
                      : "bg-[#fff0f0] text-[#d94c4c]"
                  }`}
                  aria-label={
                    instrument.positive ? "Price increased" : "Price decreased"
                  }
                >
                  {instrument.positive ? (
                    <ArrowUpRight size={16} />
                  ) : (
                    <ArrowDownRight size={16} />
                  )}
                </span>
              </div>
              <p className="mt-3 text-xl font-bold tracking-tight text-[#17231d]">
                {formatPrice(instrument.value)}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
                <span
                  className={`font-semibold ${instrument.positive ? "text-[#00a878]" : "text-[#d94c4c]"}`}
                >
                  {formatPercentage(instrument.percentage)}
                </span>
                <span
                  className={
                    instrument.positive ? "text-[#00a878]" : "text-[#d94c4c]"
                  }
                >
                  {formatChange(instrument.change)}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !loading && (
          <div className="mt-5 rounded-xl border border-[#edf1ee] bg-[#fbfcfb] p-6 text-center">
            <p className="text-sm text-[#718078]">
              No market data is currently available.
            </p>
          </div>
        )
      )}

      <div className="mt-6 border-t border-[#edf1ee] pt-5">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-base font-semibold text-[#17231d]">
              NIFTY 50 Trend
            </h3>
            <p className="mt-1 text-xs text-[#8a9890]">
              Historical NIFTY 50 OHLC prices · Source: Upstox
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1 rounded-xl bg-[#f6f8f7] p-1">
            {TIME_RANGES.map((range) => (
              <button
                key={range}
                type="button"
                onClick={() => {
                  if (range !== selectedRange) {
                    setChartLoading(true);
                    setChartError(null);
                    setSelectedRange(range);
                  } else {
                    setChartLoading(true);
                    setChartError(null);
                    void fetchHistoricalData(range);
                  }
                }}
                aria-pressed={selectedRange === range}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  selectedRange === range
                    ? "bg-white text-[#00a878] shadow-sm"
                    : "text-[#7b8981] hover:text-[#17231d]"
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <NiftyCandlestickChart
            candles={historicalCandles}
            loading={chartLoading}
            error={chartError}
          />
        </div>

        <p className="mt-3 text-xs text-[#8a9890]">
          Each candle shows open, high, low, and close prices. Green candles
          indicate a close above the open; red candles indicate a close below
          the open.
        </p>
      </div>
    </section>
  );
}
