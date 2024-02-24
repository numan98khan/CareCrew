import React, { useState, useEffect, useRef } from "react";
import { Storage } from "aws-amplify";
import EditStaffModal from "../Modals/EditStaffModal";

import Avatar from "../Avatar";
import KebabMenuWhite from "../../assets/icons/kebabMenuWhite";
import { ScaleHover } from "../../styles/animations";

const StaffCard = ({ people, editProfileFunction, deleteStaffFunction }) => {
  const [imgUrl, setImgUrl] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, right: 0 });
  const buttonRef = useRef();

  const openModal = () => {
    const rect = buttonRef.current.getBoundingClientRect();
    setPosition({
      top: rect.top + rect.height + rect.height / 12 + "px",
      right: window.innerWidth - rect.right + "px",
    });
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div
      className={` bg-white border border-gray-200 rounded-lg shadow-md m-2 px-10 py-2 relative ${"ScaleHover"}`}
    >
      <EditStaffModal
        open={modalIsOpen}
        onClose={closeModal}
        position={position}
        editProfileFunction={editProfileFunction}
        deleteStaffFunction={deleteStaffFunction}
      />

      <div className={`${ScaleHover} absolute top-0 right-0 p-1`}>
        {/* <button
          id="dropdownButton"
          data-dropdown-toggle="dropdown"
          className="inline-block focus:outline-none rounded-lg text-sm p-1.5"
          type="button"
          onClick={openModal}
          ref={buttonRef}
        > */}
        <div
          // className="absolute top-1 right-1"
          ref={buttonRef}
          onClick={(e) => {
            openModal();
            e.stopPropagation();
          }}
        >
          <KebabMenuWhite color={"#000"} />
          {/* <Check
              value={isSelected}
              onChange={(e) => onSelectionChange(e.target.checked)}
            /> */}
        </div>
        {/* </button> */}
      </div>
      <div className="flex flex-col items-center">
        {/* <Avatar /> */}

        <div className="p-2">
          <Avatar
            size={20}
            imgSrc={people?.profilePicture}
            alt={people?.firstName + " " + people?.lastName}
          />
        </div>
        <h5 className="mb-1 text-xl font-medium text-black">
          {people.firstName + " " + people?.lastName}
        </h5>
        <span className="text-sm text-PRIMARY_LIGHT_COLOR">
          Instacare Staff
        </span>
      </div>
    </div>
  );
};

export default StaffCard;
