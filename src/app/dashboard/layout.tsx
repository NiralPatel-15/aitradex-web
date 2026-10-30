import type { ReactNode } from "react";
import DashboardLayout from "@/components/dashboard/layout/DashboardLayout";

export default function Layout({ children }: { children: ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
