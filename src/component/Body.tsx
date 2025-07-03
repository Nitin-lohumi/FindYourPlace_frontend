"use client";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import React from "react";
import { MdOutlineTour } from "react-icons/md";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import MyCard from "./MyCard";
import Link from "next/link";
import { useFetch } from "@/lib/fetchFunction";
import SkeletonPlace from "./skeletons/SkeletonPlace";

const fetchTouristData = async (
  latitude: number,
  longitude: number
): Promise<any> => {
  const res = await axios.get(
    `http://localhost:8000/api/searchNearBy?lat=${latitude}&long=${longitude}&type=tourist_attraction`
  );
  return res.data.data;
};
const fetchForHotel = async (
  latitude: number,
  longitude: number
): Promise<any> => {
  const res = await axios.get(
    `http://localhost:8000/api/searchNearBy?lat=${latitude}&long=${longitude}&type=hotel`
  );
  return res.data.data;
};
const fetchShoppingData = async (
  latitude: number,
  longitude: number
): Promise<any> => {
  const res = await axios.get(
    `http://localhost:8000/api/searchNearBy?lat=${latitude}&long=${longitude}&type=shopping_mall`
  );
  return res.data.data;
};
function ScreenBody() {
  const { latitude, longitude } = useSelector((state: any) => state.location);
  const { ref: ref1, inView: view1 } = useInView();
  const { ref: ref2, inView: view2 } = useInView();
  const { ref: ref3, inView: view3 } = useInView();
  console.log(latitude, longitude);
  const tourist = useFetch({
    key: "touristPlaces",
    fn: () => fetchTouristData(latitude, longitude),
    enable: view1 && latitude !== null && longitude !== null,
  });
  const Hotel = useFetch({
    key: "hotel",
    fn: () => fetchForHotel(latitude, longitude),
    enable: view2 && latitude !== null && longitude !== null,
  });
  const shopping = useFetch({
    key: "Atm",
    fn: () => fetchShoppingData(latitude, longitude),
    enable: view3 && latitude !== null && longitude !== null,
  });
  console.log(Hotel.data);
  return (
    <>
      <motion.div className="min-h-fit max-h-screen flex flex-col item-center">
        {/* ************************************* */}
        <motion.div className="">
          <motion.p
            className="textShadow-sm font-bold text-gray-200 text-3xl p-3 text-center"
            initial={{ x: -10000 }}
            animate={{ opacity: [0.2, 0.3, 0.6, 0.9, 1], x: 0 }}
            transition={{ duration: 0.8, ease: "circInOut" }}
          >
            <span className="text-green-600 textShadow-lg font-extrabold">
              Welcome
            </span>{" "}
            to the <i className="text-sky-500 textShadow-lg">Tour and Travel</i>{" "}
            Platform{" "}
          </motion.p>
        </motion.div>
        {/* **********************************************/}

        <motion.div className="mb-28" ref={ref1}>
          <motion.div>
            <motion.h1 className="text-white font-bold flex flex-row items-center gap-2 md:text-2xl pt-3 pb-3 ">
              <motion.span className="ml-5">Tourist Places</motion.span>
              <motion.span>
                <MdOutlineTour />
              </motion.span>
            </motion.h1>
            <motion.div className="grid md:grid-cols-2 m-auto w-[90%] gap-9 grid-cols-2 items-center place-items-center">
              {tourist?.isLoading
                ? [1, 2, 3, 4].map((v: number, i: number) => {
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
                        className="w-full m-auto col-span-2 md:col-span-1"
                      >
                        <SkeletonPlace />
                      </motion.div>
                    );
                  })
                : tourist?.data?.map((value: any, i: number) => {
                    return (
                      <Link
                        href={{
                          pathname: "/explore",
                          query: {
                            placeid: value.id,
                            types: value.types.join(","),
                            displayName: value.displayName,
                            address: value.address,
                            location_lat: value.location.latitude,
                            location_long: value.location.longitude,
                            rating: value.rating,
                            phone: value?.phone,
                            editorialSummary: value?.editorialSummary,
                            isOpen: value.isOpen,
                            ...(value.reviews?.length > 0 && {
                              reviews: JSON.stringify(value.reviews),
                            }),
                            mapUrl: value.mapUrl,
                            openingHours: JSON.stringify(value.openingHours),
                            addressDescriptor: value.addressDescriptor,
                            originalPhoto:
                              value?.originalPhoto || "/dummyPlace.png",
                          },
                        }}
                        key={i}
                        className="w-full m-auto col-span-2 md:col-span-1"
                      >
                        <MyCard data={value} />
                      </Link>
                    );
                  })}
            </motion.div>
          </motion.div>
        </motion.div>
        {/* *************************************************** */}
        <motion.div className="mb-28" ref={ref2}>
          <motion.div>
            <motion.h1 className="text-white font-bold flex flex-row items-center gap-2 md:text-2xl pt-3 pb-3 ">
              <motion.span className="ml-5">Hotel's</motion.span>
              <motion.span>
                <MdOutlineTour />
              </motion.span>
            </motion.h1>
            <motion.div className="grid md:grid-cols-2 m-auto w-[90%] gap-3 grid-cols-2 items-center place-items-center">
              {Hotel?.isLoading
                ? [1, 2, 3, 4].map((v: number, i: number) => {
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
                        className="w-full m-auto col-span-2 md:col-span-1"
                      >
                        <SkeletonPlace />
                      </motion.div>
                    );
                  })
                : Hotel?.data?.map((value: any, i: number) => {
                    return (
                      <Link
                        href={{
                          pathname: "/explore",
                          query: {
                            placeid: value.id,
                            types: value.types.join(","),
                            displayName: value.displayName,
                            address: value.address,
                            location_lat: value.location.latitude,
                            location_long: value.location.longitude,
                            rating: value.rating,
                            phone: value?.phone,
                            editorialSummary: value?.editorialSummary,
                            isOpen: value.isOpen,
                            ...(value.reviews?.length > 0 && {
                              reviews: JSON.stringify(value.reviews),
                            }),
                            mapUrl: value.mapUrl,
                            openingHours: JSON.stringify(value.openingHours),
                            addressDescriptor: value.addressDescriptor,
                            originalPhoto:
                              value?.originalPhoto || "/dummyPlace.png",
                          },
                        }}
                        key={i}
                        className="w-full m-auto col-span-2 md:col-span-1"
                      >
                        <MyCard data={value} />
                      </Link>
                    );
                  })}
            </motion.div>
          </motion.div>
        </motion.div>
        {/* ************************************************************* */}
        <motion.div className="mb-28" ref={ref3}>
          <motion.div>
            <motion.h1 className="text-white font-bold flex flex-row items-center gap-2 md:text-2xl pt-3 pb-3 ">
              <motion.span className="ml-5">Restourent</motion.span>
              <motion.span>
                <MdOutlineTour />
              </motion.span>
            </motion.h1>
            <motion.div className="grid md:grid-cols-2 m-auto w-[90%] gap-3 grid-cols-2 items-center place-items-center">
              {shopping?.isLoading
                ? [1, 2, 3, 4].map((v: number, i: number) => {
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
                        className="w-full m-auto col-span-2 md:col-span-1"
                      >
                        <SkeletonPlace />
                      </motion.div>
                    );
                  })
                : shopping?.data?.map((value: any, i: number) => {
                    return (
                      <Link
                        href={{
                          pathname: "/explore",
                          query: {
                            placeid: value.id,
                            types: value.types.join(","),
                            displayName: value.displayName,
                            address: value.address,
                            location_lat: value.location.latitude,
                            location_long: value.location.longitude,
                            rating: value.rating,
                            phone: value?.phone,
                            editorialSummary: value?.editorialSummary,
                            isOpen: value.isOpen,
                            ...(value.reviews?.length > 0 && {
                              reviews: JSON.stringify(value.reviews),
                            }),
                            mapUrl: value.mapUrl,
                            openingHours: JSON.stringify(value.openingHours),
                            addressDescriptor: value.addressDescriptor,
                            originalPhoto:
                              value?.originalPhoto || "/dummyPlace.png",
                          },
                        }}
                        key={i}
                        className="w-full m-auto col-span-2 md:col-span-1"
                      >
                        <MyCard data={value} />
                      </Link>
                    );
                  })}
            </motion.div>
          </motion.div>
        </motion.div>
        {/* ******************************************************* */}
      </motion.div>
    </>
  );
}

export default ScreenBody;
