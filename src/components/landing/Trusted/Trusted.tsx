import {
  siExpress,
  siFlutter,
  siMongodb,
  siNextdotjs,
  siNodedotjs,
  siPython,
} from "simple-icons";

const technologies = [
  {
    name: "Flutter",
    description: "Mobile experience",
    icon: siFlutter,
  },
  {
    name: "Next.js",
    description: "Web platform",
    icon: siNextdotjs,
  },
  {
    name: "Node.js",
    description: "Backend services",
    icon: siNodedotjs,
  },
  {
    name: "Express",
    description: "API architecture",
    icon: siExpress,
  },
  {
    name: "MongoDB",
    description: "Data platform",
    icon: siMongodb,
  },
  {
    name: "Python",
    description: "AI & intelligence",
    icon: siPython,
  },
];

export default function Trusted() {
  return (
    <section
      aria-labelledby="technology-stack-title"
      className="border-y border-[#EAECF0] bg-[#FCFCFD]"
    >
      <div className="mx-auto max-w-300 px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        {/* Section heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border border-[#00D09C]/20 bg-[#E7FFF8] px-3 py-1.5 text-xs font-bold tracking-wider text-[#00B386]">
            TECHNOLOGY STACK
          </span>

          <h2
            id="technology-stack-title"
            className="mt-5 text-3xl font-bold tracking-tight text-[#101828] sm:text-4xl lg:text-5xl"
          >
            Built with modern technology
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[#667085] sm:text-lg sm:leading-8">
            AITradeX combines modern web, mobile, backend, database, and AI
            technologies to deliver a fast, secure, and scalable investment
            platform.
          </p>
        </div>

        {/* Technology cards */}
        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-3 sm:mt-14 sm:grid-cols-3 sm:gap-4 lg:gap-5">
          {technologies.map((technology) => (
            <div
              key={technology.name}
              className="group relative overflow-hidden rounded-2xl border border-[#E4E7EC] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#00D09C]/30 hover:shadow-[0_16px_35px_rgba(16,24,40,0.08)] sm:p-6"
            >
              {/* Subtle hover glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[#00D09C]/5 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
              />

              {/* Icon */}
              <div className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-[#EAECF0] bg-[#F8FAFC] transition-all duration-300 group-hover:border-[#00D09C]/20 group-hover:bg-[#E7FFF8]">
                <svg
                  className="h-6 w-6 transition-transform duration-300 group-hover:scale-110"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d={technology.icon.path}
                    fill={`#${technology.icon.hex}`}
                  />
                </svg>
              </div>

              {/* Content */}
              <div className="relative mt-5">
                <h3 className="text-sm font-bold text-[#101828] sm:text-base">
                  {technology.name}
                </h3>

                <p className="mt-1 text-xs leading-5 text-[#98A2B3] sm:text-sm">
                  {technology.description}
                </p>
              </div>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#00D09C] transition-all duration-300 group-hover:w-full" />
            </div>
          ))}
        </div>

        {/* Technology foundation */}
        <div className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-[#EAECF0] pt-8">
          {[
            "Scalable architecture",
            "Secure APIs",
            "AI-ready infrastructure",
            "Cross-platform experience",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 text-xs font-medium text-[#667085] sm:text-sm"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#E7FFF8] text-[#00B386]">
                <svg
                  viewBox="0 0 20 20"
                  className="h-3 w-3"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M5 10.5 8.2 13.5 15 6.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>

              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
