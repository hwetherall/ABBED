// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_esP2PA2F3Tebm8bavyH9oyep4uF2BNU",
  authDomain: "abbed-95a7f.firebaseapp.com",
  projectId: "abbed-95a7f",
  storageBucket: "abbed-95a7f.firebasestorage.app",
  messagingSenderId: "50348721861",
  appId: "1:50348721861:web:270391a9bd821fb1d412ac",
  measurementId: "G-Q9K3Q5W836"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);