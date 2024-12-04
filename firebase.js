// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVvuaLHM251gUqgNElxDALG9WLOsFfoqI",
  authDomain: "tictactoe-136a1.firebaseapp.com",
  projectId: "tictactoe-136a1",
  storageBucket: "tictactoe-136a1.firebasestorage.app",
  messagingSenderId: "238048267309",
  appId: "1:238048267309:web:76b7422aff5484b820bca4",
  measurementId: "G-W1CDQT1TC3"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };