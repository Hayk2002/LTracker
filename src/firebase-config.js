import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase, set, ref, get, child, remove } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBeRmGNXSf5XULa5HtTgECk3_JPRcmGEBU",
    authDomain: "location-tracker-44f36.firebaseapp.com",
    projectId: "location-tracker-44f36",
    storageBucket: "location-tracker-44f36.firebasestorage.app",
    messagingSenderId: "756807056974",
    appId: "1:756807056974:web:ed655afc8eed206023cd1f",
    measurementId: "G-D14FKMKKWL"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase()
const firestore = getFirestore(app);
const auth = getAuth(app);

export { db, set, get, remove, child, ref, firestore, auth };
