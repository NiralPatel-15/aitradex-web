import Link from "next/link";
import {
  ArrowUpRight,
  BarChart3,
  BriefcaseBusiness,
  Plus,
  Wallet,
} from "lucide-react";

const actions = [
  {
    title: "Explore Markets",
    description: "Discover stocks and market trends",
    href: "/dashboard/markets",
    icon: BarChart3,
  },
  {
    title: "View Portfolio",
    description: "Check your investments",
    href: "/dashboard/portfolio",
    icon: BriefcaseBusiness,
  },
  {
    title: "Add Funds",
    description: "Manage your trading balance",
    href: "/dashboard/wallet",
    icon: Wallet,
  },
];

export default function QuickActions() {
  return (
    <section className="rounded-2xl border border-[#e7ece9] bg-white p-4 shadow-[0_4px_18px_rgba(20,45,35,0.04)] sm:p-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#e9f8f2] text-[#00a878]">
          <Plus size={18} />
        </div>

        <div>
          <h2 className="text-base font-bold text-[#17231d]">Quick Actions</h2>

          <p className="mt-0.5 text-xs text-[#718078]">
            Shortcuts to your frequently used tools.
          </p>
        </div>
      </div>

      {/* Action Cards */}
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              href={action.href}
              className="group flex min-h-28 items-center justify-between gap-3 rounded-xl border border-[#edf1ee] bg-[#fcfdfc] p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#bfe4d3] hover:bg-[#f7fbf9]"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e9f8f2] text-[#00a878] transition group-hover:bg-[#dff5eb]">
                  <Icon size={19} />
                </div>

                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-[#17231d]">
                    {action.title}
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-[#718078]">
                    {action.description}
                  </p>
                </div>
              </div>

              <ArrowUpRight
                size={16}
                className="shrink-0 text-[#9aa79f] transition group-hover:text-[#00a878]"
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
