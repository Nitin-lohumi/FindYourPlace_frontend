"use client";
import { useSelector } from "react-redux";
import PopupPage from "@/model/PupupBox";
import { useLocation } from "@/hook/useLocation";

export default function LocationWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  useLocation();
  const { latitude, longitude, checked } = useSelector(
    (state: any) => state.location
  );
  <PopupPage />;
  const showPopup = checked && (!latitude || !longitude);
  return <>{children}</>;
}
