import React, { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
// import { requestPermission, onMessageListener } from "../../fire";

function Notification() {
  const [notification, setNotification] = useState({ title: "", body: "" });
  // useEffect(() => {
  //   requestPermission();
  //   const unsubscribe = onMessageListener().then((payload) => {
  //     setNotification({
  //       title: payload?.notification?.title,
  //       body: payload?.notification?.body,
  //     });
  //     toast.success(
  //       `${payload?.notification?.title}: ${payload?.notification?.body}`,
  //       {
  //         duration: 5000,
  //         position: "top-right", //section of the browser page
  //       }
  //     );
  //   });
  //   return () => {
  //     unsubscribe.catch((err) => console.log("failed: ", err));
  //   };
  // }, []);
  return (
    <div>
      <Toaster />
    </div>
  );
}
export default Notification;
