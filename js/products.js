//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var minCount = undefined;
var maxCount = undefined;
var productsArray = [];

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) { //Los muestro por primera vez
        if (resultObj.status === "ok") {
            productsArray = resultObj.data;
            showProductsList(productsArray);
        }
    });
    document.getElementById("sortAsc").addEventListener("click", function () { //Muestro de menor a mayor segun precio
        productsArray = ordenarAsc(productsArray);
        showProductsList(productsArray);
    });

    document.getElementById("sortDesc").addEventListener("click", function () { //Muestro de mayor a menor segun precio
        productsArray = ordenarDesc(productsArray);
        showProductsList(productsArray);
    });

    document.getElementById("sortBySoldOuts").addEventListener("click", function () { //Muestro en orden descendente segun cantidad de vendidos
        productsArray = relevancia(productsArray);
        showProductsList(productsArray);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function () { //Limpio el filtro que aplique anteriormente
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";
        minCount = undefined;
        maxCount = undefined;
        showProductsList(productsArray);
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function () { //Filtro en intervalo de precio
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount);
        }
        else {
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
            maxCount = parseInt(maxCount);
        }
        else {
            maxCount = undefined;
        }

        showProductsList(productsArray);
    });

    document.getElementById("buscador").addEventListener('keyup', filtrar); //buscador en tiempo real


});


function filtrar() {
    const texto = document.getElementById("buscador").value.toLowerCase();
    const agregar = document.getElementById("row");
    agregar.innerHTML ='';
    for (let producto of productsArray) {
        let nombre = producto.name.toLowerCase();
        let descripcion = producto.description.toLowerCase();
        if (nombre.indexOf(texto) !== -1 || descripcion.indexOf(texto) !== -1) {
            agregar.innerHTML += ` 
            <div class="col-md-4">
            <a href="product-info.html" class="card mb-4 shadow-sm custom-card">
              <img class="bd-placeholder-img card-img-top" src="${producto.imgSrc}">
              <h5 class="m-3"><b>${producto.name}  (${producto.soldCount})</b></h5>
              <div class="card-body">
                <p class="card-text">${producto.description} <br>
                <strong> ${producto.currency} ${producto.cost} </strong> </p>
              </div>
            </a>
        </div>
            `
        }
    }
    if(agregar.innerHTML === "") {
        agregar.innerHTML += `<p> No hay resultados para la busqueda </p>`;
    }
}




function ordenarAsc(array) { //Orden ascendente
    let result = [];
    result = array.sort(function (a, b) {
        return a.cost - b.cost;
    });
    return result;
}

function ordenarDesc(array) { //Orden descendente
    let result = [];
    result = array.sort(function (a, b) {
        return b.cost - a.cost;
    });
    return result;
}

function relevancia(array) { // Por relevancia
    let result = [];
    result = array.sort(function (a, b) {
        let aCount = parseInt(a.soldCount);
        let bCount = parseInt(b.soldCount);
        if (aCount > bCount)
            return -1;
        if (aCount < bCount)
            return 1;
        else
            return 0;
    });
    return result;
}


//Funcion para mostrar los productos
function showProductsList(array) {

    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        var product = array[i];

        //Si cumple con los filtros de precio, muestra el producto, si no existe filtro de precio (undefined) muestra todos
        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))) {
            //Los agrego a la variable vacia
            htmlContentToAppend += ` 
            <div class="col-12 col-sm-12 col-md-6 col-lg-4">
            <a href="product-info.html" class="card mb-4 shadow-sm custom-card">
              <img class="bd-placeholder-img card-img-top" src="${product.imgSrc}">
              <h5 class="m-3"> <b>${product.name} <span class="vendidos text-end"> (${product.soldCount} vendidos) </span> </b> </h5>
              <div class="card-body">
                <p class="card-text">${product.description} <br>
                <strong> ${product.currency} ${product.cost} </strong> </p>
              </div>
            </a>
        </div>
        `

            document.getElementById("row").innerHTML = htmlContentToAppend; //Los agrego con inner al DOM
        }
    }
}
