import Header from "@/component/Header";
import React from "react";
import CheckTokenCookie from "@/component/CheckTokenCookie";
import { getServerSession } from "next-auth";
import { authOption } from "../api/auth/lib/authOption";
import { redirect } from "next/navigation";
async function page() {
  const session = await getServerSession(authOption);
  if (!session) {
    return redirect("/login");
  }
  return (
    <>
      <CheckTokenCookie />
      <div></div>
    </>
  );
}

export default page;
