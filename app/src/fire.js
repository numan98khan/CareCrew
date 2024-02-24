import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { saveTokenToDB } from "./apolloql/custom";

const firebaseConfig = {
  apiKey: "AIzaSyD1IEFxq3uvr-kNknN9S6Ped1vWM2cSG1w",
  authDomain: "instacare-fcm.firebaseapp.com",
  projectId: "instacare-fcm",
  storageBucket: "instacare-fcm.appspot.com",
  messagingSenderId: "937517099293",
  appId: "1:937517099293:web:f5c86b0be6be8ad17819f4",
};

// const app = initializeApp(firebaseConfig);
// const messaging = getMessaging(app);

// export const requestPermission = (userId) => {
//   // Pass the user ID if needed
//   console.log("Requesting User Permission......");
//   Notification.requestPermission().then((permission) => {
//     if (permission === "granted") {
//       console.log("Notification User Permission Granted.");
//       return getToken(messaging, {
//         vapidKey: `BJ08Sg9rL09goTFltHCQ-ZV6ITzzM6U85GrYiSacC2ufy-MI6yRstoFEiGJfBTVmVBx3o9NQ6N-EuMdXpFWpfrw`,
//       }) // replace with your vapidKey
//         .then((currentToken) => {
//           if (currentToken) {
//             console.log("Client Token: ", currentToken);
//             saveTokenToDB(userId, currentToken); // Save the token to Amplify
//           } else {
//             console.log("Failed to generate the app registration token.");
//           }
//         })
//         .catch((err) => {
//           console.log(
//             "An error occurred when requesting to receive the token.",
//             err
//           );
//         });
//     } else {
//       console.log("User Permission Denied.");
//     }
//   });
// };

// export const onMessageListener = () =>
//   new Promise((resolve) => {
//     onMessage(messaging, (payload) => {
//       resolve(payload);
//     });
//   });
