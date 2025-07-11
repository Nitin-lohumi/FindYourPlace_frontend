import React from "react";
import { getServerSession } from "next-auth";
import { authOption } from "./api/auth/lib/authOption";
import { redirect } from "next/navigation";
import ScreenBody from "@/component/Body";
import SetCookies from "@/component/SetCookies";
async function page() {
  const session = await getServerSession(authOption);
  if (!session) {
    return redirect("/login");
  }
  return (
    <>
      <SetCookies />
      <div>
        <ScreenBody />
      </div>
    </>
  );
}

export default page;
