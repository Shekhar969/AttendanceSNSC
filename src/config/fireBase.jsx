import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { getAuth,GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: `${import.meta.env.apiHiddenKey}`,
  authDomain: "attendancedbtemp.firebaseapp.com",
  projectId: "attendancedbtemp",
  storageBucket: "attendancedbtemp.firebasestorage.app",
  messagingSenderId: "441916614169",
  appId: "1:441916614169:web:bfdce4d4557fcbb1dc6c88",
  measurementId: "G-X1W49W2VXK"
};
console.log('api: ',firebaseConfig.apiKey)
console.log('api imported: ',import.meta.env.apiHiddenKey)

export const googleProvider=new GoogleAuthProvider();
const app = initializeApp(firebaseConfig);
export const db =getFirestore(app);
export const auth =getAuth(app);