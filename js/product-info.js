//Atrapo todas las partes de mi pagina en las que voy a agregar informacion
var productContainer = document.getElementById("product-container");
var productTitle = document.getElementById("product-title");
var productDescription = document.getElementById("product-description");
var productCategory = document.getElementById("product-category");
var productCost = document.getElementById("product-cost");
var productSoldCount = document.getElementById("product-soldCount");
var productImages = document.getElementById("product-images");
var productComments = document.getElementById("comments-section");
var commentSubmit = document.getElementById("submit");




function showProductInfo() { //Muestro todos los datos, menos los comentarios
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
            productImages.innerHTML +=  `
            <div class="col-lg-3 col-md-4 col-6">
                <div class="d-block mb-4 h-100">
                    <img class="img-fluid img-thumbnail" src="` + array[i] + `" alt="">
                </div>
            </div>
            `
        }
    }
})

}

function showCommentsAndRatings() { //Muestro los comentarios
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(comentarios => {
        if (comentarios.status == "ok") {
            let infoArray = comentarios.data;
            let stars = "";
            for(let i = 0; i < infoArray.length;i++) {
                for(let j = 0; j < infoArray[i].score;j++) {
                    stars +=`<span class="fa fa-star checked"></span>`;
                } 
                productComments.innerHTML+= `<div id="coment-container">
                <p id="username">${infoArray[i].user}${stars}</p>

                <p id="date">${infoArray[i].dateTime}</p>

                <p id="testimonial">${infoArray[i].description}</p>
                
            </div>`
            stars = "";
            }
        }
    })
}







//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

    showProductInfo(); //Imprimo informacion
    showCommentsAndRatings(); //Imprimo comentarios
    //No funciona el evento pero la logica esta bien pensada.
    commentSubmit.addEventListener("click",function(e) {
        e.preventDefault();
        let fecha = new Date;
        let today = fecha.getFullYear() + "-"+ fecha.getMonth() + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
        let starCount = document.getElementById("star-rating").value;
        let comment = document.getElementById("textarea").value;
        var arreglo = JSON.parse(localStorage.getItem("login"));
        var nombre = arreglo[0].emvalue;
        let stars;
        for(let j = 0; j < starCount;j++) {
            stars +=`<span class="fa fa-star checked"></span>`;
        }
        productComments.innerHTML+= `<div id="coment-container">
        <p id="username">${nombre}${stars}</p>

        <p id="date">${today}</p>

        <p id="testimonial">${comment}</p>
        
    </div>`
    comment.value = "";
    starCount.value = 1;
    })

});