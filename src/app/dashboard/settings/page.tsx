"use client";

import { useState } from "react";
import {
  Settings,
  Bell,
  ShieldCheck,
  Palette,
  LockKeyhole,
  Mail,
  Smartphone,
  TrendingUp,
  Newspaper,
  Moon,
  Sun,
  Monitor,
  CheckCircle2,
  Info,
  ChevronRight,
} from "lucide-react";

type ToggleProps = {
  title: string;
  description: string;
  checked: boolean;
  onChange: () => void;
};

function SettingToggle({ title, description, checked, onChange }: ToggleProps) {
  return (
    <div className="flex items-center justify-between gap-5 py-4">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-[#172033]">{title}</p>
        <p className="mt-1 text-xs leading-5 text-[#64748b]">{description}</p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={title}
        onClick={onChange}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          checked ? "bg-[#00c896]" : "bg-[#cbd5e1]"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}

const selectClass =
  "mt-2 block w-full max-w-lg rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm text-[#172033] outline-none transition focus:border-[#00c896] focus:ring-2 focus:ring-[#00c896]/10";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("General");

  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    marketAlerts: true,
    priceAlerts: true,
    newsUpdates: false,
    portfolioUpdates: true,
    twoFactor: false,
    loginAlerts: true,
    showBalance: true,
  });

  const [appearance, setAppearance] = useState("Light");
  const [language, setLanguage] = useState("English");
  const [currency, setCurrency] = useState("INR (₹)");
  const [showMessage, setShowMessage] = useState(false);

  const updateSetting = (key: keyof typeof settings) => {
    setSettings((current) => ({
      ...current,
      [key]: !current[key],
    }));
    setShowMessage(false);
  };

  const saveSettings = () => {
    setShowMessage(true);
  };

  const tabs = [
    { name: "General", icon: Settings },
    { name: "Notifications", icon: Bell },
    { name: "Appearance", icon: Palette },
    { name: "Security", icon: ShieldCheck },
  ];

  const sectionClass =
    "rounded-2xl border border-[#e8edf2] bg-white p-5 shadow-sm sm:p-7";

  return (
    <div className="mx-auto w-full max-w-312.5 space-y-6 pb-10">
      {/* Page Header */}
      <div className="space-y-1">
        <div className="mb-2 flex items-center gap-2 text-xs text-[#94a3b8]">
          <span>Dashboard</span>
          <span>/</span>
          <span className="font-medium text-[#64748b]">Settings</span>
        </div>

        <h1 className="text-3xl! font-bold! leading-tight! tracking-tight! text-[#172033]!">
          Settings
        </h1>

        <p className="text-sm text-[#64748b]">
          Manage your account preferences and customize your AITradeX
          experience.
        </p>
      </div>

      {/* Settings Layout */}
      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[230px_minmax(0,1fr)]">
        {/* Settings Navigation */}
        <aside className="rounded-2xl border border-[#e8edf2] bg-white p-3 shadow-sm">
          <p className="px-3 pb-3 pt-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#94a3b8]">
            Preferences
          </p>

          <div className="grid grid-cols-2 gap-1.5 lg:grid-cols-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.name;

              return (
                <button
                  key={tab.name}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.name);
                    setShowMessage(false);
                  }}
                  className={`flex items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition ${
                    active
                      ? "bg-[#e8fbf5] text-[#009b72]"
                      : "text-[#64748b] hover:bg-[#f8fafc] hover:text-[#172033]"
                  }`}
                >
                  <Icon size={18} />
                  <span>{tab.name}</span>

                  {active && (
                    <ChevronRight
                      size={16}
                      className="ml-auto hidden lg:block"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </aside>

        {/* Settings Content */}
        <div className="min-w-0 space-y-5">
          {/* GENERAL */}
          {activeTab === "General" && (
            <>
              <section className={sectionClass}>
                <div className="mb-6 border-b border-[#edf0f4] pb-5">
                  <h2 className="text-xl! font-bold! leading-tight! text-[#172033]!">
                    General Preferences
                  </h2>
                  <p className="mt-1 text-sm text-[#64748b]">
                    Configure your language, currency and dashboard preferences.
                  </p>
                </div>

                <div className="max-w-xl space-y-6">
                  <div>
                    <label
                      htmlFor="language"
                      className="block text-sm font-semibold text-[#334155]"
                    >
                      Language
                    </label>

                    <select
                      id="language"
                      value={language}
                      onChange={(e) => {
                        setLanguage(e.target.value);
                        setShowMessage(false);
                      }}
                      className={selectClass}
                    >
                      <option value="English">English</option>
                      <option value="Hindi">Hindi</option>
                      <option value="Gujarati">Gujarati</option>
                    </select>

                    <p className="mt-1.5 text-xs text-[#94a3b8]">
                      Select your preferred display language.
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="currency"
                      className="block text-sm font-semibold text-[#334155]"
                    >
                      Preferred Currency
                    </label>

                    <select
                      id="currency"
                      value={currency}
                      onChange={(e) => {
                        setCurrency(e.target.value);
                        setShowMessage(false);
                      }}
                      className={selectClass}
                    >
                      <option value="INR (₹)">INR (₹) - Indian Rupee</option>
                      <option value="USD ($)">USD ($) - US Dollar</option>
                      <option value="EUR (€)">EUR (€) - Euro</option>
                    </select>

                    <p className="mt-1.5 text-xs text-[#94a3b8]">
                      Choose the currency used to display financial values.
                    </p>
                  </div>
                </div>

                <div className="mt-7 border-t border-[#edf0f4] pt-2">
                  <SettingToggle
                    title="Show portfolio balance"
                    description="Display your portfolio balance on dashboard widgets."
                    checked={settings.showBalance}
                    onChange={() => updateSetting("showBalance")}
                  />
                </div>
              </section>
            </>
          )}

          {/* NOTIFICATIONS */}
          {activeTab === "Notifications" && (
            <section className={sectionClass}>
              <div className="mb-5 border-b border-[#edf0f4] pb-5">
                <h2 className="text-xl! font-bold! leading-tight! text-[#172033]!">
                  Notification Preferences
                </h2>
                <p className="mt-1 text-sm text-[#64748b]">
                  Choose the updates and alerts you want to receive.
                </p>
              </div>

              <div className="divide-y divide-[#edf0f4]">
                <div className="flex items-center gap-3 pb-2">
                  <Mail size={18} className="text-[#00a77c]" />
                  <p className="text-sm font-bold text-[#172033]">
                    Communication
                  </p>
                </div>

                <SettingToggle
                  title="Email notifications"
                  description="Receive important account updates by email."
                  checked={settings.emailNotifications}
                  onChange={() => updateSetting("emailNotifications")}
                />

                <SettingToggle
                  title="Push notifications"
                  description="Receive notifications in your browser or app."
                  checked={settings.pushNotifications}
                  onChange={() => updateSetting("pushNotifications")}
                />

                <div className="flex items-center gap-3 pb-2 pt-5">
                  <TrendingUp size={18} className="text-[#00a77c]" />
                  <p className="text-sm font-bold text-[#172033]">
                    Market Updates
                  </p>
                </div>

                <SettingToggle
                  title="Market alerts"
                  description="Receive important market movement alerts."
                  checked={settings.marketAlerts}
                  onChange={() => updateSetting("marketAlerts")}
                />

                <SettingToggle
                  title="Price alerts"
                  description="Get notified about your selected stock price levels."
                  checked={settings.priceAlerts}
                  onChange={() => updateSetting("priceAlerts")}
                />

                <SettingToggle
                  title="Portfolio updates"
                  description="Receive updates about your portfolio activity."
                  checked={settings.portfolioUpdates}
                  onChange={() => updateSetting("portfolioUpdates")}
                />

                <div className="flex items-center gap-3 pb-2 pt-5">
                  <Newspaper size={18} className="text-[#00a77c]" />
                  <p className="text-sm font-bold text-[#172033]">
                    Content Updates
                  </p>
                </div>

                <SettingToggle
                  title="News and educational updates"
                  description="Receive market news and learning content."
                  checked={settings.newsUpdates}
                  onChange={() => updateSetting("newsUpdates")}
                />
              </div>
            </section>
          )}

          {/* APPEARANCE */}
          {activeTab === "Appearance" && (
            <section className={sectionClass}>
              <div className="mb-6 border-b border-[#edf0f4] pb-5">
                <h2 className="text-xl! font-bold! leading-tight! text-[#172033]!">
                  Appearance
                </h2>
                <p className="mt-1 text-sm text-[#64748b]">
                  Customize how AITradeX looks on your device.
                </p>
              </div>

              <p className="mb-3 text-sm font-semibold text-[#334155]">
                Theme Preference
              </p>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {[
                  { name: "Light", icon: Sun },
                  { name: "Dark", icon: Moon },
                  { name: "System", icon: Monitor },
                ].map((theme) => {
                  const Icon = theme.icon;
                  const selected = appearance === theme.name;

                  return (
                    <button
                      key={theme.name}
                      type="button"
                      onClick={() => {
                        setAppearance(theme.name);
                        setShowMessage(false);
                      }}
                      className={`flex items-center gap-3 rounded-xl border p-4 text-sm font-semibold transition ${
                        selected
                          ? "border-[#00c896] bg-[#f0fdf8] text-[#009b72]"
                          : "border-[#e2e8f0] text-[#64748b] hover:border-[#b9e9da]"
                      }`}
                    >
                      <Icon size={19} />
                      {theme.name}

                      {selected && (
                        <CheckCircle2 size={17} className="ml-auto" />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4">
                <Info size={18} className="mt-0.5 shrink-0 text-blue-600" />
                <p className="text-xs leading-5 text-blue-800">
                  Theme selection is currently a UI preference. Application-wide
                  dark mode and system theme support will be implemented
                  separately.
                </p>
              </div>
            </section>
          )}

          {/* SECURITY */}
          {activeTab === "Security" && (
            <section className={sectionClass}>
              <div className="mb-5 border-b border-[#edf0f4] pb-5">
                <h2 className="text-xl! font-bold! leading-tight! text-[#172033]!">
                  Security Settings
                </h2>
                <p className="mt-1 text-sm text-[#64748b]">
                  Manage your account security preferences.
                </p>
              </div>

              <div className="divide-y divide-[#edf0f4]">
                <div className="flex items-center justify-between gap-4 py-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-xl bg-[#e8fbf5] p-3 text-[#00a77c]">
                      <LockKeyhole size={19} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#172033]">
                        Change Password
                      </p>
                      <p className="mt-1 text-xs text-[#64748b]">
                        Update your account password.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      alert("Password management requires backend integration.")
                    }
                    className="rounded-lg border border-[#e2e8f0] px-3 py-2 text-xs font-semibold text-[#334155] transition hover:border-[#00c896]"
                  >
                    Manage
                  </button>
                </div>

                <SettingToggle
                  title="Two-factor authentication"
                  description="Enable an additional verification step when signing in."
                  checked={settings.twoFactor}
                  onChange={() => updateSetting("twoFactor")}
                />

                <SettingToggle
                  title="Login alerts"
                  description="Receive alerts about new account sign-ins."
                  checked={settings.loginAlerts}
                  onChange={() => updateSetting("loginAlerts")}
                />

                <div className="flex items-center justify-between gap-4 py-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-xl bg-[#eef4ff] p-3 text-blue-600">
                      <Smartphone size={19} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#172033]">
                        Active Sessions
                      </p>
                      <p className="mt-1 text-xs text-[#64748b]">
                        Review devices signed in to your account.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      alert("Session management requires backend integration.")
                    }
                    className="rounded-lg border border-[#e2e8f0] px-3 py-2 text-xs font-semibold text-[#334155] transition hover:border-[#00c896]"
                  >
                    View
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* Save Preferences */}
          <div className="flex flex-col gap-3 border-t border-[#e8edf2] pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-[#94a3b8]">
              Preferences are currently stored in local page state.
            </p>

            <button
              type="button"
              onClick={saveSettings}
              className="rounded-xl bg-[#00c896] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#00b386]"
            >
              Save Preferences
            </button>
          </div>

          {showMessage && (
            <div className="flex items-center gap-2 rounded-xl border border-[#b8edda] bg-[#f0fdf7] p-4 text-sm font-medium text-[#087b59]">
              <CheckCircle2 size={18} />
              Your preferences have been updated in this demo session.
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-center gap-2 pt-2 text-xs text-[#94a3b8]">
        <ShieldCheck size={15} />
        AITradeX Account Preferences
      </div>
    </div>
  );
}