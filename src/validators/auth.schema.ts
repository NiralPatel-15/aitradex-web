import { z } from "zod";

/* =========================
   COMMON VALIDATION RULES
========================= */

const fullNameSchema = z
  .string()
  .trim()
  .min(2, "Full name must be at least 2 characters.")
  .max(100, "Full name cannot exceed 100 characters.")
  .regex(/^[A-Za-zÀ-ÿ' -]+$/, "Full name contains invalid characters.");

const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .email("Please enter a valid email address.");

const phoneSchema = z
  .string()
  .trim()
  .regex(/^[0-9]{7,15}$/, "Please enter a valid phone number.");

const countryCodeSchema = z
  .string()
  .trim()
  .regex(/^\+[1-9][0-9]{0,3}$/, "Please enter a valid country code.");

const mpinSchema = z
  .string()
  .regex(/^[0-9]{4,6}$/, "MPIN must contain 4 to 6 digits.");

const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters.")
  .max(128, "Password cannot exceed 128 characters.");

/* =========================
   LOGIN SCHEMA
========================= */

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  rememberMe: z.boolean(),
});

/* =========================
   SIGNUP SCHEMA
   Existing rules preserved
========================= */

export const signupSchema = z.object({
  // Account information
  fullName: fullNameSchema,
  email: emailSchema,
  countryCode: countryCodeSchema,
  phoneNumber: phoneSchema,
  mpin: mpinSchema,

  // Personal information
  gender: z.enum(["male", "female", "other", "prefer_not_to_say"], {
    message: "Please select your gender.",
  }),

  dateOfBirth: z.string().min(1, "Date of birth is required."),

  birthPlace: z
    .string()
    .trim()
    .min(2, "Birth place is required.")
    .max(100, "Birth place cannot exceed 100 characters."),

  // Investment information
  investmentGoal: z.enum(
    [
      "wealth_creation",
      "retirement",
      "short_term_growth",
      "long_term_growth",
      "regular_income",
      "capital_preservation",
      "learning",
    ],
    {
      message: "Please select your investment goal.",
    },
  ),

  investmentExperience: z.enum(
    ["beginner", "intermediate", "experienced", "expert"],
    {
      message: "Please select your investment experience.",
    },
  ),

  // Employment information
  occupation: z
    .string()
    .trim()
    .min(2, "Occupation is required.")
    .max(100, "Occupation cannot exceed 100 characters."),
});

/* =========================
   EXPORTED TYPES
========================= */

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
