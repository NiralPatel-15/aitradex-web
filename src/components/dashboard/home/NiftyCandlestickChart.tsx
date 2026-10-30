"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  CandlestickSeries,
  ColorType,
  createChart,
  type IChartApi,
  type ISeriesApi,
  type CandlestickData,
  type Time,
} from "lightweight-charts";

interface HistoricalCandle {
  timestamp: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}

interface NiftyCandlestickChartProps {
  candles: HistoricalCandle[];
  loading?: boolean;
  error?: string | null;
}

interface PerformanceStats {
  firstPrice: number;
  latestPrice: number;
  priceChange: number;
  percentageChange: number;
  direction: "up" | "down" | "unchanged";
}

export default function NiftyCandlestickChart({
  candles,
  loading = false,
  error = null,
}: NiftyCandlestickChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

  const [selectedCandle, setSelectedCandle] = useState<HistoricalCandle | null>(
    null,
  );

  // Format prices consistently in Indian rupees.
  const formatPrice = (value: number | undefined) => {
    if (value === undefined || !Number.isFinite(value)) {
      return "—";
    }

    return `₹${value.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  // Validate, normalize, and sort the actual API candles.
  const validCandles = useMemo(() => {
    return candles
      .filter((candle) => {
        if (!candle || typeof candle.timestamp !== "string") {
          return false;
        }

        const timestamp = new Date(candle.timestamp).getTime();

        return (
          Number.isFinite(timestamp) &&
          Number.isFinite(Number(candle.open)) &&
          Number.isFinite(Number(candle.high)) &&
          Number.isFinite(Number(candle.low)) &&
          Number.isFinite(Number(candle.close)) &&
          Number(candle.high) >= Number(candle.low)
        );
      })
      .map((candle) => ({
        ...candle,
        open: Number(candle.open),
        high: Number(candle.high),
        low: Number(candle.low),
        close: Number(candle.close),
      }))
      .sort(
        (a, b) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
      )
      .filter(
        (candle, index, array) =>
          index === 0 ||
          new Date(candle.timestamp).getTime() >
            new Date(array[index - 1].timestamp).getTime(),
      );
  }, [candles]);

  // Calculate performance from the first and latest available candles.
  const performance: PerformanceStats | null = useMemo(() => {
    if (validCandles.length === 0) {
      return null;
    }

    const firstPrice = validCandles[0].close;
    const latestPrice = validCandles[validCandles.length - 1].close;

    const priceChange = latestPrice - firstPrice;

    const percentageChange =
      firstPrice !== 0 ? (priceChange / firstPrice) * 100 : 0;

    return {
      firstPrice,
      latestPrice,
      priceChange,
      percentageChange,
      direction:
        priceChange > 0 ? "up" : priceChange < 0 ? "down" : "unchanged",
    };
  }, [validCandles]);

  // const isPositive = (performance?.priceChange ?? 0) >= 0;

  const performanceColor =
    performance?.direction === "down"
      ? "text-[#ef4444]"
      : performance?.direction === "up"
        ? "text-[#00a878]"
        : "text-[#718078]";

  // Initialize the chart once.
  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const chart = createChart(container, {
      width: container.clientWidth || 600,
      height: 380,

      layout: {
        background: {
          type: ColorType.Solid,
          color: "#ffffff",
        },
        textColor: "#718078",
        fontFamily: "Inter, Arial, sans-serif",
        attributionLogo: true,
      },

      grid: {
        vertLines: {
          color: "#f0f3f1",
        },
        horzLines: {
          color: "#f0f3f1",
        },
      },

      rightPriceScale: {
        borderColor: "#e7ece9",
        scaleMargins: {
          top: 0.1,
          bottom: 0.1,
        },
      },

      timeScale: {
        borderColor: "#e7ece9",
        timeVisible: true,
        secondsVisible: false,
        rightOffset: 5,
      },

      crosshair: {
        vertLine: {
          color: "#00b887",
          labelBackgroundColor: "#00a878",
        },
        horzLine: {
          color: "#00b887",
          labelBackgroundColor: "#00a878",
        },
      },

      handleScroll: true,
      handleScale: true,
    });

    const series = chart.addSeries(CandlestickSeries, {
      upColor: "#00b887",
      downColor: "#ef4444",
      borderUpColor: "#00b887",
      borderDownColor: "#ef4444",
      wickUpColor: "#00b887",
      wickDownColor: "#ef4444",
      lastValueVisible: true,
      priceLineVisible: true,
    });

    chartRef.current = chart;
    seriesRef.current = series;

    // Display OHLC values for the hovered candle.
    chart.subscribeCrosshairMove((param) => {
      if (!param.time) {
        setSelectedCandle(null);
        return;
      }

      const data = param.seriesData.get(series);

      if (
        !data ||
        !("open" in data) ||
        !("high" in data) ||
        !("low" in data) ||
        !("close" in data)
      ) {
        setSelectedCandle(null);
        return;
      }

      let timestamp: string;

      if (typeof param.time === "number") {
        timestamp = new Date(param.time * 1000).toISOString();
      } else if (typeof param.time === "string") {
        timestamp = param.time;
      } else {
        timestamp = new Date(
          Date.UTC(param.time.year, param.time.month - 1, param.time.day),
        ).toISOString();
      }

      setSelectedCandle({
        timestamp,
        open: data.open,
        high: data.high,
        low: data.low,
        close: data.close,
      });
    });

    // Keep the chart responsive.
    const resizeObserver = new ResizeObserver(() => {
      const width = container.clientWidth;

      if (width > 0) {
        chart.applyOptions({ width });
      }
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      chart.remove();

      chartRef.current = null;
      seriesRef.current = null;
    };
  }, []);

  // Update the chart when historical candles change.
  useEffect(() => {
    const series = seriesRef.current;
    const chart = chartRef.current;

    if (!series || !chart) return;

    const formattedCandles: CandlestickData<Time>[] = validCandles.map(
      (candle) => ({
        time: Math.floor(new Date(candle.timestamp).getTime() / 1000) as Time,
        open: candle.open,
        high: candle.high,
        low: candle.low,
        close: candle.close,
      }),
    );

    series.setData(formattedCandles);

    if (formattedCandles.length > 0) {
      chart.timeScale().fitContent();
    }
  }, [validCandles]);

  return (
    <div className="relative w-full">
      {/* Performance summary */}
      <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-[#edf1ee] bg-white p-4">
          <p className="text-sm text-[#718078]">Latest Close</p>

          <p className="mt-2 text-xl font-semibold text-[#17231d]">
            {formatPrice(performance?.latestPrice)}
          </p>

          <p className="mt-1 text-xs text-[#8a9890]">Latest available candle</p>
        </div>

        <div className="rounded-xl border border-[#edf1ee] bg-white p-4">
          <p className="text-sm text-[#718078]">Starting Close</p>

          <p className="mt-2 text-xl font-semibold text-[#17231d]">
            {formatPrice(performance?.firstPrice)}
          </p>

          <p className="mt-1 text-xs text-[#8a9890]">
            First candle in selected range
          </p>
        </div>

        <div className="rounded-xl border border-[#edf1ee] bg-white p-4">
          <p className="text-sm text-[#718078]">Price Change</p>

          <p className={`mt-2 text-xl font-semibold ${performanceColor}`}>
            {performance
              ? `${performance.priceChange > 0 ? "+" : ""}${formatPrice(
                  performance.priceChange,
                )}`
              : "—"}
          </p>

          <p className="mt-1 text-xs text-[#8a9890]">
            Difference between closing prices
          </p>
        </div>

        <div className="rounded-xl border border-[#edf1ee] bg-white p-4">
          <p className="text-sm text-[#718078]">Period Return</p>

          <p className={`mt-2 text-xl font-semibold ${performanceColor}`}>
            {performance
              ? `${performance.percentageChange > 0 ? "+" : ""}${performance.percentageChange.toFixed(2)}%`
              : "—"}
          </p>

          <p className={`mt-1 text-xs ${performanceColor}`}>
            {!performance
              ? "Waiting for historical data"
              : performance.direction === "up"
                ? "Positive movement"
                : performance.direction === "down"
                  ? "Negative movement"
                  : "No price change"}
          </p>
        </div>
      </div>

      {/* OHLC information for the hovered candle */}
      <div className="mb-4 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-xl border border-[#edf1ee] bg-[#fbfcfb] px-4 py-3">
        {[
          { label: "Open", value: selectedCandle?.open },
          { label: "High", value: selectedCandle?.high },
          { label: "Low", value: selectedCandle?.low },
          { label: "Close", value: selectedCandle?.close },
        ].map((item) => (
          <div key={item.label} className="flex flex-col gap-1">
            <span className="text-xs text-[#8a9890]">{item.label}</span>

            <span className="text-sm font-semibold text-[#17231d]">
              {formatPrice(item.value)}
            </span>
          </div>
        ))}

        {selectedCandle && (
          <div className="flex flex-col gap-1">
            <span className="text-xs text-[#8a9890]">Candle Change</span>

            <span
              className={`text-sm font-semibold ${
                selectedCandle.close >= selectedCandle.open
                  ? "text-[#00a878]"
                  : "text-danger"
              }`}
            >
              {selectedCandle.close - selectedCandle.open > 0 ? "+" : ""}
              {(selectedCandle.close - selectedCandle.open).toLocaleString(
                "en-IN",
                {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                },
              )}

              {" ("}

              {selectedCandle.open !== 0
                ? (
                    ((selectedCandle.close - selectedCandle.open) /
                      selectedCandle.open) *
                    100
                  ).toFixed(2) + "%"
                : "—"}

              {")"}
            </span>
          </div>
        )}
      </div>

      {/* Chart container */}
      <div
        ref={containerRef}
        className="h-95 w-full"
        aria-label="NIFTY 50 historical candlestick chart"
      />

      {loading && (
        <div
          role="status"
          className="absolute left-3 top-3 rounded-lg bg-white/95 px-3 py-2 text-xs text-[#718078] shadow-sm"
        >
          Loading historical prices...
        </div>
      )}

      {error && (
        <div
          role="alert"
          className="absolute inset-x-3 top-3 rounded-lg border border-red-200 bg-white/95 p-3 text-sm text-red-600 shadow-sm"
        >
          {error}
        </div>
      )}

      {!loading && !error && validCandles.length === 0 && (
        <div className="flex min-h-24 items-center justify-center text-sm text-[#718078]">
          No historical candles were returned by the API.
        </div>
      )}

      <p className="mt-3 text-xs leading-5 text-[#8a9890]">
        Performance is calculated from the first and latest available closing
        prices in the selected range. It represents historical price movement,
        not a guaranteed future return.
      </p>
    </div>
  );
}
