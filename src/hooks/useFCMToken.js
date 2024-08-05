"use client";
import { useEffect, useState } from "react";
import { getMessaging, getToken } from "firebase/messaging";
import { app as firebaseApp } from "@/services/firebase";
import { firebaseCred } from "@/config/config";

const useFcmToken = () => {
  const [fcmToken, setFcmToken] = useState("");
  const [notificationPermissionStatus, setNotificationPermissionStatus] =
    useState("");

  useEffect(() => {
    const retrieveToken = async () => {
      try {
        if (typeof window !== "undefined" && "serviceWorker" in navigator) {
          const messaging = getMessaging(firebaseApp);

          // Request notification permission from the user
          const permission = await Notification.requestPermission();
          setNotificationPermissionStatus(permission);

          if (permission === "granted") {
            // Replace with your Firebase project's VAPID key
            const vapidKey = firebaseCred.vapiId;

            const currentToken = await getToken(messaging, { vapidKey });
            if (currentToken) {
              setFcmToken(currentToken);
            } else {
              console.log(
                "No registration token available. Request permission to generate one."
              );
            }
          } else {
            console.log("Notification permission not granted.");
          }
        }
      } catch (error) {
        console.error("Error retrieving token:", error);
      }
    };

    retrieveToken();
  }, []);

  return { fcmToken, notificationPermissionStatus };
};

export default useFcmToken;
