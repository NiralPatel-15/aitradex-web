"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navigation = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Markets",
    href: "/markets",
  },
  {
    label: "Products",
    href: "/products",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Identify current page
  const isHomePage = pathname === "/";

  const isAuthPage = pathname === "/auth/login" || pathname === "/auth/signup";

  // Hide navigation links on Homepage, Login and Signup.
  // Display all navigation links on other public pages.
  const visibleNavigation = isHomePage || isAuthPage ? [] : navigation;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#EEEEEE] bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-header w-full max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          onClick={closeMobileMenu}
          className="group flex shrink-0 items-center"
          aria-label="AITradeX Home"
        >
          <span className="text-[25px] font-bold tracking-[-0.04em] text-[#00D09C] transition-colors duration-200 group-hover:text-[#00B987] sm:text-[28px]">
            AITradeX
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden items-center gap-7 lg:flex xl:gap-9"
          aria-label="Main navigation"
        >
          {visibleNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative py-2 text-sm font-medium text-[#222222] transition-colors duration-200 hover:text-[#00D09C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D09C]/30 focus-visible:ring-offset-4"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/auth/login"
            className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D09C]/30 focus-visible:ring-offset-2 ${
              isAuthPage
                ? "bg-[#F3FBF8] text-[#00B987]"
                : "text-[#222222] hover:bg-[#F3FBF8] hover:text-[#00B987]"
            }`}
          >
            Login
          </Link>

          <Link
            href="/auth/signup"
            className="rounded-lg bg-[#00D09C] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#00B987] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D09C]/40 focus-visible:ring-offset-2 active:translate-y-0"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((open) => !open)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-[#222222] transition-colors duration-200 hover:bg-[#F3FBF8] hover:text-[#00D09C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D09C]/30 lg:hidden"
          aria-label={
            mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
        >
          {mobileMenuOpen ? (
            <X size={22} strokeWidth={2} />
          ) : (
            <Menu size={22} strokeWidth={2} />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        id="mobile-navigation"
        className={`border-t border-[#EEEEEE] bg-white lg:hidden ${
          mobileMenuOpen ? "block" : "hidden"
        }`}
      >
        <nav
          className="mx-auto flex w-full max-w-[1280px] flex-col px-4 py-4 sm:px-6"
          aria-label="Mobile navigation"
        >
          {visibleNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMobileMenu}
              className="rounded-lg px-3 py-3 text-sm font-medium text-[#222222] transition-colors duration-200 hover:bg-[#F3FBF8] hover:text-[#00D09C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D09C]/30"
            >
              {item.label}
            </Link>
          ))}

          {/* Mobile Actions */}
          <div className="mt-3 flex flex-col gap-2 border-t border-[#EEEEEE] pt-4">
            <Link
              href="/auth/login"
              onClick={closeMobileMenu}
              className={`flex min-h-11 items-center justify-center rounded-lg px-4 text-sm font-semibold transition-colors duration-200 ${
                isAuthPage
                  ? "bg-[#F3FBF8] text-[#00B987]"
                  : "border border-[#E5E5E5] text-[#222222] hover:border-[#00D09C] hover:bg-[#F3FBF8] hover:text-[#00B987]"
              }`}
            >
              Login
            </Link>

            <Link
              href="/auth/signup"
              onClick={closeMobileMenu}
              className="flex min-h-11 items-center justify-center rounded-lg bg-[#00D09C] px-4 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#00B987] hover:shadow-md"
            >
              Get Started
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
