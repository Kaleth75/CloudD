import { userState, logout, deleteCurrentUser, getUserRole } from "../Services/global.js";

userState();

const cerrar = document.getElementById('logoutBtn');
const deleteAccountBtn = document.getElementById("DeletetBtn");

async function sesion() {
  try {
    await logout();
    alert('Sesión cerrada');
    window.location.href = "../index.html";
  } catch (error) {
    alert('Sesión no cerrada');
  }
}

async function Dsesion() {
  try {
    await deleteCurrentUser();
    alert('Sesión eliminada');
    window.location.href = "../index.html";
  } catch (error) {
    alert('Sesión no eliminada');
  }
}



deleteAccountBtn.addEventListener("click", Dsesion);

async function checkUserRoleAndRedirect() {
  try {
    const role = await getUserRole();
    if (role === 'admin') {
      window.location.href = 'admin.html';
    } else {
      window.location.href = 'home.html';
    }
  } catch (error) {
    console.error('Error al obtener el rol del usuario:', error);
  }
}

window.addEventListener('DOMContentLoaded', async () => {
  await checkUserRoleAndRedirect();
  cerrar.addEventListener('click', sesion);
  deleteAccountBtn.addEventListener('click', Dsesion);
});
