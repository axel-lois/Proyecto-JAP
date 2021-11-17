"use strict";

let container = document.getElementById("container");
let inputs = document.getElementsByClassName("inp");
let alerta = document.getElementById("alertas");
let usuario = JSON.parse(localStorage.getItem("login"));
let input = document.getElementById("submit");
let btn = document.getElementById("btn");

function formControl() {
  if (inputs[0].value == "" || inputs[1].value == "" || inputs[2].value == "" || inputs[3].value == "" || inputs[4].value == "" || inputs[5].value == "" || inputs[6].value == "" || inputs[7].value == "" || inputs[8].value == "" || inputs[9].value == "") {
    alerta.innerHTML = `<div class="alert alert-danger"role="alert"> <i class="fas fa-times-circle"></i>
      <strong>Por favor llene todos los campos para continuar.</strong> </div> `
    setTimeout(() => {
      alerta.innerHTML = "";
    }, 3000);
  }
  else {

    let info = {
      Nombre: inputs[0].value,
      Apellido: inputs[1].value,
      Telefono: inputs[2].value,
      Edad: inputs[3].value,
      Direccion: inputs[4].value,
      Email: inputs[5].value,
      Pais: inputs[6].value,
      Localidad: inputs[7].value,
      CodigoP: inputs[8].value,
      Adicional: inputs[9].value
    };
    localStorage.setItem("Profile", JSON.stringify(info));
    alerta.innerHTML = `<div class="alert alert-success" role="alert"> <i class="fas fa-check-circle"></i>
    <strong>Su perfil se ha actualizado correctamente. </strong>
  </div>`
    setTimeout(() => {
      alerta.innerHTML = "";
    }, 3000);

    showData();
  }
}

function showData() {
  document.getElementById("username").innerHTML = usuario[0].emvalue; //Inicializo el perfil por defecto con el nombre de usuario.
  if (localStorage.getItem("Profile")) {
    document.getElementById("btn").innerHTML = "Editar perfil";
    let data = JSON.parse(localStorage.getItem("Profile"));
    inputs[0].value = data.Nombre;
    inputs[1].value = data.Apellido;
    inputs[2].value = data.Telefono;
    inputs[3].value = data.Edad;
    inputs[4].value = data.Direccion;
    inputs[5].value = data.Email;
    inputs[6].value = data.Pais;
    inputs[7].value = data.Localidad;
    inputs[8].value = data.CodigoP;
    inputs[9].value = data.Adicional;
  }
}




document.getElementById("uploadPhoto").addEventListener("change", function () {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    localStorage.setItem("profilePhoto", reader.result);
  })
  reader.readAsDataURL(this.files[0]);
  alerta.innerHTML = `<div class="alert alert-success" role="alert"><i class="fas fa-check-circle"></i>
    <strong>  Su foto se actualizo con exito! Por favor, recargue la pagina. </strong>
  </div>`
  setTimeout(() => {
    alerta.innerHTML = "";
  }, 3000);
})



document.addEventListener("DOMContentLoaded", function (e) {

  if (localStorage.getItem("profilePhoto")) {
    document.getElementById("profileImg").setAttribute("src", localStorage.getItem("profilePhoto"));
  }
  showData();
});