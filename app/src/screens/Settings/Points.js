import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { MainHover } from "../../styles/animations";
import { useAuth } from "../../context";
import { ErrorToast, SuccessToast } from "../../services/micro";
import DropDown from "../../components/DropDown";
import PageNav from "../../components/PageNav";
import Table from "../../components/Table";
import RichTextEditor from "../../components/TextEditor";
import InputField from "../../components/Input";
import Button from "../../components/Button";
import { statuses } from "../../constants/status";
import {
  useListPoints,
  useCreatePoints,
  useUpdatePoints,
} from "../../apolloql/points";
import { peopleTypes } from "../../constants/userTypes";
import themeStyles from "../../styles/theme.styles";
import { PuffLoader } from "react-spinners";

const TABLE_HEAD = ["", "Reason", "Points", "Actions"];

function Points() {
  const { user } = useAuth();

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [pointsItem, setPointsItem] = useState({
    reason: null,
    point: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isEdit, setIsEdit] = useState(false);

  const { createPointsQuery } = useCreatePoints();
  const { updatePointsQuery } = useUpdatePoints();
  const { loading, error, points } = useListPoints();

  const itemsPerPage = 21;
  const totalPages = Math.ceil(points.length / itemsPerPage);

  useEffect(() => {
    if (pointsItem && isEdit) {
      const { subject, status, body } = pointsItem;
      try {
        const bodyContentState = convertFromRaw(JSON.parse(body));
        const newEditorState = EditorState.createWithContent(bodyContentState);
        setEditorState(newEditorState);
      } catch (error) {
        console.log(error);
      }
    }
  }, [pointsItem, isEdit]);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const setPointsItemKey = (key) => (newValue) =>
    setPointsItem((prevPointsItem) => ({ ...prevPointsItem, [key]: newValue }));

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const createPageNumbers = () => {
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <PageNav
          text={i.toString()}
          isSelected={i === currentPage}
          onClick={() => handlePageChange(i)}
        />
      );
    }
    return pages;
  };

  const handleAddOrUpdate = async () => {
    try {
      const baseInput = {
        reason: pointsItem.reason,
        point: pointsItem.point,
      };

      if (isEdit) {
        const updateInput = {
          id: pointsItem.id,
          _version: pointsItem._version,
          ...baseInput,
        };
        await updatePointsQuery(updateInput);
        SuccessToast("Points updated successfully");
      } else {
        await createPointsQuery(baseInput);
        SuccessToast("Points created successfully");
      }
    } catch (error) {
      console.error(error);
      ErrorToast("An error occurred while creating/updating the points");
    }
  };

  return (
    <>
      <div
        className={"flex p-3 mt-2 bg-white " + MainHover}
        onClick={openModal}
      >
        <label className="text-xs text-PRIMARY_COLOR font-bold text-left">
          + Add Points
        </label>
      </div>

      {loading ? (
        <div className="h-40 w-full flex justify-center items-center">
          <PuffLoader
            color={themeStyles.PRIMARY_LIGHT_COLOR}
            loading={loading}
            size={40}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <Table
          data={points}
          disableHeader={true}
          config={"points"}
          handlePageChange={handlePageChange}
          currentPage={currentPage}
          createPageNumbers={createPageNumbers}
          TABLE_HEAD={TABLE_HEAD}
          setSelectedPoints={setPointsItem}
          editAction={() => setIsEdit(true)}
          deleteAction={() => console.log("Delete action button for people")}
        />
      )}

      <Modal
        isOpen={modalIsOpen || isEdit}
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
        <label className="text-2xl font-bold mb-2">Add Points</label>
        <div className="flex flex-col mb-3">
          <InputField
            placeholder={"Reason"}
            value={pointsItem?.reason}
            setValue={setPointsItemKey("reason")}
          />

          <div className="my-1" />
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
          <Button
            children={isEdit ? "Update" : "Add"}
            onClick={handleAddOrUpdate}
          />

          <div className="mx-1" />
          <Button
            children={"Cancel"}
            onClick={() => {
              setIsEdit(false);
              setPointsItem(null);
              closeModal();
            }}
          />
        </div>
      </Modal>
    </>
  );
}

export default Points;
