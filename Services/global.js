import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBhuV5J_pmewh3nwXHfC_nYV495-WqUpnE",
  authDomain: "desam-9d678.firebaseapp.com",
  projectId: "desam-9d678",
  storageBucket: "desam-9d678.appspot.com",
  messagingSenderId: "281893894591",
  appId: "1:281893894591:web:7096d710e515d34fb4c90a",
  measurementId: "G-BRWEC40HLF",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const provider = new GoogleAuthProvider();
const Fprovider = new FacebookAuthProvider();

export const signInWithGoogle = () =>
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;
      console.log(user);
      window.location.href = './Templates/home.html';
    })
    .catch((error) => {
      console.log(error);
    });

export const signInWithFace = () =>
  signInWithPopup(auth, Fprovider)
    .then((result) => {
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const user = result.user;
      console.log(user);
      window.location.href = './Templates/home.html';
    })
    .catch((error) => {
      console.log(error);
    });

export const login_auth = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const deleteCurrentUser = async () => auth.currentUser.delete();
export const logout = () => signOut(auth);

export const everification = () => sendEmailVerification(auth.currentUser);

export const User_Register = async (email, password, Role) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Agregar el rol del usuario en Firestore
}

export const recovery = (email) => sendPasswordResetEmail(auth, email);

export async function getUserRole() {
  const user = auth.currentUser;
  if (user) {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().role;
    } else {
      throw new Error('No se encontró el documento del usuario');
    }
  } else {
    throw new Error('No hay un usuario autenticado');
  }
}

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

// Servicios de Firestore
export const AddData = async (Cedula, First, last, born, Direccion, Celular, Role) =>
  await addDoc(collection(db, "users"), {
    Cedula,
    First,
    last,
    born,
    Direccion,
    Celular,
    Role
  });
  
  export const readusers=()=>
    getDocs(collection(db, "users"));
  