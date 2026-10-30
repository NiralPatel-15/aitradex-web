"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  Phone,
  UserRound,
  LockKeyhole,
  LoaderCircle,
  AlertCircle,
} from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { registerWithEmail, syncUserProfile } from "@/lib/auth";
import { sendPhoneOtp, verifyPhoneOtp, resendPhoneOtp } from "@/lib/api";

type SignupStep = "details" | "verification" | "success";

export default function SignupForm() {
  const [step, setStep] = useState<SignupStep>("details");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (step !== "verification" || secondsLeft <= 0) return;

    const timer = window.setTimeout(() => {
      setSecondsLeft((seconds) => seconds - 1);
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [step, secondsLeft]);

  const handleDetailsSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setMessage("");

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPhone = phone.replace(/\D/g, "");

    if (fullName.trim().length < 2) {
      setError("Please enter your full name.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(normalizedPhone)) {
      setError("Enter a valid 10-digit Indian mobile number.");
      return;
    }

    if (password.length < 6) {
      setError("Your password must contain at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      await sendPhoneOtp(normalizedPhone);

      setPhone(normalizedPhone);
      setEmail(normalizedEmail);
      setVerificationCode("");
      setSecondsLeft(60);
      setStep("verification");
      setMessage("OTP sent to your mobile number.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send the OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerification = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!/^\d{6}$/.test(verificationCode)) {
      setError("Enter the 6-digit OTP.");
      return;
    }

    setLoading(true);
    let accountCreated = false;

    try {
      const verification = await verifyPhoneOtp(phone, verificationCode);

      if (verification.success !== true || verification.verified !== true) {
        throw new Error(
          verification.message ||
            "Phone verification was not confirmed. Please check the OTP and try again.",
        );
      }

      // Create the Firebase account after the phone OTP is verified.
      await registerWithEmail(fullName.trim(), email, password);
      accountCreated = true;

      // Save the user's profile in MongoDB.
      await syncUserProfile(fullName.trim(), phone);

      setStep("success");
      setMessage(
        "Your account has been created. Check your email for the verification link.",
      );
    } catch (err) {
      if (accountCreated) {
        // The Firebase account exists, but profile synchronization failed.
        // Do not sign out or create another Firebase account automatically.
        setError(
          `Your Firebase account was created, but profile synchronization failed: ${
            err instanceof Error ? err.message : "Unknown error"
          } Sign in again later or contact support.`,
        );
      } else {
        setError(
          err instanceof Error
            ? err.message
            : "Signup failed. Please try again.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (loading || secondsLeft > 0) return;

    setError("");
    setMessage("");
    setLoading(true);

    try {
      await resendPhoneOtp(phone);
      setSecondsLeft(60);
      setVerificationCode("");
      setMessage("A new OTP has been sent to your mobile number.");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not resend the OTP.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChangeDetails = async () => {
    setError("");
    setMessage("");
    setVerificationCode("");
    setStep("details");

    // No Firebase account should exist yet at this point.
    if (step === "verification") {
      setSecondsLeft(0);
    }
  };

  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#FAFCFB]">
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-130 w-190 -translate-x-1/2 rounded-full bg-[#00D09C]/10 blur-[110px]" />
          <div className="absolute left-[8%] top-[25%] h-sidebar w-sidebar rounded-full bg-[#DFFAF3]/60 blur-[100px]" />
          <div className="absolute right-[8%] top-[30%] h-sidebar w-sidebar rounded-full bg-[#E7F3FF]/50 blur-[100px]" />
        </div>

        <div className="relative mx-auto flex w-full max-w-[1280px] justify-center px-4 pb-16 pt-6 sm:px-6 sm:pb-20 sm:pt-1 lg:px-8">
          <div className="w-full max-w-140">
            <div className="mt-6 text-center">
              <h1 className="text-[42px] font-bold tracking-tighter text-[#101828] sm:text-[52px]">
                {step === "details" && "Start your journey."}
                {step === "verification" && "Verify your phone."}
                {step === "success" && "You're all set!"}
              </h1>

              <p className="mx-auto mt-3 max-w-125 text-[15px] leading-7 text-[#667085] sm:text-base">
                {step === "details" &&
                  "Create your AITradeX account to begin your investing journey."}
                {step === "verification" &&
                  "Enter the 6-digit OTP sent to your mobile number."}
                {step === "success" &&
                  "Your AITradeX account has been created successfully."}
              </p>
            </div>

            <div className="mt-9 overflow-hidden rounded-[24px] border border-border bg-white/95 shadow-[0_25px_70px_rgba(16,24,40,0.08)] backdrop-blur">
              <div className="h-1.5 bg-[#00D09C]" />

              <div className="p-6 sm:p-8 lg:p-9">
                {step !== "success" && (
                  <div className="mb-8 flex items-center justify-center gap-2">
                    <Step
                      number="1"
                      label="Details"
                      active={step === "details"}
                      completed={step === "verification"}
                    />

                    <div className="h-px w-12 bg-border" />

                    <Step
                      number="2"
                      label="Verify phone"
                      active={step === "verification"}
                      completed={false}
                    />
                  </div>
                )}

                {error && (
                  <div
                    role="alert"
                    className="mb-5 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
                  >
                    <AlertCircle size={18} className="mt-0.5 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {message && (
                  <div
                    role="status"
                    className="mb-5 rounded-xl border border-[#B9F1E3] bg-[#E8FBF6] p-3 text-sm text-[#087F62]"
                  >
                    {message}
                  </div>
                )}

                {step === "details" && (
                  <form onSubmit={handleDetailsSubmit} className="space-y-5">
                    <div>
                      <h2 className="text-2xl font-bold tracking-[-0.03em] text-[#101828]">
                        Create your account
                      </h2>
                      <p className="mt-1.5 text-sm text-[#667085]">
                        Enter your details to get started.
                      </p>
                    </div>

                    <div>
                      <label
                        htmlFor="signup-name"
                        className="mb-2 block text-sm font-semibold text-[#344054]"
                      >
                        Full name *
                      </label>
                      <div className="relative">
                        <UserRound
                          size={18}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#98A2B3]"
                        />
                        <input
                          id="signup-name"
                          type="text"
                          autoComplete="name"
                          required
                          maxLength={100}
                          value={fullName}
                          onChange={(event) => setFullName(event.target.value)}
                          placeholder="Your full name"
                          className="h-12 w-full rounded-xl border border-[#D0D5DD] bg-white pl-11 pr-4 text-sm text-[#101828] outline-none transition placeholder:text-[#98A2B3] focus:border-[#00D09C] focus:ring-4 focus:ring-[#00D09C]/10"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="signup-email"
                        className="mb-2 block text-sm font-semibold text-[#344054]"
                      >
                        Email address *
                      </label>
                      <div className="relative">
                        <Mail
                          size={18}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#98A2B3]"
                        />
                        <input
                          id="signup-email"
                          type="email"
                          autoComplete="email"
                          required
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                          placeholder="you@example.com"
                          className="h-12 w-full rounded-xl border border-[#D0D5DD] bg-white pl-11 pr-4 text-sm text-[#101828] outline-none transition placeholder:text-[#98A2B3] focus:border-[#00D09C] focus:ring-4 focus:ring-[#00D09C]/10"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="signup-phone"
                        className="mb-2 block text-sm font-semibold text-[#344054]"
                      >
                        Indian mobile number *
                      </label>
                      <div className="relative">
                        <Phone
                          size={18}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#98A2B3]"
                        />
                        <input
                          id="signup-phone"
                          type="tel"
                          inputMode="numeric"
                          autoComplete="tel-national"
                          required
                          maxLength={10}
                          value={phone}
                          onChange={(event) =>
                            setPhone(
                              event.target.value
                                .replace(/\D/g, "")
                                .slice(0, 10),
                            )
                          }
                          placeholder="10-digit mobile number"
                          className="h-12 w-full rounded-xl border border-[#D0D5DD] bg-white pl-11 pr-4 text-sm text-[#101828] outline-none transition placeholder:text-[#98A2B3] focus:border-[#00D09C] focus:ring-4 focus:ring-[#00D09C]/10"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="signup-password"
                        className="mb-2 block text-sm font-semibold text-[#344054]"
                      >
                        Password *
                      </label>
                      <div className="relative">
                        <LockKeyhole
                          size={18}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#98A2B3]"
                        />
                        <input
                          id="signup-password"
                          type="password"
                          autoComplete="new-password"
                          required
                          minLength={6}
                          maxLength={128}
                          value={password}
                          onChange={(event) => setPassword(event.target.value)}
                          placeholder="At least 6 characters"
                          className="h-12 w-full rounded-xl border border-[#D0D5DD] bg-white pl-11 pr-4 text-sm text-[#101828] outline-none transition placeholder:text-[#98A2B3] focus:border-[#00D09C] focus:ring-4 focus:ring-[#00D09C]/10"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#00D09C] px-5 text-sm font-bold text-[#06251F] shadow-[0_8px_24px_rgba(0,208,156,0.20)] transition-all hover:-translate-y-0.5 hover:bg-[#00B987] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <LoaderCircle size={18} className="animate-spin" />
                          Sending OTP...
                        </>
                      ) : (
                        <>
                          Send phone OTP
                          <ArrowRight size={17} />
                        </>
                      )}
                    </button>
                  </form>
                )}

                {step === "verification" && (
                  <form onSubmit={handleVerification} className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold tracking-[-0.03em] text-[#101828]">
                        Verify your mobile number
                      </h2>
                      <p className="mt-2 text-sm leading-6 text-[#667085]">
                        Enter the code sent to{" "}
                        <span className="font-semibold text-[#344054]">
                          +91 {phone}
                        </span>
                      </p>
                    </div>

                    <input
                      type="text"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      maxLength={6}
                      required
                      aria-label="6-digit phone verification code"
                      placeholder="000000"
                      value={verificationCode}
                      onChange={(event) =>
                        setVerificationCode(
                          event.target.value.replace(/\D/g, "").slice(0, 6),
                        )
                      }
                      className="h-14 w-full rounded-xl border border-[#D0D5DD] bg-white text-center text-xl font-bold tracking-[0.35em] text-[#101828] outline-none transition placeholder:text-[#D0D5DD] focus:border-[#00D09C] focus:ring-4 focus:ring-[#00D09C]/10"
                    />

                    <button
                      type="submit"
                      disabled={loading || verificationCode.length !== 6}
                      className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#00D09C] px-5 text-sm font-bold text-[#06251F] shadow-[0_8px_24px_rgba(0,208,156,0.20)] transition-all hover:-translate-y-0.5 hover:bg-[#00B987] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <LoaderCircle size={18} className="animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        <>
                          Verify & create account
                          <CheckCircle2 size={17} />
                        </>
                      )}
                    </button>

                    <div className="text-center">
                      {secondsLeft > 0 ? (
                        <p className="text-sm text-[#667085]">
                          Resend OTP in{" "}
                          <span className="font-bold text-[#00B987]">
                            {secondsLeft}s
                          </span>
                        </p>
                      ) : (
                        <button
                          type="button"
                          onClick={handleResendCode}
                          disabled={loading}
                          className="text-sm font-bold text-[#00B987] hover:underline disabled:opacity-50"
                        >
                          Resend OTP
                        </button>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={handleChangeDetails}
                      disabled={loading}
                      className="w-full text-center text-sm font-semibold text-[#667085] transition hover:text-[#00B987]"
                    >
                      ← Change details
                    </button>
                  </form>
                )}

                {step === "success" && (
                  <div className="space-y-5 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E8FBF6] text-[#00B987]">
                      <CheckCircle2 size={34} />
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-[#101828]">
                        Account created successfully
                      </h2>
                      <p className="mt-2 text-sm leading-6 text-[#667085]">
                        We sent an email verification link to{" "}
                        <strong className="break-all text-[#344054]">
                          {email}
                        </strong>
                        . Check your inbox before continuing.
                      </p>
                    </div>

                    <Link
                      href="/auth/login"
                      className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#00D09C] px-5 text-sm font-bold text-[#06251F] transition hover:bg-[#00B987]"
                    >
                      Continue to sign in
                      <ArrowRight size={17} />
                    </Link>
                  </div>
                )}
              </div>

              <div className="border-t border-[#EAECF0] bg-[#FCFCFD] px-6 py-4 text-center sm:px-8">
                <p className="text-xs leading-5 text-[#98A2B3]">
                  Your account information is protected with secure
                  verification.
                </p>
              </div>
            </div>

            <p className="mt-6 text-center text-sm text-[#667085]">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="font-bold text-[#00B987] transition hover:text-[#009F78] hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

function Step({
  number,
  label,
  active,
  completed,
}: {
  number: string;
  label: string;
  active: boolean;
  completed: boolean;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <span
        className={[
          "flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold",
          active
            ? "bg-[#00D09C] text-[#06251F]"
            : completed
              ? "bg-[#E8FBF6] text-[#00B987]"
              : "bg-[#F2F4F7] text-[#98A2B3]",
        ].join(" ")}
      >
        {completed ? "✓" : number}
      </span>

      <span
        className={[
          "hidden text-xs font-semibold sm:block",
          active || completed ? "text-[#344054]" : "text-[#98A2B3]",
        ].join(" ")}
      >
        {label}
      </span>
    </div>
  );
}
