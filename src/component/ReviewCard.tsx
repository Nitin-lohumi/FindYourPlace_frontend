import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import React from "react";
import Image from "next/image";
import useStarRating from "@/hook/useReviewStar";
import Box from "@/model/Box";

function ReviewCard({ data }: { data: any }) {
  const { stars } = useStarRating({ star: data?.rating });
  return (
    <Card className="relative bg-gray-500 shadow-xs shadow-blue-500 border-none h-full">
      <CardHeader className="pb-0">
        <div className="absolute -top-6 w-20 h-20 rounded-full left-1/2 transform -translate-x-1/2  border-4 border-gray-400 overflow-hidden">
          <Image
            src={data?.authorAttribution?.photoUri || "/dummy.png"}
            alt="Review Image"
            fill
            sizes="(max-width: 768px) 100px, (max-width: 1200px) 80px, 64px"
            className="object-cover"
          />
        </div>
        <CardTitle className="text-center mt-10">
          {data?.authorAttribution?.displayName}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-gray-700">
        <p className="text-justify">
          {data?.originalText?.text.substring(0, 150) + " "}
          {data?.originalText?.text?.length < 130 ? (
            "."
          ) : (
            <>
              <Box
                userName={data?.authorAttribution?.displayName}
                comment={data?.originalText?.text}
              />
            </>
          )}
        </p>
      </CardContent>
      <CardFooter className="text-xs flex flex-col text-gray-500">
        <div className="flex justify-center">
          {data?.publishTime}
        </div>
        <div className="flex justify-center">{stars}</div>
      </CardFooter>
    </Card>
  );
}

export default ReviewCard;
