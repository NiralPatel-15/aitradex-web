"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, LockKeyhole, Mail } from "lucide-react";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginWithEmail } from "@/lib/auth";
import { loginSchema, type LoginInput } from "@/validators/auth.schema";

export default function LoginForm() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<LoginInput> = async (data) => {
    setErrorMessage("");

    try {
      const result = await loginWithEmail(
        data.email,
        data.password,
        data.rememberMe,
      );

      // Clear any stale credentials saved by the previous login flow.
      localStorage.removeItem("aitradex_token");
      localStorage.removeItem("aitradex_user");
      sessionStorage.removeItem("aitradex_token");
      sessionStorage.removeItem("aitradex_user");

      // Save the current login information according to Remember Me.
      const storage = data.rememberMe ? localStorage : sessionStorage;

      storage.setItem("aitradex_token", result.token);
      storage.setItem("aitradex_user", JSON.stringify(result.user));

      router.replace("/dashboard");
    } catch (error: unknown) {
      const code =
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        typeof error.code === "string"
          ? error.code
          : "";

      const friendlyMessages: Record<string, string> = {
        "auth/invalid-credential":
          "Incorrect email or password. Please try again.",
        "auth/invalid-email":
          "Please enter a valid email address.",
        "auth/user-disabled":
          "This account has been disabled. Please contact support.",
        "auth/too-many-requests":
          "Too many attempts. Please wait a moment and try again.",
        "auth/network-request-failed":
          "Network error. Check your internet connection and try again.",
      };

      setErrorMessage(
        friendlyMessages[code] ||
          (error instanceof Error
            ? error.message
            : "Unable to log in. Please try again."),
      );
    }
  };

  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#FAFCFB]">
      <section className="relative overflow-hidden">
        {/* Existing AITradeX background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-130 w-190 -translate-x-1/2 rounded-full bg-[#00D09C]/10 blur-[110px]" />
          <div className="absolute left-[8%] top-[25%] h-sidebar w-sidebar rounded-full bg-[#DFFAF3]/60 blur-[100px]" />
          <div className="absolute right-[8%] top-[30%] h-sidebar w-sidebar rounded-full bg-[#E7F3FF]/50 blur-[100px]" />
        </div>

        <div className="relative mx-auto flex w-full max-w-[1280px] justify-center px-4 pb-16 pt-6 sm:px-6 sm:pb-20 sm:pt-1 lg:px-8">
          <div className="w-full max-w-140">
            {/* Heading */}
            <div className="mt-6 text-center">
              <h1 className="text-[42px] font-bold tracking-tighter text-[#101828] sm:text-[52px]">
                Welcome back.
              </h1>

              <p className="mx-auto mt-3 max-w-125 text-[15px] leading-7 text-[#667085] sm:text-base">
                Sign in to your AITradeX account and continue your investment
                journey.
              </p>
            </div>

            {/* Login card */}
            <div className="mt-9 overflow-hidden rounded-[24px] border border-border bg-white/95 shadow-[0_25px_70px_rgba(16,24,40,0.08)] backdrop-blur">
              <div className="h-1.5 bg-[#00D09C]" />

              <div className="p-6 sm:p-8 lg:p-9">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold tracking-[-0.03em] text-[#101828]">
                    Sign in to AITradeX
                  </h2>

                  <p className="mt-1.5 text-sm text-[#667085]">
                    Enter your registered email and password.
                  </p>
                </div>

                <form
                  noValidate
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-5"
                >
                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-semibold text-[#344054]"
                    >
                      Email address
                      <span className="ml-1 text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <Mail
                        size={18}
                        aria-hidden="true"
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#98A2B3]"
                      />

                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        {...register("email")}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={
                          errors.email ? "email-error" : undefined
                        }
                        className={[
                          "h-12 w-full rounded-xl border bg-white pl-11 pr-4 text-sm text-[#101828] outline-none transition",
                          "placeholder:text-[#98A2B3]",
                          errors.email
                            ? "border-red-400 focus:border-red-400 focus:ring-4 focus:ring-red-50"
                            : "border-[#D0D5DD] focus:border-[#00D09C] focus:ring-4 focus:ring-[#00D09C]/10",
                        ].join(" ")}
                      />
                    </div>

                    {errors.email?.message && (
                      <p
                        id="email-error"
                        role="alert"
                        className="mt-2 text-xs font-medium text-red-500"
                      >
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div>
                    <label
                      htmlFor="password"
                      className="mb-2 block text-sm font-semibold text-[#344054]"
                    >
                      Password
                      <span className="ml-1 text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <LockKeyhole
                        size={18}
                        aria-hidden="true"
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#98A2B3]"
                      />

                      <input
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        placeholder="Enter your password"
                        {...register("password")}
                        aria-invalid={Boolean(errors.password)}
                        aria-describedby={
                          errors.password
                            ? "password-error"
                            : "password-help"
                        }
                        className={[
                          "h-12 w-full rounded-xl border bg-white pl-11 pr-4 text-sm text-[#101828] outline-none transition",
                          "placeholder:text-[#98A2B3]",
                          errors.password
                            ? "border-red-400 focus:border-red-400 focus:ring-4 focus:ring-red-50"
                            : "border-[#D0D5DD] focus:border-[#00D09C] focus:ring-4 focus:ring-[#00D09C]/10",
                        ].join(" ")}
                      />
                    </div>

                    {errors.password?.message ? (
                      <p
                        id="password-error"
                        role="alert"
                        className="mt-2 text-xs font-medium text-red-500"
                      >
                        {errors.password.message}
                      </p>
                    ) : (
                      <p
                        id="password-help"
                        className="mt-2 text-xs text-[#667085]"
                      >
                        Enter the password associated with your account.
                      </p>
                    )}
                  </div>

                  {/* Remember me */}
                  <div className="flex items-center gap-2">
                    <input
                      id="rememberMe"
                      type="checkbox"
                      {...register("rememberMe")}
                      className="h-4 w-4 rounded border-[#D0D5DD] accent-[#00D09C] focus:ring-[#00D09C]"
                    />

                    <label
                      htmlFor="rememberMe"
                      className="text-sm text-[#475467]"
                    >
                      Remember me on this device
                    </label>
                  </div>

                  {/* Authentication error */}
                  {errorMessage && (
                    <div
                      role="alert"
                      className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                    >
                      {errorMessage}
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#00D09C] px-5 text-sm font-bold text-[#06251F] shadow-[0_8px_24px_rgba(0,208,156,0.20)] transition-all hover:-translate-y-0.5 hover:bg-[#00B987] hover:shadow-[0_12px_30px_rgba(0,208,156,0.25)] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? "Signing in..." : "Sign in"}
                    {!isSubmitting && <ArrowRight size={17} />}
                  </button>
                </form>
              </div>

              {/* Card footer */}
              <div className="border-t border-[#EAECF0] bg-[#FCFCFD] px-6 py-4 text-center sm:px-8">
                <p className="text-xs leading-5 text-[#98A2B3]">
                  Your information is protected with secure authentication.
                </p>
              </div>
            </div>

            {/* Signup link */}
            <p className="mt-6 text-center text-sm text-[#667085]">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/signup"
                className="font-bold text-[#00B987] transition hover:text-[#009F78] hover:underline"
              >
                Create one
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}