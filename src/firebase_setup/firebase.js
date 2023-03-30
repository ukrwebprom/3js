// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD5VcWVbQmj9gQ7vYtIjNRMD8Nc-LrWg5A",
    authDomain: "jsf-e34d0.firebaseapp.com",
    projectId: "jsf-e34d0",
    storageBucket: "jsf-e34d0.appspot.com",
    messagingSenderId: "836771138317",
    appId: "1:836771138317:web:1a1dd17e0664b05852be44",
    measurementId: "G-G0VE5ZN2ET"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
auth.languageCode = 'ua';
export const db = getFirestore(app);
const provider = new GoogleAuthProvider();
/* provider.addScope('https://www.googleapis.com/auth/contacts.readonly'); */
export const GoogleSignIn = async () => {
  const result = await signInWithPopup(auth, provider)
  console.log(result);
    return result.user;
}