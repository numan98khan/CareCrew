import React, { useState, useEffect } from "react";
import { Card, Typography } from "@material-tailwind/react";
import EditIcon from "../../assets/icons/edit";
import TrashIcon from "../../assets/icons/trash";
import GreenEllipse from "../../assets/icons/indicators/green";
import Check from "../../components/Check";
import { useNavigate } from "react-router-dom";

import { MainHover } from "../../styles/animations";

import { retrieveImage } from "../../services/imageService";

import Avatar from "../Avatar";
import { is } from "@react-spring/shared";

export default function TableRow({
  index,
  name,
  classes,
  imgSrc,
  isSquaredImg,
  children,
  onClick,
  isCheck,
  onCheckClick,
  highlightColor,
  checkDisabled,
  disableAvatar = false,
}) {
  //   console.log(key);
  const rowClasses = `my-row-class ${
    highlightColor
      ? highlightColor
      : index % 2 !== 0
      ? "bg-PRIMARY_NEUTRAL_COLOR"
      : "bg-white"
  } ${classes}`;

  const navigate = useNavigate();
  return (
    <tr
      key={index}
      className={`${rowClasses} ${onClick ? MainHover : null}`}
      onClick={onClick}
    >
      {!checkDisabled ? (
        <td className={classes}>
          <div
            className="mx-1.5"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Check
              value={isCheck}
              onChange={(isChecked) => {
                onCheckClick(isChecked);
              }}
            />
          </div>
        </td>
      ) : (
        <td className={classes}></td>
      )}

      {name ? (
        <td className={classes}>
          <div className="flex-grow flex justify-start items-center ">
            {!disableAvatar && (
              <Avatar imgSrc={imgSrc} isSquared={isSquaredImg} alt={name} />
            )}
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal ml-2.5 text-xs mx-10"
            >
              {name}
            </Typography>
          </div>
        </td>
      ) : null}

      {children}
    </tr>
  );
}
