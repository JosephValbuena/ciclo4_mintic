$(document).ready(function() {
    validateAuth();
    getOrders();

    $("#formEditOrder").hide();
});

function validateAuth(){
    let user = JSON.parse(localStorage.getItem('user'));

    if(user){

    }else{
        $(".navbar-nav").hide();
    }
}

function getOrders(){
    let order = "";
    $.ajax({
        url: "http://localhost:8081/api/order/all",
        type: "GET",
        contentType: "application/json",
        success: function(response){
            for(let i=0; i< response.length; i++){
                order +=`
                    <tr>
                        <td>${response[i].id}</td>
                        <td>${response[i].registerDay}</td>
                        <td>${response[i].status}</td>
                        <td>${response[i].salesMan.id}</td>
                        <td>${response[i].salesMan.name}</td>
                        <td>${response[i].salesMan.email}</td>
                        <td><button type="button" class="btn btn-primary" onclick="seeDetail(${response[i].id})">Ver</button></td>
                    </tr>
                `
            }

            $("#tableB").html(order);
        }
    });
}

function seeDetail(id){
    $.ajax({
        url: "http://localhost:8081/api/order/"+id,
        type: "GET",
        contentType: "application/json",
        success: function(response){
            var mostrar = "";
            let productos = response.products;
            var cantidad  = response.quantities;
            
            for (const [clave, valor] of Object.entries(productos)) {
                let disponible;
                let solicitud = cantidad[clave];
                if(valor.availability == true) {
                    disponible = "SI";
                }else{
                    disponible = "NO";
                }

                mostrar += `
                    <tr>
                        <td>${valor.id}</td>
                        <td>${valor.brand}</td>
                        <td>${valor.model}</td>
                        <td>${valor.procesor}</td>
                        <td>${valor.os}</td>
                        <td>${valor.memory}</td>
                        <td>${valor.hardDrive}</td>
                        <td>${valor.description}</td>
                        <td>${disponible}</td>
                        <td>${valor.price}</td>
                        <td>${valor.quantity}</td>
                        <td>${valor.photography}</td>
                        <td>${solicitud}</td>
                    </tr>
                `;
            }
            
            $("#tableDeatil").html(mostrar);
        }
    })
    
    $(".buttonEditD").html(`<button class="btn btn-primary" type="button" id="btnEditD" onclick="editStatus(${id})">Editar Estado</button>`);
    $("#formEditOrder").show();
}

function editStatus(id){
    var statusD = $("#selectEditD").val();
    if(statusD == ""){
        alert("debe seleccionar un estado");
    }else{
        $.ajax({
            url: "http://localhost:8081/api/order/"+id,
            type: "GET",
            contentType: "application/json",
            success: function(response){
                response.status = statusD;
                $.ajax({
                    url: "http://localhost:8081/api/order/update",
                    type: "PUT",
                    contentType: "application/json",
                    dataType: "json",
                    data: JSON.stringify(response),
                    success: function(update){
                        alert(`La orden de pedido ha cambiado su estado a ${update.status}`);
                        window.reload();
                    },
                    error: function(){
                        alert("No ha sido posible guardar el nuevo estado");
                    }
                });
            }

        });
    }

}

$("#close-popup").click(function(){
    $("#formEditOrder").hide();
});
