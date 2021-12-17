import React, {useEffect} from 'react';

//Componentes
import axios from 'axios';
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {useForm} from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
//Imagenes
import fotoPerfil from '../../img/profile.png';
//Estilos
import '../../styles/profile.css';

const Profile = () => {

    var user = JSON.parse(localStorage.getItem('user'));
    var productosSeleccinados = [0];
    var verifP = false;
    var verifQ = false;
    var products = new Object();
    var quantities = new Object();
    var orderToSend = new Object();
    var updateState;

    const navigate = useNavigate();

    const {register, formState: { errors }, handleSubmit} = useForm({
        defaultValues:{
            id: 1
        }
    });

    const addProduct = (data) =>{
        console.log(data);
    }

    useEffect(() =>{
        document.getElementById("formOrder").style.display = "none";
        closeDateModal();
        closeStatusModal();
        closeDetailModal();
        closeProductsModal();
        loadDataProfile();
        loadOrderButtons();
        getProducts();
    });

    //Método para mostrar datos del usuario
    const loadDataProfile = () => {
        let data = `
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

        let holder = document.getElementById("holderUserData");
        holder.innerHTML = data;
    }

    //Método para saber si lógica de botones de pedidos y lista de pedidos
    const loadOrderButtons = () => {
        axios.get('http://129.151.118.226:8082/api/user/all')
            .then(response => {
                let match = true;
                if(user.type == "ASE"){
                    for(let i=0; i<response.data.length; i++){
                        if(user.zone == response.data[i].zone && response.data[i].type == "COORD"){
                            match = true;
                            break;
                        }else{
                            match = false;
                        }
                    }

                    if(match){
                        document.getElementById("btnNewOrder").style.display = "inline";
                        document.getElementById("btnSearchByDate").style.display = "inline";
                        document.getElementById("btnSearchByStatus").style.display = "inline";
                        document.getElementById("btnOrdersCoord").style.display = "none";
                    }else{
                        document.getElementById("btnNewOrder").style.display = "none";
                        document.getElementById("btnOrdersCoord").style.display = "none";
                    }

                }else{

                    for(let i=0; i<response.data.length; i++){
                        if(user.zone == response.data[i].zone && response.data[i].type == "ASE"){
                            match = true;
                            break;
                        }else{
                            match = false;
                        }
                    }

                    if(match){
                        document.getElementById("btnNewOrder").style.display = "none";
                        document.getElementById("btnOrdersCoord").style.display = "inline";

                    }else{
                        document.getElementById("btnNewOrder").style.display = "none";
                        document.getElementById("btnOrdersCoord").style.display = "none";
                    }
                }
            })
            .catch(err => console.log(err));
    }

    //Método para abrir la vista donde aparece la tabla de ordenes
    const goToOrderTables = () => {
        console.log("entre");
        navigate('/orders', { replace: true });
    }

    //Método para abrir el modal para nueva orden
    const openModal = () => {
        document.getElementById("formOrder").style.display = "block";
    }

    //Método que obtiene todos los productos para el select de nuevas ordenes
    const getProducts = () =>{
        axios.get('http://129.151.118.226:8082/api/laptop/all')
            .then(response => {
                var values = '';
                var productos = response.data;

                for(let i=0; i<productos.length; i++) {
                    values += `<option value="${productos[i].id}">${productos[i].brand} - ${productos[i].model}</option>`
                }

                document.getElementById("selectPro").innerHTML = values;
            })
            .catch(err => console.log(err))
    }

    //Método para seleccionar un producto del select
    const selectElement = () => {
        let producto = document.querySelector("#selectPro").value;
        let can;
        for(let i=0; i < productosSeleccinados.length; i++){
            if(productosSeleccinados[i] == producto){
                alert("Ya seleccionaste este producto");
                can = false;
                break;
            }else{
                can = true;
            }
        }

        if(can){
            productosSeleccinados.push(producto);
            axios.get('http://129.151.118.226:8082/api/laptop/'+producto)
                .then(response => {
                    let orders = document.getElementById("secondStep").outerHTML;
                    console.log(orders);
                    orders += `
                    <div class="prod">
                        <div class="product-${response.data.id}">
                            <p>${response.data.brand} - ${response.data.model}</p>
                        </div>
                            <div class="cantidad">
                            <label for="cantidadInput">Selecciona la cantidad</label>
                            <input type="number" class="form-control" id="cantidadInput-${response.data.id}" required>
                        </div>
                    </div>`;
                    document.getElementById("secondStep").innerHTML = orders;
                })
                .catch(err => console.log(err));
        }
    }

    //Método para verificar producto que será enviado al backend
    const checkProducts = () =>{
        for(let i=1; i <productosSeleccinados.length; i++){
            let id = i.toString();
            axios.get('http://129.151.118.226:8082/api/laptop/'+i)
                .then((response) =>{
                    products[`${id}`] = response.data;
                    verifP = true;
                })
                .catch((err) =>{
                    console.log(err);
                    verifP = false;
                })
        }

        for(let i=1; i <productosSeleccinados.length; i++){
            let id = i.toString();
            let cantidad = document.getElementById("cantidadInput-"+id).value;
            if(cantidad == ""){
                alert("la cantidad es necesaria");
                verifQ = false;
                break;
            }else{
                quantities[`${id}`] = cantidad;
                verifQ = true;
            }
        }

        sendData();
    }

    //Método que envía el producto al backend
    const sendData = () => {
        if(verifQ && verifP){
            orderToSend["id"] = null;
            orderToSend["registerDay"] = new Date();
            orderToSend["status"] = "Pendiente";
            orderToSend["salesMan"] = JSON.parse(localStorage.getItem('user'));
            orderToSend["products"] = products;
            orderToSend["quantities"] = quantities;

            axios.post('http://129.151.118.226:8082/api/order/new', orderToSend)
                .then(response =>{
                    alert("El código de tu pedido es: "+response.data.id);
                    document.location.reload();
                })
                .catch(err => console.log(err));
        }
    }

    //Métdo para cerrar el modal
    const closeModal = () => {
        document.getElementById("formOrder").style.display = "none";
    }

    //Métodos Reto 4 ------------------------------------------------------------------------------------

    //Método que muestra la lista de pedidos para fecha
    const ordersByUserD = () => {

        axios.get('http://129.151.118.226:8082/api/order/salesman/'+user.id)
        .then(response =>{
            let modificate = "";
            document.getElementById('tableDate').innerHTML = modificate;
            for(let i =0; i< response.data.length; i++){
                modificate += `
                <tr>
                    <td>${response.data[i].id}</td>
                    <td>${response.data[i].registerDay}</td>
                    <td>${response.data[i].status}</td>
                    <td>${response.data[i].salesMan.id}</td>
                    <td>${response.data[i].salesMan.name}</td>
                    <td>${response.data[i].salesMan.email}</td>
                </tr>
                `
            }

            document.getElementById('tableDate').innerHTML = modificate;
            openDateModal();

        })
        .catch(err => console.log(err));        
    }

    //Método que muestra la lista de pedidos para estado
    const ordersByUserS = () => {
        axios.get('http://129.151.118.226:8082/api/order/salesman/'+user.id)
        .then(response =>{
            let modificate = "";
            document.getElementById('tableStatus').innerHTML = modificate;

            for(let i =0; i< response.data.length; i++){
                modificate += `
                <tr>
                    <td>${response.data[i].id}</td>
                    <td>${response.data[i].registerDay}</td>
                    <td>${response.data[i].status}</td>
                    <td>${response.data[i].salesMan.id}</td>
                    <td>${response.data[i].salesMan.name}</td>
                    <td>${response.data[i].salesMan.email}</td>
                </tr>
                `
            }

            document.getElementById('tableStatus').innerHTML = modificate;
            openStatusModal();

        })
        .catch(err => console.log(err));

        
    }

    //Método que filtra por fecha
    const filterOrdersByD = () => {
        let year = document.getElementById('year').value;
        let month = document.getElementById('month').value;
        let day = document.getElementById('day').value;

        if(year == "" || month == "" || day == "" || year == null || month == null || day == null){
            alert("Para filtrar debes llenar todos los campos");
        }else{
            let date = `${year}-${month}-${day}`;
            axios.get(`http://129.151.118.226:8082/api/order/date/${date}/${user.id}`)
            .then(response => {
                document.getElementById('tableDate').innerHTML = "";
                let filtered = "";

                if(response.data.length == 0){
                    document.getElementById('tableDate').innerHTML = "<h4>No se encontraron resultados</h4>";
                }else{
                    for(let i=0; i < response.data.length; i++){
                        filtered += `
                        <tr>
                            <td>${response.data[i].id}</td>
                            <td>${response.data[i].registerDay}</td>
                            <td>${response.data[i].status}</td>
                            <td>${response.data[i].salesMan.id}</td>
                            <td>${response.data[i].salesMan.name}</td>
                            <td>${response.data[i].salesMan.email}</td>
                        </tr> 
                        `;
                    }

                    document.getElementById('tableDate').innerHTML = filtered;
                }
                
            })
            .catch(err => console.log(err));
        }
    }

    //Método que filtra por estado
    const filterOrdersByS = () => {
        let status = document.getElementById('selectFilterStatus').value;
        if(status == ""){
            alert("Debes seleccionar un estado para filtrar");
        }else{
            axios.get(`http://129.151.118.226:8082/api/order/state/${status}/${user.id}`)
            .then(response =>{
                let modificate = "";
                document.getElementById('tableStatus').innerHTML = modificate;

                if(response.data.length == 0){
                    modificate = "<h4>No se encontró información</h4>";
                }else{
                    for(let i =0; i< response.data.length; i++){
                        modificate += `
                        <tr>
                            <td>${response.data[i].id}</td>
                            <td>${response.data[i].registerDay}</td>
                            <td>${response.data[i].status}</td>
                            <td>${response.data[i].salesMan.id}</td>
                            <td>${response.data[i].salesMan.name}</td>
                            <td>${response.data[i].salesMan.email}</td>
                        </tr>
                        `
                    }
                }

                document.getElementById('tableStatus').innerHTML = modificate;
            })
            .catch(err => console.log(err));
        }
    }

    //Método para preguntar el detalle de una orden
    const ask = () =>{
        axios.get('http://129.151.118.226:8082/api/order/salesman/'+user.id)
        .then(response =>{
            let data = "";
            for(let i = 0; i < response.data.length; i++){
                data += `
                <option value="${response.data[i].id}">Orden No. ${response.data[i].id} Solicitante: ${response.data[i].salesMan.name}</option>
                `
            }

            document.getElementById('SelectSomeOrder').innerHTML = data;
            openDetailModal();
        })
        .catch(err => console.log(err));
    }

    //Método para obtener el detalle de una orden
    var seeDetail = () => {
        let id = document.getElementById("SelectSomeOrder").value;
        if(id == "") {
            alert("Es necesario seleccionar una orden")
        }else{
            axios.get('http://129.151.118.226:8082/api/order/'+id)
            .then(response =>{
                let mostrar = "";
                let productos = response.data.products;
                let cantidad  = response.data.quantities;
                for (const [clave, valor] of Object.entries(productos)) {
                    let solicitud = cantidad[clave];
    
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
                            <td>${valor.price}</td>
                            <td>${valor.quantity}</td>
                            <td>${valor.photography}</td>
                            <td>${solicitud}</td>
                        </tr>
                    `;
                }

                document.getElementById('tableDeatil').innerHTML = mostrar;
                closeDateModal();
                closeStatusModal();
                closeDetailModal();
                openProductsModal();
            })
            .catch(err => console.log(err));
        }
        
    }



    //Método para abrir el modal de filtro por fecha
    const openDateModal = () => {
        document.getElementById("modalDate").style.display = "block";
    }

    //Método para cerrar el modal de filtro por fecha
    const closeDateModal = () => {
        document.getElementById("modalDate").style.display = "none";
    }

    //Método para abrir el modal de filtro por fecha
    const openStatusModal = () => {
        document.getElementById("modalStatus").style.display = "block";
    }

    //Método para cerrar el modal de filtro por fecha
    const closeStatusModal = () => {
        document.getElementById("modalStatus").style.display = "none";
    }

    //Método para abrir el modal de filtro por fecha
    const openDetailModal = () => {
        document.getElementById("modalSeDe").style.display = "block";
    }

    //Método para cerrar el modal de filtro por fecha
    const closeDetailModal = () => {
        document.getElementById("modalSeDe").style.display = "none";
    }

    //Método para abrir el modal de filtro por fecha
    const openProductsModal = () => {
        document.getElementById("formEditOrder").style.display = "block";
    }

    //Método para cerrar el modal de filtro por fecha
    const closeProductsModal = () => {
        document.getElementById("formEditOrder").style.display = "none";
    }

    

    

    return (
        <>
            <main className="mainProfile">
                <div className="btnOrderProfile">
                    <button type="button" className="btn btn-dark btnNewOrder" id="btnNewOrder" onClick={openModal}>Realizar un nuevo pedido</button>
                    <button type="button" className="btn btn-dark btnNewOrder" id="btnSearchByDate" onClick={ordersByUserD}>Consultar Ordenes por fecha</button>
                    <button type="button" className="btn btn-dark btnNewOrder" id="btnSearchByStatus" onClick={ordersByUserS}>Consultar Ordenes por Estado</button>
                    <button type="button" className="btn btn-dark btnOrdersCoord" id="btnOrdersCoord" onClick={goToOrderTables}>Revisar ordenes de pedido</button>
                </div>
                <div className="profile">

                    <img src={fotoPerfil} alt="Foto de Perfil"/>
                    <div className="row holderUserData" id="holderUserData"></div>
                </div>
            </main>

            <div className="modals" id="formOrder">
                <div className="popup">
                    <FontAwesomeIcon icon={faTimes} className=" closeEdit" id="close-popup" onClick={closeModal}/>
                    <div className="contenedorP">

                        <h2 className="text-center title">Generar Nueva Orden</h2>
                        <br/>
                        <form id="" className="col-lg-4 p-4 form">
                            <h5>Selecciona el producto</h5>
                            <div className="firstStep">
                                <select className="form-select" id="selectPro"></select>
                                <button className="btn btn-primary" id="btnSelectPro" type="button" onClick={selectElement}>Seleccionar</button>
                            </div>
                            <hr/>
                            <div className="secondStep" id="secondStep"></div>
                            <div className="d-grid gap-2">
                                <button type="button" className="btn btn-primary" id="btn-order" onClick={checkProducts}>
                                    Generar Orden
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="modals" id="modalDate">
                <div className="popup">
                    <FontAwesomeIcon icon={faTimes} className=" closeEdit" id="close-popup" onClick={closeDateModal}/>
                    <div className="contenedorP">
                        <h2>Selecciona la fecha y filtra tus ordenes</h2>
                        <div className="formDate">
                            <form>
                                <div className="inputsDateHolder">
                                    <div class="mb-3">
                                        <label for="year" class="form-label">Año</label>
                                        <input type="text" class="form-control" id="year" placeholder="YYYY" />
                                    </div>
                                    <div class="mb-3">
                                        <label for="month" class="form-label">Mes</label>
                                        <input type="text" class="form-control" id="month" placeholder="MM" />
                                    </div>

                                    <div class="mb-3">
                                        <label for="day" class="form-label">Día</label>
                                        <input type="text" class="form-control" id="day" placeholder="DD" />
                                    </div>
                                    <div className="mb-3 buttonFilterDateHolder">
                                        <button className="btn btn-primary" type="button" onClick={filterOrdersByD}>Filtar por fecha</button>
                                    </div>
                                </div>
                            </form>
                            <hr />
                        </div>
                        <div className="table">
                        <table className="table table-secondary table-striped">
                            <thead>
                                <tr>
                                    <th>Id del pedido</th>
                                    <th>Fecha de petición</th>
                                    <th>Estado</th>
                                    <th>Identificación del asesor</th>
                                    <th>Nombre del asesor</th>
                                    <th>Email del asesor</th>
                                </tr>
                            </thead>
                            <tbody id="tableDate">
                                
                            </tbody>
                        </table>
                        </div>
                        <div className="buttonSeeDetail">
                            <button className="btn btn-primary" onClick={ask}>Ver el detalle de una orden</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modals" id="modalStatus">
                <div className="popup">
                    <FontAwesomeIcon icon={faTimes} className=" closeEdit" id="close-popup" onClick={closeStatusModal}/>
                    <div className="contenedorP">
                        <h2>Selecciona la estado y filtra tus ordenes</h2>
                        <div className="formStatus">
                            <form>
                            <div class="mb-3 selectHolderFilterS">
                                <select class="form-select" id="selectFilterStatus">
                                    <option value="Pendiente" selected>Pendiente</option>
                                    <option value="Aprobada">Aprobada</option>
                                    <option value="Rechazada">Rechazada</option>
                                </select>
                                <button className="btn btn-primary" onClick={filterOrdersByS} type="button">Filtar</button>
                            </div>
                            </form>
                        </div>
                        <div className="table">
                        <table className="table table-secondary table-striped">
                            <thead>
                                <tr>
                                    <th>Id del pedido</th>
                                    <th>Fecha de petición</th>
                                    <th>Estado</th>
                                    <th>Identificación del asesor</th>
                                    <th>Nombre del asesor</th>
                                    <th>Email del asesor</th>
                                </tr>
                            </thead>
                            <tbody id="tableStatus">
                                
                            </tbody>
                        </table>
                        </div>
                        <div className="buttonSeeDetail">
                            <button className="btn btn-primary" onClick={ask}>Ver el detalle de una orden</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modals" id="formEditOrder">
            <div className="popup">
                <FontAwesomeIcon icon={faTimes} className="formEditOrder" id="close-popup" onClick={closeProductsModal}/>
                <div className="contenedorP"> 
                    <h2 className="text-center title">Detalle de la orden (productos)</h2>
                    <br/>
                    <table className="table table-secondary table-striped">
                        <thead>
                            <tr>
                                <th>codigo</th>
                                <th>Marca</th>
                                <th>Modelo</th>
                                <th>Procesador</th>
                                <th>Sistema Operativo</th>
                                <th>Memoria</th>
                                <th>Disco duro</th>
                                <th>Descripción</th>
                                <th>Precio</th>
                                <th>Cantidad en Stock</th>
                                <th>Fotografia</th>
                                <th>Cantidad Solicitada</th>
                            </tr>
                        </thead>
                        <tbody id="tableDeatil">
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

            <div className="modals" id="modalSeDe">
                <div className="popup">
                    <FontAwesomeIcon icon={faTimes} className="closeEdit" id="close-popup" onClick={closeDetailModal}/>
                    <div className="contenedorP">
                    <h3>Selecciona una orden para ver el detalle</h3>
                    <select class="form-select" aria-label="Default select example" id="SelectSomeOrder"></select>
                    <button className="btn btn-primary" onClick={seeDetail}>Seleccionar</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;
