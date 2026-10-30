"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Search,
  Star,
  TrendingUp,
  TrendingDown,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  X,
  Bookmark,
  BarChart3,
  RefreshCw,
} from "lucide-react";

import { useWatchlist } from "@/lib/watchlist";
import {
  getMarketData,
  formatMarketPrice,
  formatMarketPercentage,
  type MarketApiResponse,
} from "@/lib/market-data";

type Filter = "All Stocks" | "Gainers" | "Losers";

type StockInfo = {
  symbol: string;
  name: string;
  sector: string;
  instrumentKey: string;
};

type Stock = StockInfo & {
  price: number | null;
  change: number | null;
  volume: number | null;
  previousClose: number | null;
};

// Only add instruments supported by the existing market-data API.
const STOCK_CATALOG: StockInfo[] = [
  {
    symbol: "RELIANCE",
    name: "Reliance Industries",
    sector: "Energy",
    instrumentKey: "NSE_EQ|INE002A01018",
  },
  {
    symbol: "HDFCBANK",
    name: "HDFC Bank",
    sector: "Banking",
    instrumentKey: "NSE_EQ|INE040A01034",
  },
  {
    symbol: "TCS",
    name: "Tata Consultancy Services",
    sector: "IT Services",
    instrumentKey: "NSE_EQ|INE467B01029",
  },
  {
    symbol: "INFY",
    name: "Infosys",
    sector: "IT Services",
    instrumentKey: "NSE_EQ|INE009A01021",
  },
  {
    symbol: "ICICIBANK",
    name: "ICICI Bank",
    sector: "Banking",
    instrumentKey: "NSE_EQ|INE090A01021",
  },
  {
    symbol: "BHARTIARTL",
    name: "Bharti Airtel",
    sector: "Telecom",
    instrumentKey: "NSE_EQ|INE397D01024",
  },
  {
    symbol: "WIPRO",
    name: "Wipro",
    sector: "IT Services",
    instrumentKey: "NSE_EQ|INE075A01022",
  },
  {
    symbol: "ITC",
    name: "ITC",
    sector: "Consumer Goods",
    instrumentKey: "NSE_EQ|INE154A01025",
  },
  {
    symbol: "SBIN",
    name: "State Bank of India",
    sector: "Banking",
    instrumentKey: "NSE_EQ|INE062A01020",
  },
  {
    symbol: "AXISBANK",
    name: "Axis Bank",
    sector: "Banking",
    instrumentKey: "NSE_EQ|INE238A01034",
  },
  {
    symbol: "LT",
    name: "Larsen & Toubro",
    sector: "Industrials",
    instrumentKey: "NSE_EQ|INE018A01030",
  },
  {
    symbol: "NIFTYBEES",
    name: "Nippon India ETF Nifty 50",
    sector: "ETF",
    instrumentKey: "NSE_EQ|INF204KB14I2",
  },
];

const FILTERS: Filter[] = ["All Stocks", "Gainers", "Losers"];

const SECTORS = [
  "All Sectors",
  "Energy",
  "Banking",
  "IT Services",
  "Telecom",
  "Consumer Goods",
  "Industrials",
  "ETF",
];

export default function WatchlistPage() {
  const {
    symbols: watchlistSymbols,
    loaded: watchlistLoaded,
    add: addToWatchlist,
    remove: removeFromWatchlist,
  } = useWatchlist();

  const [marketData, setMarketData] = useState<MarketApiResponse["data"]>({});
  const [marketLoading, setMarketLoading] = useState(true);
  const [marketError, setMarketError] = useState("");
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("All Stocks");
  const [selectedSector, setSelectedSector] = useState("All Sectors");

  const [showAddModal, setShowAddModal] = useState(false);
  const [newSymbol, setNewSymbol] = useState("");
  const [message, setMessage] = useState("");

  const refreshMarketData = useCallback(async () => {
    try {
      const response = await getMarketData();

      setMarketData(response.data ?? {});
      setMarketError("");
      setLastUpdated(response.timestamp ?? new Date().toISOString());
    } catch (error) {
      setMarketError(
        error instanceof Error ? error.message : "Unable to load market data.",
      );
    } finally {
      setMarketLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;

    const loadMarketData = async () => {
      try {
        const response = await getMarketData();

        if (!active) return;

        setMarketData(response.data ?? {});
        setMarketError("");
        setLastUpdated(response.timestamp ?? new Date().toISOString());
      } catch (error) {
        if (!active) return;

        setMarketError(
          error instanceof Error
            ? error.message
            : "Unable to load market data.",
        );
      } finally {
        if (active) {
          setMarketLoading(false);
        }
      }
    };

    void loadMarketData();

    const interval = window.setInterval(() => {
      void loadMarketData();
    }, 60_000);

    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, []);

  const stocks = useMemo<Stock[]>(() => {
    return watchlistSymbols.map((symbol) => {
      const info = STOCK_CATALOG.find((stock) => stock.symbol === symbol);

      if (!info) {
        return {
          symbol,
          name: symbol,
          sector: "Other",
          instrumentKey: "",
          price: null,
          change: null,
          volume: null,
          previousClose: null,
        };
      }

      const instrument = marketData?.[info.instrumentKey];

      return {
        ...info,
        price:
          typeof instrument?.last_price === "number"
            ? instrument.last_price
            : null,
        change:
          typeof instrument?.change_percent === "number"
            ? instrument.change_percent
            : null,
        volume:
          typeof instrument?.volume === "number" ? instrument.volume : null,
        previousClose:
          typeof instrument?.close_price === "number"
            ? instrument.close_price
            : null,
      };
    });
  }, [watchlistSymbols, marketData]);

  const filteredStocks = useMemo(() => {
    const term = search.trim().toLowerCase();

    return stocks.filter((stock) => {
      const matchesSearch =
        stock.name.toLowerCase().includes(term) ||
        stock.symbol.toLowerCase().includes(term);

      const matchesFilter =
        filter === "All Stocks" ||
        (filter === "Gainers" && stock.change !== null && stock.change > 0) ||
        (filter === "Losers" && stock.change !== null && stock.change < 0);

      const matchesSector =
        selectedSector === "All Sectors" || stock.sector === selectedSector;

      return matchesSearch && matchesFilter && matchesSector;
    });
  }, [stocks, search, filter, selectedSector]);

  const gainers = stocks.filter(
    (stock) => stock.change !== null && stock.change > 0,
  ).length;

  const losers = stocks.filter(
    (stock) => stock.change !== null && stock.change < 0,
  ).length;

  const availableChanges = stocks
    .map((stock) => stock.change)
    .filter((change): change is number => change !== null);

  const averageChange =
    availableChanges.length > 0
      ? availableChanges.reduce((total, change) => total + change, 0) /
        availableChanges.length
      : null;

  const formatPrice = (price: number | null) =>
    price === null ? "—" : `₹${formatMarketPrice(price)}`;

  const formatVolume = (volume: number | null) => {
    if (volume === null) return "—";

    if (volume >= 1_000_000) {
      return `${(volume / 1_000_000).toFixed(2)}M`;
    }

    if (volume >= 1_000) {
      return `${(volume / 1_000).toFixed(2)}K`;
    }

    return volume.toLocaleString("en-IN");
  };

  const addStock = () => {
    const symbol = newSymbol.trim().toUpperCase();

    if (!symbol) {
      setMessage("Please enter a stock symbol.");
      return;
    }

    const stock = STOCK_CATALOG.find((item) => item.symbol === symbol);

    if (!stock) {
      setMessage(
        "This symbol is not in the currently supported market-data list.",
      );
      return;
    }

    if (!marketData?.[stock.instrumentKey]) {
      setMessage(
        "Live data for this stock is not currently available. Please try again later.",
      );
      return;
    }

    if (watchlistSymbols.includes(symbol)) {
      setMessage("This stock is already in your watchlist.");
      return;
    }

    addToWatchlist(symbol);
    setNewSymbol("");
    setMessage("");
    setShowAddModal(false);
  };

  const removeStock = (symbol: string) => {
    removeFromWatchlist(symbol);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
    setNewSymbol("");
    setMessage("");
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="mb-1 text-sm font-medium text-[#00a77d]">
            Your Market Tracker
          </p>

          <h1 className="text-2xl font-bold tracking-tight text-[#172033] sm:text-3xl">
            My Watchlist
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Track your favourite stocks and monitor their performance.
          </p>

          {lastUpdated && (
            <p className="mt-2 text-xs text-slate-400">
              Last updated: {new Date(lastUpdated).toLocaleTimeString()}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => void refreshMarketData()}
            disabled={marketLoading}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
          >
            <RefreshCw
              size={16}
              className={marketLoading ? "animate-spin" : ""}
            />
            Refresh
          </button>

          <button
            type="button"
            onClick={() => {
              setShowAddModal(true);
              setNewSymbol("");
              setMessage("");
            }}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#00c896] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#00b387]"
          >
            <Plus size={17} />
            Add Stock
          </button>
        </div>
      </div>

      {/* API status */}
      {marketError && (
        <div
          role="alert"
          className="rounded-xl border border-rose-100 bg-rose-50 p-4 text-sm text-rose-700"
        >
          <p className="font-semibold">Unable to refresh live market data</p>
          <p className="mt-1">{marketError}</p>
          <p className="mt-1 text-xs">
            Your saved watchlist is still available. Check that your backend is
            running and try refreshing again.
          </p>
        </div>
      )}

      {/* Overview */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Total Stocks</p>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Bookmark size={19} />
            </span>
          </div>
          <h2 className="mt-4 text-2xl font-bold text-[#172033]">
            {watchlistLoaded ? stocks.length : "—"}
          </h2>
          <p className="mt-1 text-xs text-slate-400">Stocks being monitored</p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Market Gainers</p>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <TrendingUp size={19} />
            </span>
          </div>
          <h2 className="mt-4 text-2xl font-bold text-emerald-600">
            {gainers}
          </h2>
          <p className="mt-1 text-xs text-slate-400">Positive price movement</p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Market Losers</p>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
              <TrendingDown size={19} />
            </span>
          </div>
          <h2 className="mt-4 text-2xl font-bold text-rose-600">{losers}</h2>
          <p className="mt-1 text-xs text-slate-400">Negative price movement</p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Average Change</p>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <BarChart3 size={19} />
            </span>
          </div>
          <h2
            className={`mt-4 text-2xl font-bold ${
              averageChange === null
                ? "text-slate-400"
                : averageChange >= 0
                  ? "text-emerald-600"
                  : "text-rose-600"
            }`}
          >
            {averageChange === null
              ? "—"
              : formatMarketPercentage(averageChange)}
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            Average of available live changes
          </p>
        </div>
      </section>

      {/* Watchlist Table */}
      <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div>
              <h2 className="text-lg font-bold text-[#172033]">
                Favourite Stocks
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Your personal stock tracking list.
              </p>
            </div>

            <div className="relative w-full lg:max-w-xs">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search stock or symbol..."
                aria-label="Search watchlist stocks"
                className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-[#00c896] focus:ring-2 focus:ring-[#00c896]/10"
              />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col justify-between gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((item) => (
              <button
                type="button"
                key={item}
                onClick={() => setFilter(item)}
                className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition ${
                  filter === item
                    ? "bg-[#00c896] text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <select
            value={selectedSector}
            onChange={(event) => setSelectedSector(event.target.value)}
            aria-label="Filter by sector"
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 outline-none focus:border-[#00c896]"
          >
            {SECTORS.map((sector) => (
              <option key={sector} value={sector}>
                {sector}
              </option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-212.5 text-left">
            <thead className="bg-slate-50">
              <tr className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                <th className="px-5 py-4">Company</th>
                <th className="px-5 py-4">Sector</th>
                <th className="px-5 py-4 text-right">Market Price</th>
                <th className="px-5 py-4 text-right">Change</th>
                <th className="px-5 py-4 text-right">Volume</th>
                <th className="px-5 py-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {!watchlistLoaded ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center">
                    <RefreshCw
                      size={20}
                      className="mx-auto mb-2 animate-spin text-slate-400"
                    />
                    <p className="text-sm text-slate-500">
                      Loading your watchlist...
                    </p>
                  </td>
                </tr>
              ) : (
                filteredStocks.map((stock) => (
                  <tr
                    key={stock.symbol}
                    className="transition hover:bg-slate-50/70"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-sm font-bold text-[#00a77d]">
                          {stock.symbol.slice(0, 2)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[#172033]">
                            {stock.name}
                          </p>
                          <p className="mt-0.5 text-xs text-slate-500">
                            {stock.symbol}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {stock.sector}
                    </td>

                    <td className="px-5 py-4 text-right text-sm font-semibold text-[#172033]">
                      {formatPrice(stock.price)}
                    </td>

                    <td className="px-5 py-4 text-right">
                      {stock.change === null ? (
                        <span className="text-sm text-slate-400">—</span>
                      ) : (
                        <span
                          className={`inline-flex items-center justify-end gap-1 text-sm font-semibold ${
                            stock.change >= 0
                              ? "text-emerald-600"
                              : "text-rose-600"
                          }`}
                        >
                          {stock.change >= 0 ? (
                            <ArrowUpRight size={15} />
                          ) : (
                            <ArrowDownRight size={15} />
                          )}
                          {formatMarketPercentage(stock.change)}
                        </span>
                      )}
                    </td>

                    <td className="px-5 py-4 text-right text-sm text-slate-600">
                      {formatVolume(stock.volume)}
                    </td>

                    <td className="px-5 py-4 text-center">

                      <button
                        type="button"
                        onClick={() => removeStock(stock.symbol)}
                        title="Remove from watchlist"
                        aria-label={`Remove ${stock.name} from watchlist`}
                        className="rounded-lg p-2 text-amber-500 transition hover:bg-amber-50 hover:text-rose-600"
                      >
                        <Star size={18} fill="currentColor" />
                      </button>
                    </td>
                  </tr>
                ))
              )}

              {watchlistLoaded && filteredStocks.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-14 text-center">
                    <Search size={28} className="mx-auto mb-2 text-slate-300" />
                    <p className="text-sm font-semibold text-slate-600">
                      {stocks.length === 0
                        ? "Your watchlist is empty"
                        : "No stocks found"}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      {stocks.length === 0
                        ? "Add a stock to start tracking live market movements."
                        : "Try another search or change your filters."}
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-slate-100 px-5 py-4 text-xs text-slate-400">
          Showing {filteredStocks.length} of {stocks.length} stocks
          <span className="ml-2">
            · Prices refresh automatically every 60 seconds
          </span>
        </div>
      </section>

      {/* Data information */}
      <div className="rounded-xl border border-blue-100 bg-blue-50/70 p-4">
        <p className="text-sm font-semibold text-blue-900">Live Market Data</p>
        <p className="mt-1 text-xs leading-5 text-blue-700">
          Prices and percentage changes are obtained from your existing backend
          market-data API. A dash means that data is unavailable from the
          current response. Volume is displayed only when supplied by the API.
          Market capitalization is not displayed because the current market-data
          response does not provide it.
        </p>
        <p className="mt-2 text-xs leading-5 text-blue-700">
          Your watchlist is saved in this browser. It is not yet synced across
          different devices or user accounts.
        </p>
      </div>

      {/* Add Stock Modal */}
      {showAddModal && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
          onClick={closeAddModal}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-stock-title"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div>
                <h2
                  id="add-stock-title"
                  className="text-xl font-bold text-[#172033]"
                >
                  Add a Stock
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Add a stock supported by the current market API.
                </p>
              </div>

              <button
                type="button"
                onClick={closeAddModal}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <label
              htmlFor="stock-symbol"
              className="mb-2 mt-6 block text-sm font-semibold text-slate-700"
            >
              Stock Symbol
            </label>

            <input
              id="stock-symbol"
              value={newSymbol}
              onChange={(event) => {
                setNewSymbol(event.target.value.toUpperCase());
                setMessage("");
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  addStock();
                }
              }}
              list="supported-stock-symbols"
              placeholder="e.g. RELIANCE"
              autoComplete="off"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm uppercase outline-none focus:border-[#00c896] focus:ring-2 focus:ring-[#00c896]/10"
            />

            <datalist id="supported-stock-symbols">
              {STOCK_CATALOG.map((stock) => (
                <option
                  key={stock.symbol}
                  value={stock.symbol}
                  label={stock.name}
                />
              ))}
            </datalist>

            <div className="mt-3 rounded-lg bg-slate-50 p-3">
              <p className="text-xs font-semibold text-slate-600">
                Currently supported symbols
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                {STOCK_CATALOG.map((stock) => stock.symbol).join(", ")}
              </p>
            </div>

            {message && (
              <p
                role="alert"
                className="mt-3 rounded-lg bg-blue-50 p-3 text-xs leading-5 text-blue-700"
              >
                {message}
              </p>
            )}

            <button
              type="button"
              onClick={addStock}
              className="mt-5 w-full rounded-xl bg-[#00c896] py-3 text-sm font-semibold text-white transition hover:bg-[#00b387]"
            >
              Add to Watchlist
            </button>

            <p className="mt-3 text-center text-xs text-slate-400">
              Only stocks returned by the existing market API can be added.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
