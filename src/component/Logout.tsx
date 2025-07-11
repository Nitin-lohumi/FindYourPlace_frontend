"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import axios from "axios";
import { toast } from "sonner";
function Logout() {
  const { data: session } = useSession();
  const handleLogout = async () => {
    try {
      await axios
        .get("/api/auth/logout", { withCredentials: true })
        .then((v) => console.log(v));
      await signOut({ callbackUrl: "/login" });
      toast.success("sucessFully LogOut");
    } catch (err) {
      toast.error((err as Error)?.message || "Logout failed");
    }
  };
  return (
    session && (
      <div>
        <Button
          variant="outline"
          className="text-white cursor-pointer"
          onClick={handleLogout}
        >
          LogOut
        </Button>
      </div>
    )
  );
}
export default Logout;
