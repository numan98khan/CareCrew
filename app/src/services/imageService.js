import { Storage } from "aws-amplify";

const CACHE_PREFIX = "image-";

// export const getImageFromCache = (imgSrc) => {
//   return localStorage.getItem(`${CACHE_PREFIX}${imgSrc}`);
// };

// export const setImageToCache = (imgSrc, imageUrl) => {
//   try {
//     localStorage.setItem(`${CACHE_PREFIX}${imgSrc}`, imageUrl);
//   } catch (e) {
//     if (e.name === "QuotaExceededError") {
//       // Clear the entire localStorage for the domain
//       localStorage.clear();

//       // Optionally, try to set the item again after clearing
//       try {
//         localStorage.setItem(`${CACHE_PREFIX}${imgSrc}`, imageUrl);
//       } catch (secondError) {
//         console.error(
//           "Error setting image to cache after clearing localStorage:",
//           secondError
//         );
//       }
//     }
//   }
// };

// export const getImageFromCache = (imgSrc) => {
//   const cache = JSON.parse(localStorage.getItem(`${CACHE_PREFIX}${imgSrc}`));
//   if (cache) {
//     const currentTime = new Date().getTime();
//     const elapsedTime = currentTime - cache.timestamp;
//     if (elapsedTime < 15 * 60 * 1000) {
//       // 15 minutes in milliseconds
//       return cache.url;
//     }
//   }
//   return null;
// };

export const getImageFromCache = (imgSrc) => {
  const cacheString = localStorage.getItem(`${CACHE_PREFIX}${imgSrc}`);

  if (!cacheString) {
    return null;
  }

  // Check if the stored data is a JSON object
  try {
    const cache = JSON.parse(cacheString);

    if (cache && typeof cache === "object") {
      const currentTime = new Date().getTime();
      const elapsedTime = currentTime - cache.timestamp;

      if (elapsedTime < 15 * 60 * 1000) {
        // 15 minutes in milliseconds
        return cache.url;
      }
    }
  } catch (e) {
    // Existing data is not JSON, treat as string
    return cacheString;
  }

  return null;
};

// export const setImageToCache = (imgSrc, imageUrl) => {
//   const timestamp = new Date().getTime();
//   localStorage.setItem(
//     `${CACHE_PREFIX}${imgSrc}`,
//     JSON.stringify({ url: imageUrl, timestamp })
//   );
// };

export const setImageToCache = (imgSrc, imageUrl) => {
  const timestamp = new Date().getTime();
  const cacheData = JSON.stringify({ url: imageUrl, timestamp });
  localStorage.setItem(`${CACHE_PREFIX}${imgSrc}`, cacheData);
};

export const fetchImageFromStorage = async (imgSrc) => {
  return null;
  // try {
  //   // Get the signed URL for the image stored at the public level
  //   const signedUrl = await Storage.get(imgSrc, { level: "public" });

  //   // Try to fetch the image using the signed URL
  //   const response = await fetch(signedUrl);

  //   if (response.status === 404) {
  //     // console.error("Image not found in S3:", imgSrc);
  //     return null;
  //   }

  //   return signedUrl;
  // } catch (error) {
  //   console.error("Error fetching image from storage:", error);
  //   throw error;
  // }
};

// export const retrieveImage = async (imgSrc) => {
//   // Check cache first
//   const cachedImage = getImageFromCache(imgSrc);

//   if (cachedImage) {
//     return cachedImage;
//   }

//   // If not in cache, fetch from storage
//   const image = await fetchImageFromStorage(imgSrc);

//   // // Save to cache for future use
//   // setImageToCache(imgSrc, image);

//   // Save to cache for future use only if the image is not null
//   if (image) {
//     setImageToCache(imgSrc, image);
//   }

//   return image;
// };

export const retrieveImage = async (imgSrc) => {
  let cachedImage = getImageFromCache(imgSrc);

  // Refresh the URL if it's expired
  if (!cachedImage) {
    cachedImage = await fetchImageFromStorage(imgSrc);
    if (cachedImage) {
      setImageToCache(imgSrc, cachedImage);
    }
  }

  return cachedImage;
};
