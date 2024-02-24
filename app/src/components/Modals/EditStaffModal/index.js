import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import DatePickerCustom from "../../../components/DatePicker";
import TimePickerCustom from "../../TimePicker";
import { useListPeople } from "../../../apolloql/people";
import DropDown from "../../DropDown";
import DeleteIcon from "../../../assets/icons/deleteIcon";
import EditIcon from "../../../assets/icons/editIcon";
import { ScaleHover } from "../../../styles/animations";

function EditStaffModal({
  open,
  onClose,
  afterOpenModal,
  styles,
  position,
  editProfileFunction,
  deleteStaffFunction,
}) {
  const [selectedTab, setSelectedTab] = useState(1);

  return (
    <div style={{ zIndex: 9999999999 }}>
      {/* Update the zIndex value here */}
      <Modal
        isOpen={open}
        onRequestClose={onClose}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.0)",
            zIndex: 10000000000, // this should be higher than AppBar's z-index
          },
          content: {
            position: "fixed", // This positions the modal relative to the viewport
            top: position.top,
            right: position.right,
            bottom: "auto",
            left: "auto",
            border: 10,
            boxShadow: "0px 4px 16px 0px rgba(196, 196, 196, 0.70)",
            display: "flex",
            flexDirection: "column", // Add this line
            // backgroundColor: "#000",
            padding: 0,
          },
        }}
        contentLabel="Example Modal"
      >
        <div
          style={{ width: "130px", height: "82px" }}
          className="w-full h-full flex flex-col gap-6 items-center justify-center"
        >
          <div
            style={{ width: "80%", height: "65%" }}
            className="flex flex-col gap-1 justify-between"
          >
            <div
              className={`flex flex-row gap-1 items-center w-full  ${ScaleHover}`}
              onClick={editProfileFunction}
            >
              <EditIcon />
              <p className="text-xs">Edit Staff</p>
            </div>

            <div
              className={`flex flex-row gap-1 items-center w-full ${ScaleHover}`}
              onClick={() => {
                deleteStaffFunction();
                onClose();
              }}
            >
              <DeleteIcon />
              <p className="text-xs">Delete</p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default EditStaffModal;
