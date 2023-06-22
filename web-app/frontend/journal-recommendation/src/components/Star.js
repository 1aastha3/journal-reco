import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

export default function StarRating({ rating, setRating, count, size }) {
  const [hover, setHover] = useState(null);
  return (
    <div className='star-container' style={{ display: "flex" }}>
      {[...Array(count || 5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <FaStar
            key={index}
            color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(null)}
            onClick={() => setRating(ratingValue)}
            cursor="pointer"
            size={size || 15}
            transition="color 200ms"
          />
        );
      })}
    </div>
  );
}
