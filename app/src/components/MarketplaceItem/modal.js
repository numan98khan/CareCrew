import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { displayDate, displayTime } from "../../services/micro";

import GuaranteeIndicator from "../../assets/icons/indicators/guarantee";
import themeStyles from "../../styles/theme.styles";
import Button from "../Button";

import MorningIcon from "../../assets/icons/indicators/morning";

import LocationIcon from "../../assets/icons/location";

import RateTag from "../ColoredTag/RateTag";
import LocationTag from "../ColoredTag/LocationTag";

import BookedCalendarIcon from "../../assets/icons/bookedCalendar";

const ICON_SIZE = 7;

const AcceptShiftModal = ({ marketplaceItem, closeModal }) => (
  <div className="flex flex-col relative w-full justify-center items-center space-y-5">
    <div className="flex flex-col justify-center items-center p-2 space-y-3">
      <BookedCalendarIcon size={6} />
      <div className="flex flex-col justify-center items-center">
        <label className="text-PRIMARY_COLOR text-lg">Awesome!</label>
        <label className="text-black text-xxs">
          You successfully booked the shift.
        </label>
        <label className="text-black text-xxs">Your shift details are:</label>
      </div>

      <div className="flex flex-col justify-center items-center space-y-2">
        <label className="text-PRIMARY_COLOR text-sm font-bold">
          {displayDate(marketplaceItem?.date)}
        </label>
        <div className="flex flex-row space-x-1 items-center">
          <MorningIcon size={ICON_SIZE} />
          <label className="text-black text-xxs font-bold">
            {`${displayTime(marketplaceItem?.shiftStartDT)} - ${displayTime(
              marketplaceItem?.shiftEndDT
            )}`}
          </label>
        </div>
      </div>
    </div>
    <div className="flex flex-row w-full space-x-1">
      <Button
        children={"CLOSE"}
        onClick={closeModal}
        color={themeStyles.GRAY}
      />
    </div>
  </div>
);

const MarketplaceModal = ({
  modalIsOpen,
  closeModal,
  marketplaceItem,
  assignShift,
  assignInProgress,
}) => {
  const [isAcceptShift, setIsAcceptShift] = useState(false);

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="People Add Modal"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        content: {
          position: "relative",
          borderRadius: 20,
          width: "300px",
          padding: "0px",
        },
      }}
    >
      <div className="flex flex-col relative bg-white w-full justify-center items-center p-2 space-y-5">
        {isAcceptShift ? (
          <AcceptShiftModal
            marketplaceItem={marketplaceItem}
            closeModal={() => {
              setIsAcceptShift(false);
              closeModal();
            }}
          />
        ) : (
          <>
            <ShiftDetails marketplaceItem={marketplaceItem} />
            <ActionButtons
              assignShift={assignShift}
              setIsAcceptShift={setIsAcceptShift}
              closeModal={closeModal}
              assignInProgress={assignInProgress}
            />
          </>
        )}
      </div>
    </Modal>
  );
};

const ShiftDetails = ({ marketplaceItem }) => (
  <>
    <label className="text-PRIMARY_COLOR text-xxs">SHIFT DETAILS</label>
    <div className="flex flex-col w-full justify-center items-center  space-y-2">
      <ShiftTime marketplaceItem={marketplaceItem} />
      <ShiftFacility marketplaceItem={marketplaceItem} />
      <ShiftRate marketplaceItem={marketplaceItem} />
      {marketplaceItem?.isGuarantee && (
        <div className="flex flex-row items-center justify-between">
          <GuaranteeIndicator size={ICON_SIZE - 1} />
          <label className="text-xxs ml-1">Cancellation Guarantee</label>
        </div>
      )}
    </div>
  </>
);

const ShiftTime = ({ marketplaceItem }) => (
  <>
    <label className="text-lg text-PRIMARY_COLOR font-bold">
      {`${displayTime(marketplaceItem?.shiftStartDT)} - ${displayTime(
        marketplaceItem?.shiftEndDT
      )}`}
    </label>
    <label className="text-xs text-PRIMARY_COLOR font-semibold">
      {displayDate(marketplaceItem?.shiftStartDT)}
    </label>
  </>
);

const ShiftFacility = ({ marketplaceItem }) => (
  <>
    <label className="text-black text-xxs">
      {marketplaceItem?.facility?.facilityName}
    </label>
    <div className="flex items-center">
      <LocationIcon size={3} />
      <label className="text-black text-xxs ml-1">
        {marketplaceItem?.facility?.streetAddress}
      </label>
    </div>
  </>
);

const ShiftRate = ({ marketplaceItem }) => (
  <div className="flex flex-row space-x-1">
    <RateTag
      title={`$${marketplaceItem?.rate}/hr${
        marketplaceItem?.isIncentive
          ? ` + $${marketplaceItem?.incentives?.incentiveAmount} ${marketplaceItem?.incentives?.incentiveType}`
          : ""
      }`}
    />
    <LocationTag title={`${marketplaceItem?.distance} miles`} />
  </div>
);

const ActionButtons = ({
  setIsAcceptShift,
  closeModal,
  assignShift,
  assignInProgress,
}) => (
  <div className="flex flex-row space-x-1 w-full">
    <Button
      children={"ACCEPT"}
      onClick={async () => {
        const response = await assignShift();
        if (response) setIsAcceptShift(true);
      }}
      disabled={assignInProgress}
    />
    <Button children={"CLOSE"} color={themeStyles?.GRAY} onClick={closeModal} />
  </div>
);

export default MarketplaceModal;
