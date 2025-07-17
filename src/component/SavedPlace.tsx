"use client";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, useScroll, useTransform } from "framer-motion";
import SkeletonPlace from "./skeletons/SkeletonPlace";
import axios from "axios";
import { useSession } from "next-auth/react";
import MyCard from "./MyCard";
import { useRouter } from "next/navigation";
import { PuffLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
function SavedPlace({ id }: { id: string }) {
  const { data: session } = useSession();
  const token = useSelector((state: RootState) => state.token.token);
  const router = useRouter();
  const query = useQuery({
    queryKey: ["savedPlaces", id],
    queryFn: () =>
      axios.get(
        `https://findyourplace-backend.onrender.com/get/SaveData/${id}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ),
    staleTime: 10 * 60 * 1000,
  });
  const savedData = query.data?.data?.data || [];
  if (query.data?.data.message) {
    return <p className="text-center italic pt-6">{query.data.data.message}</p>;
  }
  return (
    <motion.div
      className="p-2"
      initial={{ opacity: 0, scale: 0, x: 1000, y: 1000 }}
      animate={{ x: 0, scale: 1, opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: "easeIn" }}
    >
      {query.isLoading &&
        [1, 2, 3, 4].map((_, i) => (
          <div key={i}>
            <SkeletonPlace />
          </div>
        ))}
      {query.data?.data?.status &&
        savedData?.map((value: any, i: number) => (
          <div
            key={i}
            onClick={() => {
              localStorage.setItem(
                "selectedPlace",
                JSON.stringify(value.placeData)
              );
              router.push(`/explore?id=${session?.user.id}`);
            }}
            className="w-full m-auto col-span-2 md:col-span-1 cursor-pointer mt-4 mb-2"
          >
            <MyCard data={value.placeData} />
          </div>
        ))}
    </motion.div>
  );
}

export default SavedPlace;
