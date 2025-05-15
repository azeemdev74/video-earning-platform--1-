// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore}  from "firebase/firestore";
import { getApps, getApp } from "firebase/app";
import { isSupported } from "firebase/analytics";

import {getAuth} from "firebase/auth"
// import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBMQfokFCKRx1HfqxyWprxQf6uuGZW6T0g",
  authDomain: "rewards-hub-dollor.firebaseapp.com",
  projectId: "rewards-hub-dollor",
  storageBucket: "rewards-hub-dollor.firebasestorage.app",
  messagingSenderId: "47112314002",
  appId: "1:47112314002:web:ab86686b85a7ae6109da4b",
  measurementId: "G-KQE6GVG95X"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db=getFirestore(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
let analytics;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { db, auth, firestore, app,analytics };

