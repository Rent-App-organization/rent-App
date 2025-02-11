import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBlsJhvX6RoUAKg0X8eLoayIOdV09kN-lQ",
  authDomain: "rental-website-bb300.firebaseapp.com",
  databaseURL: "https://rental-website-bb300-default-rtdb.firebaseio.com",
  projectId: "rental-website-bb300",
  storageBucket: "rental-website-bb300.appspot.com",
  messagingSenderId: "131803681871",
  appId: "1:131803681871:web:4043426aa5df028cca863a",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const database = getDatabase(app);

export { auth, googleProvider, database };
