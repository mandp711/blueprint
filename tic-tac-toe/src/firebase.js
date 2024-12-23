// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDu3OB9RZHUWC8apFbxDO_5dGErO8TJGd4",
  authDomain: "tictactoe-39e27.firebaseapp.com",
  projectId: "tictactoe-39e27",
  storageBucket: "tictactoe-39e27.firebasestorage.app",
  messagingSenderId: "128784915189",
  appId: "1:128784915189:web:1e66affbc8b8144b5b43bc",
  measurementId: "G-GEPQFZCPD8"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };