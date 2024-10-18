importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

//the Firebase config object
const firebaseConfig = {
  apiKey: "AIzaSyD1IEFxq3uvr-kNknN9S6Ped1vWM2cSG1w",
  authDomain: "carecrew-fcm.firebaseapp.com",
  projectId: "carecrew-fcm",
  storageBucket: "carecrew-fcm.appspot.com",
  messagingSenderId: "937517099293",
  appId: "1:937517099293:web:f5c86b0be6be8ad17819f4",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  // console.log("Received background message ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
