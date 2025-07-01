// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDq11lP5EkY0-BoUzoxGwFsfcpyFB6HEsQ",
  authDomain: "leafylife-green.firebaseapp.com",
  projectId: "leafylife-green",
  storageBucket: "leafylife-green.firebasestorage.app",
  messagingSenderId: "276167142817",
  appId: "1:276167142817:web:29fa8ca84b124720902fe0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;