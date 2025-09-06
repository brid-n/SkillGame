// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 🔑 Thay config này bằng thông tin của bạn trên Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyA2AzOlzenfelZbwtIqVwwsEU-su5YCMf4",
  authDomain: "skillgame-3e268.firebaseapp.com",
  projectId: "skillgame-3e268",
  storageBucket: "skillgame-3e268.firebasestorage.app",
  messagingSenderId: "816229877978",
  appId: "1:816229877978:web:04c689fd1fa86763bcfde3",
  measurementId: "G-K08CFMZNGC"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
