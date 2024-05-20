import { User_Register,everification,AddData } from "../Services/global.js"
const agregar = document.getElementById('agregar' )

async function registrar (){

    const usuario = document.getElementById('email').value
    const contraseña = document.getElementById('contrasena').value
    const cedula = document.getElementById('cedula').value
    const name = document.getElementById('nombre').value
    const fechaNacimiento = document.getElementById('fechaNacimiento').value;
    const direccion = document.getElementById('direccion').value;
    const telefono = document.getElementById('telefono').value;    
    await User_Register(usuario,contraseña).then((data) => {
        AddData (data.user.uid,cedula,name,name,fechaNacimiento,direccion,telefono,usuario, "usuario").then(() => {
            alert("Se guardo!!")
            window.location.href='create.html' 
        })
        everification()
    }).catch((e) => {
        console.log(e)
    })
    /**
    await AddData (data.user.uid,cedula,name,name,fechaNacimiento,direccion,telefono,usuario, "usuario").then(() => {
        alert("Se guardo!!")
        window.location.href='create.html' 
    }) */
}
window.addEventListener('DOMContentLoaded',async()=>{
    agregar.addEventListener('click',registrar)
})