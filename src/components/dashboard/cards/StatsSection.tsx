"use client";

import { Briefcase, TrendingUp, Wallet, Landmark } from "lucide-react";

import StatCard from "../cards/StatCard";

export default function StatsSection() {
  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Portfolio Value"
        value="₹18,45,700"
        change="+₹23,450 Today"
        positive
        icon={Briefcase}
      />

      <StatCard
        title="Today's Profit"
        value="+₹12,480"
        change="+1.84%"
        positive
        icon={TrendingUp}
      />

      <StatCard
        title="Wallet Balance"
        value="₹25,000"
        subtitle="Available Balance"
        icon={Wallet}
      />

      <StatCard
        title="Total Investment"
        value="₹15,20,000"
        subtitle="Invested Amount"
        icon={Landmark}
      />
    </section>
  );
}
