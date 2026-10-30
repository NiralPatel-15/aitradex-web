import {
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  reload,
  signOut,
} from "firebase/auth";

import { auth } from "@/lib/firebase";

const API_URL = process.env.NEXT_PUBLIC_API_URL;


export async function loginWithEmail(
  email: string,
  password: string,
  rememberMe: boolean,
) {
  await setPersistence(
    auth,
    rememberMe ? browserLocalPersistence : browserSessionPersistence,
  );

  // 1. Authenticate using the existing Firebase account.
  const credential = await signInWithEmailAndPassword(
    auth,
    email.trim().toLowerCase(),
    password,
  );

  const firebaseUser = credential.user;
  const token = await firebaseUser.getIdToken();

  // 2. Retrieve the real user profile from the existing backend/database.
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured.");
  }

  const response = await fetch(
    `${API_URL}/users/firebase/${encodeURIComponent(firebaseUser.uid)}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    },
  );

  const result = await response.json().catch(() => null);

  if (!response.ok || result?.success === false) {
    throw new Error(
      result?.message ||
        "Your account was authenticated, but your AITradeX database profile could not be loaded.",
    );
  }

  // Support either { user: {...} } or { data: { user: {...} } } responses.
  const databaseUser =
    result?.user ?? result?.data?.user ?? result?.data;

  if (!databaseUser || typeof databaseUser !== "object") {
    throw new Error(
      "Login succeeded, but the backend did not return a valid user profile.",
    );
  }

  return {
    token,
    user: {
      ...databaseUser,
      uid: firebaseUser.uid,
      email: databaseUser.email ?? firebaseUser.email,
      displayName:
        databaseUser.fullName ??
        databaseUser.displayName ??
        firebaseUser.displayName,
      emailVerified:
        databaseUser.emailVerified ?? firebaseUser.emailVerified,
    },
  };
}

export async function registerWithEmail(
  fullName: string,
  email: string,
  password: string,
) {
  const credential = await createUserWithEmailAndPassword(
    auth,
    email.trim().toLowerCase(),
    password,
  );

  await updateProfile(credential.user, {
    displayName: fullName.trim(),
  });

  await sendEmailVerification(credential.user);

  return credential.user;
}

export async function syncUserProfile(fullName: string, phoneNumber: string) {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("Please sign in before syncing your profile.");
  }

  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured.");
  }

  const token = await user.getIdToken();

  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      firebaseUid: user.uid,

      // Generate a username using only letters, numbers, and underscores.
      username: `niral_${user.uid.slice(0, 8)}`.toLowerCase(),

      fullName: fullName.trim(),
      displayName: fullName.trim(),
      email: user.email,
      emailVerified: user.emailVerified,
      phoneNumber: phoneNumber.trim(),
      phoneVerified: true,
      authProvider: "password",
      firebaseCreatedAt: user.metadata.creationTime ?? null,
      firebaseLastSignInAt: user.metadata.lastSignInTime ?? null,
    }),
  });

  const result = await response.json().catch(() => null);

  if (!response.ok || result?.success === false) {
    throw new Error(
      result?.message || "Could not synchronize your profile with AITradeX.",
    );
  }

  return result;
}

export async function refreshEmailVerification() {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("Your signup session has expired. Please sign up again.");
  }

  await reload(user);

  if (!auth.currentUser?.emailVerified) {
    throw new Error(
      "Your email is not verified yet. Open the verification email and try again.",
    );
  }

  return auth.currentUser;
}

export async function logoutFromFirebase() {
  await signOut(auth);
}
