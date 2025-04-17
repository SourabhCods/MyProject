import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserSessionPersistence } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAYwmkF_nv4Xa2nhWyEG340z2jt1PPnCOo",
  authDomain: "meeshoo-7a0b8.firebaseapp.com",
  projectId: "meeshoo-7a0b8",
  storageBucket: "meeshoo-7a0b8.firebasestorage.app",
  messagingSenderId: "762746612460",
  appId: "1:762746612460:web:b31db94d137a145f7453c9",
  measurementId: "G-HLQPJGR701"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

setPersistence(auth, browserSessionPersistence)
  .then(() => {
    console.log("Session-based persistence enabled");
  })
  .catch((error) => {
    console.error("Failed to set persistence:", error);
  });

export { auth };