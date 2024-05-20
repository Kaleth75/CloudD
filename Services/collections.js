import { readusers } from "../Services/global";

const ver = document.getElementById('viewdatas')

async function cargar(){
    ver.innerHTML=''

    const datas = readusers()
    const querySnapshot = await datas
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id}`);
        ver.innerHTML+=`
            <tr>
            <th scope="row">${doc.data().first}</th>
            <td>${doc.data().last}</td>
            <td>${doc.data().born}</td>
            </tr>
        `
    });
}
window.addEventListener("DOMContentLoaded",async()=>
{
    cargar()
})