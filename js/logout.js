

document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("logout").addEventListener("click", function() {
        localStorage.removeItem("login");
    })
    let arreglo = JSON.parse(localStorage.getItem("login"));
    let nombre = arreglo[0].emvalue;
     document.getElementById("navbarDropdown").innerHTML += " " + nombre;
});