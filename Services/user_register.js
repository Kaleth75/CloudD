import { User_Register,everification,AddData } from "../Services/global.js"
const agregar = document.getElementById('agregar' )
async function registrar (){

    const usuario = document.getElementById('email').value
    const contraseña = document.getElementById('contrasena').value

    const verificar = User_Register (usuario,contraseña)
    const validar = await verificar

if(validar != null){

    everification()
    const name = document.getElementById('cedula').value
    const apellido = document.getElementById('nombre').value
    const fechaNacimiento = document.getElementById('fechaNacimiento').value;
    const direccion = document.getElementById('direccion').value;
    const telefono = document.getElementById('telefono').value;
    const email = document.getElementById('email').value;
    const contraseña = document.getElementById('contrasena').value;
    
    await AddData (name,apellido,fechaNacimiento,telefono,email,direccion,contraseña)
    

    if(validar != null){
        alert(' Register Successfull' + name)
        window.location.href='create.html' 
    }else {
        alert ('Error register no sucessfull' )
        console.log('sesion'+name+' no validation '  )
    }
    alert(' Register Successfull' + usuario)
    window.location.href='create.html' 
}else {
    alert ('Error register no sucessfull' )
    console.log('sesion'+usuario+' no validation '  )
} }
window.addEventListener('DOMContentLoaded',async()=>{
    agregar.addEventListener('click',registrar)
})