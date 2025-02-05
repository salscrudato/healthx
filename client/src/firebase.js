// client/src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlGTt5myR4_UT1sYzhiTR2tedxMT3apxk",
  authDomain: "healthx-test-prod.firebaseapp.com",
  projectId: "healthx-test-prod",
  storageBucket: "healthx-test-prod.firebasestorage.app",
  messagingSenderId: "340098693083",
  appId: "1:340098693083:web:8355fd18f296bd5d3f19fe",
  measurementId: "G-4YSYSSW3GN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export DB + Storage references for use in other files
export const db = getFirestore(app);
export const storage = getStorage(app);