import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAZAcvjrUnDA2pHX7jFGUozmO5lQaXXSyk",
  authDomain: "petadoption-be0f5.firebaseapp.com",
  projectId: "petadoption-be0f5",
  storageBucket: "petadoption-be0f5.appspot.com",
  messagingSenderId: "912447616433",
  appId: "1:912447616433:web:fe7e9dc5755a487ee7f990",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider(); // ✅ ONLY ADD
