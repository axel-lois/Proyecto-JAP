//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.



document.addEventListener("DOMContentLoaded", function(e){

const email = document.getElementById("email");
const pass = document.getElementById("password");
const form = document.getElementById("form");
const alert = document.getElementById("alerts");

form.addEventListener("submit",e=> {
    e.preventDefault();
    
    if (email.value.length < 6) {
        alert.innerHTML += `<div class="alert alert-danger"  role="alert">
        <i class="fas fa-times-circle"></i> El nombre debe tener al menos 6 caracteres.
      </div>`
      setTimeout(() => {
        alert.innerHTML = "";
    }, 3000);
      
    }
    else if (pass.value.length < 6) {
        alert.innerHTML += `<div class="alert alert-danger"  role="alert">
        <i class="fas fa-times-circle"></i> La contraseña debe tener al menos 6 caracteres.
      </div>`
      setTimeout(() => {
        alert.innerHTML = "";
    }, 3000);
    }
    else {
        let array = [];
        location.href= "index.html";
        let emvalue = document.getElementById("email").value;
        let passvalue = document.getElementById("password").value;
        array.push({emvalue,passvalue});
        localStorage.setItem("login",JSON.stringify(array));
        //Guardo los values en el localStorage para que no tenga que volver a iniciar sesion al ingresar datos
    }
})
});


