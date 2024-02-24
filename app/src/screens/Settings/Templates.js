import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { MainHover } from "../../styles/animations";
import { useAuth } from "../../context";
import {
  ErrorToast,
  SuccessToast,
  draftRichToText,
} from "../../services/micro";
import DropDown from "../../components/DropDown";
import PageNav from "../../components/PageNav";
import Table from "../../components/Table";
import RichTextEditor from "../../components/TextEditor";
import InputField from "../../components/Input";
import Button from "../../components/Button";
import { statuses } from "../../constants/status";

import { Auth, API, graphqlOperation } from "aws-amplify";

import {
  useCreateTemplate,
  useDeleteTemplates,
  useListTemplates,
  useUpdateTemplate,
} from "../../apolloql/templates";
import { PuffLoader } from "react-spinners";
import themeStyles from "../../styles/theme.styles";
import { getTemplates } from "../../graphql/queries";

const TABLE_HEAD = ["", "Subject", "Message", "Status", "Actions"];
const tTemplate = {
  subject: null,
  status: "ACTIVE",
  body: null,
  type: "Email",
};

function Templates() {
  const { user } = useAuth();

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [template, setTemplate] = useState(tTemplate);
  const [currentPage, setCurrentPage] = useState(1);
  const [isEdit, setIsEdit] = useState(false);

  // Inside your Templates function
  const { createTemplate } = useCreateTemplate();
  const { updateTemplate } = useUpdateTemplate();
  const {
    loading,
    error,
    templates,
    refetch: refetchTemplates,
  } = useListTemplates(true);

  const itemsPerPage = 21; // adjust this as needed
  const totalPages = Math.ceil(templates.length / itemsPerPage);

  useEffect(() => {
    if (template && isEdit) {
      const { subject, status, body } = template;
      try {
        const bodyContentState = convertFromRaw(JSON.parse(body));
        const newEditorState = EditorState.createWithContent(bodyContentState);
        setEditorState(newEditorState);
      } catch (error) {
        console.log(error);
      }
    }
  }, [template, isEdit]);

  const openModal = () => {
    setTemplate(tTemplate);
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setIsEdit(false);
    setModalIsOpen(false);
  };

  const setTemplateKey = (key) => (newValue) =>
    setTemplate((prevTemplate) => ({ ...prevTemplate, [key]: newValue }));

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
        subject: template.subject,
        status: template.status,
        body: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
        alt: draftRichToText(
          JSON.stringify(convertToRaw(editorState.getCurrentContent()))
        ),
        peopleID: user?.attributes?.sub,
      };

      if (isEdit) {
        const updateInput = {
          id: template.id,
          _version: template._version,
          ...baseInput,
        };
        await updateTemplate(updateInput);
        SuccessToast("Template updated successfully");
      } else {
        await createTemplate(baseInput);
        SuccessToast("Template created successfully");
      }
    } catch (error) {
      console.error(error);
      ErrorToast("An error occurred while creating/updating the template");
    }
    closeModal();
    await refetchTemplates();
  };

  const { deleteTemplateQuery } = useDeleteTemplates();
  const handleDelete = async (id) => {
    try {
      console.log(
        "🚀 ~ file: Templates.js:122 ~ handleDelete ~ template:",
        template
      );
      // Fetch the latest version if necessary
      // const latestNewsItem = fetchLatestVersion(newsId);
      const templateData = (
        await API.graphql(
          graphqlOperation(getTemplates, {
            id: id,
          })
        )
      )?.data?.getTemplates;
      // console.log(
      //   "🚀 ~ file: Templates.js:128 ~ handleDelete ~ templateData:",
      //   templateData
      // );

      await deleteTemplateQuery({
        id: templateData?.id,
        _version: templateData._version,
      });

      await refetchTemplates();
      SuccessToast("Template deleted successfully");
      // Refresh the list or remove the item from the local state
    } catch (error) {
      console.error(error);
      ErrorToast("An error occurred while deleting the template");
    }
  };
  return (
    <>
      <div
        className={"flex p-3 mt-2 bg-white " + MainHover}
        onClick={openModal}
      >
        <label className="text-xs text-PRIMARY_COLOR font-bold text-left">
          + Add Template
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
          data={templates}
          disableHeader={true}
          config={"templates"}
          handlePageChange={handlePageChange}
          currentPage={currentPage}
          // totalPages={totalPages}
          createPageNumbers={createPageNumbers}
          TABLE_HEAD={TABLE_HEAD}
          setSelectedTemplate={setTemplate}
          editAction={() => setIsEdit(true)}
          // deleteAction={() => console.log("Delete action button for people")}

          deleteAction={handleDelete}
        />
      )}

      <Modal
        isOpen={modalIsOpen || isEdit}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={true}
        contentLabel="User Options Modal"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            // zIndex: 1000, // this should be higher than AppBar's z-index
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            height: "70%",
            width: "40%",
            border: "10px",
            boxShadow: "0px 4px 16px 0px rgba(196, 196, 196, 0.70)",
            display: "flex",
            flexDirection: "column",
            borderRadius: 20,
          },
        }}
      >
        <label className="text-2xl font-bold mb-2">Email Template</label>
        <div className="flex flex-row mb-3">
          <InputField
            placeholder={"Subject"}
            value={template?.subject}
            setValue={setTemplateKey("subject")}
          />
          <div className="mx-1" />
          <DropDown
            options={statuses}
            placeholder={"Status"}
            value={template?.status}
            setValue={setTemplateKey("status")}
          />
        </div>
        <div className="flex-1">
          <RichTextEditor
            editorState={editorState}
            onEditorStateChange={setEditorState}
          />
          {/* <div className="h-20 bg-slate-400" /> */}
        </div>
        <div className="my-5" />
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
              setTemplate(null);
              closeModal();
            }}
          />
        </div>
      </Modal>
    </>
  );
}

export default Templates;
