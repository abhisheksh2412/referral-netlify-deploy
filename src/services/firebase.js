// services/firebase.js

import { initializeApp, getApps, getApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBWj0NQGIbMYrBAKSmQUz9SdZqUuxMQESQ",
  authDomain: "referralsapp-e6a7c.firebaseapp.com",
  projectId: "referralsapp-e6a7c",
  storageBucket: "referralsapp-e6a7c.appspot.com",
  messagingSenderId: "543599072628",
  appId: "1:543599072628:web:33e7d17c08f91b899ec821",
  measurementId: "G-T5QTPEEH2D",
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
