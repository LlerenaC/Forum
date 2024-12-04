import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtdJxga4pXEUJDOgeXs1qLMXqmrIIAP7k",
  authDomain: "final-project-bbe82.firebaseapp.com",
  projectId: "final-project-bbe82",
  storageBucket: "final-project-bbe82.firebasestorage.app",
  messagingSenderId: "16188364826",
  appId: "1:16188364826:web:d2ca78bab348e8d2cd19a3",
  measurementId: "G-R4R0EPR8P4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
export default app;