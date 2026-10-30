"use client";

import {
  FormEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  AlertCircle,
  Bot,
  CheckCircle2,
  LoaderCircle,
  Send,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type DisclaimerSection = {
  heading: string;
  text: string;
};

type AIDisclaimer = {
  version: string;
  title: string;
  sections: DisclaimerSection[];
};

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
).replace(/\/+$/, "");

const SUGGESTIONS = [
  "Explain ETFs in simple terms",
  "What is diversification?",
  "Explain fundamental analysis",
  "How does risk management work?",
];

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [authReady, setAuthReady] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  const [disclaimer, setDisclaimer] = useState<AIDisclaimer | null>(null);
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);
  const [disclaimerLoading, setDisclaimerLoading] = useState(true);
  const [disclaimerSaving, setDisclaimerSaving] = useState(false);
  const [disclaimerError, setDisclaimerError] = useState("");

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Verify the Firebase session and load acceptance from the backend.
  useEffect(() => {
    let active = true;
    let requestId = 0;

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      const currentRequest = ++requestId;

      if (!active) return;

      setAuthReady(true);
      setSignedIn(Boolean(user));
      setDisclaimer(null);
      setDisclaimerAccepted(false);
      setDisclaimerError("");
      setDisclaimerLoading(true);

      if (!user) {
        setDisclaimerLoading(false);
        setDisclaimerError("Please sign in to use AI Assistant.");
        return;
      }

      try {
        const token = await user.getIdToken();

        const response = await fetch(
          `${API_URL}/ai/disclaimer/status`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
            cache: "no-store",
          },
        );

        const result = await response.json().catch(() => null);

        if (!response.ok || result?.success !== true) {
          throw new Error(
            result?.message || "Unable to verify the AI disclaimer.",
          );
        }

        if (!active || currentRequest !== requestId) return;

        const loadedDisclaimer = result.disclaimer;

        if (
          !loadedDisclaimer ||
          typeof loadedDisclaimer.version !== "string" ||
          typeof loadedDisclaimer.title !== "string" ||
          !Array.isArray(loadedDisclaimer.sections)
        ) {
          throw new Error("The server returned an invalid disclaimer.");
        }

        setDisclaimer(loadedDisclaimer);
        setDisclaimerAccepted(result.accepted === true);
      } catch (err) {
        if (!active || currentRequest !== requestId) return;

        setDisclaimerAccepted(false);
        setDisclaimerError(
          err instanceof Error
            ? err.message
            : "Unable to verify the AI disclaimer.",
        );
      } finally {
        if (active && currentRequest === requestId) {
          setDisclaimerLoading(false);
        }
      }
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  // Scroll to the newest message.
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function acceptAIDisclaimer() {
    const user = auth.currentUser;

    if (
      disclaimerSaving ||
      disclaimerLoading ||
      !disclaimer ||
      !user ||
      !signedIn
    ) {
      return;
    }

    setDisclaimerSaving(true);
    setDisclaimerError("");

    try {
      const token = await user.getIdToken();

      const response = await fetch(
        `${API_URL}/ai/disclaimer/accept`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            version: disclaimer.version,
          }),
        },
      );

      const result = await response.json().catch(() => null);

      if (
        !response.ok ||
        result?.success !== true ||
        result?.accepted !== true
      ) {
        throw new Error(
          result?.message || "Unable to save disclaimer acceptance.",
        );
      }

      // Confirm acceptance with the status endpoint before unlocking chat.
      const verifyToken = await user.getIdToken(true);

      const verification = await fetch(
        `${API_URL}/ai/disclaimer/status`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${verifyToken}`,
            Accept: "application/json",
          },
          cache: "no-store",
        },
      );

      const verificationResult = await verification.json().catch(() => null);

      if (
        !verification.ok ||
        verificationResult?.success !== true ||
        verificationResult?.accepted !== true ||
        verificationResult?.disclaimer?.version !== disclaimer.version
      ) {
        throw new Error(
          "Acceptance was submitted, but the server could not verify it. Please try again.",
        );
      }

      setDisclaimer(verificationResult.disclaimer);
      setDisclaimerAccepted(true);
      setDisclaimerError("");
    } catch (err) {
      setDisclaimerAccepted(false);
      setDisclaimerError(
        err instanceof Error
          ? err.message
          : "Unable to save acceptance. Please try again.",
      );
    } finally {
      setDisclaimerSaving(false);
    }
  }

  async function sendMessage(
    event?: FormEvent<HTMLFormElement>,
    suggestedMessage?: string,
  ) {
    event?.preventDefault();

    const text = (suggestedMessage ?? input).trim();

    if (!text || loading) return;

    if (!authReady || !signedIn || !auth.currentUser) {
      setError("Please sign in to your AITradeX account.");
      return;
    }

    if (disclaimerLoading || !disclaimerAccepted || !disclaimer) {
      setError("Please accept the current AI disclaimer before chatting.");
      return;
    }

    setError("");
    setInput("");
    setLoading(true);

    const previousMessages = messages;

    setMessages((current) => [
      ...current,
      { role: "user", content: text },
    ]);

    try {
      const token = await auth.currentUser.getIdToken();

      const response = await fetch(`${API_URL}/ai/chat`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          message: text,
          history: previousMessages.slice(-12),
        }),
      });

      const result = await response.json().catch(() => null);

      if (response.status === 403 &&
          result?.code === "DISCLAIMER_ACCEPTANCE_REQUIRED") {
        setDisclaimerAccepted(false);
        setDisclaimerError(
          "Please review and accept the current disclaimer to continue.",
        );
        throw new Error(
          "Your disclaimer acceptance needs to be verified. Please review it again.",
        );
      }

      if (!response.ok || result?.success === false) {
        throw new Error(
          result?.message ||
            `AI request failed with status ${response.status}.`,
        );
      }

      if (
        typeof result?.message !== "string" ||
        !result.message.trim()
      ) {
        throw new Error("The AI service returned an empty response.");
      }

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: result.message.trim(),
        },
      ]);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to contact AITradeX AI. Please try again.",
      );
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  function handleInputKeyDown(
    event: KeyboardEvent<HTMLTextAreaElement>,
  ) {
    if (
      event.key === "Enter" &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing
    ) {
      event.preventDefault();

      if (!loading && input.trim()) {
        void sendMessage();
      }
    }
  }

  const showDisclaimer =
    authReady &&
    signedIn &&
    !disclaimerLoading &&
    !disclaimerAccepted &&
    Boolean(disclaimer);

  return (
    <main className="mx-auto w-full max-w-5xl space-y-6 pb-8">
      {/* Page heading */}
      <header>
        <div className="mb-2 flex items-center gap-2 text-xs text-[#94a3b8]">
          <span>Dashboard</span>
          <span>/</span>
          <span className="font-medium text-[#64748b]">AI Assistant</span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#172033]">
              AI Assistant
            </h1>

            <p className="mt-2 text-sm text-[#64748b]">
              Your AI companion for understanding financial markets.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-[#bceedd] bg-[#edfbf5] px-3 py-2 text-xs font-semibold text-[#008b66]">
            <span className="h-2 w-2 rounded-full bg-[#00b887]" />
            AI assistant
          </div>
        </div>
      </header>

      {/* Chat panel */}
      <section className="overflow-hidden rounded-2xl border border-[#e7edf2] bg-white shadow-sm">
        <div className="flex items-center gap-3 border-b border-[#edf0f4] px-5 py-4 sm:px-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e9fbf5] text-[#00a878]">
            <Sparkles size={22} />
          </div>

          <div>
            <h2 className="font-semibold text-[#172033]">AITradeX AI</h2>
            <p className="mt-1 text-xs text-[#8490a3]">
              Financial learning assistant
            </p>
          </div>
        </div>

        <div className="min-h-105 space-y-5 bg-[#fbfcfe] p-4 sm:p-6">
          {!authReady || disclaimerLoading ? (
            <div className="flex min-h-80 items-center justify-center gap-3 text-sm text-[#64748b]">
              <LoaderCircle size={20} className="animate-spin" />
              Verifying your account and disclaimer...
            </div>
          ) : !signedIn ? (
            <div className="flex min-h-80 flex-col items-center justify-center text-center">
              <ShieldCheck size={34} className="text-[#00a878]" />
              <h3 className="mt-4 text-lg font-semibold text-[#172033]">
                Sign in to continue
              </h3>
              <p className="mt-2 text-sm text-[#64748b]">
                Sign in to your AITradeX account to use AI Assistant.
              </p>
            </div>
          ) : !disclaimer ? (
            <div className="flex min-h-80 flex-col items-center justify-center text-center">
              <AlertCircle size={32} className="text-red-500" />
              <h3 className="mt-4 text-lg font-semibold text-[#172033]">
                Disclaimer verification unavailable
              </h3>
              <p className="mt-2 max-w-md text-sm leading-6 text-[#64748b]">
                AI chat is locked until the server verifies the current
                disclaimer.
              </p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-4 rounded-xl bg-[#00b887] px-4 py-2 text-sm font-semibold text-white hover:bg-[#00a477]"
              >
                Try again
              </button>
            </div>
          ) : messages.length === 0 ? (
            <div className="mx-auto flex max-w-xl flex-col items-center py-10 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-[#e9fbf5] text-[#00a878]">
                <Bot size={32} />
              </div>

              <h3 className="mt-5 text-xl font-bold text-[#172033]">
                Welcome to AITradeX AI
              </h3>

              <p className="mt-2 max-w-md text-sm leading-6 text-[#64748b]">
                Learn about investing, understand market concepts, and explore
                financial topics through simple explanations.
              </p>

              {disclaimerAccepted && (
                <div className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-[#008b66]">
                  <CheckCircle2 size={15} />
                  Disclaimer accepted
                </div>
              )}

              <div className="mt-6 grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
                {SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    disabled={loading || !disclaimerAccepted}
                    onClick={() => void sendMessage(undefined, suggestion)}
                    className="rounded-xl border border-[#e5ebf1] bg-white p-4 text-left text-sm font-medium text-[#455168] transition hover:border-[#9be6cd] hover:bg-[#f2fcf8] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((message, index) => {
              const isUser = message.role === "user";

              return (
                <div
                  key={`${index}-${message.role}`}
                  className={`flex items-start gap-3 ${
                    isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  {!isUser && (
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#e9fbf5] text-[#00a878]">
                      <Bot size={19} />
                    </div>
                  )}

                  <div
                    className={`max-w-[90%] overflow-hidden rounded-2xl px-4 py-3 text-sm leading-6 sm:max-w-[85%] ${
                      isUser
                        ? "whitespace-pre-wrap wrap-break-words rounded-tr-sm bg-[#00b887] text-white"
                        : "rounded-tl-sm border border-[#e8edf2] bg-white text-[#344054]"
                    }`}
                  >
                    {isUser ? (
                      message.content
                    ) : (
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          p: ({ children }) => (
                            <p className="mb-3 leading-7 last:mb-0">
                              {children}
                            </p>
                          ),
                          strong: ({ children }) => (
                            <strong className="font-semibold text-[#172033]">
                              {children}
                            </strong>
                          ),
                          h1: ({ children }) => (
                            <h1 className="mb-3 mt-4 text-xl font-bold text-[#172033] first:mt-0">
                              {children}
                            </h1>
                          ),
                          h2: ({ children }) => (
                            <h2 className="mb-2 mt-4 text-lg font-bold text-[#172033] first:mt-0">
                              {children}
                            </h2>
                          ),
                          h3: ({ children }) => (
                            <h3 className="mb-2 mt-3 text-base font-semibold text-[#172033] first:mt-0">
                              {children}
                            </h3>
                          ),
                          ul: ({ children }) => (
                            <ul className="mb-3 ml-5 list-disc space-y-1 last:mb-0">
                              {children}
                            </ul>
                          ),
                          ol: ({ children }) => (
                            <ol className="mb-3 ml-5 list-decimal space-y-1 last:mb-0">
                              {children}
                            </ol>
                          ),
                          li: ({ children }) => (
                            <li className="pl-1">{children}</li>
                          ),
                          blockquote: ({ children }) => (
                            <blockquote className="my-3 border-l-4 border-[#00b887] pl-4 text-[#64748b]">
                              {children}
                            </blockquote>
                          ),
                          code: ({ children }) => (
                            <code className="rounded bg-[#f0f4f7] px-1.5 py-0.5 font-mono text-sm text-[#087f5b]">
                              {children}
                            </code>
                          ),
                          pre: ({ children }) => (
                            <pre className="my-3 overflow-x-auto rounded-xl bg-[#172033] p-4 text-xs leading-6 text-white">
                              {children}
                            </pre>
                          ),
                          a: ({ children, href }) => (
                            <a
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium text-[#008b66] underline underline-offset-2"
                            >
                              {children}
                            </a>
                          ),
                          hr: () => <hr className="my-4 border-[#e8edf2]" />,
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    )}
                  </div>

                  {isUser && (
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#edf1f6] text-[#64748b]">
                      <UserRound size={18} />
                    </div>
                  )}
                </div>
              );
            })
          )}

          {loading && (
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#e9fbf5] text-[#00a878]">
                <Bot size={19} />
              </div>

              <div className="flex items-center gap-2 rounded-2xl border border-[#e8edf2] bg-white px-4 py-3 text-sm text-[#64748b]">
                <LoaderCircle size={16} className="animate-spin" />
                Thinking...
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {error && (
          <div
            role="alert"
            className="mx-4 mt-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700 sm:mx-6"
          >
            <AlertCircle size={18} className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {signedIn && disclaimerAccepted && (
          <form
            onSubmit={(event) => void sendMessage(event)}
            className="border-t border-[#edf0f4] bg-white p-4 sm:p-6"
          >
            <div className="flex items-end gap-3 rounded-2xl border border-[#dfe6ed] bg-[#fbfcfe] p-3 transition focus-within:border-[#80dfc0] focus-within:ring-2 focus-within:ring-[#00b887]/10">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder="Ask a financial or market-related question..."
                rows={2}
                maxLength={4000}
                disabled={loading || !disclaimerAccepted}
                aria-label="Your message"

                className="max-h-36 min-h-12 flex-1 resize-y bg-transparent px-1 py-2 text-sm text-[#172033] outline-none placeholder:text-[#9aa5b5] disabled:opacity-60"
              />

              <button
                type="submit"
                disabled={loading || !input.trim() || !disclaimerAccepted}
                aria-label="Send message"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#00b887] text-white transition hover:bg-[#00a477] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {loading ? (
                  <LoaderCircle size={19} className="animate-spin" />
                ) : (
                  <Send size={18} />
                )}
              </button>
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#94a3b8]">
              <span>Enter to send · Shift + Enter for a new line</span>
              <span>{input.length}/4000</span>
            </div>
          </form>
        )}
      </section>

      <p className="text-xs leading-5 text-[#8490a3]">
        AI responses may be inaccurate and are for educational purposes only.
        They are not guaranteed predictions or personalized financial advice.
        Verify important information before making investment decisions.
      </p>

      {/* Required disclaimer popup */}
      {showDisclaimer && disclaimer && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-[#172033]/60 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="ai-disclaimer-title"
        >
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-[#e7edf2] bg-white p-6 shadow-2xl sm:p-8">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e9fbf5] text-[#008b66]">
              <ShieldCheck size={25} />
            </div>

            <h2
              id="ai-disclaimer-title"
              className="text-xl font-bold text-[#172033]"
            >
              {disclaimer.title}
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#64748b]">
              Please review this information before using AITradeX AI.
            </p>

            <div className="mt-5 space-y-4">
              {disclaimer.sections.map((section) => (
                <section key={section.heading}>
                  <h3 className="text-sm font-semibold text-[#172033]">
                    {section.heading}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-[#64748b]">
                    {section.text}
                  </p>
                </section>
              ))}
            </div>

            <div className="mt-5 rounded-xl bg-[#f5f8fa] p-3 text-xs leading-5 text-[#64748b]">
              Disclaimer version: {disclaimer.version}
            </div>

            {disclaimerError && (
              <p role="alert" className="mt-4 text-sm text-red-600">
                {disclaimerError}
              </p>
            )}

            <button
              type="button"
              onClick={() => void acceptAIDisclaimer()}
              disabled={disclaimerSaving || disclaimerLoading}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#00b887] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#00a477] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {disclaimerSaving ? (
                <LoaderCircle size={18} className="animate-spin" />
              ) : (
                <CheckCircle2 size={18} />
              )}

              {disclaimerSaving
                ? "Saving acceptance..."
                : "I have read and accept"}
            </button>

            <p className="mt-3 text-center text-xs leading-5 text-[#8490a3]">
              Your acceptance is saved to your AITradeX account.
            </p>
          </div>
        </div>
      )}

      {/* Fail closed when the disclaimer service is unavailable */}
      {authReady &&
        signedIn &&
        !disclaimerLoading &&
        !disclaimer &&
        !disclaimerAccepted && (
          <div
            role="alert"
            className="fixed inset-0 z-110 flex items-center justify-center bg-[#172033]/50 p-4"
          >
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
              <AlertCircle size={30} className="text-red-500" />

              <h2 className="mt-4 text-lg font-bold text-[#172033]">
                Disclaimer verification unavailable
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#64748b]">
                AI chat remains locked until your disclaimer status can be
                verified by the server.
              </p>

              <p role="alert" className="mt-3 text-sm text-red-600">
                {disclaimerError || "Unable to verify disclaimer acceptance."}
              </p>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-5 w-full rounded-xl bg-[#00b887] px-4 py-3 text-sm font-semibold text-white hover:bg-[#00a477]"
              >
                Retry verification
              </button>
            </div>
          </div>
        )}
    </main>
  );
}
