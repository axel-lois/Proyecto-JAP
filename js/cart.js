let desafiate = "https://japdevdep.github.io/ecommerce-api/cart/654.json"
let valor = document.getElementsByClassName("cantidad");
let subtotalInd = document.getElementsByClassName("subtotal");
let subtotalCart = document.getElementsByClassName("subtotalCart");
let totalCart = document.getElementsByClassName("totalCart");
let tbody = document.getElementById("table-body");
let resumen = document.getElementById("resumen");
let envios = document.getElementById("envios");

function formCont() {
  let inputs = document.getElementsByClassName("xxd");
  let alerta = document.getElementById("formcont");
  let row = document.getElementsByClassName("product-row");
  let contador = 0;

  for (let i = 0; i < row.length; i++) { //Ver cuantas rows ocultas hay
    if (row[i].style.display == "none") {
      contador++;
    }
  }

  if (inputs[0].value == "" || inputs[1].value == "" || inputs[2].value == "" || inputs[3].value == "" || inputs[4].value == "" || valor[0].value == "" || valor[0].value == "0" || valor[1].value == "" || valor[1].value == "0") {
    alerta.innerHTML = `  
    <div class="alert alert-danger alert-dismissible fade show alertaReset mt-2" id="danger" style="position: static;" role="alert">
      <strong>Cuidado!</strong> Aun tienes campos sin rellenar.
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>  
    </div>`
  }

  else if (contador == row.length) { //Si todas las rows estan ocultas
    alerta.innerHTML = `
    <div class="alert alert-danger alert-dismissible fade show alertaReset mt-2" id="danger" style="position: static;" role="alert">
      <strong>No hay productos en el carrito.</strong>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>  
    </div>`
  }

  else {
    alerta.innerHTML = `
    <div class="alert alert-success alert-dismissible fade show alertaReset mt-2" style="position: static;" id="exito" role="alert">
      <strong>Compra realizada con éxito!</strong>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`
  }
}

