//Atrapo todas las partes de mi pagina en las que voy a agregar informacion
let productContainer = document.getElementById("product-container");
let productComments = document.getElementById("comments-section");




function showProductInfo() { //Muestro todos los datos, menos los comentarios
    let productTitle = document.getElementById("product-title");
    let productDescription = document.getElementById("product-description");
    let productCategory = document.getElementById("product-category");
    let productCost = document.getElementById("product-cost");
    let productSoldCount = document.getElementById("product-soldCount");
    let productImages = document.getElementById("product-images");
    getJSONData(PRODUCT_INFO_URL).then(datos => {
        if (datos.status == "ok") {
            let info = datos.data;
            productTitle.innerHTML = info.name;
            productDescription.innerHTML = info.description;
            productCategory.innerHTML = info.category;
            productCost.innerHTML = info.cost + " " + info.currency;
            productSoldCount.innerHTML = info.soldCount;
            let array = info.images;
            for (let i = 0; i < array.length; i++) {
                productImages.innerHTML += `
            <div class="col-lg-3 col-md-6 col-12">
                <div class="d-block mb-4 h-100">
                    <img class="img-fluid img-thumbnail" src="` + array[i] + `" alt="">
                </div>
            </div>
            `
            }
            showRelatedProducts(info.relatedProducts); //Mostrar productos relacionados con los indices dentro del arreglo "relatedProducts".
        }
    })
}

function showCommentsAndRatings() { //Muestro los comentarios
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(comentarios => {
        if (comentarios.status == "ok") {
            let infoArray = comentarios.data;
            let stars = "";
            for (let i = 0; i < infoArray.length; i++) {
                for (let j = 0; j < infoArray[i].score; j++) {
                    stars += `<span class="fa fa-star checked"></span>`;
                }
                productComments.innerHTML += `<div id="coment-container" class="my-2">
                <p id="username">${infoArray[i].user}${stars}</p>

                <p id="date">${infoArray[i].dateTime}</p>

                <p id="testimonial">${infoArray[i].description}</p>
                
            </div>`
                stars = "";
            }
        }
    })
}

function addComment() {
    let fecha = new Date;
    let today = fecha.getFullYear() + "-" + fecha.getMonth() + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
    let starCount = document.getElementById("star-rating").value;
    let comment = document.getElementById("text").value;
    let arreglo = JSON.parse(localStorage.getItem("login"));
    let nombre = arreglo[0].emvalue;
    let stars = "";
    for (let j = 0; j < starCount; j++) {
        stars += `<span class="fa fa-star checked"></span>`;
    }
    if (comment == "") {
        productComments.innerHTML += `<div class="alert alert-danger alert-dismissible fade show" style="text-align:center" role="alert">
        <strong>Por favor ingrese un comentario.</strong> 
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">
      </button>
      </div> `
    }
    else {
        productComments.innerHTML += `<div id="coment-container"  class="my-2">
    <p id="username">${nombre}${stars}</p>

    <p id="date">${today}</p>

    <p id="testimonial">${comment}</p>
    
</div>`
        productComments.innerHTML += `<div class="alert alert-success alert-dismissible fade show" style="text-align:center" role="alert">
        <strong>Su comentario ha sido agregado!</strong> 
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">
      </button>
      </div> `

        comment = "";
        starCount = 1;
    }
}

function showRelatedProducts(relatedProducts) { //Generar carrusel dinamicamente usando las posiciones del arreglo 
    console.log(relatedProducts);
    let addRelatedProducts = document.getElementById("addRelated");
    getJSONData(PRODUCTS_URL).then(productos => {
        if (productos.status = "ok") {
            let productArray = productos.data;
            let firstProduct = productArray[relatedProducts[0]];
            let secondProduct = productArray[relatedProducts[1]];
            addRelatedProducts.innerHTML = `<div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
            </div>
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img src="${firstProduct.imgSrc}" class="d-block w-100" alt="...">
                <div class="carousel-caption d-none d-md-block">
                  <h5>${firstProduct.name}</h5>
                  <p>${firstProduct.description}</p>
                </div>
              </div>
              <div class="carousel-item">
                <img src="${secondProduct.imgSrc}" class="d-block w-100" alt="...">
                <div class="carousel-caption d-none d-md-block">
                  <h5>${secondProduct.name}</h5>
                  <p>${secondProduct.description}</p>
                </div>
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>`
        }
    })



}




showProductInfo(); //Imprimo informacion.
showCommentsAndRatings(); //Imprimo comentarios por defecto.
