import React from "react";
import { getServerSession } from "next-auth";
import { authOption } from "./api/auth/lib/authOption";
import { redirect } from "next/navigation";
import ScreenBody from "@/component/Body";
async function page() {
  const session = await getServerSession(authOption);
  if (!session) {
    return redirect("/login");
  }
  return <ScreenBody />;
}

export default page;
