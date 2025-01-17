import React, { useState, useEffect } from "react";
import { retrieveImage } from "../../services/imageService";
import themeStyles from "../../styles/theme.styles";

function Avatar({
  imgSrc,
  size = 9,
  isSquared,
  isBordered,
  borderColor = "border-gray-500",
  color = themeStyles.PRIMARY_COLOR,
  alt = "Image",
  isCover = false,
}) {
  const [imgUrl, setImgUrl] = useState(null);

  const updateImageUrl = async () => {
    try {
      const imageUrl = await retrieveImage(imgSrc);

      // Refresh image URL every 14 minutes
      setTimeout(updateImageUrl, 14 * 60 * 1000);

      setImgUrl(imageUrl);
    } catch (error) {
      console.error("Error updating image URL:", error);
    }
  };

  useEffect(() => {
    updateImageUrl();
    // You may want to clear the timeout if the component is unmounted
    // to prevent memory leaks or unnecessary function executions.
    return () => {
      clearTimeout(updateImageUrl);
    };
  }, [imgSrc]);

  // const avatarClass = `w-${size} h-${size} ${
  //   isSquared ? "rounded" : "rounded-full"
  // } ${
  //   isBordered ? `border ${borderColor}` : ""
  // } flex items-center justify-center text-white ${
  //   imgUrl ? null : `bg-[${color}]`
  // }`;

  const avatarClass = `w-${isCover ? "full" : size} h-${
    isCover ? "full" : size
  } ${isSquared ? "rounded" : "rounded-full"} ${
    isBordered ? `border ${borderColor}` : ""
  } flex items-center justify-center text-white ${
    imgUrl ? null : `bg-${color}`
  }`;

  return (
    <div style={{ overflow: "hidden" }} className={avatarClass}>
      {imgUrl || imgUrl === "null" ? (
        <img className="w-full h-full object-cover" src={imgUrl} alt={alt} />
      ) : (
        <span className={`${isCover ? "text-2xl font-bold" : "text-sm"}`}>
          {isCover ? alt : alt?.slice(0, 2).toUpperCase()}
        </span>
      )}
    </div>
  );
}

export default Avatar;
