import Link from "next/link";
import { ArrowRight, CheckCircle2, Download, Sparkles } from "lucide-react";

const benefits = ["Free Account", "AI Insights", "Secure Platform"];

export default function CTA() {
  return (
    <section
      id="cta"
      aria-labelledby="cta-title"
      className="relative overflow-hidden bg-white"
    >
      {/* Section divider */}
      <div className="mx-auto max-w-300 px-4 pt-5 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <span className="h-px flex-1 bg-[#E4E7EC]" />

          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#98A2B3]">
            Get Started
          </span>

          <span className="h-px flex-1 bg-[#E4E7EC]" />
        </div>
      </div>

      <div className="mx-auto max-w-300 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        {/* Main CTA */}
        <div className="relative overflow-hidden rounded-4xl bg-[#00D09C] px-6 py-14 text-center sm:px-10 sm:py-16 lg:px-20 lg:py-20">
          {/* Decorative background elements */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-white/10 blur-3xl"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-[#006B58]/10 blur-3xl"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-px w-40 -translate-x-1/2 bg-white/30"
          />

          <div className="relative mx-auto max-w-3xl">
            {/* Badge */}
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-2 text-xs font-bold text-white backdrop-blur-sm">
              <Sparkles size={14} />
              START TODAY
            </span>

            {/* Heading */}
            <h2
              id="cta-title"
              className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              Ready to build a smarter investment journey?
            </h2>

            {/* Description */}
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/85 sm:text-base sm:leading-8">
              Explore AI-powered market intelligence, learning tools, portfolio
              insights, and investment discovery—all in one platform.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <Link
                href="/auth/signup"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#00B386] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#F8FFFC] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#00D09C]"
              >
                Get Started
                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </Link>

              <Link
                href="#"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/35 bg-white/5 px-6 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#00D09C]"
              >
                <Download size={17} />
                Download App
              </Link>
            </div>

            {/* Benefits */}
            <div className="mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-center gap-2 text-xs font-semibold text-white/90"
                >
                  <CheckCircle2 size={16} />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <div className="mt-5 flex flex-col items-center justify-center gap-2 text-center sm:flex-row">
          <span className="h-1.5 w-1.5 rounded-full bg-[#00D09C]" />

          <p className="text-[11px] leading-5 text-[#98A2B3]">
            Start exploring AITradeX and learn before you invest.
          </p>
        </div>
      </div>
    </section>
  );
}
