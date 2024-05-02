import firebase from "firebase/app";
import "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBkaM2TFms5sa_Yy8lu1LBgZI7aDO-1ccM",
  authDomain: "healthandpshyciatry.firebaseapp.com",
  projectId: "healthandpshyciatry",
  storageBucket: "healthandpshyciatry.appspot.com",
  messagingSenderId: "164476534402",
  appId: "1:164476534402:web:c43951cfa72f8fa5663e9b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, app };
