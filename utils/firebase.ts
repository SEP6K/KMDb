import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB3EeQtVEIrfGx5ZsztrXPxmx6hMlZ0Ubk",
  authDomain: "sep6-370110.firebaseapp.com",
  projectId: "sep6-370110",
  storageBucket: "sep6-370110.appspot.com",
  messagingSenderId: "363946906560",
  appId: "1:363946906560:web:cfd9314f8128d9f006ae25",
  measurementId: "G-13Y8NQNJCK",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
