// services/firebase.js

import { firebaseCred } from "@/config/config";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: firebaseCred.apikey,
  authDomain: firebaseCred.authDomain,
  projectId: firebaseCred.projectId,
  storageBucket: firebaseCred.storageBucket,
  messagingSenderId: firebaseCred.messagingSenderId,
  appId: firebaseCred.appId,
  measurementId: firebaseCred.measurementId,
};

let app;
let messaging;

if (typeof window !== "undefined") {
  // Initialize Firebase only if it hasn't been initialized yet
  if (!getApps().length) {
    try {
      app = initializeApp(firebaseConfig);
    } catch (error) {
      console.error("Firebase initialization error:", error);
    }
  } else {
    app = getApp();
  }

  try {
    messaging = getMessaging(app);
  } catch (error) {
    console.error("Error initializing Firebase Messaging:", error);
  }
}

export { app, messaging };
