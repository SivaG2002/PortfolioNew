// firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBRsVXRsWOARCWOSNb3MDVvprlIJDweVY4",
  authDomain: "project-97481.firebaseapp.com",
  databaseURL: "https://project-97481-default-rtdb.firebaseio.com",
  projectId: "project-97481",
  storageBucket: "project-97481.firebasestorage.app",
  messagingSenderId: "543727561548",
  appId: "1:543727561548:web:b060f78e607353e1467de9",
  measurementId: "G-WQ0HH35XTB"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

export { database };