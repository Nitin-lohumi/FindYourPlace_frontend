"use client";
import { useEffect } from "react";
export default function SetCookies() {
  useEffect(() => {
    const syncCookie = async () => {
      await fetch("/api/auth/createcookies");
    };
    syncCookie();
  }, []);
  return null;
}
