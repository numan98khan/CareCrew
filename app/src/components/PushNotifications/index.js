import React, { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
// import { requestPermission, onMessageListener } from "../../fire";

function Notification() {
  const [notification, setNotification] = useState({ title: "", body: "" });

  return (
    <div>
      <Toaster />
    </div>
  );
}
export default Notification;
