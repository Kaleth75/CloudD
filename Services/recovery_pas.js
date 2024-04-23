import { recovery } from "../Services/global.js"
const recuperar  = document.getElementById('recop' )

async function recopassword (){

    const usuario = document.getElementById('email').value

    const verificar = recovery(usuario)
    const validar = await verificar

if(validar != null){
    everification()
    alert(' Password  Recovery Successfull' + usuario)
    window.location.href=' recop.html' 
}else {
    alert (' Enviado' )
    console.log(' sesion'+usuario+' no validation '  )
}

}
window.addEventListener('DOMContentLoaded',async()=>{
    recuperar.addEventListener('click',recopassword)
})