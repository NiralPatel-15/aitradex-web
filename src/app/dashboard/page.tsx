import AIInsights from "@/components/dashboard/home/AIInsights";
import MarketOverview from "@/components/dashboard/home/MarketOverview";
import NewsSection from "@/components/dashboard/home/NewsSection";
import PortfolioPerformance from "@/components/dashboard/home/PortfolioPerformance";
import QuickActions from "@/components/dashboard/home/QuickActions";
import RecentOrders from "@/components/dashboard/home/RecentOrders";
import StatsSection from "@/components/dashboard/home/StatsSection";
import TopGainers from "@/components/dashboard/home/TopGainers";
import TopLosers from "@/components/dashboard/home/TopLosers";
import Watchlist from "@/components/dashboard/home/Watchlist";
import WelcomeBanner from "@/components/dashboard/home/WelcomeBanner";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <WelcomeBanner />

      <StatsSection />

      <MarketOverview />

      {/* Portfolio performance */}
      <PortfolioPerformance />

      {/* Equal-width market movement cards */}
      <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2">
        <TopGainers />
        <TopLosers />
      </div>

      {/* Watchlist and recent orders */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Watchlist />
        <RecentOrders />
      </div>

      <AIInsights />

      <NewsSection />

      <QuickActions />
    </div>
  );
}

