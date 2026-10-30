import Link from "next/link";
import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa6";

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

const productLinks = [
  { label: "Stocks", href: "/markets/stocks" },
  { label: "Mutual Funds", href: "/markets/mutual-funds" },
  { label: "ETFs", href: "/markets/etf" },
  { label: "Gold", href: "/markets/gold" },
];

const resourceLinks = [
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Support", href: "/support" },
  { label: "News", href: "/news" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Disclaimer", href: "/disclaimer" },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "#",
    icon: FaFacebookF,
  },
  {
    label: "Instagram",
    href: "#",
    icon: FaInstagram,
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: FaLinkedinIn,
  },
  {
    label: "GitHub",
    href: "#",
    icon: FaGithub,
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#1E293B] bg-[#0F172A] text-white">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        {/* ================================
            MAIN FOOTER
        ================================= */}

        <div className="grid gap-12 lg:grid-cols-[1fr_1.8fr] lg:gap-20">
          {/* ================================
              BRAND
          ================================= */}

          <div className="max-w-sm">
            <Link
              href="/"
              className="inline-block text-2xl font-bold tracking-tight text-[#00D09C] transition-opacity duration-200 hover:opacity-80"
            >
              AITradeX
            </Link>

            <p className="mt-5 text-sm leading-7 text-[#94A3B8]">
              AI-powered market intelligence and investment learning tools
              designed to help users understand markets and make more informed
              financial decisions.
            </p>

            {/* Social Icons */}

            <div className="mt-7 flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#334155] bg-[#1E293B] text-[#CBD5E1] transition-all duration-200 hover:-translate-y-1 hover:border-[#00D09C] hover:bg-[#00D09C] hover:text-white"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* ================================
              FOOTER LINKS
          ================================= */}

          <div className="grid grid-cols-2 gap-x-10 gap-y-10 sm:grid-cols-4">
            <FooterColumn title="Company" links={companyLinks} />

            <FooterColumn title="Products" links={productLinks} />

            <FooterColumn title="Resources" links={resourceLinks} />

            <FooterColumn title="Legal" links={legalLinks} />
          </div>
        </div>

        {/* ================================
            DIVIDER
        ================================= */}

        <div className="my-10 h-px bg-[#1E293B]" />

        {/* ================================
            BOTTOM
        ================================= */}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[#64748B]">
            © 2026 AITradeX. All rights reserved.
          </p>

          <div className="flex items-center gap-2 text-sm text-[#64748B]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00D09C]" />

            <span>AI-powered financial learning platform</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* =========================================
   FOOTER COLUMN
========================================= */

interface FooterColumnProps {
  title: string;
  links: {
    label: string;
    href: string;
  }[];
}

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div className="min-w-0">
      {/* Using div instead of h3 prevents global
          typography styles from breaking the layout */}

      <div className="text-xs font-bold uppercase tracking-[0.12em] text-white">
        {title}
      </div>

      <nav className="mt-5 flex flex-col gap-3" aria-label={`${title} links`}>
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="w-fit text-sm leading-5 text-[#94A3B8] transition-colors duration-200 hover:text-[#00D09C]"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
