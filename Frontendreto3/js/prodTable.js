$(document).ready(function() {
    validateAuth();
    peticionProd();
});

function validateAuth(){
    let user = JSON.parse(localStorage.getItem('user'));

    if(user){

    }else{
        $(".navbar-nav").hide();
    }
}

let tableProd = $('#table-prod'),
    editForm = $('#edit-form');


function peticionProd () {
    //let table = "<table><tr><th>Marca</th><th>Modelo</th><th>Descripción</th>"

    $.ajax({
        url:"http://localhost:8081/api/laptop/all",
        type:"GET",
        contentType:"application/JSON",

        success: function (respuesta){
            //tableProd.html(table);
            datosProductos(respuesta);
            console.log("realizó la petición");
            console.log(respuesta);
        },
        error: function(xhr, status){
            console.log("NO realizó la petición");
            console.log(status);
        }
    });
   
}

function datosProductos(items) {

    var table = '<h2>Listado de Productos</h2><a href="productoForm.html" class="btn btn-secondary" id="new-product">Nuevo Producto</a><table class="table"><tr><th>Marca</th><th>Modelo</th><th>Descripción</th><th colspan="2">Acciones</th></tr>';

    for (var i=0; i< items.length; i++) {
        table +=`<tr>
                    <td>${items[i].brand}</td>
                    <td>${items[i].model}</td>
                    <td>${items[i].description}</td>
                    <td><button class="btn btn-outline-success" onclick="editarProducto(${items[i].id})">Editar</button></td>
                    <td><button class="btn btn-outline-danger" onclick="borraProducto(${items[i].id})">Borrar</button></td>
                </tr>`;        
    }

    table += '</table>';
    console.log(table);

    tableProd.html(table);

}



function editarProducto(item) {

        $.ajax({
            url:"http://localhost:8081/api/laptop/"+item,
            type:"GET",
            contentType:"application/JSON",
            dataType: 'json',

            success: function(respuesta){
                console.log("Los datos del producto son: ")
                console.log(respuesta);
                creaForm(respuesta);
                
            },
            error: function(xhr, status){
                console.log("La petición ha fallado "+ status);
            }
        });
}

function creaForm (item){

    let disponibilidad = "";
    if (item.availability){
        disponibilidad = '<option value="">Selecciona disponibilidad</option><option selected value="disponible">Disponible</option><option value="noDisponible">No disponible</option>'
    }else{
        disponibilidad = '<option value="">Selecciona disponibilidad</option><option value="disponible">Disponible</option><option selected value="noDisponible">No disponible</option>'
    }
    var form =  `<form id="" class="p-4">
                    <h2 class="text-center text-dark">Registrar Producto</h2>
                    <div class="form-group">
                        <label for="Codigoproducto" class="text-dark ">Codigo</label><br />
                        <input type="text" name="Codigoproducto" id="Codigoproducto" class="form-control" value="${item.id}" disabled/>
                    </div>
                    <div class="form-group">
                        <label for="brandProd" class="text-dark ">Marca</label><br />
                        <input type="text" name="brandProd" id="brandProd" class="form-control" value="${item.brand}" required />
                    </div>
                    <div class="form-group">
                        <label for="modelProd" class="text-dark">Modelo</label><br />
                        <input type="text" name="modelProd" id="modelProd" class="form-control" value="${item.model}" required/>
                    </div>
                    <div class="form-group">
                        <label for="processorProd" class="text-dark">Procesador</label><br>
                        <input type="text" name="processorProd" id="processorProd" class="form-control" value="${item.procesor}" required/>
                    </div>
                    <div class="form-group">
                        <label for="osProd" class="text-dark">Sistema Operativo</label><br>
                        <input type="text" name="osProd" id="osProd" class="form-control" value="${item.os}" required/>
                    </div>
                    <div class="form-group">
                        <label for="memoryProd" class="text-dark">Memoria</label><br>
                        <input type="text" name="memoryProd" id="memoryProd" class="form-control" value="${item.memory}" required/>
                    </div>
                    <div class="form-group">
                        <label for="hardDriveProd" class="text-dark">Disco duro</label><br>
                        <input type="text" name="hardDriveProd" id="hardDriveProd" class="form-control" value="${item.hardDrive}" required/>
                    </div>
                    <div class="form-group">
                        <label for="descriptionProd" class="text-dark">Descripción</label>
                        <input type="text" name="descriptionProd" id="descriptionProd" class="form-control" value="${item.description}" required/>
                    </div>
                    <div class="form-group">
                        <label for="availabilityProd" class="text-dark">Disponibilidad</label><br>
                        <select name="availabilityProd" id="availabilityProd" class="form-control" required/>
                            ${disponibilidad}
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="priceProd" class="text-dark">Precio</label><br>
                        <input type="number" name="priceProd" id="priceProd" class="form-control" value="${item.price}" required/>
                    </div>
                    <div class="form-group">
                        <label for="quantityProd" class="text-drak">Cantidad</label><br>
                        <input type="number" name="quantityProd" id="quantityProd" class="form-control" value="${item.quantity}" required/>
                    </div> 
                    <div class="form-group">
                        <label for="photoProd" class="text-dark">Fotografía</label><br>
                        <input type="url" name="photoProd" id="photoProd" class="form-control" value="${item.photography}" required/>
                    </div>  
                    <div class="mt-4 form-group text-center">
                        <button type="button" name="guardaeDatos" class="btn btn-dark btn-md" id="btn-guardar" onclick="prodUpdate()">Guardar</>
                    </div>                 
                </form>`;
                editForm.html(form);

              
}

function prodUpdate() {
    let dataAvailability;

    if ($('#availabilityProd').val() == "disponible"){
        dataAvailability = true;
    }else {
        dataAvailability = false;
    }

    let dataProd ={
        id: $('#Codigoproducto').val(),
        brand: $('#brandProd').val(),
        model: $('#modelProd').val(),
        procesor: $('#processorProd').val(),
        os: $('#osProd').val(),
        description: $('#descriptionProd').val(),
        memory: $('#memoryProd').val(),
        hardDrive: $('#hardDriveProd').val(),
        availability: dataAvailability,
        price: $('#priceProd').val(),
        quantity: $('#quantityProd').val(),
        photography: $('#photoProd').val() 

    };
    let dataUpdate = JSON.stringify(dataProd);
    console.log("Los datos JSON son: "+dataUpdate);

    $.ajax({
        url:"http://localhost:8081/api/laptop/update",
        data: dataUpdate,
        type:"PUT",
        contentType:"application/JSON",

        success: function(respuesta){
            console.log(respuesta);
            alert("Los datos fueron actualizados correctamente");
            peticionProd ();
            editForm.html("");
        },
        error: function (xhr, status){
            console.log(status);
            alert("Los datos no se guaradaron correctamente, por favor intentelo de nuevo.");
        }
    })
}


function borraProducto(item) {
    let deleteProd = confirm("Está seguro que desea borrar este producto, el borrado no es reversible.");

    if (deleteProd == true){
        $.ajax({
            url:"http://localhost:8081/api/laptop/"+item,
            type:"DELETE",
            contentType:"application/JSON",
            dataType:"json",
            success: function(respuesta){
                console.log(respuesta);
                peticionProd();
                alert("El producto ha sido eliminado de la base de datos.");
            },
            error: function(xhr,status){
                console.log("No se elimino el registro "+status);
                alert("El producto no pudo ser eliminado, por favor intentelo de nuevo.");
            } 

        });
    }else {
        alert("El producto no será eliminado.");        
    }
}


