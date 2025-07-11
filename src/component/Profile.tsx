"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Logout from "./Logout";
function Profile({
  userData,
}: {
  userData: { id: string; name: string; email: string; image: string };
}) {
  return (
    <>
      <motion.div
        className="relative h-full md:border-l pt-5 border-gray-400 border-b md:border-b-0"
        initial={{ opacity: 0, x: -1000 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: "circInOut" }}
      >
        <motion.div>
          <motion.div className="rounded-full flex justify-center items-center p-3">
            <Image
              alt="profileImage"
              className="rounded-full border-gray-300 border-4"
              src={userData.image}
              height={190}
              width={190}
            />
          </motion.div>
          <motion.div className="flex flex-col items-center">
            <motion.h1
              initial={{ scale: 2, opacity: 0, x: -100 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.9, ease: "anticipate" }}
              className="text-shadow-2xs text-3xl text-shadow-green-500 text-center"
            >
              {userData.name}
            </motion.h1>
            <motion.i className="text-xs mt-2 p-2">{userData.email}</motion.i>
          </motion.div>
        </motion.div>
        <motion.div className="absolute top-0 md:bottom-0 md:top-auto p-2">
          <Logout />
        </motion.div>
      </motion.div>
    </>
  );
}

export default Profile;
