import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
//import { ,  } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";


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
    FacebookAuthProvider
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

import {
    getFirestore,
    collection,
    doc,
    setDoc,
    deleteDoc,
    getDocs,
    query,
    getDoc

} from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js'


const firebaseConfig = {
    apiKey: "AIzaSyBhuV5J_pmewh3nwXHfC_nYV495-WqUpnE",
    authDomain: "desam-9d678.firebaseapp.com",
    projectId: "desam-9d678",
    storageBucket: "desam-9d678.appspot.com",
    messagingSenderId: "281893894591",
    appId: "1:281893894591:web:7096d710e515d34fb4c90a",
    measurementId: "G-BRWEC40HLF"
};

const Fprovider = new FacebookAuthProvider();

export const loginWithFacebook = async (email, password) => createUserWithEmailAndPassword(auth, email, password);

export const signInWithFace = () => signInWithPopup(auth, Fprovider)
    .then((result) => {
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const user = result.user;
        console.log(user);
        window.location.href = './Templates/home.html';
    })
    .catch((error) => {
        console.log(error);
    });


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

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



export const login_auth = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

export const getData = async (id) => await getDoc(doc(db, "users", id));
export const getDataAsAdmin = async () => await getDocs(query(collection(db, "users")));
export const deleteDocument = async (id) => await deleteDoc(doc(db, "users", id));
export const deleteCurrentUser = async () => auth.currentUser.delete();
export const logout = () => signOut(auth);

//funcion hace registro usuario llegar a correo si el usuario esta registrado
export const everification = () =>
    sendEmailVerification(auth.currentUser)

export const User_Register = (email, password) => createUserWithEmailAndPassword(auth, email, password)

export const recovery = (email) =>
    sendPasswordResetEmail(auth, email)





export function userState() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            console.log(uid);
            getData(user.uid)
                .then((e) => {

                    const userData = document.getElementById("datos-de-usuario");
                    const content = document.getElementById("contenido-de-la-pagina");

                    let data = e.data();
                    let rol = data["role"];
                    if (rol === "administrador") {
                        userData.innerHTML += `<br><button type="button"  id="create">Crear Usuario</button>`;
                        const createAccountBtn =
                            document.getElementById("create");
                        createAccountBtn.addEventListener("click", () => {
                            window.location.href = "./create.html";
                        });
                        getDataAsAdmin().then((userData) => {
                            let tableHTML = `
              <h1>Usuarios Registrados</h1>
              <table id="reg-users">
                <tr>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th></th>
                </tr>
            `;
                            userData.forEach((doc) => {
                                let docData = doc.data();
                                console.log(docData);
                                tableHTML += `
                <tr>
                  <td>${docData["first"]}</td>
                  <td>${docData["email"]}</td>
                  <td><button type="button" class="borrar" data-id="${docData["id"]}">Eliminar</button></td>
                </tr>`;
                            });
                            tableHTML += `</table>`;
                            content.innerHTML += tableHTML;
                            
                        });
                        content.addEventListener("click", (e) => {
                            if (e.target.classList.contains("borrar")) {
                                const id = e.target.dataset.id;
                                deleteDocument(id).then(() => {
                                  const rowToRemove = content
                                    .querySelector(`[data-id="${id}"]`)
                                    .closest("tr");
                                  rowToRemove.remove();
                                });
                            }
                        })
                    }
                })
        } else {
            window.location.href = "../index.html";
        }
    });
}

//Servicios de firestore

export const AddData = async (id, cedula, first, last, born, direccion, celular, email, role) =>
    await setDoc(doc(collection(db, "users"), id), {
        id, cedula, first, last, born, direccion, celular, email, role
    });

