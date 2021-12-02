$(document).ready(function() {

});

function esVacio(dato) {
    return !dato.trim().length;
}

let btn = document.getElementById('btn-sign');

btn.addEventListener('click', () => {
    var id = 0;
    $.ajax({
        url: "http://localhost:8080/api/user/all",
        type: "GET",
        contentType: "application/JSON",
        success: function(response) {
            if (response) {
                for (let i = 0; i < response.length; i++) {
                    if (response[i].id > id) {
                        id = response[i].id;
                    }
                }

                id = id + 1;
                let identification = $("#identification").val();
                var name = $("#name").val();
                let address = $("#address").val();
                let cellPhone = $("#phone").val();
                var email = $("#email").val();
                var password = $("#passw").val();
                var repeatPassw = $("#repeatPassw").val();
                let zone = $('input:radio[name=zone]:checked').val();
                let type = $('input:radio[name=type]:checked').val();

                if (esVacio(cellPhone) || esVacio(address) || esVacio(identification) || esVacio(name) || esVacio(email) || esVacio(password || esVacio(repeatPassw))) {
                    alert("Todos los campos son requeridos, por favor revisa");
                } else if (password !== repeatPassw) {
                    alert("Las contraseñas no coninciden, por favor revisa");
                } else {
                    var data = {
                        "id": id,
                        "identification": identification,
                        "name": name,
                        "address": address,
                        "cellPhone": cellPhone,
                        "email": email,
                        "password": password,
                        "zone": zone,
                        "type": type
                    };
                    console.log(data);
                    //validateEmail(data);
                }
            }
        }
    });
});

function validateEmail(data) {
    var result;
    $.ajax({
        url: "http://localhost:8080/api/user/emailexist/" + data.email,
        type: "GET",
        contentType: "application/JSON",
        success: function(response) {
            if (response) {
                alert("Correo ya existe");
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
            if (response.name == "NO DEFINIDO") {
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