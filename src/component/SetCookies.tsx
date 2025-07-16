"use client";
import axios from "axios";
import { useEffect } from "react";
export default function SetCookies() {
  useEffect(() => {
    const syncCookie = async () => {
      const data = await axios.get("/api/auth/createcookies");
      localStorage.setItem("cookie", data?.data?.token);
    };
    syncCookie();
  }, []);
  return null;
}
