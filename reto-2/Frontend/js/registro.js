$(document).ready(function() {

});

function esVacio(dato) {
    return !dato.trim().length;
}

let btn = document.getElementById('btn-sign');

btn.addEventListener('click', () => {
    var name = $("#name").val();
    var email = $("#email").val();
    var password = $("#passw").val();
    var repeatPassw = $("#repeatPassw").val();


    if (esVacio(name) || esVacio(email) || esVacio(password || esVacio(repeatPassw))) {
        alert("Todos los campos son requeridos, por favor revisa");
    } else if (password !== repeatPassw) {
        alert("Las contraseñas no coninciden, por favor revisa");
    } else {
        var data = {
            "name": name,
            "email": email,
            "password": password
        };

        validateEmail(data);
    }
});

function validateEmail(data) {
    var result;
    $.ajax({
        url: "http://localhost:8080/api/user/" + data.email,
        type: "GET",
        contentType: "application/JSON",
        success: function(response) {
            if (response) {
                alert("No fue posible crear la cuenta");
            } else {
                validateAuth(data);
            }
        }
    });
}

function validateAuth(data) {
    $.ajax({
        url: "http://localhost:8080/api/user/" + data.email + "/" + data.password,
        type: "GET",
        contentType: "application/JSON",
        success: function(response) {
            if (response.name !== "NO DEFINIDO") {
                alert("No fue posible crear la cuenta");
            } else {
                signout(data);
            }
        }
    });
}

function signout(data) {

    $.ajax({
        url: "http://localhost:8080/api/user/new",
        type: "POST",
        dataType: "json",
        contentType: "application/JSON",
        data: JSON.stringify(data),
        success: function(data) {
            alert("Cuenta creada de forma correcta");
            window.location.href = "index.html";
        }
    });
}