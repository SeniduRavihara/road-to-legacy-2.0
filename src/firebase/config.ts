// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9tujOGGCWxNgeOVwLuf2cnzU2NAhTtq8",
  authDomain: "roadtolecacy.firebaseapp.com",
  projectId: "roadtolecacy",
  storageBucket: "roadtolecacy.firebasestorage.app",
  messagingSenderId: "158084955363",
  appId: "1:158084955363:web:f8e6c3308ceb5cb1d219d6",
  measurementId: "G-1TFMHVBS9J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
