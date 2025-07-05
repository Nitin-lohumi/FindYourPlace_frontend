"use client";
import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../../styles/explore.style.css";
import { useSearchParams } from "next/navigation";
import { CiLocationArrow1 } from "react-icons/ci";
import { IoIosCall } from "react-icons/io";
import dynamic from "next/dynamic";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import ReviewCard from "@/component/ReviewCard";
import { useInView } from "react-intersection-observer";
import { useFetch } from "@/lib/fetchFunction";
import { Skeleton } from "@/components/ui/skeleton";
const fetchfnPlace = async (placeid: string) => {
  const res = await axios.get(
    `http://localhost:8000/api/placeDetails?placeid=${placeid}`
  );
  return res.data;
};
function Explore() {
  const { ref: ref1, inView: view1 } = useInView();
  const searchParams = useSearchParams();
  const [address, setAddress] = useState("");
  const [showWeeks, setWeeks] = useState([]);
  const [showOpenbuttonAction, setopeneButtonAction] = useState(false);
  const [openMap, setOpenMap] = useState(false);

  const placeDetails = useFetch({
    key: ["explorePlaceDetails", searchParams.get("placeid") || ""],
    fn: () => fetchfnPlace(searchParams.get("placeid") || ""),
    enable: view1,
  });
  console.log(placeDetails?.data?.data?.nationalPhoneNumber);
  const openinghours = useMemo(() => {
    const raw = searchParams.get("openingHours");
    try {
      return raw ? JSON.parse(raw) : [];
    } catch (error) {
      console.error("Invalid JSON in reviews:", error);
      return [];
    }
  }, [searchParams]);

  const reviews = useMemo(() => {
    const raw = searchParams.get("reviews");
    try {
      return raw ? JSON.parse(raw) : [];
    } catch (err) {
      console.error("Invalid JSON in reviews:", err);
      return [];
    }
  }, [searchParams]);

  useEffect(() => {
    setAddress(
      (searchParams.get("address") || "").split(",").slice(1).join(" ")
    );
  }, []);
  const openHours = () => {
    if (!showOpenbuttonAction) {
      const arr: any = [...openinghours.slice(1)];
      setWeeks(arr);
      setopeneButtonAction(true);
    } else {
      setWeeks([]);
      setopeneButtonAction(false);
    }
  };
  const MapView = dynamic(() => import("@/component/MapView"), {
    ssr: false,
  });

  const handleMap = () => {
    setOpenMap((Prev) => !Prev);
  };
  console.log(reviews);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen pl-4 pr-4 pt-1"
    >
      <motion.div className="min-h-92 max-h-auto md:max-w-[1100px] rounded-xl md:p-5 m-auto">
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1, backgroundSize: "cover", scale: 0.99 }}
          transition={{ duration: 0.9 }}
          style={{
            backgroundImage: `url(${searchParams.get("originalPhoto")})`,
            backgroundPosition: "cover",
            backgroundRepeat: "no-repeat",
          }}
          className="max-h-92 h-92 bg-black/80"
        >
          <p className="pl-3 h-full text-5xl flex text-gray-700 justify-center  items-center textShadow-lg font-bold">
            {searchParams.get("displayName")}
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className=""
        >
          <header className="sticky top-0 z-20 backgroundColor text-white font-bold text-2xl pl-2 pt-2 pb-2">
            {searchParams.get("displayName")}
          </header>
          <motion.div className="border-white">
            <motion.div className="flex justify-end pr-3 p-3">
              <motion.p
                className={`${
                  searchParams.get("isOpen")
                    ? "text-green-500 font-bold"
                    : "text-gray-300"
                }`}
              >
                {searchParams.get("isOpen") ? "open now " : "closed now "}
              </motion.p>
            </motion.div>
            <motion.div className="border-white pt-3 pb-3 pl-2">
              {searchParams
                .get("types")
                ?.split(",")
                .map((v, i) => (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: (2 * i) / 3, ease: "circInOut" }}
                    key={i}
                    className="inline-block bg-gray-300 text-gray-700 rounded px-2 py-1 mr-2 mb-2 text-sm"
                  >
                    {"#" + v}
                  </motion.span>
                ))}
            </motion.div>

            <motion.div className="border-white">
              {address ? (
                <motion.div className="text-center text-gray-300 md:font-bold text-2xl">
                  {address ? (
                    <div className="flex justify-center items-center gap-3">
                      {" "}
                      <CiLocationArrow1 />
                      <span>{address} </span>
                    </div>
                  ) : (
                    ""
                  )}
                </motion.div>
              ) : (
                ""
              )}
            </motion.div>
            {/*  */}
            <motion.div
              className={`border-white pl-5 flex ${
                openMap ? "flex-col" : "justify-center"
              }  pt-2 pb-2 gap-2`}
            >
              {openMap && (
                <MapView
                  destination={{
                    lat: Number(searchParams.get("location_lat")),
                    long: Number(searchParams.get("location_long")),
                  }}
                />
              )}
              <button
                onClick={handleMap}
                className="font-bold text-white mt-2 pl-2 pb-2 bg-blue-600 cursor-pointer border-white p-1 rounded-xl shadow-2xs shadow-sky-500"
              >
                {!openMap ? "Open In Map" : "Close Map"}
              </button>
            </motion.div>

            <motion.div className="border-white mt-10 pl-4 pr-4 m-auto">
              <motion.div className="border-white">
                <motion.div className=" border-white">
                  <AnimatePresence>
                    {showWeeks.map((_: string, i: number) => {
                      return (
                        <motion.i
                          initial={{ scaleY: 0, opacity: 0 }}
                          animate={{ scaleY: 1, opacity: 1 }}
                          transition={{
                            duration: i / 5,
                            ease: "backInOut",
                          }}
                          exit={{ scaleY: 0, opacity: 0 }}
                          key={i}
                          className="text-white p-3 w-full block text-shadow-2xl shadow-amber-100 pl-3"
                        >
                          {openinghours[i]}
                          <hr />
                        </motion.i>
                      );
                    })}
                  </AnimatePresence>
                </motion.div>

                <motion.button
                  onClick={openHours}
                  className="flex cursor-pointer shadow-xs font-bold text-blue-500 mt-3 mb-3 ml-2 p-2 rounded-xl shadow-amber-200 bg-gray-300"
                >
                  {showWeeks.length ? "Close Opening Days" : "Opening Days"}
                </motion.button>
              </motion.div>

              {/*&***********************  */}
              <motion.div className="md:grid md:grid-cols-2 mb-3 mt-10 flex flex-col items-center gap-2">
                <motion.div className="w-full m-auto md:col-span-1">
                  <Link
                    href={searchParams.get("originalPhoto") || "#"}
                    target="_blank"
                    className="w-full m-auto shadow rounded-xl"
                  >
                    <Image
                      alt="Place Image"
                      src={searchParams.get("originalPhoto") || ""}
                      className="w-full h-full border-none rounded-xl"
                      height={500}
                      width={500}
                    />
                  </Link>
                </motion.div>
                <motion.div className="w-full h-auto md:col-span-1">
                  <motion.div className="font-bold mt-3 mb-7 text-2xl text-center text-white">
                    About
                  </motion.div>
                  <motion.div className="border-white">
                    <p className="text-white text-center pb-6">
                      {searchParams.get("editorialSummary")?.length
                        ? searchParams.get("editorialSummary")
                        : "A beautifull place to vist ."}
                    </p>
                    {searchParams.get("phone") ? (
                      <a
                        href={"tel:" + searchParams.get("phone") || "#"}
                        className="flex items-center gap-2"
                      >
                        <i className="text-xl text-gray-300">contact info : </i>
                        <IoIosCall color="white" />
                        <i className="text-blue-500">
                          {searchParams.get("phone")}
                        </i>
                      </a>
                    ) : (
                      ""
                    )}
                  </motion.div>
                </motion.div>
              </motion.div>
              {/* **************************** */}
              <motion.div className="pl-2 mt-10  mb-10" ref={ref1}>
                {placeDetails.isLoading ? (
                  <>
                    <motion.div className="flex items-center mb-4 mt-3 gap-2">
                      <Skeleton className="bg-gray-400 h-8 w-full" />
                      <motion.div>
                        <Skeleton className="bg-gray-400 h-8 w-full" />
                      </motion.div>
                    </motion.div>
                    <motion.div className="flex items-center mt-3 mb-3 gap-2">
                      <Skeleton className="bg-gray-400 h-8 w-full" />
                      <motion.div>
                        <Skeleton className="bg-gray-400 h-8 w-full" />
                      </motion.div>
                    </motion.div>
                  </>
                ) : placeDetails?.data ? (
                  <motion.div>
                    <motion.div className="flex items-center gap-2 mb-4 text-white">
                      <p className="font-bold">National Phone Number</p>
                      <motion.p>
                        {placeDetails?.data?.data?.nationalPhoneNumber}
                      </motion.p>
                    </motion.div>
                    <motion.div className="flex items-center gap-2  mb-4 text-white">
                      <p className="text-white font-bold">
                        international Phone Number
                      </p>
                      <motion.p className="text-white">
                        {placeDetails?.data?.data?.internationalPhoneNumber}
                      </motion.p>
                    </motion.div>
                    <motion.div className="flex items-center gap-2  mb-4 text-white">
                      <p className="font-bold">formatted Address </p>
                      <motion.p className="flex text-justify text-white ">
                        {placeDetails?.data?.data?.formattedAddress}
                      </motion.p>
                    </motion.div>
                  </motion.div>
                ) : (
                  ""
                )}
              </motion.div>
              {/*****************************   */}
              <motion.div className="border-white pt-10 pb-10">
                <h1 className="capitalize font-bold text-3xl text-center text-white">
                  Review's
                </h1>
                <motion.div className="flex overflow-x-auto gap-4 px-4">
                  {reviews?.map((v: number, i: number) => {
                    return (
                      <motion.div
                        key={i}
                        className="flex-shrink-0 w-[400px] p-10"
                      >
                        <ReviewCard data={v} />
                      </motion.div>
                    );
                  })}
                </motion.div>
              </motion.div>
              {/* ******************************** */}
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
export default Explore;
