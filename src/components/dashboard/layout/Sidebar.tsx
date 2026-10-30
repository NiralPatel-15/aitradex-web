"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  ChartLine,
  Sparkles,
  BriefcaseBusiness,
  ChartNoAxesColumn,
  ClipboardList,
  Wallet,
  Heart,
  TrendingUp,
  Newspaper,
  Bell,
  ShieldCheck,
  UserRound,
  Settings,
  CircleHelp,
  Crown,
  ArrowUpRight,
} from "lucide-react";

const menuItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Invest",
    href: "/dashboard/invest",
    icon: ChartLine,
  },
  {
    label: "Portfolio",
    href: "/dashboard/portfolio",
    icon: BriefcaseBusiness,
  },
  {
    label: "Holdings",
    href: "/dashboard/holdings",
    icon: ChartNoAxesColumn,
  },
  {
    label: "Orders",
    href: "/dashboard/orders",
    icon: ClipboardList,
  },
  {
    label: "Wallet",
    href: "/dashboard/wallet",
    icon: Wallet,
  },
  {
    label: "Watchlist",
    href: "/dashboard/watchlist",
    icon: Heart,
  },
  {
    label: "Markets",
    href: "/dashboard/markets",
    icon: TrendingUp,
  },
  {
    label: "News",
    href: "/dashboard/news",
    icon: Newspaper,
  },
  {
    label: "Notifications",
    href: "/dashboard/notifications",
    icon: Bell,
  },
  {
    label: "KYC",
    href: "/dashboard/kyc",
    icon: ShieldCheck,
  },
  {
    label: "Profile",
    href: "/dashboard/profile",
    icon: UserRound,
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
  {
    label: "Help Center",
    href: "/dashboard/help",
    icon: CircleHelp,
  },
  {
    label: "AI Assistant",
    href: "/dashboard/ai-assistant",
    icon: Sparkles,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-61 shrink-0 flex-col overflow-hidden border-r border-[#e9edf2] bg-white">
      {/* Logo */}
      <div className="flex h-22 shrink-0 items-center border-b border-[#edf0f4] px-6">
        <Link
          href="/dashboard"
          className="group flex flex-col leading-none"
          aria-label="AITradeX Dashboard"
        >
          <span className="text-[28px] font-extrabold tracking-[-1.4px] text-[#00b889] transition-colors duration-200 group-hover:text-[#00a078]">
            AITradeX
          </span>

          <span className="mt-2 text-[11px] font-medium tracking-[0.15px] text-[#8791a5]">
            Smart Investing
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="scrollbar-hidden min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-4 py-5">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;

            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex h-11 items-center gap-3 rounded-xl px-4 text-[14px] font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-[#e9fbf5] text-[#00a878]"
                    : "text-[#59657a] hover:bg-[#f5f8fa] hover:text-[#172033]"
                }`}
              >
                <Icon
                  size={19}
                  strokeWidth={isActive ? 2.2 : 1.8}
                  className="shrink-0"
                />

                <span>{item.label}</span>

                {item.label === "Notifications" && (
                  <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-[#f0445f] px-1.5 text-[11px] font-semibold text-white">
                    3
                  </span>
                )}
              </Link>
            );
          })}

          {/* Compact Upgrade Button */}
          <div className="pt-3">
            <Link
              href="/dashboard/upgrade"
              className="flex h-10 items-center justify-center gap-2 rounded-xl bg-[#00b887] px-3 text-[13px] font-semibold text-white transition-all duration-200 hover:bg-[#00a477] hover:shadow-sm"
            >
              <Crown size={16} strokeWidth={2} />
              <span>Upgrade to Pro</span>
              <ArrowUpRight size={15} className="ml-auto" />
            </Link>
          </div>
        </div>
      </nav>
    </aside>
  );
}
