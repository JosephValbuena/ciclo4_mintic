
function saveProd(){
    
    let disponibilidad;

    ($('#availabilityProd') == "disponible") ? disponibilidad =true: disponibilidad=false;

    let prodData ={
        id: $('#Codigoproducto').val(),
        brand: $('#brandProd').val(),
        model: $('#modelProd').val(),
        procesor: $('#processorProd').val(),
        os: $('#osProd').val(),
        description: $('#descriptionProd').val(),
        memory: $('#memoryProd').val(),
        hardDrive: $('#hardDriveProd').val(),
        availability: disponibilidad,
        price: $('#priceProd').val(),
        quantity: $('#quantityProd').val(),
        photography: $('#photoProd').val()
    }
    let dataToSend = JSON.stringify(prodData);

    $.ajax({
        url:"http://localhost:8081/api/laptop/new",
        data: dataToSend,
        type: "POST",
        contentType:"application/JSON",
        success: function(respuesta){
            console.log(respuesta);
            alert("El producto ha sido registrado correctamente");
            backProdList();
        },
        error: function(xhr, status){
            console.log("No se registró el producto " + status);
            alert("El producto no pudo ser registrado, por favor intentelo de nuevo.");
        }
    });
}

function backProdList(){
    window.location.href="listaProductos.html";
}