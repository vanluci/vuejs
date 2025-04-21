import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA7YbpbLmYTGjTFHH0x9Wis1sucjB238Vk",
  authDomain: "vue3-1d441.firebaseapp.com",
  projectId: "vue3-1d441",
  storageBucket: "vue3-1d441.firebasestorage.app",
  messagingSenderId: "124584922704",
  appId: "1:124584922704:web:7ca5c7e70c124e01e80b55",
  measurementId: "G-J1F7BLD31G"
};




const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut, onAuthStateChanged };
