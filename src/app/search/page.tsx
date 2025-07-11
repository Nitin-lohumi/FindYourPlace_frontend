"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SkeletonPlace from "@/component/skeletons/SkeletonPlace";
import { useSearchParams } from "next/navigation";
import { useFetch } from "@/lib/fetchFunction";
import { RootState } from "@/store/store";
import axios from "axios";
import Link from "next/link";
import { useSelector } from "react-redux";
import MyCard from "@/component/MyCard";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const fetch_SearchAPI = async (textQuery: string) => {
  const res = await axios.get(
    `http://localhost:8000/api/searchBar?text=${textQuery}`,
    { withCredentials: true }
  );
  return res.data.data;
};

type PlaceType = {
  id: string;
  types: string[];
  displayName: string;
  address: string;
  location: { latitude: number; longitude: number };
  rating: number;
  phone?: string;
  editorialSummary?: string;
  isOpen: boolean;
  reviews?: any[];
  mapUrl: string;
  openingHours: any;
  addressDescriptor: string;
  originalPhoto?: string;
};

function Page() {
  const { data: session } = useSession();
  const router = useRouter();
  const { hasphnNo, selectedOptions, typeSelectOptions, openNowPlaces, sort } =
    useSelector((state: RootState) => state.Filters);
  const [data, setData] = useState<PlaceType[]>([]);
  const searchtext = useSearchParams();
  const textQuery = searchtext.get("text");

  const searchData = useFetch({
    key: ["searchData", textQuery ?? ""],
    fn: () => fetch_SearchAPI(textQuery || ""),
    enable: String(textQuery).length > 0,
  });

  useEffect(() => {
    if (!searchData.data || !Array.isArray(searchData.data)) {
      setData([]);
      return;
    }
    let filtered = [...searchData.data];
    if (selectedOptions.length) {
      if (selectedOptions.includes("4 star & above")) {
        filtered = filtered.filter((v) => Math.floor(v.rating) >= 4);
      }
      if (selectedOptions.includes("3 stars")) {
        filtered = filtered.filter((v) => Math.floor(v.rating) >= 3);
      }
      if (selectedOptions.includes("2 stars")) {
        filtered = filtered.filter((v) => Math.floor(v.rating) >= 2);
      }
    }

    if (openNowPlaces) {
      filtered = filtered.filter((v) => v.isOpen);
    }

    if (typeSelectOptions.length > 0) {
      filtered = filtered.filter((v) =>
        typeSelectOptions.some((type: string) => v.types.includes(type))
      );
    }

    if (hasphnNo) {
      filtered = filtered.filter((v) => v.phone !== undefined);
    }

    if (sort.length) {
      if (sort.includes("Sort In accending")) {
        filtered.sort((a, b) => a?.rating - b?.rating);
      } else if (sort.includes("Sort In descending")) {
        filtered.sort((a, b) => b?.rating - a?.rating);
      } else {
        filtered.sort(
          (a, b) => (a?.reviews?.length ?? 0) - (b?.reviews?.length ?? 0)
        );
      }
    }
    setData(filtered);
  }, [
    JSON.stringify(searchData.data),
    selectedOptions,
    openNowPlaces,
    typeSelectOptions,
    hasphnNo,
    sort,
  ]);

  return (
    <div className="md:grid md:grid-cols-2 gap-3 p-5 flex flex-col overflow-y-auto">
      {searchData.isLoading
        ? [1, 2, 3, 4, 5].map((v, i) => (
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
          ))
        : data.map((value, i) => (
            <div
              onClick={() => {
                localStorage.setItem("selectedPlace", JSON.stringify(value));
                router.push(`/explore?id=${session?.user.id}`);
              }}
              key={i}
              className="w-full m-auto col-span-2 md:col-span-1 cursor-pointer"
            >
              <MyCard data={value} />
            </div>
          ))}
      <p className="text-xl text-gray-300 font-bold">
        {!data.length && !searchData.isLoading && "No Result For This Search"}
      </p>
    </div>
  );
}
export default Page;
