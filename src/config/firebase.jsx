import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBspIC1HTqW4UzZTq_v7pXk5U3pcVKGtN4",
  authDomain: "pass-8e530.firebaseapp.com",
  projectId: "pass-8e530",
  storageBucket: "pass-8e530.appspot.com",
  messagingSenderId: "595679535469",
  appId: "1:595679535469:web:77ec2decb58af34b93ba64",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
