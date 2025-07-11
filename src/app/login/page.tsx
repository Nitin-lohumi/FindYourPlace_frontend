"use client";
import { signIn } from "next-auth/react";
export default function LoginPage() {
  return (
    <div>
      <button
        onClick={() => signIn("google")}
        className="px-4 py-2 bg-blue-500 text-white"
      >
        Sign in with Google
      </button>
    </div>
  );
}
