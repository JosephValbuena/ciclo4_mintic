$(document).ready(function() {
    validateAuth();
    getUser();
    getUsers();
    $("#formOrder").hide();
});

var cantidadProductos = [0];
var products = new Object();
var quantities = new Object();
var orderToSend = new Object();
var can;
var verif2 = false;
var iProv = "";
var idNewOrder = 0;

function validateAuth(){
    let user = JSON.parse(localStorage.getItem('user'));

    if(user){

    }else{
        $(".navbar-nav").hide();
    }
}


function getUser(){
    let user = JSON.parse(localStorage.getItem('user'));
    let data = '';

    data = `
        <div class="col-md-4 userData">
            <h5>Correo Electrónico</h5>
            <p>${user.email}</p>
        </div>
        <div class="col-md-4 userData">
            <h5>Dirección</h5>
            <p>${user.address}</p>
        </div>
        <div class="col-md-4 userData">
            <h5>Teléfono Celular</h5>
            <p>${user.cellPhone}</p>
        </div>
        <div class="col-md-4 userData">
            <h5>Mes de Nacimiento</h5>
            <p>${user.monthBirthtDay}</p>
        </div>
        <div class="col-md-4 userData">
            <h5>Tipo de Usuario</h5>
            <p>${user.type}</p>
        </div>
        <div class="col-md-4 userData">
            <h5>Zona de trabajo</h5>
            <p>${user.zone}</p>
        </div>
    `;

    $(".holderUserData").html(data);

}

function getUsers(){
    $.ajax({
        url: "http://129.151.118.226:8081/api/user/all",
        type: "GET",
        contentType: "application/json",
        success: function(response){
            let actualUser = JSON.parse(localStorage.getItem('user'));
            let coordExist;
            let aseExist;

            if(actualUser.type == "ASE"){
                for(let i=0; i<response.length; i++){
                    if(actualUser.zone == response[i].zone && response[i].type == "COORD"){
                        coordExist = true;
                        break;
                    }else{
                        coordExist = false;
                    }
                }
    
                enableButtonAse(false);
                enableButtonCoord(coordExist);
            }else{
                let aseExist;
                for(let i=0; i<response.length; i++){

                    if(actualUser.zone == response[i].zone && response[i].type == "ASE"){
                        aseExist = true;
                        break;
                    }else{
                        aseExist = false;
                    }
                }

                enableButtonCoord(false);
                enableButtonAse(aseExist);
            }

            
        }
    });
}

function enableButtonCoord(exist){
    if(exist){
        $(".btnNewOrder").show();
    }else{
        $(".btnNewOrder").hide();
    }
}

function enableButtonAse(exist){
    if(exist){
        $(".btnOrdersCoord").show();
    }else{
        $(".btnOrdersCoord").hide();
    }
}

function getProducts(){
    $("#formOrder").show();
    $.ajax({
        url: 'http://129.151.118.226:8081/api/laptop/all',
        type: 'GET',
        contentType: 'application/json',
        success: function(response){
            let buttonS ="";
            for(let i=0; i<response.length; i++){
                buttonS += `
                    <option value="${response[i].id}">${response[i].brand} - ${response[i].model}</option>
                `;
            }

            $("#selectPro").html(buttonS);
        }
    });
}

function getSelectedProduct(){
    
    let value = $("#selectPro").val();
    
    for(let i=0; i < cantidadProductos.length; i++){
        if(cantidadProductos[i] == value){
            alert("Ya seleccionaste este producto");
            can = false;
        }else{
            can = true;
        }
    }

    if(can){
        $.ajax({
            url: 'http://129.151.118.226:8081/api/laptop/'+value,
            type: 'GET',
            contentType: 'application/json',
            success: function(response){
                let orders = $(".secondStep").html();
                let value = $("#selectPro").val();
                countProd(value);
                orders += `
                <div class="prod">
                    <div class="product-${response.id}">
                        <p>${response.brand} - ${response.model}</p>
                    </div>
                        <div class="cantidad">
                        <label for="cantidadInput">Selecciona la cantidad</label>
                        <input type="number" class="form-control" id="cantidadInput-${response.id}" required>
                    </div>
                </div>`;

                $(".secondStep").html(orders);

                
            }
        });
    }
}

function postOrder(){

    for(let i=1; i<cantidadProductos.length;i++ ){
        iProv = i.toString();
        $.ajax({
            url: 'http://129.151.118.226:8081/api/laptop/'+cantidadProductos[i],
            type: 'GET',
            contentType: 'application/json',
            success: function(response){
                generateProds(iProv.toString(), response);
            }
        });
    }

    
    for(let i=1; i<cantidadProductos.length;i++ ){
        let producto = $(`#cantidadInput-${cantidadProductos[i]}`).val();

        if(producto == ""){
            alert("la cantidad es necesaria")
            verif2 = false;
        }else{
            generateQuantities(i.toString(), parseInt(producto));
            verif2 = true;
        }
    }

    if(verif2){
        getIdOrder();
    }
}

function generateProds(id, response){
    products[`${id}`] = response;
}

function generateQuantities(id, response){
    quantities[`${id}`] = response;
}

function getIdOrder(){
    $.ajax({
        url: "http://129.151.118.226:8081/api/order/all",
        type: "GET",
        contentType: "application/json",
        success: function(response){
            for(let i=0; i < response.length; i++){
                if(idNewOrder < response[i].id){
                    idNewOrder = response[i].id;
                }
            }

            idNewOrder += 1;
            allOrder();
        }
    });
}

function allOrder(){
    orderToSend["id"] = idNewOrder;
    orderToSend["registerDay"] = new Date();
    orderToSend["status"] = "Pendiente";
    orderToSend["salesMan"] = JSON.parse(localStorage.getItem('user'));
    orderToSend["products"] = products;
    orderToSend["quantities"] = quantities;

    console.log(orderToSend);
    $.ajax({
        url: 'http://129.151.118.226:8081/api/order/new',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(orderToSend),
        success: function(response){
            alert("El código de tu pedido es: "+orderToSend.id);
            window.reload();
        },
        error: function(error){
            console.log(error);
        }
    })
}

function countProd(value){
    cantidadProductos.push(value);
}

$(".btnOrdersCoord").click(function(){
    location.href = "http://127.0.0.1:5500/orderTable.html";
});

$("#btn-order").click(function(){
    postOrder();
});

$("#btnSelectPro").click(function(){
    getSelectedProduct();
});

$(".btnNewOrder").click(function(){
    getProducts();
});

$("#close-popup").click(function(){
    $("#formOrder").hide();
});