//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.



var productsArray = [];

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productsArray = resultObj.data;
            //Muestro los productos ordenados
            showProductsList(productsArray);
        }
    });
});

//Funcion para mostrar los productos
function showProductsList(array){

    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        var product = array[i];

        htmlContentToAppend += `
        <a href="category-info.html" class=" list-group-item-action">
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ product.name +`</h4>
                        <small class="text-muted">` + product.soldCount + ` vendidos</small>
                        </div>
                        <p class="text-muted">` + product.description + ` </p>
                        <p class = "mb-1 price">  `+ product.currency+ `   `+product.cost +`   </p>

                </div>
            </div>
        </div>
        </a>
        `

        document.getElementById("product-list-container").innerHTML = htmlContentToAppend; //Los agrego con inner
    }
}