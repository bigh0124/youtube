import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "react-admin-cf641.firebaseapp.com",
  projectId: "react-admin-cf641",
  storageBucket: "react-admin-cf641.appspot.com",
  messagingSenderId: "568396715783",
  appId: "1:568396715783:web:12fabb0d48a3f794f3d7a2",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);
