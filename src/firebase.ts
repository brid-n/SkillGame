import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
