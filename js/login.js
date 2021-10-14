//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var array = [];


document.addEventListener("DOMContentLoaded", function(e){

const email = document.getElementById("email");
const pass = document.getElementById("password");
const form = document.getElementById("form");
const alert = document.getElementById("alerts");
const login_form = document.getElementById("login-form");

form.addEventListener("submit",e=> {
    e.preventDefault();
    
    if (email.value.length < 6) {
        alert.innerHTML += `<div class="alert alert-danger" style="position:absolute;top:635px; width:380px;" role="alert">
        El nombre debe tener al menos 6 caracteres.
      </div>`
      login_form.style.height = "460px"
      setTimeout(() => {
        login_form.style.height = "430px"
        alert.innerHTML = "";
    }, 3000);
      
    }
    else if (pass.value.length < 6) {
        alert.innerHTML += `<div class="alert alert-danger" style="position:absolute;top:625px; width:380px;" role="alert">
        La contraseña debe tener al menos 6 caracteres.
      </div>`
      login_form.style.height = "485px"
      setTimeout(() => {
        login_form.style.height = "430px"
        alert.innerHTML = "";
    }, 3000);
    }
    else {
        location.href= "index.html";
        var emvalue = document.getElementById("email").value;
        var passvalue = document.getElementById("password").value;
        array.push({emvalue,passvalue});
        localStorage.setItem("login",JSON.stringify(array));
        //Guardo los values en el localStorage para que no tenga que volver a iniciar sesion al ingresar datos
    }
})
});


