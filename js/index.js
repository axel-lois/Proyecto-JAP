document.addEventListener("DOMContentLoaded", function(e){
    //Si el localStorage esta vacio, es decir, no loguee nunca, que me mande al login
    if (!localStorage.getItem("login") || JSON.parse(localStorage.getItem("login"))[0].emvalue == "")
        location.href = "login.html"
});