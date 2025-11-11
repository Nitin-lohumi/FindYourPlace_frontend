"use client";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-900 to-indigo-950">
      <div className="bg-blue-950/90 p-8 rounded-2xl shadow-lg text-center max-w-sm w-full">
        <h1 className="text-2xl font-semibold text-gray-300 mb-6">
          Welcome 👋
        </h1>
        <p className="text-gray-500 mb-8">
          Sign in to continue to your dashboard
        </p>

        <button
          onClick={() => signIn("google")}
          className="flex items-center justify-center  cursor-pointer w-full gap-3 bg-blue-600 border rounded-xl py-3 text-gray-300 font-medium shadow-sm hover:shadow-md transition duration-200 hover:scale-[1.02]"
        >
          <FcGoogle className="text-2xl" />
          <span>Sign in with Google</span>
        </button>
      </div>
    </div>
  );
}
