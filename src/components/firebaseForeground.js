"use client";

import { useEffect } from "react";
import { getMessaging, onMessage } from "firebase/messaging";
import { app as firebaseApp } from "@/services/firebase";
import useFcmToken from "@/hooks/useFCMToken";
import toast from "react-hot-toast";

export default function FcmTokenClientComponent() {
  const { fcmToken, notificationPermissionStatus } = useFcmToken();

  useEffect(() => {
    // Check if running in browser environment
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      if (notificationPermissionStatus === "granted") {
        const messaging = getMessaging(firebaseApp);

        const unsubscribe = onMessage(messaging, (payload) => {
          try {
            toast.custom(
              (t) => (
                <div
                  className={`${
                    t.visible ? "animate-enter" : "animate-leave"
                  } max-w-md w-full bg-[#0e0a38] shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                >
                  <div className="flex-1 w-0 p-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 pt-0.5">
                        {payload.data?.image && (
                          <img
                            className="h-10 w-10 rounded-md"
                            src={payload.data?.image}
                            alt="notification_image"
                          />
                        )}
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-blush-red">
                          {payload.data?.title}
                        </p>
                        <p className="mt-1 text-sm text-white">
                          {payload.data?.body}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ),
              { position: "bottom-right" }
            );
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
