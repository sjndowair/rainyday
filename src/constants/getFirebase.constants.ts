import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAkJuqvbgqBaWXQEzLoBYk0ourhP7kxyFY",
  authDomain: "rainyday-app-location.firebaseapp.com",
  projectId: "rainyday-app-location",
  storageBucket: "rainyday-app-location.appspot.com",
  messagingSenderId: "249772301176",
  appId: "1:249772301176:web:442616a7f30bb50357c68d",
  measurementId: "G-6PP5MY25FG",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
