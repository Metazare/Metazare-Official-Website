import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD_4yZWIAGj-Ydpubxh4Q5eNhQ9uRUx4SI",
  authDomain: "dev-metazare-7313c.firebaseapp.com",
  projectId: "dev-metazare-7313c",
  storageBucket: "dev-metazare-7313c.appspot.com",
  messagingSenderId: "467800140191",
  appId: "1:467800140191:web:608c909986d29a4d14f5aa",
  measurementId: "G-KCF4DSR5Q8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider

