import { initializeApp } from "firebase/app";
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

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
