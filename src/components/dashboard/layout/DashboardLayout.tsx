"use client";

import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#f8fafc] text-[#172033]">
      {/* Fixed Sidebar */}
      <aside className="hidden h-screen shrink-0 lg:block">
        <Sidebar />
      </aside>

      {/* Main Application */}
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        {/* Fixed Header */}
        <div className="z-30 shrink-0">
          <Navbar />
        </div>

        {/* Independently Scrollable Dashboard Content */}
        <main className="scrollbar-hidden min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-5 py-6 sm:px-8 lg:px-10">
          <div className="mx-auto w-full max-w-360">{children}</div>
        </main>
      </div>
    </div>
  );
}
