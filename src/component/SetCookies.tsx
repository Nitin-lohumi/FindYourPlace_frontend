"use client";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../store/Slices/tokenSlice";

export default function SetCookies() {
  const dispatch = useDispatch();
  useEffect(() => {
    const syncCookie = async () => {
      try {
        const response = await axios.get("/api/auth/createcookies");
        const token = response?.data?.token;
        if (token) {
          localStorage.setItem("cookie", token);
          dispatch(setToken(token));
        }
      } catch (error) {
        console.error("Failed to sync cookie:", error);
      }
    };

    syncCookie();
  }, [dispatch]);

  return null;
}
