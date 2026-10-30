import {
  LayoutDashboard,
  Briefcase,
  BarChart3,
  ClipboardList,
  Wallet,
  Heart,
  TrendingUp,
  Newspaper,
  Gift,
  Bell,
  ShieldCheck,
  User,
  Settings,
  CircleHelp,
} from "lucide-react";

export interface SidebarItem {
  title: string;
  href: string;
  icon: typeof LayoutDashboard;
  badge?: number;
}

export const sidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Portfolio",
    href: "/dashboard/portfolio",
    icon: Briefcase,
  },
  {
    title: "Holdings",
    href: "/dashboard/holdings",
    icon: BarChart3,
  },
  {
    title: "Orders",
    href: "/dashboard/orders",
    icon: ClipboardList,
  },
  {
    title: "Wallet",
    href: "/dashboard/wallet",
    icon: Wallet,
  },
  {
    title: "Watchlist",
    href: "/dashboard/watchlist",
    icon: Heart,
  },
  {
    title: "Markets",
    href: "/dashboard/markets",
    icon: TrendingUp,
  },
  {
    title: "News",
    href: "/dashboard/news",
    icon: Newspaper,
  },
  {
    title: "IPO",
    href: "/dashboard/ipo",
    icon: Gift,
  },
  {
    title: "Notifications",
    href: "/dashboard/notifications",
    icon: Bell,
    badge: 3,
  },
  {
    title: "KYC",
    href: "/dashboard/kyc",
    icon: ShieldCheck,
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
  {
    title: "Help Center",
    href: "/dashboard/help",
    icon: CircleHelp,
  },
];

export const dashboardStats = [
  {
    title: "Portfolio Value",
    value: "₹18,45,700",
    change: "+₹23,450 (1.29%)",
    positive: true,
  },
  {
    title: "Total Investment",
    value: "₹15,20,000",
    subtitle: "Invested Amount",
  },
  {
    title: "Overall Profit",
    value: "+₹3,25,700",
    change: "+21.4%",
    positive: true,
  },
  {
    title: "Wallet Balance",
    value: "₹25,000",
    subtitle: "Available Balance",
  },
];

export const marketOverview = [
  {
    name: "NIFTY 50",
    value: "24,850.30",
    change: "+304.20 (1.24%)",
    positive: true,
  },
  {
    name: "SENSEX",
    value: "81,320.50",
    change: "+660.73 (0.82%)",
    positive: true,
  },
  {
    name: "BANK NIFTY",
    value: "56,420.15",
    change: "+894.25 (1.61%)",
    positive: true,
  },
];

export const quickActions = [
  {
    title: "Buy Stock",
    color: "green",
  },
  {
    title: "Sell Stock",
    color: "red",
  },
  {
    title: "Add Funds",
    color: "blue",
  },
  {
    title: "Explore IPO",
    color: "purple",
  },
];
