$(document).ready(function() {
    validateAuth();
    $("#formEdit").hide();
    getUsers();
});

function validateAuth(){
    let user = JSON.parse(localStorage.getItem('user'));

    if(user){

    }else{
        $(".navbar-nav").hide();
    }
}

function getUsers() {
    $.ajax({
        url: "http://129.151.118.226:8081/api/user/all",
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