import { AddData } from "../Services/global.js"

const wer = document.getElementById('agregar')

async function register (){

    const name = document.getElementById('cedula').value
    const apellido = document.getElementById('nombre').value
    const fechaNacimiento = document.getElementById('fechaNacimiento').value;
    const direccion = document.getElementById('direccion').value;
    const telefono = document.getElementById('telefono').value;
    const email = document.getElementById('email').value;
    const contraseña = document.getElementById('contrasena').value;
    
    const verificar = AddData (name,apellido,fechaNacimiento,telefono,email,direccion,contraseña)
    const validar = await verificar

    if(validar != null){
        alert(' Register Successfull' + name)
        window.location.href='create.html' 
    }else {
        alert ('Error register no sucessfull' )
        console.log('sesion'+name+' no validation '  )
    }
    
      
}

window.addEventListener('DOMContentLoaded',async()=>{
    wer.addEventListener('click',register)
})