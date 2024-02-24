import React, { useEffect, useState, useRef } from "react";

import Button from "../../../components/Button";

import Clock from "../../../assets/icons/clock";
import Modal from "react-modal";

import InputField from "../../../components/Input";
import { useListPoints } from "../../../apolloql/points";
import { ErrorToast, SuccessToast } from "../../../services/micro";
import { useUpdatePeople } from "../../../apolloql/people";

const PointsModal = ({ people, modalIsOpen, closeModal }) => {
  const { loading, error, points } = useListPoints();

  const { updatePeopleQuery } = useUpdatePeople();

  const [pointsItem, setPointsItem] = useState({
    reason: null,
    point: 0,
  });
  const setPointsItemKey = (key) => (newValue) =>
    setPointsItem((prevPointsItem) => ({ ...prevPointsItem, [key]: newValue }));

  const handleAddOrUpdate = async () => {
    const updatedPeople = {
      id: people.id,
      points: pointsItem.point,
      _version: people._version,
    };

    try {
      const response = await updatePeopleQuery(updatedPeople);

      // Fetch the updated `people` object from the server here if needed, to confirm the update.
      SuccessToast("Checklist updated successfully!");
    } catch (error) {
      ErrorToast("Error updating the checklist!");
    }
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="User Options Modal"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.2)",
        },
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          maxHeight: "70%",
          maxWidth: "40%",
          border: "10px",
          boxShadow: "0px 4px 16px 0px rgba(196, 196, 196, 0.70)",
          display: "flex",
          flexDirection: "column",
          borderRadius: 20,
        },
      }}
    >
      <label className="text-2xl font-bold mb-2">Points</label>
      <div className="flex flex-col mb-3 space-y-3 ">
        <div className="bg-SECONDARY_COLOR w-full p-2 px-3 rounded-full flex flex-row items-center space-x-1">
          <Clock />
          <p className="text-sm font-semibold text-PRIMARY_COLOR">{`Total: ${people?.points} points`}</p>
        </div>
        <div className="flex flex-row items-center justify-between">
          <label
            onClick={() =>
              setPointsItemKey("point")(
                pointsItem?.point < 2 ? 0 : pointsItem?.point - 1
              )
            }
            className="rounded-full w-10 h-7 items-center justify-center text-center text-white bg-PRIMARY_LIGHT_COLOR"
          >
            -
          </label>
          <div className="mx-1" />
          <InputField
            isCentered
            isNumeric
            placeholder={"Points"}
            value={pointsItem?.point}
            setValue={setPointsItemKey("point")}
          />
          <div className="mx-1" />
          <label
            onClick={() => setPointsItemKey("point")(pointsItem?.point + 1)}
            className="rounded-full w-10 h-7 items-center justify-center text-center text-white bg-PRIMARY_LIGHT_COLOR"
          >
            +
          </label>
        </div>
      </div>
      <div className="flex flex-row">
        <Button children={"+ADD CUSTOM POINTS"} onClick={handleAddOrUpdate} />

        {/* <div className="mx-1" />
        <Button
          children={"Cancel"}
          onClick={() => {
            setPointsItem(null);
            closeModal();
          }}
        /> */}
      </div>
    </Modal>
  );
};

export default PointsModal;
