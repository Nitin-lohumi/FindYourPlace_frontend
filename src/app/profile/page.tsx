import React from "react";
import { getServerSession } from "next-auth";
import { authOption } from "../api/auth/lib/authOption";
import Profile from "@/component/Profile";
import SavedPlace from "@/component/SavedPlace";
async function page() {
  const session = await getServerSession(authOption);
  if (!session) {
    return <p>Not authenticated</p>;
  }
  return (
    <>
      <div className="md:w-[1090px] md:h-[calc(100vh-66px)] m-auto md:grid md:grid-cols-3 flex flex-col text-white">
        <div className="md:col-span-1 md:pb-0 pb-3">
          <Profile
            userData={{
              id: session.user.id ?? "",
              name: session.user.name ?? "",
              email: session.user.email ?? "",
              image: session.user.image ?? "",
            }}
          />
        </div>
        <div className="md:col-span-2 md:border-r md:border-l overflow-y-scroll  border-gray-500  pb-2 mt-4 md:m-0">
          <h1 className="font-bold text-2xl text-white text-center">
            Saved Places{" "}
          </h1>
          <div className="">
            <SavedPlace id={session.user.id || ""}  />
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
