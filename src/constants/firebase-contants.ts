import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN_KEY,
    projectId: process.env.REACT_APP_PROJECT_ID_KEY,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET_KEY,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID_KEY,
    appId: process.env.REACT_APP_APP_ID_KEY,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID_KEY,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
