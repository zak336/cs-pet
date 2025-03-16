// Load Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCFFjchFALF_oc1AwGZTLzn1XGAgHZcFp8",
    authDomain: "cg-pet.firebaseapp.com",
    databaseURL: "https://cg-pet-default-rtdb.firebaseio.com",
    projectId: "cg-pet",
    storageBucket: "cg-pet.firebasestorage.app",
    messagingSenderId: "63971462525",
    appId: "1:63971462525:web:a51000620b59c092c25014",
    measurementId: "G-6D8X29HVMH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const storage = getStorage(app);