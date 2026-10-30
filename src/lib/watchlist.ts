"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "aitradex_watchlist_v1";

const DEFAULT_WATCHLIST = [
  "RELIANCE",
  "HDFCBANK",
];

export function getSavedWatchlist(): string[] {
  if (typeof window === "undefined") return DEFAULT_WATCHLIST;

  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return DEFAULT_WATCHLIST;

    const parsed: unknown = JSON.parse(saved);

    if (
      Array.isArray(parsed) &&
      parsed.every((item) => typeof item === "string")
    ) {
      return parsed;
    }
  } catch {
    // Recover safely if browser storage contains invalid data.
  }

  return DEFAULT_WATCHLIST;
}

export function saveWatchlist(symbols: string[]): void {
  if (typeof window === "undefined") return;

  localStorage.setItem(STORAGE_KEY, JSON.stringify([...new Set(symbols)]));
}

export function useWatchlist() {
  const [symbols, setSymbols] = useState<string[]>(DEFAULT_WATCHLIST);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setSymbols(getSavedWatchlist());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) saveWatchlist(symbols);
  }, [symbols, loaded]);

  function toggle(symbol: string) {
    setSymbols((current) =>
      current.includes(symbol)
        ? current.filter((item) => item !== symbol)
        : [...current, symbol]
    );
  }

  function remove(symbol: string) {
    setSymbols((current) => current.filter((item) => item !== symbol));
  }

  function add(symbol: string) {
    setSymbols((current) =>
      current.includes(symbol) ? current : [...current, symbol]
    );
  }

  return { symbols, loaded, toggle, remove, add };
}
