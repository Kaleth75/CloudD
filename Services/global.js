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
    getDoc,
    updateDoc
} from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js';

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
const db = getFirestore(app);

const provider = new GoogleAuthProvider();
const Fprovider = new FacebookAuthProvider();

export const signInWithGoogle = () => 
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            console.log(user);
            window.location.href = './Templates/home.html';
        })
        .catch((error) => console.log(error));

export const signInWithFace = () => 
    signInWithPopup(auth, Fprovider)
        .then((result) => {
            const user = result.user;
            console.log(user);
            window.location.href = './Templates/home.html';
        })
        .catch((error) => console.log(error));

export const login_auth = (email, password) => 
    signInWithEmailAndPassword(auth, email, password);

export const getData = async (id) => 
    await getDoc(doc(db, "users", id));

export const getDataAsAdmin = async () => 
    await getDocs(query(collection(db, "users")));

export const deleteDocument = async (id) => 
    await deleteDoc(doc(db, "users", id));

export const deleteCurrentUser = async () => 
    auth.currentUser.delete();

export const logout = () => 
    signOut(auth);

export const updateData = async (name, apellido, fechaNacimiento, telefono, email, direccion, contraseña, id) => {
    const referen = doc(db, "users", id);
    const postData = {
        name, apellido, fechaNacimiento, telefono, email, direccion, contraseña
    };
    return updateDoc(referen, postData);
};

export const everification = () => 
    sendEmailVerification(auth.currentUser);

export const User_Register = (email, password) => 
    createUserWithEmailAndPassword(auth, email, password);

export const recovery = (email) => 
    sendPasswordResetEmail(auth, email);

export const AddData = async (id, cedula, first, last, born, direccion, celular, email, role) => 
    await setDoc(doc(collection(db, "users"), id), {
        id, cedula, first, last, born, direccion, celular, email, role
    });

export function userState() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            console.log(uid);
            getData(user.uid).then((e) => {
                const userData = document.getElementById("datos-de-usuario");
                const content = document.getElementById("contenido-de-la-pagina");
                const saveD =document.getElementById('guardarD')
                let data = e.data();
                let rol = data["role"];
                
                if (rol === "administrador") {
                    userData.innerHTML += `<br><button type="button" id="create">Crear Usuario</button>`;
                    document.getElementById("create").addEventListener("click", () => {
                        window.location.href = "./create.html";
                    });

                    getDataAsAdmin().then(async(userData) => {
                        let tableHTML = `
                            <h1>Usuarios Registrados</h1>
                            <table id="reg-users">
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Correo</th>
                                        <th>Eliminar</th>
                                        <th>Actualizar</th>
                                    </tr>
                                </thead>
                                <tbody>
                        `;

                        userData.forEach((doc) => {
                            let docData = doc.data();
                            tableHTML += `
                                <tr>
                                    <td>${docData["first"]}</td>
                                    <td>${docData["email"]}</td>
                                    <td><button type="button" class="borrar" data-id="${doc.id}">Eliminar</button></td>
                                    <td><button type="button" class="update" data-user-id="${doc.id}">update</button></td>
                                </tr>

                            `;

                        });
                        tableHTML += `</tbody></table>`;
                        content.innerHTML = tableHTML;
                        const exampleModal = document.getElementById("exampleModal");
                        if (exampleModal) {
                          exampleModal.addEventListener("show.bs.modal", async (event) => {
                            const button = event.relatedTarget;
                            
                        const iduser= button.getAttribute('data-user-id');
                        await getData(userId).then((d) => {
                            const userD = d.data();
                            userName.value = userD.fullName;
                            cc.value = userD.cc;
                            address.value = userD.address;
                            phone.value = userD.phone;
                            email.value = userD.email;
                            bornDate.value = userD.bornDate;
                            modalTitle.textContent = `Editar a ${userName.value}`;
          
                            guardarD.addEventListener("click", async () => {
                              await updateData(
                                userId,
                                userD.rol,
                                cc.value,
                                userName.value,
                                address.value,
                                phone.value,
                                email.value,
                                bornDate.value
                              )})})
                    });}
                        
                        
                        content.addEventListener("click", (e) => {
                            if (e.target.classList.contains("borrar")) {
                                const id = e.target.dataset.id;
                                deleteDocument(id).then(() => {
                                    const rowToRemove = content.querySelector(`[data-id="${id}"]`).closest("tr");
                                    rowToRemove.remove();
                                });
                            }

                            if (e.target.classList.contains("update")) {
                                const id = e.target.dataset.id;
                                // Lógica para actualizar el usuario
                                // Podrías redirigir a una página de actualización o abrir un modal con el formulario de actualización
                            }
                        });
                    });
                }
            });
        } else {
            window.location.href = "../index.html";
        }
    });
}
    