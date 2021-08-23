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

    document.getElementById("rangeFilterCount").addEventListener("click", function(){ //Filtro en intervalo de precio
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showProductsList(productsArray);
    });

});


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
        ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))){
        //Los agrego a la variable vacia
        htmlContentToAppend += ` 
        <a href="category-info.html" class=" list-group-item-action">
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ product.name + `</h4>
                        <small class="text-muted">` + product.soldCount + ` vendidos</small>
                        </div>
                        <p class="text-muted">` + product.description + ` </p>
                        <p class = "mb-1 price">  `+ product.currency + `   ` + product.cost + `   </p>

                </div>
            </div>
        </div>
        </a>
        `

        document.getElementById("product-list-container").innerHTML = htmlContentToAppend; //Los agrego con inner al DOM
    }
    }
}