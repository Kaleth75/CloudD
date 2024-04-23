import { User_Register,everification } from "../Services/global.js"
const agregar = document.getElementById('agregar' )
async function registrar (){

    const usuario = document.getElementById('edemail').value
    const contraseña = document.getElementById('edpass').value

    const verificar = User_Register (usuario,contraseña)
    const validar = await verificar

if(validar != null){
    everification()
    alert(' Register Successfull' + usuario)
    window.location.href='create.html' 
}else {
    alert ('Error register no sucessfull' )
    console.log('sesion'+usuario+' no validation '  )
}

}
window.addEventListener('DOMContentLoaded',async()=>{
    agregar.addEventListener('click',registrar)
})