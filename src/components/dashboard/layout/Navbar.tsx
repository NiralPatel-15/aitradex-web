"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { Search, Bell, ChevronDown, Wallet, Command } from "lucide-react";

import { auth } from "@/lib/firebase";
import { logoutFromFirebase } from "@/lib/auth";
import Image from "next/image";
import {
  getMarketData,
  formatMarketPrice,
  formatMarketPercentage,
  MARKET_INSTRUMENT_NAMES,
  type MarketInstrument,
} from "@/lib/market-data";

type MarketTickerItem = {
  name: string;
  instrumentKey: string;
  price: number | null;
  changePercent: number | null;
};

type NavbarProfile = {
  fullName: string;
  email: string;
  profileImage: string | null;
};

const MARKET_INDICES = [
  {
    name: "NIFTY 50",
    instrumentKey: "NSE_INDEX|Nifty 50",
  },
  {
    name: "SENSEX",
    instrumentKey: "BSE_INDEX|SENSEX",
  },
  {
    name: "BANK NIFTY",
    instrumentKey: "NSE_INDEX|Nifty Bank",
  },
];

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
).replace(/\/+$/, "");

const DEFAULT_PROFILE: NavbarProfile = {
  fullName: "",
  email: "",
  profileImage: null,
};

function getInitials(name: string): string {
  const initials = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");

  return initials || "U";
}

function getIndexData(
  name: string,
  instrumentKey: string,
  instrument: MarketInstrument | undefined,
): MarketTickerItem {
  if (
    !instrument ||
    !Number.isFinite(instrument.last_price) ||
    instrument.last_price <= 0 ||
    !Number.isFinite(instrument.close_price) ||
    instrument.close_price <= 0
  ) {
    return {
      name,
      instrumentKey,
      price: null,
      changePercent: null,
    };
  }

  const changePercent =
    ((instrument.last_price - instrument.close_price) /
      instrument.close_price) *
    100;

  return {
    name,
    instrumentKey,
    price: instrument.last_price,
    changePercent,
  };
}

export default function Navbar() {
  const router = useRouter();
  const profileMenuRef = useRef<HTMLDivElement>(null);

  const [marketData, setMarketData] = useState<MarketTickerItem[]>(() =>
    MARKET_INDICES.map((index) => ({
      ...index,
      price: null,
      changePercent: null,
    })),
  );

  const [marketLoading, setMarketLoading] = useState(true);
  const [marketError, setMarketError] = useState(false);

  const [profile, setProfile] = useState<NavbarProfile>(DEFAULT_PROFILE);
  const [profileLoading, setProfileLoading] = useState(true);

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");

  // Load the authenticated user's profile from MongoDB.
  useEffect(() => {
    let active = true;

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!active) return;

      if (!firebaseUser) {
        setProfile(DEFAULT_PROFILE);
        setProfileLoading(false);
        setIsProfileMenuOpen(false);
        return;
      }

      // Display the Firebase identity while the database request runs.
      setProfile({
        fullName:
          firebaseUser.displayName?.trim() ||
          firebaseUser.email?.split("@")[0] ||
          "",
        email: firebaseUser.email ?? "",
        profileImage: firebaseUser.photoURL ?? null,
      });

      setProfileLoading(true);

      try {
        const token = await firebaseUser.getIdToken();

        const response = await fetch(
          `${API_URL}/users/firebase/${encodeURIComponent(firebaseUser.uid)}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
          },
        );

        const result = await response.json().catch(() => null);

        if (!response.ok || result?.success === false) {
          throw new Error(
            result?.message || `Profile request failed: ${response.status}`,
          );
        }

        const databaseUser = result?.user ?? result?.data?.user ?? result?.data;

        if (!databaseUser || typeof databaseUser !== "object") {
          throw new Error("The backend did not return a valid user profile.");
        }

        if (!active) return;

        setProfile({
          fullName:
            typeof databaseUser.fullName === "string" &&
            databaseUser.fullName.trim()
              ? databaseUser.fullName.trim()
              : typeof databaseUser.displayName === "string" &&
                  databaseUser.displayName.trim()
                ? databaseUser.displayName.trim()
                : firebaseUser.displayName?.trim() ||
                  firebaseUser.email?.split("@")[0] ||
                  "",
          email:
            typeof databaseUser.email === "string"
              ? databaseUser.email
              : (firebaseUser.email ?? ""),
          profileImage:
            typeof databaseUser.profileImage === "string" &&
            databaseUser.profileImage.trim()
              ? databaseUser.profileImage
              : typeof databaseUser.photoURL === "string" &&
                  databaseUser.photoURL.trim()
                ? databaseUser.photoURL
                : (firebaseUser.photoURL ?? null),
        });
      } catch (error) {
        console.error("Failed to load AITradeX profile:", error);
      } finally {
        if (active) {
          setProfileLoading(false);
        }
      }
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  // Close the account menu when clicking outside it or pressing Escape.
  useEffect(() => {
    if (!isProfileMenuOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setIsProfileMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isProfileMenuOpen]);

  // Firebase logout plus cleanup of the existing login cache.
  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    setLogoutError("");

    try {
      await logoutFromFirebase();

      // Clear only the session keys used by AITradeX.
      localStorage.removeItem("aitradex_token");
      localStorage.removeItem("aitradex_user");
      sessionStorage.removeItem("aitradex_token");
      sessionStorage.removeItem("aitradex_user");

      setIsProfileMenuOpen(false);

      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error("AITradeX logout failed:", error);

      setLogoutError("Logout failed. Please try again.");
      setIsLoggingOut(false);
    }
  };

  // Existing live market ticker integration.
  const loadMarketData = useCallback(async () => {
    try {
      const result = await getMarketData();
      const data = result.data ?? {};

      const availableIndices: MarketTickerItem[] = MARKET_INDICES.map(
        (index) => {
          const instrument = data[index.instrumentKey];

          return getIndexData(index.name, index.instrumentKey, instrument);
        },
      ).filter((item) => item.price !== null && item.changePercent !== null);

      const usedKeys = new Set(
        availableIndices.map((item) => item.instrumentKey),
      );

      const fallbackStocks: MarketTickerItem[] = Object.entries(data)
        .filter(([key, item]: [string, MarketInstrument]) => {
          return (
            key.startsWith("NSE_EQ|") &&
            !usedKeys.has(key) &&
            Number.isFinite(item.last_price) &&
            item.last_price > 0 &&
            Number.isFinite(item.close_price) &&
            item.close_price > 0
          );
        })
        .map(([key, item]) => ({
          name: MARKET_INSTRUMENT_NAMES[key] ?? "",
          instrumentKey: key,
          price: item.last_price,
          changePercent:
            ((item.last_price - item.close_price) / item.close_price) * 100,
        }))
        .filter((item) => item.name.length > 0)
        .sort(
          (a, b) =>
            Math.abs(b.changePercent ?? 0) - Math.abs(a.changePercent ?? 0),
        );

      const missingSlots = MARKET_INDICES.length - availableIndices.length;

      setMarketData([
        ...availableIndices,
        ...fallbackStocks.slice(0, missingSlots),
      ]);

      setMarketError(false);
    } catch (error) {
      console.error("Failed to load navbar market data:", error);
      setMarketError(true);
    } finally {
      setMarketLoading(false);
    }
  }, []);

  useEffect(() => {
    const initialTimer = window.setTimeout(() => {
      void loadMarketData();
    }, 0);

    const refreshInterval = window.setInterval(() => {
      void loadMarketData();
    }, 60_000);

    return () => {
      window.clearTimeout(initialTimer);
      window.clearInterval(refreshInterval);
    };
  }, [loadMarketData]);

  const displayName =
    profile.fullName ||
    (profileLoading ? "Loading profile..." : "AITradeX User");

  const initials = getInitials(profile.fullName);

  return (
    <header className="sticky top-0 z-30 bg-white">
      {/* Main Navigation */}
      <div className="flex h-21 items-center justify-between gap-6 border-b border-[#edf0f4] px-8">
        {/* Search */}
        <div className="relative w-full max-w-110">
          <Search
            size={19}
            strokeWidth={1.8}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9aa5b7]"
          />

          <input
            type="search"
            placeholder="Search for stocks, ETFs, IPOs..."
            aria-label="Search stocks, ETFs, and IPOs"
            className="h-12 w-full rounded-xl border border-[#e3e8ef] bg-[#fbfcfd] pl-12 pr-12 text-[14px] text-[#172033] outline-none transition-colors placeholder:text-[#9aa5b7] focus:border-[#00b887] focus:ring-2 focus:ring-[#00b887]/10"
          />

          <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1 rounded-md border border-[#e7ebf1] px-1.5 py-1 text-[11px] text-[#9aa5b7]">
            <Command size={11} />K
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex shrink-0 items-center gap-5">
          <Link
            href="/dashboard/wallet"
            className="hidden items-center gap-3 rounded-xl border border-[#e6ebf1] px-4 py-2.5 transition-colors hover:bg-[#f8fafc] sm:flex"
          >
            <Wallet size={19} className="text-[#00b887]" />

            <div>
              <p className="text-[11px] font-medium text-[#8a95a8]">
                Wallet Balance
              </p>

              <p className="text-[14px] font-semibold text-[#172033]">—</p>
            </div>
          </Link>

          <button
            type="button"
            aria-label="Notifications"
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[#e6ebf1] text-[#536078] transition-colors hover:bg-[#f5f8fa]"
          >
            <Bell size={20} strokeWidth={1.8} />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#f0445f] ring-2 ring-white" />
          </button>

          {/* Account Dropdown */}
          <div className="relative" ref={profileMenuRef}>
            <button
              type="button"
              onClick={() => setIsProfileMenuOpen((open) => !open)}
              aria-label="Open account menu"
              aria-expanded={isProfileMenuOpen}
              aria-haspopup="menu"
              className="flex items-center gap-3 rounded-xl outline-none transition-colors hover:bg-[#f8fafc] focus-visible:ring-2 focus-visible:ring-[#00b887] focus-visible:ring-offset-2"
            >
              {profile.profileImage ? (
                <Image
                  src={profile.profileImage}
                  alt="Profile picture"
                  width={40}
                  height={40}
                  unoptimized
                  className="h-10 w-10 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#172033] text-[13px] font-semibold text-white">
                  {initials}
                </div>
              )}

              <div className="hidden max-w-40 text-left leading-tight lg:block">
                <p className="truncate text-[14px] font-semibold text-[#172033]">
                  {displayName}
                </p>

                <p className="mt-1 truncate text-[12px] text-[#8a95a8]">
                  {profile.email || "AITradeX Account"}
                </p>
              </div>

              <ChevronDown
                size={16}
                className={`text-[#8a95a8] transition-transform ${
                  isProfileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isProfileMenuOpen && (
              <div
                role="menu"
                aria-label="Account menu"
                className="absolute right-0 top-full z-50 mt-3 w-64 overflow-hidden rounded-2xl border border-[#e6ebf1] bg-white p-2 shadow-xl"
              >
                <div className="border-b border-[#edf0f4] px-3 py-3">
                  <p className="truncate text-sm font-semibold text-[#172033]">
                    {displayName}
                  </p>

                  <p className="mt-1 truncate text-xs text-[#8a95a8]">
                    {profile.email || "AITradeX Account"}
                  </p>
                </div>

                <Link
                  href="/dashboard/profile"
                  role="menuitem"
                  onClick={() => setIsProfileMenuOpen(false)}
                  className="mt-2 block rounded-xl px-3 py-3 text-sm font-medium text-[#344158] transition-colors hover:bg-[#f5f8fa]"
                >
                  My Profile
                </Link>

                <Link
                  href="/dashboard/wallet"
                  role="menuitem"
                  onClick={() => setIsProfileMenuOpen(false)}
                  className="block rounded-xl px-3 py-3 text-sm font-medium text-[#344158] transition-colors hover:bg-[#f5f8fa]"
                >
                  My Wallet
                </Link>

                {logoutError && (
                  <p role="alert" className="px-3 py-2 text-xs text-[#f0445f]">
                    {logoutError}
                  </p>
                )}

                <button
                  type="button"
                  role="menuitem"
                  disabled={isLoggingOut}
                  onClick={handleLogout}
                  className="mt-1 block w-full rounded-xl px-3 py-3 text-left text-sm font-semibold text-[#f0445f] transition-colors hover:bg-[#fff1f2] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoggingOut ? "Signing out..." : "Logout"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* API-connected Market Ticker */}
      <div className="flex h-13.5 items-center gap-8 overflow-x-auto border-b border-[#edf0f4] px-8">
        <div className="flex shrink-0 items-center gap-2 text-[12px] font-semibold text-[#69758a]">
          <span
            className={`h-2 w-2 rounded-full ${
              marketError
                ? "bg-[#f0445f]"
                : marketLoading
                  ? "animate-pulse bg-[#e9a23b]"
                  : "bg-[#00c896]"
            }`}
          />
          Live Markets
        </div>

        {marketData.map((market) => {
          const available =
            market.price !== null && market.changePercent !== null;

          const positive = available && market.changePercent! >= 0;

          return (
            <div
              key={market.instrumentKey}
              title={
                available
                  ? market.instrumentKey
                  : `${market.name}: data unavailable from the current API response`
              }
              className="flex shrink-0 items-center gap-3 text-[12px]"
            >
              <span className="font-semibold text-[#344158]">
                {market.name}
              </span>

              <span className="text-[#69758a]">
                {marketLoading && !available
                  ? "Loading..."
                  : available
                    ? `₹${formatMarketPrice(market.price!)}`
                    : "Unavailable"}
              </span>

              <span
                className={
                  !available
                    ? "font-medium text-[#9aa5b7]"
                    : positive
                      ? "font-semibold text-[#00ad7b]"
                      : "font-semibold text-[#f0445f]"
                }
              >
                {available
                  ? formatMarketPercentage(market.changePercent!)
                  : "—"}
              </span>
            </div>
          );
        })}

        {marketError && (
          <span role="status" className="shrink-0 text-[11px] text-[#f0445f]">
            Market data unavailable
          </span>
        )}
      </div>
    </header>
  );
}
