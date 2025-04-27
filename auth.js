// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

// Firebase config – replace with your project config
const firebaseConfig = {
  apiKey: "AIzaSyBoBQa8iTHZXE9nFqU9LNXXB5udoA_7ieU",
  authDomain: "communitycraft.firebaseapp.com",
  projectId: "communitycraft",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "communitycraft"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// DOM elements
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const registerBtn = document.getElementById("registerBtn");
const loginBtn = document.getElementById("loginBtn");
const message = document.getElementById("message");

// Register event
registerBtn.addEventListener("click", () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      message.innerText = `Registered: ${userCredential.user.email}`;
    })
    .catch(error => {
      message.innerText = `Error: ${error.message}`;
      console.error(error);
    });
});

// Login event
loginBtn.addEventListener("click", () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      message.innerText = `Logged in: ${userCredential.user.email}`;
    })
    .catch(error => {
      message.innerText = `Error: ${error.message}`;
      console.error(error);
    });
});
