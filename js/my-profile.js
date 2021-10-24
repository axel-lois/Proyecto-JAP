"use strict";
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
let container = document.getElementById("container");
let inputs = document.getElementsByClassName("inp");
let alerta = document.getElementById("alertas");
let usuario = JSON.parse(localStorage.getItem("login"));
let input = document.getElementById("submit");
let btn = document.getElementById("btn");

function formControl() {
  if (inputs[0].value == "" || inputs[1].value == "" || inputs[2].value == "" || inputs[3].value == "" || inputs[4].value == "" || inputs[5].value == "" || inputs[6].value == "" || inputs[7].value == "" || inputs[8].value == "" || inputs[9].value == "") {
    alerta.innerHTML = `<div class="alert alert-danger"role="alert">
      <strong>Por favor llene todos los campos para continuar.</strong> `
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
    alerta.innerHTML = `<div class="alert alert-success" role="alert">
    <strong>Su perfil se ha actualizado correctamente. </strong>
  </div>`
  setTimeout(() => {
    alerta.innerHTML = "";
  }, 3000);
  
    showData();
  }
}

function showData() {
  container.innerHTML = "";
  if (!localStorage.getItem("Profile")) {
    container.innerHTML = `<div class="container rounded bg-white mt-5 mb-5">
          <div class="row">
            <div class="col-md-3 border-right">
              <div class="d-flex flex-column align-items-center text-center p-3 py-5"><img class="rounded-circle mt-5"
                  width="150px"
                  src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg">
                  <span class="font-weight-bold">${usuario[0].emvalue}</span></div>
            </div>
            <div class="col-md-5 border-right">
              <div class="p-3 py-5">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <h4 class="text-center">Informacion del perfil</h4>
                </div>
                <div class="row mt-2">
                  <div class="col-md-6"><label class="labels">Nombre</label><input type="text" class="form-control inp"
                      placeholder="Primer nombre" ></div>
                  <div class="col-md-6"><label class="labels">Apellido</label><input type="text" class="form-control inp"
                      placeholder="Primer apellido" ></div>
                </div>
                <div class="row mt-3">
                  <div class="col-md-12"><label class="labels">Numero de telefono</label><input type="text"
                      class="form-control inp" placeholder="Numero de telefono" ></div>
                      <div class="col-md-12"><label class="labels">Edad</label><input type="number"
                        class="form-control inp" placeholder="Edad" min="18" ></div>
                  <div class="col-md-12"><label class="labels">Direccion</label><input type="text" class="form-control inp"
                      placeholder="Direccion" ></div>
    
                  <div class="col-md-12"><label class="labels">Email</label><input type="text" class="form-control inp"
                      placeholder="Email" ></div>
                </div>
                <div class="row mt-3">
                  <div class="col-md-6"><label class="labels">Pais</label><input type="text" class="form-control inp"
                      placeholder="Pais" ></div>
                  <div class="col-md-6"><label class="labels">Localidad</label><input type="text" class="form-control inp"
                      placeholder="Localidad" ></div>
                </div>
                <div class="mt-5 text-center"><button class="btn btn-primary profile-button" id="btn" onclick="formControl()" type="button">Guardar perfil </button></div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="p-3 py-5">
                <div class="d-flex justify-content-between align-items-center experience"> <h5 style="position: relative;left: 14px;">Adicional</h5> </div><br>
                <div class="col-md-12"><label class="labels">Codigo postal</label><input type="text"
                    class="form-control inp" placeholder="Codigo postal" ></div> <br>
                <div class="col-md-12"><label class="labels">Detalles adicionales</label><input type="text"
                    class="form-control inp" placeholder="Ingrese algun dato relevante" ></div>
              </div>
            </div>
          </div>
        </div>`;
  }
  else {
    let data = JSON.parse(localStorage.getItem("Profile"));
    container.innerHTML = `<div class="container rounded bg-white mt-5 mb-5">
          <div class="row">
            <div class="col-md-3 border-right">
              <div class="d-flex flex-column align-items-center text-center p-3 py-5"><img class="rounded-circle mt-5"
                  width="150px"
                  src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg">
                  <span class="font-weight-bold">${usuario[0].emvalue}</span></div>
            </div>
            <div class="col-md-5 border-right">
              <div class="p-3 py-5">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <h4 class="text-center">Informacion del perfil</h4>
                </div>
                <div class="row mt-2">
                  <div class="col-md-6"><label class="labels">Nombre</label><input value="${data.Nombre}" type="text" class="form-control inp"
                      placeholder="Primer nombre" ></div>
                  <div class="col-md-6"><label class="labels">Apellido</label><input value="${data.Apellido}" type="text" class="form-control inp"
                      placeholder="Primer apellido" ></div>
                </div>
                <div class="row mt-3">
                  <div class="col-md-12"><label class="labels">Numero de telefono</label><input value="${data.Telefono}" type="text"
                      class="form-control inp" placeholder="Numero de telefono" ></div>
                      <div class="col-md-12"><label class="labels">Edad</label><input value="${data.Edad}" type="number"
                        class="form-control inp" placeholder="Edad" min="18" ></div>
                  <div class="col-md-12"><label class="labels">Direccion</label><input value="${data.Direccion}" type="text" class="form-control inp"
                      placeholder="Direccion" ></div>
                  <div class="col-md-12"><label class="labels">Email</label><input value="${data.Email}" type="text" class="form-control inp"
                      placeholder="Email"></div>
                </div>
                <div class="row mt-3">
                  <div class="col-md-6"><label class="labels">Pais</label><input value="${data.Pais}" type="text" class="form-control inp"
                      placeholder="Pais" ></div>
                  <div class="col-md-6"><label class="labels">Localidad</label><input value="${data.Localidad}" type="text" class="form-control inp"
                      placeholder="Localidad"></div>
                </div>
                <div class="mt-5 text-center"><button class="btn btn-primary profile-button" onclick="formControl()" id="btn"type="button">Editar perfil </button></div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="p-3 py-5">
                <div class="d-flex justify-content-between align-items-center experience"> <h5 style="position: relative;left: 14px;">Adicional</h5> </div><br>
                <div class="col-md-12"><label class="labels">Codigo postal</label><input value="${data.CodigoP}" type="text"
                    class="form-control inp" placeholder="Codigo postal" ></div> <br>
                <div class="col-md-12"><label class="labels">Detalles adicionales</label><input value="${data.Adicional}" type="text"
                    class="form-control inp" placeholder="Ingrese algun dato relevante" ></div>
              </div>
            </div>
          </div>
        </div>`
  }
}


document.addEventListener("DOMContentLoaded", function (e) {
  showData();
});