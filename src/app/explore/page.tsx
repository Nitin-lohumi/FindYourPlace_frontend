"use client";
import React, { Suspense, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../../styles/explore.style.css";
import { CiLocationArrow1 } from "react-icons/ci";
import { IoIosCall } from "react-icons/io";
import dynamic from "next/dynamic";
import Image from "next/image";
// import axios from "axios";
import Link from "next/link";
import ReviewCard from "@/component/ReviewCard";
import { useInView } from "react-intersection-observer";
// import { useFetch } from "@/lib/fetchFunction";
// import { Skeleton } from "@/components/ui/skeleton";
import SavePlaceButton from "@/component/SavePlaceButton";
import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";

// const fetchfnPlace = async (placeid: string) => {
//   const res = await axios.get(
//     `http://localhost:8000/api/placeDetails?placeid=${placeid}`
//   );
//   return res.data;
// };

function Explore() {
  const { data: session } = useSession();
  const { ref: ref1, inView: view1 } = useInView();
  const [placeData, setPlaceData] = useState<any>(null);
  const [address, setAddress] = useState("");
  const [showWeeks, setWeeks] = useState([]);
  const [showOpenbuttonAction, setopeneButtonAction] = useState(false);
  const [openMap, setOpenMap] = useState(false);

  // const placeDetails = useFetch({
  //   key: ["explorePlaceDetails", placeData?.placeid || ""],
  //   fn: () => fetchfnPlace(placeData?.placeid || ""),
  //   enable: view1 && !!placeData?.placeid,
  // });

  const MapView = dynamic(() => import("@/component/MapView"), {
    ssr: false,
  });

  useEffect(() => {
    const raw = localStorage.getItem("selectedPlace");
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setPlaceData(parsed);
        const addr =
          parsed.address?.split(",").slice(1).join(" ") || parsed.address;
        setAddress(addr);
      } catch (err) {
        console.error("Error parsing selectedPlace from localStorage", err);
      }
    }
  }, []);

  const openHours = () => {
    if (!showOpenbuttonAction) {
      const arr: any = [...(placeData?.openingHours?.slice(1) || [])];
      setWeeks(arr);
      setopeneButtonAction(true);
    } else {
      setWeeks([]);
      setopeneButtonAction(false);
    }
  };
  const handleMap = () => {
    setOpenMap((prev) => !prev);
  };
  if (!placeData) {
    return <>loading.....</>;
  }
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
            backgroundImage: `url(${placeData.originalPhoto})`,
            backgroundPosition: "cover",
            backgroundRepeat: "no-repeat",
          }}
          className="max-h-92 h-92 bg-black/80"
        >
          <p className="pl-3 h-full text-5xl flex text-gray-700 justify-center items-center textShadow-lg font-bold">
            {placeData.displayName}
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <header className="sticky top-0 z-20 backgroundColor flex justify-between text-white font-bold text-2xl pl-2 pt-2 pb-2">
            <h1>{placeData.displayName}</h1>
            <Suspense
              fallback={
                <Skeleton
                  color="white"
                  className=" bg-gray-800 h-[17px] w-[20px] rounded-2xl"
                />
              }
            >
              <SavePlaceButton placeData={placeData} />
            </Suspense>
          </header>

          <motion.div className="flex justify-end pr-3 p-3">
            <motion.p
              className={`${
                placeData.isOpen ? "text-green-500 font-bold" : "text-gray-300"
              }`}
            >
              {placeData.isOpen ? "open now" : "closed now"}
            </motion.p>
          </motion.div>

          <motion.div className="pt-3 pb-3 pl-2">
            {placeData.types?.map((v: string, i: number) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: (2 * i) / 3, ease: "circInOut" }}
                className="inline-block bg-gray-300 text-gray-700 rounded px-2 py-1 mr-2 mb-2 text-sm"
              >
                #{v}
              </motion.span>
            ))}
          </motion.div>

          {address && (
            <div className="text-center text-gray-300 md:font-bold text-2xl flex justify-center items-center gap-3">
              <CiLocationArrow1 />
              <span>{address}</span>
            </div>
          )}

          <div
            className={`pl-5 flex ${
              openMap ? "flex-col" : "justify-center"
            } pt-2 pb-2 gap-2`}
          >
            {openMap && (
              <MapView
                destination={{
                  lat: Number(placeData.location.latitude),
                  long: Number(placeData.location.longitude),
                }}
              />
            )}
            <button
              onClick={handleMap}
              className="font-bold text-white mt-2 pl-2 pb-2 bg-blue-600 cursor-pointer border-white p-1 rounded-xl shadow-2xs shadow-sky-500"
            >
              {!openMap ? "Open In Map" : "Close Map"}
            </button>
          </div>

          {/* Opening Hours */}
          <motion.div className="mt-10 pl-4 pr-4 m-auto">
            <AnimatePresence>
              {showWeeks.map((val: string, i: number) => (
                <motion.i
                  key={i}
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: 1, opacity: 1 }}
                  exit={{ scaleY: 0, opacity: 0 }}
                  transition={{ duration: i / 5, ease: "backInOut" }}
                  className="text-white p-3 w-full block text-shadow-2xl shadow-amber-100 pl-3"
                >
                  {val}
                  <hr />
                </motion.i>
              ))}
            </AnimatePresence>

            <motion.button
              onClick={openHours}
              className="flex cursor-pointer shadow-xs font-bold text-blue-500 mt-3 mb-3 ml-2 p-2 rounded-xl shadow-amber-200 bg-gray-300"
            >
              {showWeeks.length ? "Close Opening Days" : "Opening Days"}
            </motion.button>
          </motion.div>

          <div className="md:grid md:grid-cols-2 mb-3 mt-10 flex flex-col items-center gap-2">
            <Link
              href={placeData.originalPhoto || "#"}
              target="_blank"
              className="w-full m-auto shadow rounded-xl"
            >
              <Image
                alt="Place Image"
                src={placeData.originalPhoto}
                className="w-full h-full border-none rounded-xl"
                height={500}
                width={500}
              />
            </Link>

            <div className="w-full h-auto">
              <div className="font-bold mt-3 mb-7 text-2xl text-center text-white">
                About
              </div>
              <p className="text-white text-center pb-6">
                {placeData.editorialSummary?.length
                  ? placeData.editorialSummary
                  : "A beautiful place to visit."}
              </p>
              {placeData.phone && (
                <a
                  href={"tel:" + placeData.phone}
                  className="flex items-center gap-2"
                >
                  <i className="text-xl text-gray-300">contact info :</i>
                  <IoIosCall color="white" />
                  <i className="text-blue-500">{placeData.phone}</i>
                </a>
              )}
            </div>
          </div>

          {/* <div className="pl-2 mt-10 mb-10 border border-white" ref={ref1}>
            {placeDetails.isLoading ? (
              <>
                <div className="flex items-center mb-4 mt-3 gap-2">
                  <Skeleton className="bg-gray-400 h-8 w-full" />
                  <Skeleton className="bg-gray-400 h-8 w-full" />
                </div>
              </>
            ) : (
              placeDetails?.data && (
                <div>
                  <div className="flex items-center gap-2 mb-4 text-white">
                    <p className="font-bold">National Phone Number</p>
                    <p>{placeDetails?.data?.data?.nationalPhoneNumber}</p>
                  </div>
                  <div className="flex items-center gap-2 mb-4 text-white">
                    <p className="font-bold">International Phone Number</p>
                    <p>{placeDetails?.data?.data?.internationalPhoneNumber}</p>
                  </div>
                  <div className="flex items-center gap-2 mb-4 text-white">
                    <p className="font-bold">Formatted Address</p>
                    <p>{placeDetails?.data?.data?.formattedAddress}</p>
                  </div>
                </div>
              )
            )}
          </div> */}
          <div className="pt-10 pb-10">
            <h1 className="capitalize font-bold text-3xl text-center text-white">
              Review's
            </h1>
            <div className="flex overflow-x-auto gap-4 px-4">
              {placeData.reviews?.map((v: any, i: number) => (
                <div key={i} className="flex-shrink-0 w-[400px] p-10">
                  <ReviewCard data={v} />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default Explore;
