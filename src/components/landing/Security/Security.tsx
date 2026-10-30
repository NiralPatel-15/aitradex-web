import {
  Cloud,
  Database,
  Fingerprint,
  Lock,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

const securityFeatures = [
  {
    icon: Lock,
    title: "256-bit Encryption",
    description:
      "Communication is protected using modern encryption standards.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Authentication",
    description:
      "Protected authentication and API access help keep accounts secure.",
  },
  {
    icon: Database,
    title: "Protected Data",
    description:
      "Account and portfolio information are handled using secure infrastructure.",
  },
  {
    icon: Fingerprint,
    title: "Biometric Ready",
    description: "The mobile experience can support biometric authentication.",
  },
  {
    icon: Cloud,
    title: "Secure Cloud",
    description:
      "Modern backend infrastructure is designed for reliable and secure operation.",
  },
  {
    icon: UserCheck,
    title: "Privacy First",
    description:
      "Personal information is handled with privacy and responsible data practices.",
  },
];

export default function Security() {
  return (
    <section
      id="security"
      aria-labelledby="security-title"
      className="relative overflow-hidden bg-[#F8FAFC]"
    >
      {/* Section divider */}
      <div className="mx-auto max-w-300 px-4 pt-5 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <span className="h-px flex-1 bg-[#E4E7EC]" />

          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#98A2B3]">
            Security
          </span>

          <span className="h-px flex-1 bg-[#E4E7EC]" />
        </div>
      </div>

      <div className="mx-auto max-w-300 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-5 lg:items-start lg:gap-16">
          {/* =================================================
              LEFT CONTENT
          ================================================== */}
          <div className="lg:col-span-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#00D09C]/20 bg-[#E7FFF8] px-3.5 py-2 text-xs font-bold text-[#00B386]">
              <ShieldCheck size={14} />
              SECURITY & PRIVACY
            </span>

            <h2
              id="security-title"
              className="mt-5 text-3xl font-bold tracking-tight text-[#101828] sm:text-4xl"
            >
              Your security is our priority.
            </h2>

            <p className="mt-5 text-sm leading-7 text-[#667085] sm:text-base">
              AITradeX is designed with modern security practices to help
              protect your account, personal information, and investment
              activity.
            </p>

            {/* Trust points */}
            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E7FFF8] text-[#00B386]">
                  <ShieldCheck size={14} />
                </span>

                <span className="text-sm font-semibold text-[#344054]">
                  Secure account access
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E7FFF8] text-[#00B386]">
                  <Lock size={14} />
                </span>

                <span className="text-sm font-semibold text-[#344054]">
                  Protected communication
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E7FFF8] text-[#00B386]">
                  <UserCheck size={14} />
                </span>

                <span className="text-sm font-semibold text-[#344054]">
                  Privacy-focused platform
                </span>
              </div>
            </div>

            {/* Security status */}
            <div className="mt-8 flex items-center gap-3 rounded-2xl border border-[#E4E7EC] bg-white p-4 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E7FFF8] text-[#00B386]">
                <ShieldCheck size={20} />
              </div>

              <div>
                <p className="text-xs font-bold text-[#101828]">
                  Security-first architecture
                </p>

                <p className="mt-1 text-[11px] text-[#98A2B3]">
                  Built with modern application security practices
                </p>
              </div>

              <span className="ml-auto h-2 w-2 rounded-full bg-[#00D09C]" />
            </div>
          </div>

          {/* =================================================
              RIGHT FEATURE LIST
          ================================================== */}
          <div className="lg:col-span-3">
            <div className="overflow-hidden rounded-3xl border border-[#E4E7EC] bg-white shadow-sm">
              {/* Header */}
              <div className="border-b border-[#E4E7EC] p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#98A2B3]">
                      Protection layer
                    </p>

                    <h3 className="mt-1 text-lg font-bold text-[#101828]">
                      Built for trust
                    </h3>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E7FFF8] text-[#00B386]">
                    <Lock size={18} />
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="grid sm:grid-cols-2">
                {securityFeatures.map((item, index) => {
                  const Icon = item.icon;

                  const isRightColumn = index % 2 === 1;
                  const isBottomRow = index >= 4;

                  return (
                    <div
                      key={item.title}
                      className={[
                        "group p-5 transition-colors duration-300 hover:bg-[#F9FFFC] sm:p-6",
                        !isBottomRow ? "border-b border-[#E4E7EC]" : "",
                        !isRightColumn ? "sm:border-r sm:border-[#E4E7EC]" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E7FFF8] text-[#00B386] transition-all duration-300 group-hover:bg-[#00D09C] group-hover:text-white">
                          <Icon size={19} />
                        </div>

                        <span className="text-[10px] font-bold text-[#D0D5DD]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <h4 className="mt-5 text-sm font-bold text-[#101828]">
                        {item.title}
                      </h4>

                      <p className="mt-2 text-xs leading-5 text-[#667085]">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Bottom status */}
              <div className="flex items-center gap-3 border-t border-[#E4E7EC] bg-[#F8FAFC] px-5 py-4 sm:px-6">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#E7FFF8] text-[#00B386]">
                  <ShieldCheck size={14} />
                </span>

                <p className="text-xs font-medium text-[#667085]">
                  Security is integrated throughout the platform experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
