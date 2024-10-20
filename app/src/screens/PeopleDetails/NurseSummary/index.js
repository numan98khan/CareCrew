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
      position: "top-center", //section of the browser page
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
    <div>
      {isMyProfile ? (
        <StatusModal
          open={modalIsOpen}
          onClose={closeModal}
          position={position}
          people={people}
          refetch={refetch}
        />
      ) : null}
      <Toaster />
      <div
        style={{ backgroundColor: themeStyles?.PRIMARY_COLOR }}
        className="flex flex-row h-auto rounded-2xl px-2 py-2 text-white text-left font-bold items-center"
      >
        <div className="flex items-center justify-center border-SECONDARY_COLOR border-[3px] rounded-full">
          {/* <Avatar /> */}
          <Avatar
            size={20}
            imgSrc={people?.profilePicture}
            alt={people?.firstName + " " + people?.lastName}
          />
        </div>

        <div
          style={{ width: "150%" }}
          className="ml-6 flex flex-col h-full gap-3"
        >
          <div className="flex flex-col gap-0">
            <div className="text-2xl">
              <h1>
                {people?.firstName} {people?.lastName}
              </h1>
            </div>
            <div>
              <h3 className="text-base text-PRIMARY_LIGHT_COLOR">
                {people?.role ? people?.role : " "}
              </h3>
            </div>
          </div>

          <div className=" flex flex-row items-center gap-3">
            <div className="flex flex-row items-center gap-1">
              <div className="flex mr-1 font-normal items-center text-xs text-PRIMARY_LIGHT_COLOR">
                Emp. ID:{" "}
                <span className="ml-2" style={{ fontWeight: "bolder" }}>
                  {" "}
                  {people?.type === EMPLOYEE ? people?.surrogateID : people?.id}
                </span>
              </div>
              <CopyToClipboard text={people?.id} onCopy={handleCopy}>
                <div className="cursor-pointer">
                  <ClipboardIcon />
                </div>
              </CopyToClipboard>
            </div>

            <div className={`flex flex-row `}>
              <div
                style={{ fontSize: "12px" }}
                className="font-normal mr-2 text-base text-PRIMARY_LIGHT_COLOR"
              >
                Status:
              </div>
              <div className={`flex flex-row items-center gap-1 ${ScaleHover}`}>
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
                  className="mr-4 text-xs font-semibold cursor-pointer flex flex-row items-center"
                >
                  {people?.status ? people?.status : " "}
                  <ChevronIcon size={7} />
                </div>
              </div>
            </div>
          </div>
        </div>
        {!isMyProfile && (
          <div className="flex flex-col justify-center pt-9">
            <div className="flex flex-row">
              {/* {people?.points >== 0 && ( */}
              <div
                onClick={() => {
                  // openPointModal();
                }}
                className=" flex flex-row w-20 h-8 px-1 rounded-3xl mr-2 text-sm justify-around items-center text-PRIMARY_COLOR bg-SECONDARY_COLOR"
              >
                <Clock />
                {people?.points} pts
              </div>
              {/* )} */}

              {/* {people?.rating && ( */}
              <div className="flex flex-row w-20 px-1 h-8 rounded-3xl justify-around items-center text-sm text-PRIMARY_COLOR bg-SECONDARY_COLOR">
                <StarIcon />
                {people?.rating}/5
              </div>
              {/* )} */}
            </div>
          </div>
        )}

        <div className="flex flex-col w-full justify-center mr-8">
          <div className="flex flex-row justify-end items-center">
            {isMyProfile || (
              <button
                className={`rounded-full bg-SECONDARY_COLOR w-12 h-12 mr-4 ${ScaleHover}`}
                onClick={() => navigate("/messaging", { state: people })}
              >
                <Mail />
              </button>
            )}

            {!editDisabled && (type === ADMIN || isMyProfile) ? (
              <div className="w-1/3">
                <Button
                  children={"Edit"}
                  onClick={
                    () => setIsEdit(true)
                    // navigate("/people", {
                    //   state: { people: people, isEdit: true },
                    // })
                  }
                />
              </div>
            ) : null}
          </div>
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
