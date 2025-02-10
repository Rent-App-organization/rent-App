// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlsJhvX6RoUAKg0X8eLoayIOdV09kN-lQ",
  authDomain: "rental-website-bb300.firebaseapp.com",
  databaseURL: "https://rental-website-bb300-default-rtdb.firebaseio.com",
  projectId: "rental-website-bb300",
  storageBucket: "rental-website-bb300.firebasestorage.app",
  messagingSenderId: "131803681871",
  appId: "1:131803681871:web:4043426aa5df028cca863a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
