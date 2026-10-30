import { LucideIcon } from "lucide-react";

export interface SidebarItem {
  title: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
}

export interface PortfolioSummary {
  totalInvestment: number;
  currentValue: number;
  todaysPnL: number;
  overallPnL: number;
}

export interface MarketIndex {
  name: string;
  value: string;
  change: string;
  positive: boolean;
}

export interface Holding {
  symbol: string;
  company: string;
  quantity: number;
  averagePrice: number;
  ltp: number;
  pnl: number;
}

export interface WatchlistItem {
  symbol: string;
  price: number;
  change: number;
}

export interface QuickAction {
  title: string;
  href: string;
}
