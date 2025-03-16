// Firebase Authentication Setup
import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

// Replace with your Firebase config
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

// Register a new user
export const registerUser = async (name, email, password) => {
    try {
        // Create user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Store additional user data in Realtime Database
        await set(ref(database, 'users/' + user.uid), {
            name: name,
            email: email,
            createdAt: new Date().toISOString(),
            tests: {}
        });

        return { success: true, user };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// Sign in existing user
export const signInUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return { success: true, user: userCredential.user };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// Sign out user
export const signOutUser = async () => {
    try {
        await signOut(auth);
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// Check authentication state
export const checkAuthState = (callback) => {
    return onAuthStateChanged(auth, (user) => {
        callback(user);
    });
};

// Get current user
export const getCurrentUser = () => {
    return auth.currentUser;
};