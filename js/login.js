//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var array = [];


document.addEventListener("DOMContentLoaded", function(e){

const email = document.getElementById("email");
const pass = document.getElementById("password");
const form = document.getElementById("form");

form.addEventListener("submit",e=> {
    e.preventDefault();
    
    if (email.value.length < 6) {
        alert("El usuario debe tener al menos 6 caracteres.");
    }
    else if (pass.value.length < 6) {
        alert("La contraseña debe tener al menos 6 caracteres.");
    }
    else {
        location.href= "index.html";
    }

    //Guardo los values en el localStorage para que no tenga que volver a iniciar sesion al ingresar datos
    var emvalue = document.getElementById("email").value;
    var passvalue = document.getElementById("password").value;
    array.push({emvalue,passvalue});
    localStorage.setItem("login",JSON.stringify(array));
})
    
});


