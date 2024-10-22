import React, { useState } from "react";
import themeStyles from "../../styles/theme.styles";
import { useSpring, animated } from "react-spring";

import WhosOnItem from "../../components/WhosOn/index";
import { MainHover, ScaleHover, ShadowHover } from "../../styles/animations";
import CreateReminderModal from "../Modals/Reminder";
import Modal from "react-modal";

import InputField from "../../components/Input";
import Button from "../../components/Button";
import DropDown from "../../components/DropDown";
import RichTextEditor from "../../components/TextEditor";

import {
  ADMIN,
  EMPLOYEE,
  FACILITY,
  peopleTypes,
} from "../../constants/userTypes";
import { statuses } from "../../constants/status";

import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import {
  draftRichToText,
  ErrorToast,
  SuccessToast,
} from "../../services/micro";
import { useAuth } from "../../context";
import { useCreateNews } from "../../apolloql/news";

const InfoCard = ({
  isCreateReminder,
  isCreateNews,
  title,
  dataComponents,
  navbar,
  setSelectedTab,
  tabToSelect,
  viewAllClick,
}) => {
  // Inside your component...
  const [animationProps, setAnimationProps] = useSpring(() => ({
    scale: 1,
  }));

  const [open, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function onClose() {
    setIsOpen(false);
  }

  const onCardClick = () => {
    setAnimationProps({
      scale: 1.1,
      reset: true,
      reverse: true,
      from: { scale: 1 },
      config: { duration: 100 },
    });
  };

  const { createNews } = useCreateNews();

  const { user, personalData, permissions } = useAuth();

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  // const [modalIsOpen, setModalIsOpen] = useState(false);

  const [newsItem, setNewsItem] = useState({
    datetime: null,
    status: "ACTIVE",
    headline: null,
    news: null,
    receivers: null,
  });
  const setNewsItemKey = (key) => (newValue) =>
    setNewsItem((prevNewsItem) => ({ ...prevNewsItem, [key]: newValue }));

  const NEWS_PEOPLE_TYPES = peopleTypes.concat(["ALL"]);

  const handleAddOrUpdate = async () => {
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
      console.log(
        "🚀 ~ file: News.js:113 ~ handleAddOrUpdate ~ baseInput:",
        baseInput
      );

      await createNews(baseInput);
      SuccessToast("News created successfully");
    } catch (error) {
      console.error(error);
      ErrorToast("An error occurred while creating/updating the news");
    }
  };

  return (
    <animated.div
      style={{
        transform: animationProps.scale.to((scale) => `scale(${scale})`),
      }}
      //   onClick={onCardClick}
      // style={gradientStyle}
      className="flex flex-col justify-between rounded-lg w-full bg-white p-2"
    >
      {isCreateReminder ? (
        <CreateReminderModal open={open} onClose={onClose} />
      ) : null}
      {isCreateNews ? (
        <Modal
          // isOpen={modalIsOpen || isEdit}
          // onRequestClose={closeModal}
          isOpen={open}
          onRequestClose={onClose}
          contentLabel="User Options Modal"
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.75)",
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
              // boxShadow: "0px 4px 16px 0px rgba(196, 196, 196, 0.70)",
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
              value={newsItem?.headline}
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
            <Button children={"Add"} onClick={handleAddOrUpdate} />

            <div className="mx-1" />
            <Button
              children={"Cancel"}
              onClick={() => {
                setNewsItem(null);
                onClose();
              }}
            />
          </div>
        </Modal>
      ) : null}
      <div className="flex justify-between items-center mb-2">
        <label className="text-xs font-bold">{title}</label>

        {navbar}

        <div className="flex flex-row gap-3">
          {isCreateReminder && (
            <p
              onClick={openModal}
              style={{ cursor: "pointer" }}
              className="text-PRIMARY_COLOR text-xxs"
            >
              Create Reminder
            </p>
          )}

          {isCreateNews && (
            <p
              onClick={openModal}
              style={{ cursor: "pointer" }}
              className="text-PRIMARY_COLOR text-xxs"
            >
              Create News
            </p>
          )}

          {(viewAllClick || setSelectedTab) && (
            <div
              className={`text-xxs flex items-center font-bold text-PRIMARY_COLOR ${ScaleHover}`}
              onClick={() => {
                if (setSelectedTab) {
                  setSelectedTab(tabToSelect);
                } else {
                  if (viewAllClick) {
                    viewAllClick();
                  }
                }
              }}
            >
              {"View All"}
            </div>
          )}
        </div>
      </div>

      {dataComponents}
    </animated.div>
  );
};

export default InfoCard;
