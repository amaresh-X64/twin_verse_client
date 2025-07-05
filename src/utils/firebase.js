// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2bx14Z6Re7XUEfyE4H9JS73b4b8Kba1Y",
  authDomain: "twinverse-dd89d.firebaseapp.com",
  databaseURL: "https://twinverse-dd89d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "twinverse-dd89d",
  storageBucket: "twinverse-dd89d.firebasestorage.app",
  messagingSenderId: "624774534428",
  appId: "1:624774534428:web:0862fc412cefec084116d9",
  measurementId: "G-XGD22FKWQ4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getDatabase(app);