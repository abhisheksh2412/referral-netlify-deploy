"use client";
import { useEffect, useState } from "react";
import { getMessaging, getToken } from "firebase/messaging";
import { app as firebaseApp } from "@/services/firebase";

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
            const vapidKey =
              "BEVTVVkHrR0qEOI_o3hgbuFc91hnZym-luCZSdkNcaS73hUDXX26KgtBErQWJgObKxdDcAf5MFwUOXjWn8Dyk2g";

            const currentToken = await getToken(messaging, { vapidKey });
            if (currentToken) {
              console.log("FCM Token:", currentToken);
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
