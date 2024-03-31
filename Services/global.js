
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
import { GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBhuV5J_pmewh3nwXHfC_nYV495-WqUpnE",
    authDomain: "desam-9d678.firebaseapp.com",
    projectId: "desam-9d678",
    storageBucket: "desam-9d678.appspot.com",
    messagingSenderId: "281893894591",
    appId: "1:281893894591:web:7096d710e515d34fb4c90a",
    measurementId: "G-BRWEC40HLF"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => signInWithPopup(auth, provider)
    .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        console.log(user);
        window.location.href = './Templates/home.html';
    })
    .catch((error) => {
        console.log(error);
    });



export const login_auth = (email, password) => signInWithEmailAndPassword(auth, email, password);

export const logout = () => signOut(auth);

export function userState() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            console.log(uid);
        } else {
            window.location.href = "../index.html";
        }
    });
}
