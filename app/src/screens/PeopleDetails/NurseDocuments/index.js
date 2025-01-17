import React, { useState, useEffect } from "react";
import InfoTitle from "../../../components/Headers/InfoTitle";
import cert_placeholder from "../../../assets/icons/cert_placeholder.png";

import Button from "../../../components/Button";
import DocumentUploadModal from "../../../components/Drawers/DocumentUploadModal";

import { retrieveImage } from "../../../services/imageService";
import { displayDate } from "../../../services/micro";

// function DisplayImage({ documentKey }) {
//   const [imageUrl, setImageUrl] = useState(null);

//   useEffect(() => {
//     async function fetchImage() {
//       const image = await retrieveImage(documentKey);
//       setImageUrl(image);
//     }

//     fetchImage();
//   }, [documentKey]);

//   if (!imageUrl) {
//     return <div>Loading...</div>;
//   }

//   return <img src={imageUrl} alt="Document" />;
// }

function DisplayImage({ documentKey, documentName }) {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    async function fetchImage() {
      const response = await fetch(await retrieveImage(documentKey));
      const blob = await response.blob();
      const objectURL = URL.createObjectURL(blob);
      setImageUrl(objectURL);
    }

    fetchImage();
  }, [documentKey]);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = documentName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!imageUrl) {
    return <div>Loading...</div>;
  }

  return (
    <div onClick={handleDownload}>
      <img src={imageUrl} alt="Document" />
    </div>
  );
}

const NurseDocuments = ({ people }) => {
  const [open, setOpen] = useState(false);
  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  return (
    <div className="min-h-max px-3 mt-3 pb-3 bg-white">
      <div className="flex flex-col">
        <div className="w-full flex flex-col ">
          <div className="flex flex-col text-left align w-full p-4">
            <InfoTitle text={"Documents"} />

            <div className="mt-7 mb-7 w-full flex flex-row flex-wrap gap-3">
              {people.documents &&
                people.documents.map((document, index) => (
                  <div
                    key={index}
                    style={{
                      width: "200px",
                      height: "130px",
                      borderRadius: "10px 10px 10px 10px",
                    }}
                    className="relative overflow-hidden"
                  >
                    {/* <img
                      style={{ width: "100%", height: "100%" }}
                      src={
                        document.key
                          ? `URL_PREFIX/${document.key}`
                          : cert_placeholder
                      }
                      alt={document.name}
                    /> */}
                    {/* <DisplayImage documentKey={document.key} />
                     */}
                    <DisplayImage
                      documentKey={document.key}
                      documentName={document.name}
                    />

                    <div
                      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                      className="absolute w-full h-8 bottom-0 flex flex-row items-center justify-center"
                    >
                      <p style={{ color: "white", fontSize: "11px" }}>
                        {document.name}{" "}
                        {document?.expiration
                          ? `(Expires: ${displayDate(
                              document?.expiration + "T12:00:00.000Z"
                            )})`
                          : ""}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/* <button className="bg-[#7ED1E6] text-white rounded-full pl-5 pr-5 w-fit h-12 text-lg font-bold">
          Upload Documents
        </button>
        <Button /> */}
        <div className="w-1/5">
          <Button children={"Upload Documents"} onClick={onOpen} />
        </div>
      </div>
      <DocumentUploadModal open={open} onClose={onClose} people={people} />
    </div>
  );
};

export default NurseDocuments;
