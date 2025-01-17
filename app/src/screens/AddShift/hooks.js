// useBulkShiftUploader.js
import { useState } from "react";
import { useS3Upload } from "../../services/uploadFileToS3";
import { createBulkShifts } from "../../services/bulkUserCreation"; // Make sure to import the function

export function useBulkShiftUploader() {
  const [uploadingStatus, setUploadingStatus] = useState(false);
  const { uploading, uploadFile, imageUrl } = useS3Upload();

  const handleBulkShiftUpload = async (file, fileType = "csv") => {
    setUploadingStatus(true);
    let payload;
    if (fileType === "json") {
      payload = JSON.parse(file);
    } else {
      const response = await uploadFile(file);

      const s3Link = response.key; // Adjust as per actual returned data

      payload = {
        fileType,
        bucketName: "CareCrew-storage-373c65a0164444-staging", // Adjust if this is dynamic
        fileKey: "public/" + s3Link, // Or however you get the path
      };

      // payload = {
      //   fileType: "csv",
      //   bucketName: "CareCrew-storage211042-staging",
      //   fileKey: "bulk shifts.csv",
      // };
    }
    const apiResponse = await createBulkShifts(payload);
    setUploadingStatus(false);
    return apiResponse;
  };

  return {
    uploadingStatus,
    handleBulkShiftUpload,
  };
}
