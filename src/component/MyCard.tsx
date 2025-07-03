import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import useStarRating from "@/hook/useReviewStar";
function MyCard({ data }: { data: any }) {
  const { stars } = useStarRating({ star: data?.rating });
  return (
    <>
      <Card className="relative h-92  border-none  overflow-hidden rounded-2xl shadowcard text-white max-h-auto w-full m-auto shadow-md">
        <div
          className="absolute inset-0 bg-cover object-center bg-center z-0"
          style={{
            backgroundImage: `url(${data.originalPhoto})`,
            backgroundPosition: "cover",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="absolute inset-0 bg-black/80 z-10" />
        <div className="relative z-20 h-full flex flex-col justify-between pl-2 pr-2">
          <CardHeader className="p-0">
            <div className="flex justify-between">
              <div className="font-bold text-sky-400">
                <FaLocationCrosshairs />
              </div>
              <p className="font-bold text-red-500">
                {data?.isOpen ? (
                  <span className="text-green-400">Open</span>
                ) : (
                  "Closed"
                )}
              </p>
            </div>
            <CardTitle className="text-xl  flex justify-center gap-1">
              <h1 className="capitalize text-2xl text-center font-extrabold textShadow-sm text-gray-400">
                {" "}
                {data.displayName}
              </h1>
            </CardTitle>
          </CardHeader>

          <CardContent className="p-0 flex flex-col gap-3 items-center w-full">
            <i className="font-bold text-lg text-gray-100 flex-wrap">
              {data.editorialSummary}
            </i>
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-xl">type OF:</p>
              {data?.types?.map((v: String, i: number) => {
                return <i key={i}>{v + "."}</i>;
              })}
            </div>
          </CardContent>
          <CardFooter className="p-0 flex justify-between items-center">
            <p>
              {data.goodForChildren
                ? "avaiable for childern also "
                : "not childern friendly"}
            </p>
            <p className="flex  items-center gap-2">{stars}</p>
          </CardFooter>
        </div>
      </Card>
    </>
  );
}

export default MyCard;
