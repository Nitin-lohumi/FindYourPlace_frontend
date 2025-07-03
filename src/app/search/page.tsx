"use client";
import React from "react";
import { motion } from "framer-motion";
import SkeletonPlace from "@/component/skeletons/SkeletonPlace";
function page() {
  return (
    <div className="md:grid md:grid-cols-2 gap-3 p-5 flex flex-col overflow-y-auto">
      {[1, 2, 3, 4, 5, 6, 7].map((v: number, i: number) => {
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: i / 3,
              ease: "circInOut",
              delay: i * 0.2,
            }}
            className="w-full m-auto border-white col-span-2 mb-3 md:col-span-1"
          >
            <SkeletonPlace />
          </motion.div>
        );
      })}
    </div>
  );
}
export default page;
