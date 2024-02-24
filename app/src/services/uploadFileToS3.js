import { useState } from "react";
import { Storage } from "@aws-amplify/storage";
import { v4 as uuidv4 } from "uuid";

export function useS3Upload() {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  async function uploadFile(file) {
    const uniqueName = `${uuidv4()}_${Date.now()}_${file.name}`; // new unique file name

    try {
      setUploading(true);

      const result = await Storage.put(uniqueName, file, {
        level: "public", // access level: 'public', 'protected' or 'private'
        contentType: file.type,
        progressCallback(progress) {
          console.log(
            `Uploaded: ${Math.round((progress.loaded / progress.total) * 100)}%`
          );
        },
      });

      console.log("Successfully uploaded file!", result);

      // After the file has been uploaded, get the URL
      const url = await Storage.get(result.key, { level: "public" });

      setImageUrl(url); // Save the URL to the state
      return { url, key: result.key };
    } catch (error) {
      console.error("Error uploading file: ", error);
    } finally {
      setUploading(false);
    }
  }

  return {
    uploading,
    uploadFile,
    imageUrl,
  };
}
