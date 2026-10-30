"use client";

import { useState } from "react";
import {
  UserRound,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  BriefcaseBusiness,
  ShieldCheck,
  Save,
  Pencil,
  CheckCircle2,
  Info,
} from "lucide-react";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const [profile, setProfile] = useState({
    fullName: "Niral Patel",
    email: "niral@example.com",
    phone: "+91 98765 43210",
    dateOfBirth: "",
    location: "Gujarat, India",
    occupation: "Student",
    experience: "Beginner",
    riskLevel: "Moderate",
  });

  const handleChange = (field: string, value: string) => {
    setProfile((current) => ({
      ...current,
      [field]: value,
    }));
    setShowMessage(false);
  };

  const handleSave = () => {
    setIsEditing(false);
    setShowMessage(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setShowMessage(false);
  };

  const inputClass =
    "mt-2 w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm text-[#172033] outline-none transition placeholder:text-[#94a3b8] focus:border-[#00c896] focus:ring-2 focus:ring-[#00c896]/10 disabled:bg-[#f8fafc] disabled:text-[#64748b]";

  return (
    <div className="space-y-7 pb-10">
      {/* Page Heading */}
      <div>
        <div className="mb-2 flex items-center gap-2 text-sm text-[#64748b]">
          <span>Dashboard</span>
          <span>/</span>
          <span className="font-medium text-[#172033]">Profile</span>
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-[#172033] sm:text-3xl">
          My Profile
        </h1>

        <p className="mt-2 text-sm text-[#64748b]">
          Manage your personal information and investment preferences.
        </p>
      </div>

      {/* Profile Overview */}
      <section className="overflow-hidden rounded-2xl border border-[#e8edf2] bg-white shadow-sm">
        <div className="h-32 bg-linear-to-r from-[#00c896] to-[#75e6c2]" />

        <div className="px-5 pb-6 sm:px-7">
          <div className="-mt-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-end gap-4">
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-[#e8fbf5] text-3xl font-bold text-[#00a77c] shadow-sm">
                NP
              </div>

              <div className="pb-1">
                <h2 className="text-xl font-bold text-[#172033]">
                  {profile.fullName}
                </h2>
                <p className="mt-1 text-sm text-[#64748b]">{profile.email}</p>
                <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-[#00a77c]">
                  <ShieldCheck size={15} />
                  AITradeX Member
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setIsEditing(true);
                setShowMessage(false);
              }}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#e2e8f0] px-4 py-2.5 text-sm font-semibold text-[#334155] transition hover:border-[#00c896] hover:text-[#00a77c]"
            >
              <Pencil size={16} />
              Edit Profile
            </button>
          </div>
        </div>
      </section>

      {/* Success Message */}
      {showMessage && (
        <div className="flex items-center gap-3 rounded-xl border border-[#b8edda] bg-[#f0fdf7] p-4 text-sm text-[#087b59]">
          <CheckCircle2 size={19} />
          Profile changes updated in this demo session.
        </div>
      )}

      {/* Personal Information */}
      <section className="rounded-2xl border border-[#e8edf2] bg-white p-5 shadow-sm sm:p-7">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#172033]">
              Personal Information
            </h2>
            <p className="mt-1 text-sm text-[#64748b]">
              Your basic personal and contact details.
            </p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8fbf5] text-[#00a77c]">
            <UserRound size={21} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label className="text-sm font-semibold text-[#334155]">
              Full Name
            </label>
            <div className="relative">
              <UserRound
                size={17}
                className="absolute left-4 top-6.5 text-[#94a3b8]"
              />
              <input
                value={profile.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                disabled={!isEditing}
                className={`${inputClass} pl-11`}
                placeholder="Enter your full name"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-[#334155]">
              Email Address
            </label>
            <div className="relative">
              <Mail
                size={17}
                className="absolute left-4 top-6.5 text-[#94a3b8]"
              />
              <input
                type="email"
                value={profile.email}
                onChange={(e) => handleChange("email", e.target.value)}
                disabled={!isEditing}
                className={`${inputClass} pl-11`}
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-[#334155]">
              Phone Number
            </label>
            <div className="relative">
              <Phone
                size={17}
                className="absolute left-4 top-6.5 text-[#94a3b8]"
              />
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                disabled={!isEditing}
                className={`${inputClass} pl-11`}
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-[#334155]">
              Date of Birth
            </label>
            <div className="relative">
              <CalendarDays
                size={17}
                className="absolute left-4 top-6.5 text-[#94a3b8]"
              />
              <input
                type="date"
                value={profile.dateOfBirth}
                onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                disabled={!isEditing}
                className={`${inputClass} pl-11`}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-[#334155]">
              Location
            </label>
            <div className="relative">
              <MapPin
                size={17}
                className="absolute left-4 top-6.5 text-[#94a3b8]"
              />
              <input
                value={profile.location}
                onChange={(e) => handleChange("location", e.target.value)}
                disabled={!isEditing}
                className={`${inputClass} pl-11`}
                placeholder="City, Country"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-[#334155]">
              Occupation
            </label>
            <div className="relative">
              <BriefcaseBusiness
                size={17}
                className="absolute left-4 top-6.5 text-[#94a3b8]"
              />
              <input
                value={profile.occupation}
                onChange={(e) => handleChange("occupation", e.target.value)}
                disabled={!isEditing}
                className={`${inputClass} pl-11`}
                placeholder="Your occupation"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Investment Preferences */}
      <section className="rounded-2xl border border-[#e8edf2] bg-white p-5 shadow-sm sm:p-7">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-[#172033]">
            Investment Preferences
          </h2>
          <p className="mt-1 text-sm text-[#64748b]">
            These preferences can help personalize your learning experience.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label className="text-sm font-semibold text-[#334155]">
              Investment Experience
            </label>
            <select
              value={profile.experience}
              onChange={(e) => handleChange("experience", e.target.value)}
              disabled={!isEditing}
              className={inputClass}
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Experienced">Experienced</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold text-[#334155]">
              Risk Preference
            </label>
            <select
              value={profile.riskLevel}
              onChange={(e) => handleChange("riskLevel", e.target.value)}
              disabled={!isEditing}
              className={inputClass}
            >
              <option value="Conservative">Conservative</option>
              <option value="Moderate">Moderate</option>
              <option value="Aggressive">Aggressive</option>
            </select>
          </div>
        </div>

        <div className="mt-5 flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4">
          <Info size={18} className="mt-0.5 shrink-0 text-blue-600" />
          <p className="text-xs leading-5 text-blue-800">
            Investment preferences are for personalization and educational
            guidance. They are not a guarantee of investment suitability or
            returns.
          </p>
        </div>
      </section>

      {/* Account Information */}
      <section className="rounded-2xl border border-[#e8edf2] bg-white p-5 shadow-sm sm:p-6">
        <h2 className="font-bold text-[#172033]">Account Information</h2>

        <div className="mt-5 divide-y divide-[#edf0f4]">
          <div className="flex items-center justify-between gap-3 py-4">
            <div>
              <p className="text-sm font-semibold text-[#334155]">
                Account Status
              </p>
              <p className="mt-1 text-xs text-[#64748b]">
                Your current account verification status
              </p>
            </div>
            <span className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
              Demo Account
            </span>
          </div>

          <div className="flex items-center justify-between gap-3 py-4">
            <div>
              <p className="text-sm font-semibold text-[#334155]">Membership</p>
              <p className="mt-1 text-xs text-[#64748b]">
                AITradeX platform membership
              </p>
            </div>
            <span className="rounded-full bg-[#e8fbf5] px-3 py-1.5 text-xs font-semibold text-[#00a77c]">
              Standard
            </span>
          </div>
        </div>
      </section>

      {/* Save Actions */}
      {isEditing && (
        <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
          <button
            type="button"
            onClick={handleCancel}
            className="rounded-xl border border-[#e2e8f0] px-5 py-3 text-sm font-semibold text-[#475569] transition hover:bg-[#f8fafc]"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#00c896] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#00b386]"
          >
            <Save size={17} />
            Save Changes
          </button>
        </div>
      )}

      <p className="text-center text-xs text-[#94a3b8]">
        Profile information is currently stored only in local page state.
        Backend persistence and account verification will be connected later.
      </p>
    </div>
  );
}
