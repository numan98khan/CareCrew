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
  useListReasons,
  useCreateReason,
  useUpdateReason,
  useDeleteReasons,
} from "../../apolloql/reasons";
// import { peopleTypes } from "../../constants/userTypes";

import { Auth, API, graphqlOperation } from "aws-amplify";

import { areas } from "../../constants/areas";
import { PuffLoader } from "react-spinners";
import themeStyles from "../../styles/theme.styles";
import { getReason } from "../../graphql/queries";

const TABLE_HEAD = ["", "Reason", "Area", "Status", "Actions"];

function Reasons() {
  const { user } = useAuth();

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [reasonItem, setReasonItem] = useState({
    reason: null,
    point: 0,
    status: statuses[0],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isEdit, setIsEdit] = useState(false);

  const { createReasonQuery } = useCreateReason();
  const { updateReasonQuery } = useUpdateReason();
  const {
    loading,
    error,
    reasons,
    refetch: refetchReasons,
  } = useListReasons(undefined, true);

  const itemsPerPage = 21;
  const totalPages = Math.ceil(reasons.length / itemsPerPage);

  useEffect(() => {
    if (reasonItem && isEdit) {
      const { subject, status, body } = reasonItem;
      try {
        const bodyContentState = convertFromRaw(JSON.parse(body));
        const newEditorState = EditorState.createWithContent(bodyContentState);
        setEditorState(newEditorState);
      } catch (error) {
        console.log(error);
      }
    }
  }, [reasonItem, isEdit]);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => {
    setIsEdit(false);
    setModalIsOpen(false);
  };

  const setReasonItemKey = (key) => (newValue) =>
    setReasonItem((prevReasonItem) => ({ ...prevReasonItem, [key]: newValue }));

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
        reason: reasonItem.reason,
        status: reasonItem.status,
        area: reasonItem.area,
      };

      if (isEdit) {
        const updateInput = {
          id: reasonItem.id,
          _version: reasonItem._version,
          ...baseInput,
        };
        console.log(updateInput);
        await updateReasonQuery(updateInput);
        SuccessToast("Reason updated successfully");
      } else {
        await createReasonQuery(baseInput);
        SuccessToast("Reason created successfully");
      }
    } catch (error) {
      console.error(error);
      ErrorToast("An error occurred while creating/updating the reason");
    }
  };

  const { deleteReasonsQuery } = useDeleteReasons();

  const handleDelete = async (id) => {
    try {
      // Fetch the latest version if necessary
      // const latestNewsItem = fetchLatestVersion(newsId);
      const reasonData = (
        await API.graphql(
          graphqlOperation(getReason, {
            id: id,
          })
        )
      )?.data?.getReason;
      console.log(
        "🚀 ~ file: Templates.js:128 ~ handleDelete ~ templateData:",
        reasonData
      );

      await deleteReasonsQuery({
        id: reasonData?.id,
        _version: reasonData._version,
      });

      await refetchReasons();
      SuccessToast("Reason deleted successfully");
      // Refresh the list or remove the item from the local state
    } catch (error) {
      console.error(error);
      ErrorToast("An error occurred while deleting the reason");
    }
  };

  return (
    <>
      <div
        className={"flex p-3 mt-2 bg-white " + MainHover}
        onClick={openModal}
      >
        <label className="text-xs text-PRIMARY_COLOR font-bold text-left">
          + Add Reason
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
          data={reasons}
          disableHeader={true}
          config={"reasons"}
          handlePageChange={handlePageChange}
          currentPage={currentPage}
          createPageNumbers={createPageNumbers}
          TABLE_HEAD={TABLE_HEAD}
          setSelectedReason={setReasonItem}
          editAction={() => setIsEdit(true)}
          // deleteAction={() => console.log("Delete action button for people")}

          deleteAction={handleDelete}
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
            // height: "70%",
            width: "40%",
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
          <div className="flex flex-row">
            <DropDown
              options={areas}
              placeholder={"Area"}
              value={reasonItem?.area}
              setValue={setReasonItemKey("area")}
            />

            <div className="mx-1" />
            <DropDown
              options={statuses}
              placeholder={"Status"}
              value={reasonItem?.status}
              setValue={setReasonItemKey("status")}
            />
          </div>

          <div className="my-1" />
          <InputField
            placeholder={"Reason"}
            multiline
            value={reasonItem?.reason}
            setValue={setReasonItemKey("reason")}
          />
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
              setReasonItem(null);
              closeModal();
            }}
          />
        </div>
      </Modal>

      {/* Modal code stays same */}
    </>
  );
}

export default Reasons;
