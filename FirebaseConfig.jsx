// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzDg98kjxgRo7_Hq3P27T4exVZm51Vrbo",
  authDomain: "wisespend-web.firebaseapp.com",
  projectId: "wisespend-web",
  storageBucket: "wisespend-web.firebasestorage.app",
  messagingSenderId: "92010350936",
  appId: "1:92010350936:web:5323980229703a16743d2d",
  measurementId: "G-4BSZ9CKTW5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
