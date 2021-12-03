$(document).ready(function() {
    $("#formEdit").hide();
    getUsers();
});

function getUsers() {
    $.ajax({
        url: "http://localhost:8080/api/user/all",
        type: 'GET',
        contentType: "application/JSON",
        success: function(respuesta) {
            let users = "";
            for (let i = 0; i < respuesta.length; i++) {
                users += `
                <tr>
                    <td>${respuesta[i].id}</td>
                    <td>${respuesta[i].identification}</td>
                    <td>${respuesta[i].name}</td>
                    <td>${respuesta[i].address}</td>
                    <td>${respuesta[i].cellPhone}</td>
                    <td>${respuesta[i].email}</td>
                    <td>${respuesta[i].zone}</td>
                    <td>${respuesta[i].type}</td>                
                    <td>
                        <button onclick="editAdmin(${respuesta[i].id})" class="btn btn-dark">Editar</button>
                        <button onclick="deleteAdmin(${respuesta[i].id})" class="btn btn-danger">Eliminar</button>
                    </td>
                </tr>
            `;
            }

            $("#table").html(users);
        },
        error: function(xhr, status) {
            console.log(status);
        }

    });
}

function openNAdmin() {
    window.location.href = "registro.html";
}