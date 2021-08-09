//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    
});


const email = document.getElementById("email");
const pass = document.getElementById("password");
const form = document.getElementById("form");

form.addEventListener("submit",e=> {
    e.preventDefault();
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    if (!regexEmail.test(email.value)) {
        alert("El email no es valido");
        warnings+= `El email no es valido <br>`;
    }
    if (pass.value.length < 6) {
        alert("La contraseña es muy corta");
    }
    else {
        location.href= "index.html";
    }
})