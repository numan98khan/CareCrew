import React, { useEffect, useState, useRef } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import themeStyles from "../../../styles/theme.styles";
import Button from "../../Button";
import StarRating from "../../StarRating";
import InputField from "../../Input";
import DropDown from "../../DropDown";

import Image from "../../../assets/icons/image";
import Camera from "../../../assets/icons/camera";

import { useCreateReview } from "../../../apolloql/reviews";
import { ErrorToast, SuccessToast } from "../../../services/micro";
import { ScaleHover } from "../../../styles/animations";
import { useUpdatePeople } from "../../../apolloql/people";
import { useS3Upload } from "../../../services/uploadFileToS3";
import DatePickerCustom from "../../DatePicker";

function DocumentUploadModal({
  open,
  onClose,
  people,
  docName,
  handleChecklistUpdate,
}) {
  // const [rating, setRating] = useState(0);
  // const [review, setReview] = useState("");

  const { updatePeopleQuery } = useUpdatePeople();
  const { uploading, uploadFile, imageUrl } = useS3Upload();

  const fileInput = useRef(null);

  const handleDivClick = () => {
    fileInput.current.click();
  };

  const [imagePlaceholder, setImagePlaceholder] = useState(null);
  const [imageRef, setImageRef] = useState(null);
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setImageRef(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = function () {
        setImagePlaceholder(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const [expDate, setExpDate] = useState("");
  const [docType, setDocType] = useState("");

  const submitDocument = async () => {
    if (imageRef) {
      // Trigger the upload to S3
      const response = await uploadFile(imageRef);

      if (response.key) {
        // Construct the new document object
        const newDocument = {
          name: docName || docType, // This assumes that docType is the name of the document
          key: response.key,
          expiration: expDate,
        };

        // return;
        // Update the People type to include the new document
        const updatedDocuments = [
          ...(people?.documents?.map(({ __typename, ...rest }) => rest) || []),
          newDocument,
        ];

        const updatedPeople = {
          id: people.id,
          documents: updatedDocuments,

          _version: people._version,
        };

        try {
          await updatePeopleQuery(updatedPeople);
          SuccessToast("Document uploaded successfully!"); // Notify user of success

          if (docName) {
            // TODO: add the checklist update function here
            handleChecklistUpdate(docName);
          }
        } catch (error) {
          console.error("Error updating people: ", error);
          ErrorToast("Error updating the document: " + error); // Notify user of the error
        }
      } else {
        ErrorToast("Error uploading the file to S3.");
      }
    } else {
      ErrorToast("Please select a file");
    }
  };

  return (
    <>
      <Drawer
        open={open}
        onClose={onClose}
        direction="right"
        overlayOpacity={0}
        style={{ bottom: "0", top: "initial", height: "94vh", width: "300px" }}
      >
        <input
          type="file"
          ref={fileInput}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <div className=" flex h-full w-full relative justify-center items-center p-3">
          <div
            style={{ backgroundColor: themeStyles.PRIMARY_LIGHT_COLOR }}
            className="absolute w-full h-1 top-0"
          />

          <div className="h-full w-full space-y-2">
            <div className="flex flex-col text-left w-full row-auto justify-between items-start">
              <p style={{ fontSize: "24px" }} className="text-xl font-bold">
                Upload Document
              </p>
            </div>

            {/* <Dropdown */}
            <DropDown
              placeholder={"Document Type"}
              value={docName || docType}
              setValue={setDocType}
              options={[
                "Passport",
                "ID Card",
                "Driving License",
                "Certificate",
              ]}
            />
            {/* <InputField
              value={expDate}
              setValue={setExpDate}
              placeholder={"Expiration Date"}
              // multiline
            /> */}

            <DatePickerCustom date={expDate} onChange={setExpDate} />

            <div className="w-full space-y-1">
              <div
                onClick={handleDivClick}
                className={`${ScaleHover} flex flex-row p-2 space-x-2 bg-[#F3FAFD] justify-center items-center w-full h-full rounded-3xl border-2 border-blue-300 border-dotted`}
              >
                {/* <div className="flex flex-row items-end w-full justify-center p-2 bg-slate-400"> */}
                <Image size={7} />
                <span
                  // className="mt-1 text-xs self-center h-full bg-slate-400"
                  className="mt-1 text-xs self-center h-full"
                >
                  Open Gallery
                </span>
                {/* </div> */}
              </div>

              {/* <div className="mx-1" />
              <div
                className={`${ScaleHover} flex flex-row p-2 space-x-2  bg-[#F3FAFD] justify-center items-center w-full h-full rounded-3xl border-2 border-blue-300 border-dotted`}

                // className="bg-[#F3FAFD] p-2 dark:hover:shadow-black/30 flex flex-col justify-center items-center w-full h-full rounded-3xl border-2 border-blue-300 border-dotted"
              >
                <Camera size={7} />
                <span className="mt-1 text-xs self-start">Camera</span>
              </div> */}
            </div>

            {imagePlaceholder ? (
              <img
                className={`w-full h-100 object-cover ${
                  true ? "rounded" : "rounded-full"
                }`}
                src={imagePlaceholder}
                alt="User avatar"
              />
            ) : null}

            <div className="flex flex-row mt-10 mb-10 w-full h-fit gap-3">
              <Button onClick={submitDocument} children={"UPLOAD"} />
              <Button
                // onClick={handleResetFilter}
                color={"#C4C4C4"}
                children={"CANCEL"}
              />
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
}

export default DocumentUploadModal;
