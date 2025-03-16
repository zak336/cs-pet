// Import auth functions from auth.js
import { registerUser, signInUser, signOutUser, checkAuthState, getCurrentUser } from './auth.js';

// DOM Elements
const loginSection = document.getElementById('loginSection');
const registerSection = document.getElementById('registerSection');
const startPage = document.getElementById('startPage');
const showLoginLink = document.getElementById('showLogin');
const showRegisterLink = document.getElementById('showRegister');
const loginButton = document.getElementById('loginButton');
const registerButton = document.getElementById('registerButton');
const logoutButton = document.getElementById('logoutButton');
const loginError = document.getElementById('loginError');
const registerError = document.getElementById('registerError');

showRegisterLink.addEventListener('click', () => {
    console.log('Register link clicked'); // Debugging
    registerSection.classList.remove('hidden');
    loginSection.classList.add('hidden');
    loginError.textContent = '';
});


// Show/Hide Auth Forms
showLoginLink.addEventListener('click', () => {
    registerSection.classList.add('hidden');
    loginSection.classList.remove('hidden');
    registerError.textContent = '';
});

showRegisterLink.addEventListener('click', () => {
    loginSection.classList.add('hidden');
    registerSection.classList.remove('hidden');
    loginError.textContent = '';
});

// Handle Login
loginButton.addEventListener('click', async () => {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Validate inputs
    if (!email || !password) {
        loginError.textContent = 'Please fill in all fields';
        return;
    }

    // Show loading state
    loginButton.disabled = true;
    loginButton.textContent = 'Logging in...';

    try {
        const result = await signInUser(email, password);

        if (result.success) {
            // Login successful - show start page
            document.getElementById('authContainer').classList.add('hidden');
            startPage.classList.remove('hidden');
        } else {
            // Show error message
            loginError.textContent = result.error;
        }
    } catch (error) {
        loginError.textContent = 'An error occurred. Please try again.';
        console.error('Login error:', error);
    }

    // Reset button state
    loginButton.disabled = false;
    loginButton.textContent = 'Login';
});

// Handle Registration
registerButton.addEventListener('click', async () => {
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Validate inputs
    if (!name || !email || !password || !confirmPassword) {
        registerError.textContent = 'Please fill in all fields';
        return;
    }

    if (password !== confirmPassword) {
        registerError.textContent = 'Passwords do not match';
        return;
    }

    if (password.length < 6) {
        registerError.textContent = 'Password must be at least 6 characters';
        return;
    }

    // Show loading state
    registerButton.disabled = true;
    registerButton.textContent = 'Creating account...';

    try {
        const result = await registerUser(name, email, password);

        if (result.success) {
            // Registration successful - show start page
            document.getElementById('authContainer').classList.add('hidden');
            startPage.classList.remove('hidden');
        } else {
            // Show error message
            registerError.textContent = result.error;
        }
    } catch (error) {
        registerError.textContent = 'An error occurred. Please try again.';
        console.error('Registration error:', error);
    }

    // Reset button state
    registerButton.disabled = false;
    registerButton.textContent = 'Register';
});

// Handle Logout
if (logoutButton) {
    logoutButton.addEventListener('click', async () => {
        await signOutUser();
        window.location.reload(); // Reload page to show login
    });
}

// Check Authentication State on Page Load
document.addEventListener('DOMContentLoaded', () => {
    checkAuthState((user) => {
        if (user) {
            // User is signed in
            document.getElementById('authContainer').classList.add('hidden');
            startPage.classList.remove('hidden');

            // Update UI with user name if available
            const userDisplayName = user.displayName || user.email.split('@')[0];
            const userNameElements = document.querySelectorAll('.user-name');
            userNameElements.forEach(el => {
                el.textContent = userNameElements;
            });
        } else {
            // No user is signed in
            document.getElementById('authContainer').classList.remove('hidden');
            startPage.classList.add('hidden');
        }
    });
});