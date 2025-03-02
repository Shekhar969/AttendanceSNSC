import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { getAuth,GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDfJB6bhjiNzgb1yISZADx50xybpOVJu-8",
  authDomain: "attendancedbtemp.firebaseapp.com",
  projectId: "attendancedbtemp",
  storageBucket: "attendancedbtemp.firebasestorage.app",
  messagingSenderId: "441916614169",
  appId: "1:441916614169:web:bfdce4d4557fcbb1dc6c88",
  measurementId: "G-X1W49W2VXK"
};

export const googleProvider=new GoogleAuthProvider();
const app = initializeApp(firebaseConfig);
export const db =getFirestore(app);
export const auth =getAuth(app);