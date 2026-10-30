export interface MarketInstrument {
  instrument_key: string;
  last_price: number;
  close_price: number;
  ltq?: number;
  volume?: number;
  change: number;
  change_percent: number;
}

export interface MarketApiResponse {
  success: boolean;
  source?: string;
  api_version?: string;
  timestamp?: string;
  data?: Record<string, MarketInstrument>;
  message?: string;
  code?: string;
}

/**
 * Backend API URL.
 *
 * Local development:
 * NEXT_PUBLIC_API_URL=http://localhost:5000/api
 *
 * Production:
 * Set NEXT_PUBLIC_API_URL to your deployed backend API base URL.
 */
const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
).replace(/\/+$/, "");

/**
 * Fetch real market data from the backend.
 */
export async function getMarketData(): Promise<MarketApiResponse> {
  const response = await fetch(
    `${API_BASE_URL}/upstox/market-data`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    },
  );

  let result: MarketApiResponse;

  try {
    result = (await response.json()) as MarketApiResponse;
  } catch {
    throw new Error(
      `Market API returned an invalid response (${response.status}).`,
    );
  }

  if (!response.ok || !result.success || !result.data) {
    throw new Error(
      result.message ||
        `Market API request failed: ${response.status}`,
    );
  }

  return result;
}

/**
 * Format prices using Indian number formatting.
 */
export function formatMarketPrice(value: number): string {
  return value.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/**
 * Format percentage changes with the appropriate sign.
 */
export function formatMarketPercentage(value: number): string {
  const sign = value > 0 ? "+" : value < 0 ? "−" : "";

  return `${sign}${Math.abs(value).toFixed(2)}%`;
}

/**
 * Human-readable instrument names.
 */
export const MARKET_INSTRUMENT_NAMES: Record<string, string> = {
  "NSE_INDEX|Nifty 50": "NIFTY 50",

  "NSE_EQ|INE002A01018": "Reliance Industries",
  "NSE_EQ|INE040A01034": "HDFC Bank",
  "NSE_EQ|INE467B01029": "TCS",
  "NSE_EQ|INE009A01021": "Infosys",
  "NSE_EQ|INE090A01021": "ICICI Bank",
  "NSE_EQ|INE397D01024": "Bharti Airtel",
  "NSE_EQ|INF204KB14I2": "NIFTYBEES",

  // Additional instruments
  "NSE_EQ|INE018A01030": "Larsen & Toubro",
  "NSE_EQ|INE062A01020": "State Bank of India",
  "NSE_EQ|INE238A01034": "Axis Bank",
  "NSE_EQ|INE154A01025": "ITC",
  "NSE_EQ|INE075A01022": "Wipro",
};

/**
 * Short symbols displayed beneath company names.
 */
export const MARKET_INSTRUMENT_SYMBOLS: Record<string, string> = {
  "NSE_INDEX|Nifty 50": "NIFTY 50",

  "NSE_EQ|INE002A01018": "RELIANCE",
  "NSE_EQ|INE040A01034": "HDFCBANK",
  "NSE_EQ|INE467B01029": "TCS",
  "NSE_EQ|INE009A01021": "INFY",
  "NSE_EQ|INE090A01021": "ICICIBANK",
  "NSE_EQ|INE397D01024": "BHARTIARTL",
  "NSE_EQ|INF204KB14I2": "NIFTYBEES",

  "NSE_EQ|INE018A01030": "LT",
  "NSE_EQ|INE062A01020": "SBIN",
  "NSE_EQ|INE238A01034": "AXISBANK",
  "NSE_EQ|INE154A01025": "ITC",
  "NSE_EQ|INE075A01022": "WIPRO",
};
