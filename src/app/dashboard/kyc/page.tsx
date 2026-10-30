"use client";

import { useState } from "react";
import {
  ShieldAlert,
  UserRound,
  CreditCard,
  MapPin,
  FileCheck,
  CheckCircle2,
  Clock3,
  LockKeyhole,
  Info,
  ArrowRight,
  CircleHelp,
} from "lucide-react";

type Requirement = {
  id: string;
  title: string;
  description: string;
  icon: typeof UserRound;
};

const requirements: Requirement[] = [
  {
    id: "personal",
    title: "Personal information",
    description: "Your full name, date of birth and contact information.",
    icon: UserRound,
  },
  {
    id: "pan",
    title: "PAN verification",
    description: "A valid PAN card is required for identity verification.",
    icon: CreditCard,
  },
  {
    id: "address",
    title: "Address verification",
    description:
      "Your residential address must match your supporting document.",
    icon: MapPin,
  },
  {
    id: "documents",
    title: "Document verification",
    description: "Supporting identity and address documents must be reviewed.",
    icon: FileCheck,
  },
];

export default function KYCPage() {
  const [acknowledged, setAcknowledged] = useState<string[]>([]);
  const [showNotice, setShowNotice] = useState(false);

  const progress = Math.round(
    (acknowledged.length / requirements.length) * 100,
  );

  const toggleRequirement = (id: string) => {
    setAcknowledged((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  };

  const handleContinue = () => {
    setShowNotice(true);
  };

  return (
    <div className="space-y-7 pb-10">
      {/* Page Heading */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-[#64748b]">
            <span>Dashboard</span>
            <span>/</span>
            <span className="font-medium text-[#172033]">KYC Verification</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-[#172033] sm:text-3xl">
            KYC Verification
          </h1>

          <p className="mt-2 text-sm text-[#64748b]">
            Complete your account verification requirements.
          </p>
        </div>

        <div className="flex w-fit items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700">
          <Clock3 size={16} />
          Not Verified
        </div>
      </div>

      {/* Verification Status */}
      <section className="overflow-hidden rounded-2xl border border-[#e8edf2] bg-white p-5 shadow-sm sm:p-7">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#e8fbf5] text-[#00b386]">
              <ShieldAlert size={28} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#172033]">
                Your account needs verification
              </h2>

              <p className="mt-1 max-w-xl text-sm leading-6 text-[#64748b]">
                Complete the required verification steps to prepare your account
                for the platform&apos;s investment features.
              </p>

              <div className="mt-3 inline-flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700">
                <Info size={14} />
                Demo verification status
              </div>
            </div>
          </div>

          <div className="min-w-40 rounded-xl bg-[#f8fafc] p-4">
            <p className="text-xs font-medium text-[#64748b]">
              Requirements reviewed
            </p>
            <p className="mt-1 text-2xl font-bold text-[#172033]">
              {acknowledged.length}/{requirements.length}
            </p>
            <p className="mt-1 text-xs text-[#64748b]">
              {progress}% checklist progress
            </p>
          </div>
        </div>

        <div className="mt-7">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-semibold text-[#172033]">
              Preparation progress
            </span>
            <span className="font-bold text-[#00b386]">{progress}%</span>
          </div>

          <div className="h-2.5 overflow-hidden rounded-full bg-[#edf2f5]">
            <div
              className="h-full rounded-full bg-[#00c896] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section id="requirements" className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-[#172033]">
            Verification requirements
          </h2>
          <p className="mt-1 text-sm text-[#64748b]">
            Review each requirement and mark it as reviewed.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {requirements.map((item) => {
            const Icon = item.icon;
            const isChecked = acknowledged.includes(item.id);

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => toggleRequirement(item.id)}
                className={`flex w-full items-start gap-4 rounded-2xl border bg-white p-5 text-left shadow-sm transition ${
                  isChecked
                    ? "border-[#00c896] bg-[#f5fffb]"
                    : "border-[#e8edf2] hover:border-[#b9e9da]"
                }`}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e8fbf5] text-[#00b386]">
                  <Icon size={21} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-semibold text-[#172033]">
                      {item.title}
                    </h3>

                    {isChecked ? (
                      <CheckCircle2
                        size={19}
                        className="shrink-0 text-[#00b386]"
                      />
                    ) : (
                      <span className="h-5 w-5 shrink-0 rounded-full border-2 border-[#cbd5e1]" />
                    )}
                  </div>

                  <p className="mt-2 text-sm leading-5 text-[#64748b]">
                    {item.description}
                  </p>

                  <p
                    className={`mt-3 text-xs font-semibold ${
                      isChecked ? "text-[#00a77c]" : "text-[#94a3b8]"
                    }`}
                  >
                    {isChecked ? "Marked as reviewed" : "Mark as reviewed"}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Document Information */}
      <section className="rounded-2xl border border-[#e8edf2] bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eef4ff] text-[#4779dc]">
            <FileCheck size={22} />
          </div>

          <div>
            <h2 className="font-bold text-[#172033]">Documents you may need</h2>
            <p className="mt-1 text-sm text-[#64748b]">
              Keep these documents ready for the official verification process.
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            {
              title: "PAN Card",
              detail: "Identity and tax identification",
            },
            {
              title: "Address Proof",
              detail: "A supported residential address document",
            },
            {
              title: "Bank Details",
              detail: "For account-related verification",
            },
          ].map((document) => (
            <div
              key={document.title}
              className="rounded-xl border border-[#edf0f4] bg-[#fafbfd] p-4"
            >
              <div className="flex items-center gap-2 text-[#00a77c]">
                <FileCheck size={18} />
                <span className="text-sm font-semibold text-[#172033]">
                  {document.title}
                </span>
              </div>
              <p className="mt-2 text-xs leading-5 text-[#64748b]">
                {document.detail}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4">
          <LockKeyhole size={19} className="mt-0.5 shrink-0 text-blue-600" />
          <p className="text-xs leading-5 text-blue-800">
            Never enter or upload your real PAN, Aadhaar, bank details or
            identity documents into this demo page. Secure document collection
            must be implemented through an approved backend verification flow.
          </p>
        </div>
      </section>

      {/* Continue Section */}
      <section className="rounded-2xl border border-[#e8edf2] bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-bold text-[#172033]">
              Ready for the next step?
            </h2>
            <p className="mt-1 text-sm text-[#64748b]">
              Your checklist progress is saved locally while this demo page is
              open.
            </p>
          </div>

          <button
            type="button"
            onClick={handleContinue}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#00c896] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#00b386]"
          >
            Review verification status
            <ArrowRight size={17} />
          </button>
        </div>

        {showNotice && (
          <div className="mt-5 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
            <Info size={19} className="mt-0.5 shrink-0 text-amber-600" />
            <div>
              <p className="text-sm font-semibold text-amber-800">
                Backend integration required
              </p>
              <p className="mt-1 text-xs leading-5 text-amber-700">
                This page currently demonstrates the KYC interface and
                checklist. Actual document submission, verification, and status
                updates require a secure backend integration.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Help */}
      <div className="flex items-center justify-center gap-2 py-2 text-sm text-[#64748b]">
        <CircleHelp size={17} />
        Need help with verification?
        <a
          href="/dashboard/help"
          className="font-semibold text-[#00a77c] hover:underline"
        >
          Contact support
        </a>
      </div>
    </div>
  );
}
