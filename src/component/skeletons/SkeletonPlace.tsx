"use client";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { motion } from "framer-motion";
function SkeletonPlace() {
  return (
    <>
      <motion.div className="relative border-none  overflow-hidden animate-pulse max-h-auto w-full m-auto" >
        <div className="relative z-20 h-full flex flex-col justify-between">
          <Skeleton
            color="white"
            className=" bg-gray-800 h-[105px] w-full rounded-2xl"
          />
        </div>
        <div className="flex justify-between gap-2 mt-1 mb-2">
          <Skeleton
            color="white"
            className=" bg-gray-800 h-[35px] w-full rounded-2xl"
          />
          <Skeleton
            color="white"
            className=" bg-gray-800 h-[35px] w-full rounded-2xl"
          />
        </div>
        <div className="p-0 flex flex-col gap-3 items-center w-full">
          <Skeleton
            color="white"
            className=" bg-gray-800 h-[50px] w-full rounded-2xl"
          />
        </div>
        <div className="flex justify-between gap-2 mt-2 mb-2">
          <Skeleton
            color="white"
            className=" bg-gray-800 h-[32px] p-3 w-32 rounded-2xl"
          />
          <Skeleton
            color="white"
            className=" bg-gray-800 h-[32px] p-3 w-32 rounded-2xl"
          />
        </div>
      </motion.div>
    </>
  );
}

export default SkeletonPlace;
