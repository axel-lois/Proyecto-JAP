//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  //Atrapo nodos del DOM en variables.
  let desafiate = "https://japdevdep.github.io/ecommerce-api/cart/654.json"
  let valor = document.getElementsByClassName("cantidad");
  let subtotalInd = document.getElementsByClassName("subtotal");
  let subtotalCart = document.getElementsByClassName("subtotalCart");
  let totalCart = document.getElementsByClassName("totalCart");
  let tbody = document.getElementById("table-body");
  let resumen = document.getElementById("resumen")
  let metodoDeEnvio = document.getElementsByClassName("form-check-input");


  function envio(tot) { //Funcion para actualizar total en funcion al metodo de envio seleccionado.

    if (metodoDeEnvio[0].checked) { //Necesito que los cambios en el total se vean reflejados primero sin necesidad de tocar los checkbox, es decir, sin eventos.
      let total = tot + (tot * 0.15); //Ya que si cambio la cantidad de productos, para que se refleje en el total el cambio debo hacer click todo el tiempo.
      totalCart[0].innerHTML = `$${total}`;
    }
    else if (metodoDeEnvio[1].checked) {
      let total = tot + (tot * 0.07);
      totalCart[0].innerHTML = `$${total}`;
    }
    else if (metodoDeEnvio[2].checked) {
      let total = tot + (tot * 0.05);
      totalCart[0].innerHTML = `$${total}`;
    }
    for (let i = 0; i < metodoDeEnvio.length; i++) { //Evento para cada checkbox (por si cambio de metodo de envio sobre la marcha)
      metodoDeEnvio[i].addEventListener("click", () => {
        if (i == 0) { //El primer checkbox es 13% del subtotal.
          let total = tot + (tot * 0.15);
          totalCart[0].innerHTML = `$${total}`;
        }
        else if (i == 1) { //El segundo checkbox es 7% del subtotawl.
          let total = tot + (tot * 0.07);
          totalCart[0].innerHTML = `$${total}`;
        }
        else if (i == 2) { //El tercer evento es 3% del subtotal.
          let total = tot + (tot * 0.05);
          totalCart[0].innerHTML = `$${total}`;
        }
      })
    }
  }


  //Con esta funcion eliminamos los productos del carrito
  function eliminarProducto(info,tot) {
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
      })
    }
  }


  //Con esta funcion cambiamos los valores del carrito en tiempo real.
  function cambiarValores(info) {
    let array = [];
    let total = 0;
    for(let i = 0; i < info.length; i++) {
      if(info[i].currency == "USD") {
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
        total = array[0] + array[1]; //Arreglo local para sumar el total
        subtotalCart[0].innerHTML = `$${total}`
        totalCart[0].innerHTML = `$${total}`
        //Actualizo subtotal y total de abajo de las rows.
        envio(total); //Invoco envio para que se actualice el calculo del envio con el nuevo total.
        eliminarProducto(info,total); //Invoco eliminarProducto para que se actualicen los totales al eliminar.
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
      tbody.innerHTML += `<tr class= "product-row">
        <td class="col-sm-8 col-md-6">
          <div class="media">
            <a class="thumbnail pull-left" href="#"> <img class="media-object"
                src="${info[i].src}"
                style="width: 72px; height: 72px; margin-right:10px;"> </a>
            <div class="media-body">
              <h4 class="media-heading"><a href="#">${info[i].name}</a></h4>
              <h5 class="media-heading"> by <a href="#">Jap Ecommerce</a></h5>
              <span>Estado: </span><span class="text-success"><strong>En Stock</strong></span>
            </div>
          </div>
        </td>
        <td class="col-sm-1 col-md-1" style="text-align: center">
          <input type="number" min="0" class="form-control cantidad" value="${cantidad}">
        </td>
        <td class="col-sm-1 col-md-1 text-center"><strong>$${precioUnitario}</strong></td>
        <td class="col-sm-1 col-md-1 text-center"><strong class="subtotal">$${subtotal}</strong></td>
        <td class="col-sm-1 col-md-1">
          <button type="button" class="remover btn btn-danger">
            <span class="glyphicon glyphicon-remove"></span> Remover
          </button>
        </td>
      </tr>
      `;
    }
    resumen.innerHTML += `
    <hr>
    <div>
    <h2 style="position: relative;left:20px;">Tipo de envio:</h2>
  </div>
  <div style="position: relative; left: 50px; top:0px;">
    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" checked>
    <label class="form-check-label" for="inlineRadio1"> <strong> Premium 15% (2 a 5 días) </strong></label>
  </div>
  <div style="position: relative; left: 50px;top:0px;">
    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2">
    <label class="form-check-label" for="inlineRadio2"> <strong>Express 7% (5 a 8 días) </strong></label>
  </div>
  <div style="position: relative; left: 50px;top:0px;">
    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" >
    <label class="form-check-label" for="inlineRadio3"> <strong>Estandar 5% (12 a 15 días) </strong> </label>
  </div>


  <h2 style="position: relative; top:20px;left:20px">Datos de envio:</h2>
  <form style="position: relative; top:20px;left:20px">
    <input  style="width: 300px; "type="text" class="form-control mt-2" placeholder="Direccion" required>
    <input  style="width: 300px;"type="text" class="form-control mt-2" placeholder="Pais" required>

  </form>
  </div>
  <div id="tas" style="position: relative; left: 440px;bottom:250px;   width:300px">
    <h2>Resumen</h2>

    <h5> Subtotal: <strong class="subtotalCart"> $${total}</strong></h5>
    <h3> Total: <strong class="totalCart">  $${total}</strong></h3>
    <button type="button" style="width:250px; position:relative;top:15px; right:30px;" id="comprar" class="btn btn-success">
      Comprar <span class="glyphicon glyphicon-play"></span>
    </button>
  </div>`;
    cambiarValores(info); //invoco a la funcion de cambiar valores en tiempo real
    eliminarProducto(info,total); //Invoco a la funcion que elimina los elementos del carrito
    envio(total); //Invoco a la funcion que elimina los elementos del carrito
  }
    carrito(desafiate);
});



