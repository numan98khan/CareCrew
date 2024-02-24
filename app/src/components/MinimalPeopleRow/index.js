import React, { useState, useEffect } from "react";
import { Card, Typography } from "@material-tailwind/react";

import Check from "../../components/Check";
import ColoredTag from "../ColoredTag";

import { useNavigate } from "react-router-dom";

import { MainHover } from "../../styles/animations";

import { retrieveImage } from "../../services/imageService";
import { Storage } from "aws-amplify";

export default function MinimalPeopleRow({
  index,
  name,
  role,
  classes,
  imgSrc,
  isSquaredImg,
  initChecked = false,
  onClick,
}) {
  //   console.log(key);
  const rowClasses = `my-row-class ${
    index % 2 !== 0 ? "bg-PRIMARY_NEUTRAL_COLOR" : "bg-white"
  } ${classes}`;

  const [imgUrl, setImgUrl] = useState(null);
  const updateImageUrl = async () => {
    // const imgSrc = timecard?.facility?.imgSrc;
    const imageUrl = await retrieveImage(imgSrc);
    setImgUrl(imageUrl);
  };

  useEffect(() => {
    updateImageUrl();
  }, []);

  const navigate = useNavigate();

  return (
    <div
      key={index}
      className={`flex w-full items-center ${""}`}
      // onClick={onClick}
    >
      {/* <div className="mx-1.5">
        <Check value={true} />
      </div> */}
      {/* <Check value={initChecked} onChange={onClick} />{" "} */}
      <div
        className="flex p-1.5 px-2"
        // onClick={onClick}
      >
        <Check value={initChecked} onChange={onClick} />{" "}
        {/* pass the state here */}
      </div>
      <div className="flex-grow flex justify-start items-center ">
        <img
          className={`w-9 h-9 ${isSquaredImg ? "rounded" : "rounded-full"}`}
          src={
            imgUrl ? imgUrl : "https://randomuser.me/api/portraits/men/20.jpg"
          }
          alt="User avatar"
        />

        <Typography
          variant="small"
          color="blue-gray"
          className="font-normal ml-2.5 text-xs"
        >
          {name}
        </Typography>
      </div>
      {role ? (
        <div>
          <ColoredTag title={role} />
        </div>
      ) : null}
      {/* {children} */}
    </div>
  );
}
