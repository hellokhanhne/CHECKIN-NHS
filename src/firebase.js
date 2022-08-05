import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDKPUk5Uwj4u1GTzMFC7J-fmzccIg5Od4k",
  authDomain: "daihoivi-9e7ec.firebaseapp.com",
  databaseURL:
    "https://daihoivi-9e7ec-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "daihoivi-9e7ec",
  storageBucket: "daihoivi-9e7ec.appspot.com",
  messagingSenderId: "38111892873",
  appId: "1:38111892873:web:abf809d39853e7249bbd58",
  measurementId: "G-4KR2V2SN1C",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = initializeFirestore(app, { experimentalForceLongPolling: true });

export { db, auth };
