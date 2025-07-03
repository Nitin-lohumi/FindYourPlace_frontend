import React, { useState, useEffect, JSX } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
function useStarRating({ star = 0 }: { star: number }) {
  const [stars, setStars] = useState<JSX.Element[]>([]);
  useEffect(() => {
    const tempStars: JSX.Element[] = [];
    for (let i = 1; i <= 5; i++) {
      if (star >= i) {
        tempStars.push(
          <FaStar key={i} size={20} className="text-yellow-500" />
        );
      } else if (star >= i - 0.5) {
        tempStars.push(
          <FaStarHalfAlt size={20} key={i} className="text-yellow-500" />
        );
      } else {
        tempStars.push(
          <FaRegStar size={20} key={i} className="text-yellow-500" />
        );
      }
    }
    setStars(tempStars);
  }, [star]);
  return { stars };
}
export default useStarRating;
