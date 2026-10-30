import {
  ArrowUpRight,
  BriefcaseBusiness,
  PiggyBank,
  TrendingUp,
  Wallet,
} from "lucide-react";

const stats = [
  {
    title: "Total Portfolio",
    value: "₹1,24,580.00",
    change: "+₹2,450.00",
    percentage: "+1.98%",
    icon: BriefcaseBusiness,
    positive: true,
  },
  {
    title: "Invested Value",
    value: "₹1,15,000.00",
    change: "Across 8 holdings",
    percentage: "",
    icon: TrendingUp,
    positive: true,
  },
  {
    title: "Available Balance",
    value: "₹25,000.00",
    change: "Ready to invest",
    percentage: "",
    icon: Wallet,
    positive: true,
  },
  {
    title: "Today's P&L",
    value: "+₹1,280.00",
    change: "Today's returns",
    percentage: "+1.04%",
    icon: PiggyBank,
    positive: true,
  },
];

export default function StatsSection() {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-2xl border border-[#e7ece9] bg-white p-5 shadow-[0_4px_18px_rgba(20,45,35,0.04)] transition-shadow duration-200 hover:shadow-[0_8px_26px_rgba(20,45,35,0.08)]"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e9f8f2] text-[#00a878]">
                <Icon size={21} strokeWidth={2} />
              </div>

              <span className="rounded-full bg-[#f2fbf7] px-2.5 py-1 text-xs font-medium text-[#00a878]">
                Demo data
              </span>
            </div>

            <p className="mt-5 text-sm font-medium text-[#718078]">
              {stat.title}
            </p>

            <h3 className="mt-2 text-2xl font-bold tracking-tight text-[#17231d]">
              {stat.value}
            </h3>

            <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
              <span
                className={`inline-flex items-center gap-1 font-semibold ${
                  stat.positive ? "text-[#00a878]" : "text-[#e05252]"
                }`}
              >
                {stat.percentage && <ArrowUpRight size={15} />}
                {stat.percentage}
              </span>

              <span className="text-[#8a9890]">{stat.change}</span>
            </div>
          </div>
        );
      })}
    </section>
  );
}