document.addEventListener("DOMContentLoaded", function (e) {

  function envio(tot) { //Funcion para actualizar total en funcion al metodo de envio seleccionado.
    let shipping = document.getElementById("shipping");
    let metodoDeEnvio = document.getElementsByClassName("form-check-input");

    if (metodoDeEnvio[0].checked) { //Necesito que los cambios en el total se vean reflejados primero sin necesidad de tocar los checkbox, es decir, sin eventos.
      let total = tot + (tot * 0.15); //Ya que si cambio la cantidad de productos, para que se refleje en el total el cambio debo hacer click todo el tiempo.
      totalCart[0].innerHTML = `$${total}`;
      shipping.innerHTML = `$${tot * 0.15}`
    }
    else if (metodoDeEnvio[1].checked) {
      let total = tot + (tot * 0.07);
      totalCart[0].innerHTML = `$${total}`;
      shipping.innerHTML = `$${tot * 0.07}`
    }
    else if (metodoDeEnvio[2].checked) {
      let total = tot + (tot * 0.05);
      shipping.innerHTML = `$${tot * 0.05}`
      totalCart[0].innerHTML = `$${total}`;
    }

    for (let i = 0; i < metodoDeEnvio.length; i++) { //Evento para cada checkbox (por si cambio de metodo de envio sobre la marcha)
      metodoDeEnvio[i].addEventListener("click", () => {
        if (i == 0) { //El primer checkbox es 13% del subtotal.
          let total = tot + (tot * 0.15);
          totalCart[0].innerHTML = `$${total}`;
          shipping.innerHTML = `$${tot * 0.15}`
        }
        else if (i == 1) { //El segundo checkbox es 7% del subtotawl.
          let total = tot + (tot * 0.07);
          totalCart[0].innerHTML = `$${total}`;
          shipping.innerHTML = `$${tot * 0.07}`
        }
        else if (i == 2) { //El tercer evento es 3% del subtotal.
          let total = tot + (tot * 0.05);
          totalCart[0].innerHTML = `$${total}`;
          shipping.innerHTML = `$${tot * 0.05}`
        }
      })
    }
  }


  //Con esta funcion eliminamos los productos del carrito
  function eliminarProducto(info, tot) {
    //Atrapo las rows y los botones
    let row = document.getElementsByClassName("product-row");
    let botones = document.getElementsByClassName("remover");
    let aRestar = 0; //Variable para acumular lo que hay que restar del subt. y tot. al eliminar cada producto.
    for (let i = 0; i < botones.length; i++) {
      botones[i].addEventListener("click", () => { //Evento que suceda al tocar los botones
        row[i].style.display = "none"; //Escondemos la row
        if (info[i].currency == "USD") { //Modificamos la variable de resta
          aRestar = valor[i].value * info[i].unitCost * 40;
        }
        else {
          aRestar = valor[i].value * info[i].unitCost;
        }
        //Modificamos los valores de subt. y tot. y tambien el de la variable global tot, para poder volverlo a hacer con la otra row.
        subtotalCart[0].innerHTML = `$${tot - aRestar}`;
        totalCart[0].innerHTML = `$${tot - aRestar}`;
        tot -= aRestar;
        envio(tot);
      })
    }
  }


  //Con esta funcion cambiamos los valores del carrito en tiempo real.
  function cambiarValores(info) {
    let array = [];
    for (let i = 0; i < info.length; i++) {
      if (info[i].currency == "USD") {
        array.push(info[i].unitCost * info[i].count * 40)
      }
      else {
        array.push(info[i].unitCost * info[i].count)
      }
    }

    for (let i = 0; i < valor.length; i++) {
      valor[i].addEventListener("keyup", (evento) => {
        if (evento.key == "Backspace" || evento.key == "-" || evento.key == "+" || evento.key == "." || evento.key == ",") { //Que al borrar o poner simbolos ponga 0 en cantidad
          subtotalInd[i].innerHTML = "$0";
          valor[i].value = "";
          array[i] = 0;
        }
        else {
          if (info[i].currency == "USD") { //Si es dolar hay que multiplicar por 40
            subtotalInd[i].innerHTML = `$${valor[i].value * info[i].unitCost * 40}`;
            array[i] = valor[i].value * info[i].unitCost * 40;
          }
          else { //Solamente cambiamos el valor del subtotal de cada row y el del arreglo.
            subtotalInd[i].innerHTML = `$${valor[i].value * info[i].unitCost}`;
            array[i] = valor[i].value * info[i].unitCost;
          }
        }
        let total = 0;
        for(let j = 0; j < valor.length; j++) { //Juntamos todos los subtotales en una variable
          total+= array[j];
        } 
        subtotalCart[0].innerHTML = `$${total}` //Pintamos el subtotal
        envio(total); //Invoco envio para que se actualice el calculo del envio con el nuevo total. Aca tambien se actualiza el total, el cual es subtotal + envio
        eliminarProducto(info, total); //Invoco eliminarProducto para que se actualicen los totales al eliminar.
      })
    }
  }

  //Mostrar carrito inicial con desafiate.
  async function carrito(url) {
    tbody.innerHTML = "";
    let info = await getJSONData(url); //Hago una peticion a un JSON
    info = info.data.articles; //Arreglo de objetos
    let total = 0;
    for (let i = 0; i < info.length; i++) {//Muestro todos los elementos que quedaron en mi arreglo
      let precioUnitario = info[i].unitCost;
      let moneda = info[i].currency;
      let cantidad = info[i].count;
      let subtotal = precioUnitario * cantidad;
      if (moneda == "USD") {
        subtotal *= 40;
        precioUnitario *= 40;
      }
      total += subtotal;
      tbody.innerHTML += `                                                        
      <tr class="product-row">
      <td class="d-flex justify-content-center align-content-center"><a class ="remover text-danger"> <i class="fas fa-trash-alt"></i></a></td>
      <td><img src="${info[i].src}" class="img-fluid" width="70" alt="product"></td>
      <td>${info[i].name}</td>
      <td>
      <div class="form-group mb-0">
      <input type="number" class="form-control cart-qty cantidad" name="cartQty1" id="cartQty1" min="0" value="${cantidad}">
      </div>
      </td>
      <td>$${precioUnitario}</td>
      <td class="text-right subtotal">$${subtotal}</td>
  </tr>
      `;
    }
    resumen.innerHTML += `<tr>
    <td style="font-size:20px;">Subtotal :</td>
    <td style="font-size:20px;" class="subtotalCart">$${total}</td>
</tr>

<tr>
    <td style="font-size:20px;">Envio :</td>
    <td style="font-size:20px;" id="shipping"></td>
</tr>
<tr>
    <td class="font-18"><h4 style="font-weight:bold;">Total :</h4></td>
    <td class="font-18 "><h4 class="totalCart" style="font-weight:bold;"></h4></td>
</tr>
   `;
    envios.innerHTML = `<div class="mt-2">
<h4>Metodo de envio:</h4>
</div>
<div >
<input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" checked>
<label class="form-check-label" for="inlineRadio1">  Premium 15% (2 a 5 días) </label>
</div>
<div>
<input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2">
<label class="form-check-label" for="inlineRadio2"> Express 7% (5 a 8 días) </label>
</div>
<div>
<input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" >
<label class="form-check-label" for="inlineRadio3"> Estandar 5% (12 a 15 días)  </label>
</div>`


    cambiarValores(info); //invoco a la funcion de cambiar valores en tiempo real
    eliminarProducto(info, total); //Invoco a la funcion que elimina los elementos del carrito
    envio(total); //Invoco a la funcion que elimina los elementos del carrito
  }
  carrito(desafiate);
});



