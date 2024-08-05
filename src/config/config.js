export const config = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL,
  TOKEN_KEY: process.env.NEXT_PUBLIC_TOKEN_KEY,
  USER_KEY: process.env.NEXT_PUBLIC_USER_KEY,
  USER_ROLE: "USER",
  IMAGE_URL_PATH: process.env.NEXT_PUBLIC_IMAGE_URL_PATH,
};

export const firebaseCred = {
  apikey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
  vapiId: process.env.NEXT_PUBLIC_VAPID,
};
