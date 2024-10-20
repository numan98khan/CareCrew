import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { MainHover } from "../../styles/animations";
import { useAuth } from "../../context";
import {
  draftRichToText,
  ErrorToast,
  SuccessToast,
} from "../../services/micro";
import DropDown from "../../components/DropDown";
import PageNav from "../../components/PageNav";
import Table from "../../components/Table";
import RichTextEditor from "../../components/TextEditor";
import InputField from "../../components/Input";
import Button from "../../components/Button";
import { statuses } from "../../constants/status";

import {
  useCreateNews,
  useUpdateNews,
  useListNews,
  useDeleteNews,
} from "../../apolloql/news";

import { Auth, API, graphqlOperation } from "aws-amplify";

import {
  ADMIN,
  EMPLOYEE,
  FACILITY,
  peopleTypes,
} from "../../constants/userTypes";
import { PuffLoader } from "react-spinners";
import themeStyles from "../../styles/theme.styles";
import { getNews } from "../../graphql/queries";

const TABLE_HEAD = [
  "",
  "Date",
  "News Title",
  "Description",
  "Status",
  "Actions",
];

function News() {
  const NEWS_PEOPLE_TYPES = peopleTypes.concat(["ALL"]);
  const { user, personalData } = useAuth();

  const [isProcessing, setIsProcessing] = useState(false);

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newsItem, setNewsItem] = useState({
    datetime: null,
    status: "ACTIVE",
    headline: null,
    news: null,
    receivers: null,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isEdit, setIsEdit] = useState(false);

  const { createNews } = useCreateNews();
  const { updateNews } = useUpdateNews();
  const {
    loading,
    error,
    news,
    refetch: refetchNews,
  } = useListNews({ isAdmin: true });
  // const { loading, error, news } = useListNews({});

  const itemsPerPage = 21;
  const totalPages = Math.ceil(news.length / itemsPerPage);

  useEffect(() => {
    if (newsItem && isEdit) {
      const { subject, status, body } = newsItem;
      try {
        const bodyContentState = convertFromRaw(JSON.parse(body));
        const newEditorState = EditorState.createWithContent(bodyContentState);
        setEditorState(newEditorState);
      } catch (error) {
        console.log(error);
      }
    }
  }, [newsItem, isEdit]);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => {
    setIsEdit(false);
    setModalIsOpen(false);
  };

  const setNewsItemKey = (key) => (newValue) =>
    setNewsItem((prevNewsItem) => ({ ...prevNewsItem, [key]: newValue }));

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
    setIsProcessing(true);
    try {
      const baseInput = {
        headline: newsItem.headline,
        status: newsItem.status,
        news: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
        alt: draftRichToText(
          JSON.stringify(convertToRaw(editorState.getCurrentContent()))
        ),
        author: personalData?.firstName + " " + personalData?.lastName,
        receivers: newsItem?.receivers,
        // datetime: new Date(),
        peopleID: user?.attributes?.sub,
      };

      if (isEdit) {
        const updateInput = {
          id: newsItem.id,
          _version: newsItem._version,
          ...baseInput,
        };
        await updateNews(updateInput);
        SuccessToast("News updated successfully");
      } else {
        await createNews(baseInput);
        SuccessToast("News created successfully");
        // Clear the input boxes if the request is successful and you are in add mode
        setNewsItem({
          datetime: null,
          status: "ACTIVE",
          headline: null,
          news: null,
          receivers: null,
        });
        setEditorState(EditorState.createEmpty());
      }
    } catch (error) {
      console.error(error);
      ErrorToast("An error occurred while creating/updating the news");
    } finally {
      setIsProcessing(false); // Set isProcessing to false at the end of the function, whether the request succeeded or failed
    }
  };

  const { deleteNews } = useDeleteNews();

  const handleDelete = async () => {
    try {
      // Fetch the latest version if necessary
      // const latestNewsItem = fetchLatestVersion(newsId);
      const newsData = (
        await API.graphql(
          graphqlOperation(getNews, {
            id: newsItem?.id,
          })
        )
      )?.data?.getNews;
      console.log("🚀 ~ file: News.js:143 ~ handleDelete ~ newData:", newsData);

      await deleteNews({ id: newsData?.id, _version: newsData._version });

      await refetchNews();
      SuccessToast("News deleted successfully");
      // Refresh the list or remove the item from the local state
    } catch (error) {
      console.error(error);
      ErrorToast("An error occurred while deleting the news");
    }
  };

  return (
    <>
      <div
        className={"flex p-3 mt-2 bg-white " + MainHover}
        onClick={openModal}
      >
        <label className="text-xs text-PRIMARY_COLOR font-bold text-left">
          + Add News
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
          data={news}
          disableHeader={true}
          config={"news"}
          handlePageChange={handlePageChange}
          currentPage={currentPage}
          createPageNumbers={createPageNumbers}
          TABLE_HEAD={TABLE_HEAD}
          setSelectedNews={setNewsItem}
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
            height: "70%", // Increase height for responsiveness
            width: "90%", // Change width to full for smaller screens
            maxWidth: "500px", // Set a max width for larger screens
            border: "10px",
            boxShadow: "0px 4px 16px 0px rgba(196, 196, 196, 0.70)",
            display: "flex",
            flexDirection: "column",
            borderRadius: 20,
          },
        }}
      >
        <label className="text-2xl font-bold mb-2">Add News</label>
        <div className="flex flex-col mb-3">
          <InputField
            placeholder={"Subject"}
            value={newsItem?.headline || ""}
            setValue={setNewsItemKey("headline")}
            maxLength={50} // Add this line
          />
          <div className="my-1" />

          <div className="flex flex-row">
            <DropDown
              labels={NEWS_PEOPLE_TYPES}
              options={[FACILITY, ADMIN, EMPLOYEE, "ALL"]}
              placeholder={"Receivers"}
              value={newsItem?.receivers}
              setValue={setNewsItemKey("receivers")}
            />

            <div className="mx-1" />
            <DropDown
              options={statuses}
              placeholder={"Status"}
              value={newsItem?.status}
              setValue={setNewsItemKey("status")}
            />
          </div>
        </div>
        <div className="flex-1">
          <RichTextEditor
            editorState={editorState}
            onEditorStateChange={setEditorState}
          />
        </div>
        <div className="my-5" />
        <div className="flex flex-row">
          <Button
            children={isEdit ? "Update" : "Add"}
            onClick={handleAddOrUpdate}
            disabled={isProcessing}
          />

          <div className="mx-1" />
          <Button
            children={"Cancel"}
            onClick={() => {
              setIsEdit(false);
              setNewsItem(null);
              closeModal();
            }}
          />
        </div>
      </Modal>
    </>
  );
}

export default News;
