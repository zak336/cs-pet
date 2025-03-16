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
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
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