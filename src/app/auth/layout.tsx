import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="min-h-screen bg-white text-[#101828]">
      <div className="relative min-h-screen overflow-hidden">
        {/* Soft brand background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute left-1/2 top-55 h-125 w-200 -translate-x-1/2 rounded-full bg-[#00D09C]/[0.07] blur-3xl" />

          <div className="absolute bottom-65 left-1/2 h-125 w-200 -translate-x-1/2 rounded-full bg-[#00D09C]/4 blur-3xl" />
        </div>

        {/* Page content */}
        <div className="mx-auto flex min-h-screen w-full max-w-[1280px] items-center justify-center px-4 py-6 sm:px-6 lg:px-8">
          <div className="w-full">{children}</div>
        </div>
      </div>
    </main>
  );
}
