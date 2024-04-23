import { userState,logout,deleteCurrentUser } from "../Services/global.js";

userState()

const cerrar=document.getElementById('logoutBtn')
const deleteAccountBtn = document.getElementById("DeletetBtn");


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

async function Dsesion(){
  const validar = deleteCurrentUser()
  const verificar = await validar

  .then((verificar) => {
      alert('Sesión eliminada')
      window.location.href="../index.html"
    }).catch((error) => {
      alert('Sesión no eliminada')
    });
}
deleteAccountBtn.addEventListener("click", deleteCurrentUser);

window.addEventListener('DOMContentLoaded',async()=>{
    cerrar.addEventListener('click',sesion)

      deleteAccountBtn.addEventListener('click',Dsesion)
})



