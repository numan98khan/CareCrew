import React, { useEffect, useState, useRef } from "react";
import Clock from "../../../assets/icons/clock";
import StarIcon from "../../../assets/icons/staricon";
import Mail from "../../../assets/icons/mail";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Storage } from "aws-amplify";
import ClipboardIcon from "../../../assets/icons/clipboardIcon";
import { CopyToClipboard } from "react-copy-to-clipboard";
import StatusModal from "../../../components/Modals/StatusModal";
import { useAuth } from "../../../context";
import Button from "../../../components/Button";
import { PEOPLE_STATUS_COLORS } from "../../../constants/status";
import { MainHover, ScaleHover } from "../../../styles/animations";
import Avatar from "../../../components/Avatar";
import { ADMIN, EMPLOYEE } from "../../../constants/userTypes";
import PointsModal from "./PointsModal";

import ChevronIcon from "../../../assets/icons/downChevron";
import themeStyles from "../../../styles/theme.styles";

const NurseSummary = ({
  people,
  isMyProfile,
  refetch,
  setIsEdit,
  isStaffDetails,
  editDisabled,
}) => {
  const { type } = useAuth();
  const navigate = useNavigate();
  const [textToCopy, setTextToCopy] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [pointModalIsOpen, setPointModalIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, right: 0 });
  const buttonRef = useRef();

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000); // Reset the "copied" state after 3 seconds
    onSuccessToast();
  };

  const onSuccessToast = () => {
    toast.success(`Copied ID`, {
      duration: 3000,
      position: "top-center", // section of the browser page
    });
  };

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

  const openPointModal = () => {
    setPointModalIsOpen(true);
  };

  const closePointModal = () => {
    setPointModalIsOpen(false);
  };

  const dotsize = "10px";
  return (
    <div className="flex flex-col">
      {isMyProfile && (
        <StatusModal
          open={modalIsOpen}
          onClose={closeModal}
          position={position}
          people={people}
          refetch={refetch}
        />
      )}
      <Toaster />
      <div
        style={{ backgroundColor: themeStyles?.PRIMARY_COLOR }}
        className="flex flex-col md:flex-row h-auto rounded-2xl px-3 py-4 text-white text-left font-bold items-center gap-4"
      >
        {/* Avatar Section */}
        <div className="flex items-center justify-center border-SECONDARY_COLOR border-[3px] rounded-full">
          <Avatar
            size={20}
            imgSrc={people?.profilePicture}
            alt={people?.firstName + " " + people?.lastName}
          />
        </div>

        {/* Information Section */}
        <div className="flex flex-col w-full md:w-3/5 gap-4">
          <div className="flex flex-col gap-2">
            <div className="text-2xl">
              <h1>
                {people?.firstName} {people?.lastName}
              </h1>
            </div>
            <div>
              <h3 className="text-base text-PRIMARY_LIGHT_COLOR">
                {people?.role || " "}
              </h3>
            </div>
          </div>

          {/* ID and Status Section */}
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex flex-row items-center gap-2">
              <div className="flex font-normal items-center text-xs text-PRIMARY_LIGHT_COLOR">
                Emp. ID:
                <span className="ml-2 font-bold">
                  {people?.type === EMPLOYEE ? people?.surrogateID : people?.id}
                </span>
              </div>
              <CopyToClipboard text={people?.id} onCopy={handleCopy}>
                <div className="cursor-pointer">
                  <ClipboardIcon />
                </div>
              </CopyToClipboard>
            </div>

            <div className="flex flex-row items-center gap-2">
              <span className="font-normal text-xs text-PRIMARY_LIGHT_COLOR">
                Status:
              </span>
              <div className={`flex items-center gap-1 ${ScaleHover}`}>
                <div
                  style={{
                    height: dotsize,
                    width: dotsize,
                    borderRadius: "50%",
                    backgroundColor: PEOPLE_STATUS_COLORS[people?.status],
                  }}
                />
                <div
                  ref={buttonRef}
                  onClick={openModal}
                  className="text-xs font-semibold cursor-pointer flex flex-row items-center"
                >
                  {people?.status || " "}
                  <ChevronIcon size={7} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Points and Rating Section */}
        {!isMyProfile && (
          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex flex-row gap-2">
              <div
                onClick={openPointModal}
                className="flex flex-row items-center w-24 h-8 px-1 rounded-3xl text-sm justify-around text-PRIMARY_COLOR bg-SECONDARY_COLOR cursor-pointer"
              >
                <Clock />
                {people?.points} pts
              </div>
              <div className="flex flex-row items-center w-24 h-8 px-1 rounded-3xl text-sm text-PRIMARY_COLOR bg-SECONDARY_COLOR">
                <StarIcon />
                {people?.rating}/5
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons Section */}
        <div className="flex flex-col items-end gap-2 w-full md:w-auto">
          {!isMyProfile && (
            <button
              className={`rounded-full bg-SECONDARY_COLOR w-12 h-12 mr-4 ${ScaleHover}`}
              onClick={() => navigate("/messaging", { state: people })}
            >
              <Mail />
            </button>
          )}

          {!editDisabled && (type === ADMIN || isMyProfile) && (
            <Button children={"Edit"} onClick={() => setIsEdit(true)} />
          )}
        </div>
      </div>

      <PointsModal
        people={people}
        modalIsOpen={pointModalIsOpen}
        closeModal={closePointModal}
      />
    </div>
  );
};

export default NurseSummary;
