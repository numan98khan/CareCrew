import React, { useState } from "react";

import GoldenStar from "../../assets/icons/GoldenStar";

function StarRating({ rating, setRating, minimal = false }) {
  // const [rating, setRating] = useState(0);

  const handleStarClick = (index) => {
    if (setRating) setRating(index + 1); // +1 because index starts from 0
  };

  return (
    <div
      className={`flex flex-row w-full items-center justify-center ${
        minimal ? null : "space-x-5"
      }`}
    >
      {[...Array(5)].map((_, index) => (
        <div key={index} onClick={() => handleStarClick(index)}>
          <GoldenStar
            onClick={null}
            size={minimal ? 8 : 20}
            color={index < rating ? null : "gray"}
          />
        </div>
      ))}
    </div>
  );
}

export default StarRating;
