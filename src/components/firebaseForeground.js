"use client";

import { useEffect } from "react";
import { getMessaging, onMessage } from "firebase/messaging";
import { app as firebaseApp } from "@/services/firebase";
import useFcmToken from "@/hooks/useFCMToken";

export default function FcmTokenClientComponent() {
  const { fcmToken, notificationPermissionStatus } = useFcmToken();

  useEffect(() => {
    // Check if running in browser environment
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      if (notificationPermissionStatus === "granted") {
        const messaging = getMessaging(firebaseApp);

        const unsubscribe = onMessage(messaging, (payload) => {
          try {
            console.log("Foreground push notification received:", payload);
          } catch (error) {
            console.error("Error handling foreground message:", error);
          }
        });

        // Cleanup on component unmount or if dependencies change
        return () => {
          unsubscribe();
        };
      }
    }
  }, [notificationPermissionStatus]);

  return null; // This component is used to manage side effects, not UI
}
