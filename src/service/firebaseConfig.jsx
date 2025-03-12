// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBFU6QIGajBl_mzshUC5i8CNyYjXScwLvg",
    authDomain: "go-buddy-ec654.firebaseapp.com",
    projectId: "go-buddy-ec654",
    storageBucket: "go-buddy-ec654.firebasestorage.app",
    messagingSenderId: "809407504436",
    appId: "1:809407504436:web:3e22c508ff063ee8256a61",
    measurementId: "G-N9E6SBQ21W"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);