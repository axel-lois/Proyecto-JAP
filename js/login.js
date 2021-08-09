//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    
});


const email = document.getElementById("email");
const pass = document.getElementById("password");
const form = document.getElementById("form");
const parrafo = document.getElementById("warnings");

form.addEventListener("submit",e=> {
    e.preventDefault();
    let warnings = "";
    let entry = false;
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    parrafo.innerHTML= "";
    if (!regexEmail.test(email.value)) {
        alert("El email no es valido");
        warnings+= `El email no es valido <br>`;
        entry = true;
    }
    if (pass.value.length < 6) {
        alert("La contraseña es muy corta");
        warnings+= `La contraseña es muy corta <br>`;
        entry=true;
    }
    if (entry) {
        parrafo.innerHTML = warnings;
    }
})