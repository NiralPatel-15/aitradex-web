import { ArrowUpRight, Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Rahul S.",
    role: "Beta Tester",
    review:
      "The AI assistant makes understanding the stock market much easier. The interface is clean and easy to use.",
  },
  {
    name: "Priya M.",
    role: "Early Access User",
    review:
      "Live market updates and portfolio tracking work smoothly. Looking forward to more AI features.",
  },
  {
    name: "Amit K.",
    role: "Investor",
    review:
      "A promising platform with a modern design. The investment categories are well organized.",
  },
];

export default function Testimonials() {
  const [featured, ...others] = testimonials;

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-title"
      className="relative overflow-hidden bg-white"
    >
      {/* Section divider */}
      <div className="mx-auto max-w-300 px-4 pt-5 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <span className="h-px flex-1 bg-[#E4E7EC]" />

          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#98A2B3]">
            Testimonials
          </span>

          <span className="h-px flex-1 bg-[#E4E7EC]" />
        </div>
      </div>

      <div className="mx-auto max-w-300 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        {/* =================================================
            HEADER
        ================================================== */}
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <span className="inline-flex items-center rounded-full border border-[#00D09C]/20 bg-[#E7FFF8] px-3.5 py-2 text-xs font-bold text-[#00B386]">
              EARLY USER FEEDBACK
            </span>

            <h2
              id="testimonials-title"
              className="mt-5 text-3xl font-bold tracking-tight text-[#101828] sm:text-4xl lg:text-5xl"
            >
              Built around a better investing experience.
            </h2>
          </div>

          <p className="max-w-xl text-sm leading-7 text-[#667085] sm:text-base sm:leading-8 lg:ml-auto">
            AITradeX is being shaped around real user feedback, from simpler
            market discovery to easier portfolio understanding.
          </p>
        </div>

        {/* =================================================
            FEATURED TESTIMONIAL
        ================================================== */}
        <div className="mt-10 overflow-hidden rounded-3xl border border-[#E4E7EC] bg-[#F8FAFC]">
          <div className="grid lg:grid-cols-[1fr_0.75fr]">
            {/* Main quote */}
            <div className="relative p-7 sm:p-10 lg:p-12">
              <Quote
                className="absolute right-8 top-8 text-[#00D09C]/10 sm:right-10 sm:top-10"
                size={100}
                strokeWidth={1}
              />

              <div className="relative">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      size={17}
                      fill="#FACC15"
                      color="#FACC15"
                    />
                  ))}
                </div>

                <blockquote className="mt-7 max-w-2xl text-xl font-semibold leading-9 tracking-tight text-[#101828] sm:text-2xl sm:leading-10 lg:text-3xl lg:leading-[1.35]">
                  “{featured.review}”
                </blockquote>

                <div className="mt-9 flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#00D09C] text-sm font-bold text-white">
                    {featured.name.charAt(0)}
                  </div>

                  <div>
                    <p className="text-sm font-bold text-[#101828]">
                      {featured.name}
                    </p>

                    <p className="mt-0.5 text-xs text-[#98A2B3]">
                      {featured.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Product signal panel */}
            <div className="border-t border-[#E4E7EC] bg-white p-7 sm:p-10 lg:border-l lg:border-t-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#98A2B3]">
                  User feedback
                </span>

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E7FFF8] text-[#00B386]">
                  <ArrowUpRight size={17} />
                </div>
              </div>

              <div className="mt-10">
                <p className="text-4xl font-bold tracking-tight text-[#101828]">
                  3+
                </p>

                <p className="mt-2 text-sm font-semibold text-[#344054]">
                  Early experiences
                </p>

                <p className="mt-2 text-xs leading-5 text-[#98A2B3]">
                  Feedback is helping shape the AITradeX product experience.
                </p>
              </div>

              <div className="mt-8 h-px bg-[#E4E7EC]" />

              <div className="mt-5 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#00D09C]" />

                <span className="text-xs font-semibold text-[#667085]">
                  Product in active development
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* =================================================
            OTHER TESTIMONIALS
        ================================================== */}
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {others.map((item) => (
            <article
              key={item.name}
              className="group rounded-2xl border border-[#E4E7EC] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#00D09C]/30 hover:bg-[#F9FFFC] hover:shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      size={14}
                      fill="#FACC15"
                      color="#FACC15"
                    />
                  ))}
                </div>

                <span className="text-[10px] font-bold text-[#D0D5DD]">
                  USER FEEDBACK
                </span>
              </div>

              <p className="mt-5 text-sm leading-7 text-[#667085]">
                “{item.review}”
              </p>

              <div className="mt-6 flex items-center gap-3 border-t border-[#F2F4F7] pt-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E7FFF8] text-xs font-bold text-[#00B386] transition-colors duration-300 group-hover:bg-[#00D09C] group-hover:text-white">
                  {item.name.charAt(0)}
                </div>

                <div>
                  <p className="text-xs font-bold text-[#101828]">
                    {item.name}
                  </p>

                  <p className="mt-0.5 text-[11px] text-[#98A2B3]">
                    {item.role}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-7 border-t border-[#E4E7EC] pt-5">
          <p className="text-center text-[11px] leading-5 text-[#98A2B3]">
            Testimonials shown here represent early product feedback and are not
            investment performance claims.
          </p>
        </div>
      </div>
    </section>
  );
}
