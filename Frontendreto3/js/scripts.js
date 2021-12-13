$(document).ready(function() {
    validateAuth();
    let user = localStorage.getItem('user');
    if (user) {
        let location = newLocation;
        console.log("location");
        let usr = JSON.parse(user);
        if (usr.type !== 'ADMIN') {
            $("#nav-registro").hide();
        }
    }
});

function validateAuth(){
    let user = JSON.parse(localStorage.getItem('user'));

    if(user){

    }else{
        $(".navbar-nav").hide();
    }
}

function esVacio(dato) {
    return !dato.trim().length;
}

let btnLogin = document.getElementById('btn-login');

btnLogin.addEventListener("click", () => {
    let usrEmail = $('#email').val();
    let usrPassword = $('#passw').val();


    if (esVacio(usrEmail) || esVacio(usrPassword)) {
        alert("Email y contraseña son requeridos");

    } else {
        getUserData(usrEmail, usrPassword);
    }

}, true);


function getUserData(email, password) {

    $.ajax({
        url: "http://localhost:8081/api/user/" + email + "/" + password,
        type: 'GET',
        contentType: "application/JSON",
        success: function(respuesta) {

            if (respuesta.name == null) {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Usuario o contraseña no validos',
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                localStorage.setItem("user", JSON.stringify(respuesta));
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Bienvenido ' + respuesta.name,
                    showConfirmButton: false,
                    timer: 1500
                });
                window.location.href = "http://127.0.0.1:5500/profile.html";
            };


        },
        error: function(xhr, status) {
            console.log(status);
        }

    });
}