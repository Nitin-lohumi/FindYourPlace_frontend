"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import { useFetch } from "@/lib/fetchFunction";
import SkeletonPlace from "./skeletons/SkeletonPlace";
import MyCard from "./MyCard";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { MdOutlineTour } from "react-icons/md";
import { PuffLoader } from "react-spinners";
const fetchData = async (
  latitude: number,
  longitude: number,
  token: string,
  type: string
): Promise<any[]> => {
  try {
    const res = await axios.get(
      // https://findyourplace-backend.onrender.com/api/searchNearBy?lat=${latitude}&long=${longitude}&type=${type}
      `https://findyourplace-backend.onrender.com/protected`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    console.log(res.data);
    if (res.status !== 200) {
      console.error("Invalid response status:", res.status);
      return [];
    }
    return res.data?.data || [];
  } catch (error) {
    console.error(`Error fetching ${type}:`, error);
    return [];
  }
};

function ScreenBody() {
  const [token, setToken] = useState<string | null>(null);
  const [tokenReady, setTokenReady] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    const storedToken = localStorage.getItem("cookie");
    if (storedToken) {
      setToken(storedToken);
    }
    setTokenReady(true);
  }, []);

  const { latitude, longitude } = useSelector((state: any) => state.location);
  const { ref: ref1, inView: view1 } = useInView();
  const { ref: ref2, inView: view2 } = useInView();
  const { ref: ref3, inView: view3 } = useInView();

  const tourist = useFetch({
    key: ["touristPlaces", token!],
    fn: () => fetchData(latitude, longitude, token!, "tourist_attraction"),
    enable: tokenReady && !!token && !!latitude && !!longitude && view1,
  });

  const hotel = useFetch({
    key: ["hotels", token!],
    fn: () => fetchData(latitude, longitude, token!, "hotel"),
    enable: tokenReady && !!token && !!latitude && !!longitude && view2,
  });

  const shopping = useFetch({
    key: ["shopping", token!],
    fn: () => fetchData(latitude, longitude, token!, "shopping_mall"),
    enable: tokenReady && !!token && !!latitude && !!longitude && view3,
  });

  if (!tokenReady) {
    return (
      <div className="text-white text-xl flex justify-center items-center md:h-[calc(100vh-66px)]">
        <PuffLoader color="gray" size={60} />
      </div>
    );
  }
  const renderPlaces = (data: any[], isLoading: boolean) =>
    isLoading
      ? [1, 2, 3, 4].map((_, i) => (
          <motion.div key={i} className="w-full col-span-2 md:col-span-1">
            <SkeletonPlace />
          </motion.div>
        ))
      : data.map((place, i) => (
          <div
            key={i}
            onClick={() => {
              localStorage.setItem("selectedPlace", JSON.stringify(place));
              router.push(`/explore?id=${session?.user.id}`);
            }}
            className="w-full cursor-pointer col-span-2 md:col-span-1"
          >
            <MyCard data={place} />
          </div>
        ));

  return (
    <motion.div className="min-h-screen flex flex-col">
      <motion.p
        className="textShadow-sm font-bold text-gray-200 text-3xl p-3 text-center"
        initial={{ x: -10000 }}
        animate={{ opacity: [0.2, 0.4, 0.7, 1], x: 0 }}
        transition={{ duration: 0.9 }}
      >
        <span className="text-green-600">Welcome</span> to the{" "}
        <i className="text-sky-500">Tour & Travel</i> Platform
      </motion.p>
      <section ref={ref1} id="touristPLace" className="mb-28 min-h-screen">
        <h1 className="text-white font-bold flex gap-2 md:text-2xl pt-3 pb-3">
          <span className="ml-5">Tourist Places</span> <MdOutlineTour />
        </h1>
        <div className="grid md:grid-cols-2 m-auto w-[90%] gap-9 grid-cols-2 place-items-center">
          {renderPlaces(tourist?.data || [], tourist.isLoading)}
        </div>
      </section>
      <section ref={ref2} id="hotel" className="mb-28 min-h-screen">
        <h1 className="text-white font-bold flex gap-2 md:text-2xl pt-3 pb-3">
          <span className="ml-5">Hotels</span> <MdOutlineTour />
        </h1>
        <div className="grid md:grid-cols-2 m-auto w-[90%] gap-3 grid-cols-2 place-items-center">
          {renderPlaces(hotel?.data || [], hotel.isLoading)}
        </div>
      </section>
      <section ref={ref3} id="shopping_mall" className="mb-28 min-h-screen">
        <h1 className="text-white font-bold flex gap-2 md:text-2xl pt-3 pb-3">
          <span className="ml-5">Shopping Malls</span> <MdOutlineTour />
        </h1>
        <div className="grid md:grid-cols-2 m-auto w-[90%] gap-3 grid-cols-2 place-items-center">
          {renderPlaces(shopping?.data || [], shopping.isLoading)}
        </div>
      </section>
      <div className="h-screen text-white font-bold text-center text-2xl mt-10">
        {tourist.error && <p>No Tourist Place in current location</p>}
        {hotel.error && <p>No Hotel in current location</p>}
        {shopping.error && (
          <p>No Shopping mall in current location. Search your fav places</p>
        )}
      </div>
    </motion.div>
  );
}

export default ScreenBody;
