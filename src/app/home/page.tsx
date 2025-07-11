import Header from "@/component/Header";
import React from "react";
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
      <div></div>
    </>
  );
}

export default page;
