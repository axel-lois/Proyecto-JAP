document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("logout").addEventListener("click", function() {
        localStorage.clear();
    })
    var arreglo = JSON.parse(localStorage.getItem("login"));
    var nombre = arreglo[0].emvalue;
     document.getElementById("navbarDropdown").innerHTML += " " + nombre;
});