const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
).replace(/\/+$/, "");

type ApiOptions = RequestInit & {
  token?: string;
};

export type ApiResponse<T = unknown> = {
  success: boolean;
  message?: string;
  token?: string;
  user?: T;
  data?: T;
  verified?: boolean;
  [key: string]: unknown;
};

type PhoneOtpData = {
  verificationId?: string;
  expiresAt?: string;
  verified?: boolean;
  phone?: string;
};

export type PhoneOtpResponse = ApiResponse<PhoneOtpData> & {
  verified?: boolean;
};

async function apiRequest<T = unknown>(
  endpoint: string,
  options: ApiOptions = {},
): Promise<ApiResponse<T>> {
  const { token, ...fetchOptions } = options;
  const headers = new Headers(fetchOptions.headers);

  if (fetchOptions.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  headers.set("Accept", "application/json");

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  let response: Response;

  try {
    response = await fetch(`${API_URL}${endpoint}`, {
      ...fetchOptions,
      headers,
    });
  } catch {
    throw new Error(
      `Unable to connect to AITradeX at ${API_URL}. Check whether the backend is running.`,
    );
  }

  let result: ApiResponse<T>;

  try {
    result = (await response.json()) as ApiResponse<T>;
  } catch {
    throw new Error(
      `The server returned an invalid response (HTTP ${response.status}).`,
    );
  }

  if (!response.ok || result.success === false) {
    throw new Error(
      result.message || `Request failed with status ${response.status}.`,
    );
  }

  return result;
}

/* =========================
   AUTH TYPES
========================= */

export type LoginPayload = {
  email: string;
  mpin: string;
};

export type SignupPayload = {
  fullName: string;
  email: string;
  phone: string;
  countryCode?: string;
  mpin: string;
  gender?: "Male" | "Female" | "Other";
};

export type AuthUser = {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  countryCode?: string;
  gender?: string;
  birthPlace?: string;
  investmentGoal?: string;
  investmentExperience?: string;
  occupation?: string;
  monthlyIncome?: string;
  companyName?: string;
  jobTitle?: string;
  panNumber?: string;
  profileImage?: string;
  kycVerified?: boolean;
  emailVerified?: boolean;
  phoneVerified?: boolean;
  accountStatus?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type AuthResponse = {
  success: boolean;
  message?: string;
  token: string;
  user: AuthUser;
};

/* =========================
   LOGIN
========================= */

export async function loginUser(payload: LoginPayload): Promise<AuthResponse> {
  return (await apiRequest<AuthUser>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  })) as AuthResponse;
}

/* =========================
   SIGNUP
========================= */

export async function signupUser(
  payload: SignupPayload,
): Promise<AuthResponse> {
  return (await apiRequest<AuthUser>("/auth/signup", {
    method: "POST",
    body: JSON.stringify(payload),
  })) as AuthResponse;
}

/* =========================
   PROFILE
========================= */

export async function getProfile(
  token: string,
): Promise<{ success: boolean; user: AuthUser }> {
  return (await apiRequest<AuthUser>("/auth/profile", {
    method: "GET",
    token,
  })) as { success: boolean; user: AuthUser };
}

/* =========================
   EMAIL CHECK
========================= */

export async function checkEmail(email: string) {
  return apiRequest("/auth/check-email", {
    method: "POST",
    body: JSON.stringify({
      email: email.trim().toLowerCase(),
    }),
  });
}

/* =========================
   PHONE OTP
========================= */

export async function sendPhoneOtp(phone: string): Promise<PhoneOtpResponse> {
  const result = await apiRequest<PhoneOtpData>("/auth/send-phone-otp", {
    method: "POST",
    body: JSON.stringify({
      phone: phone.trim(),
    }),
  });

  return result as PhoneOtpResponse;
}

export async function verifyPhoneOtp(
  phone: string,
  otp: string,
): Promise<PhoneOtpResponse> {
  const result = await apiRequest<PhoneOtpData>("/auth/verify-phone-otp", {
    method: "POST",
    body: JSON.stringify({
      phone: phone.trim(),
      otp: otp.trim(),
    }),
  });

  // Support either { verified: true } or { data: { verified: true } }.
  const nestedVerified = result.data?.verified;

  return {
    ...result,
    verified: result.verified ?? nestedVerified,
  };
}

export async function resendPhoneOtp(phone: string): Promise<PhoneOtpResponse> {
  const result = await apiRequest<PhoneOtpData>("/auth/resend-phone-otp", {
    method: "POST",
    body: JSON.stringify({
      phone: phone.trim(),
    }),
  });

  return result as PhoneOtpResponse;
}