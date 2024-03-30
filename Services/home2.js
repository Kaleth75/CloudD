import { userState,logout } from "../Services/global.js";

userState()

const cerrar=document.getElementById('logoutBtn')

async function sesion(){
    const validar = logout()
    const verificar = await validar

    .then((verificar) => {
        alert('Sesión cerrada')
        window.location.href="../index.html"
      }).catch((error) => {
        alert('Sesión no cerrada')
      });
}

window.addEventListener('DOMContentLoaded',async()=>{
    cerrar.addEventListener('click',sesion)
})