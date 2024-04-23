import { login_auth, signInWithFace, signInWithGoogle } from "./global.js";

const evento = document.getElementById("login_btn");
const loginGoogle = document.getElementById("googleLogin");
const loginWithFacebook = document.getElementById("faceLogin");

export async function validar() {
    const email = document.getElementById('usuario').value;
    const password = document.getElementById('password').value;

    if (email.trim() === '' || password.trim() === '') {
        alert("Debe llenar los campos de usuario y el de contraseña.");
        return;
    }

    try {
        const verification = await login_auth(email, password);

        if (verification != null) {
            alert("Usuario registrado " );
            window.location.href = "Templates/home.html";
        } else {
            console.log("Sesión " + email + " no valida");
            alert("Error de usuario, verifique usuario y/o contraseña.");
        }
    } catch (error) {
        console.error("Error al autenticar:", error);
        alert("Error de usuario, verifique usuario y/o contraseña.");
    }
}

window.addEventListener('DOMContentLoaded', () => {
    evento.addEventListener('click', validar);
    loginGoogle.addEventListener('click', signInWithGoogle);
    loginWithFacebook.addEventListener('click', signInWithFace);
});

