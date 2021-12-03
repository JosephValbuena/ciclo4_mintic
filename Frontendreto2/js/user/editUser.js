function editAdmin(id) {
    getUser(id);
    $("#formEdit").show();
}

function esVacio(dato) {
    return !dato.trim().length;
}

function getUser(id) {
    $.ajax({
        url: "http://localhost:8080/api/user/all",
        type: "GET",
        dataType: "json",
        success: function(users) {
            for (let i = 0; i < users.length; i++) {
                if (id == users[i].id) {
                    putInformation(users[i]);
                    break;
                }
            }
        }
    });
}

function putInformation(user) {
    $("#id").val(user.id);
    $("#identification").val(user.identification);
    $("#name").val(user.name);
    $("#address").val(user.address);
    $("#phone").val(user.cellPhone);
    $("#email").val(user.email);
    $("#passw").val(user.password);
    $("#repeatPassw").val(user.password);
}

$("#btn-edit").click(function() {
    let id = $("#id").val();
    let identification = $("#identification").val();
    var name = $("#name").val();
    let address = $("#address").val();
    let cellPhone = $("#phone").val();
    let email = $("#email").val();
    let password = $("#passw").val();
    let repeatPassw = $("#repeatPassw").val();
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
        editUser(data);
    }
});

function editUser(user) {
    $.ajax({
        url: "http://localhost:8080/api/user/update",
        type: "PUT",
        dataType: "json",
        contentType: "application/JSON",
        data: JSON.stringify(user),
        success: function() {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Usuario Editado',
                showConfirmButton: false,
                timer: 1000
            });

            setTimeout(function() {
                window.location.href = "tableUser.html";
            }, 1000);
        }
    });
}

$(".closeEdit").click(function() {
    $("#formEdit").hide();
});


//ELIMINAR USUARIO
function deleteAdmin(id) {
    Swal.fire({
        title: '¿Está seguro de eliminar al usuario?',
        showDenyButton: true,
        confirmButtonText: 'Sí, borrar',
        denyButtonText: `No, cancelar`,
    }).then((result) => {
        if (result.isConfirmed) {
            deleteU(id);
        } else if (result.isDenied) {

        }
    })
}

function deleteU(id) {
    $.ajax({
        url: "http://localhost:8080/api/user/" + id,
        type: "DELETE",
        dataType: "json",
        contentType: "application/JSON",
        success: function() {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Usuario Eliminado',
                showConfirmButton: false,
                timer: 1000
            });

            setTimeout(function() {
                window.location.href = "tableUser.html";
            }, 1000);
        }
    });
}