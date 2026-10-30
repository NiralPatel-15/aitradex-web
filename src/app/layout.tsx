import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  preload: true,
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "AITradeX",
    template: "%s | AITradeX",
  },

  description:
    "AITradeX is a modern AI-powered fintech learning and market intelligence platform designed to help investors learn, analyze, and invest smarter.",

  applicationName: "AITradeX",

  keywords: [
    "AITradeX",
    "AI Trading",
    "Stock Market",
    "Fintech",
    "Investment",
    "Artificial Intelligence",
    "Trading Education",
    "Market Intelligence",
    "Portfolio",
    "Stock Analysis",
  ],

  authors: [
    {
      name: "AITradeX",
    },
  ],

  creator: "AITradeX",

  publisher: "AITradeX",

  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },

  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#F7F9FC",
  colorScheme: "light",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakartaSans.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-screen bg-background font-body text-text-primary antialiased selection:bg-primary-light selection:text-text-primary">
        {children}
      </body>
    </html>
  );
}
