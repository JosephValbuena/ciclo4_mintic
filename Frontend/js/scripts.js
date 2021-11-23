


$(document).ready(function () {
    //configura el aspecto inicial de la pagina
    getPetition();
});

function esVacio(dato){
    return !dato.trim().length;
}

let btnLogin = document.getElementById('btn-login');

btnLogin.addEventListener("click", () =>{
    let usrEmail = $('#exampleInputEmail1').val();
    let usrPassword = $('#exampleInputPassword1').val();
    let modal = $('#modal-body');
    let pltMessage = "";  
        

    if (esVacio(usrEmail) || esVacio(usrPassword)){
        
        pltMessage = "Email y contraseña son requeridos";
        modal.html(pltMessage);
    } else {
        
        getUserData();
    }

}, true);


function getPetition() {
    
    $.ajax({
        url: "http://localhost:8080/api/user/all",
        type: 'GET',
        contentType:"application/JSON",

        success: function (respuesta) {
            console.log(respuesta);
            return respuesta;
        },
        error: function(xhr, status) {
            console.log(status);
        }
    });
}

function getUserData() {
    var email= $('#exampleInputEmail1').val(),
        password= $('#exampleInputPassword1').val(),
        modal = $('#modal-body'),
        pltMessage = "";
    
    
    $.ajax({
        url:"http://localhost:8080/api/user/" + email + "/" + password,
        type: 'GET',
        contentType:"application/JSON",

        success: function(respuesta){
            console.log(respuesta);
            if (respuesta == false || respuesta.name == "NO DEFINIDO"){
                pltMessage = "Usuario o contraseña incorrectos";
                modal.html(pltMessage);
            }else {
                pltMessage = "Bienvenido " + respuesta.name;
                modal.html(pltMessage);
            };
            
           
        },
        error: function(xhr, status) {
            console.log(status);
        }

    });
}



let btnCerrarModal = document.getElementById('close-modal');

btnCerrarModal.addEventListener("click", () =>{
    $('#exampleInputEmail1').val("");
    $('#exampleInputPassword1').val("");
});