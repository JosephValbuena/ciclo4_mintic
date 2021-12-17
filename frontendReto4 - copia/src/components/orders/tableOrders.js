import React, { useEffect } from 'react';

//Componentes
import axios from 'axios';
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

//Estilos
import '../../styles/tableOrder.css';

const TableOrder = () => {
    var user = JSON.parse(localStorage.getItem('user'));
    var updateState;

    useEffect(() => {
        closeModal();
        closeSecondModal();
        getOrders();
    });

    
    //Método para obtener todos las ordenes
    const getOrders = () => {

        axios.get('http://129.151.118.226:8082/api/order/zona/'+user.zone)
        .then(response => {
            let order = '';
            for(let i=0; i< response.data.length; i++){
                order +=`
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
            document.getElementById('tableB').innerHTML = order;

        })
        .catch(err => console.log(err));
    }

    //Método para preguntar el detalle
    const ask = () => {
        let llenar  = "";
        axios.get('http://129.151.118.226:8082/api/order/zona/'+user.zone)
        .then (response =>{
            console.log(response.data)
            for(let i=0; i < response.data.length; i++){
                llenar += `
                    <option value="${response.data[i].id}">orden No. ${response.data[i].id} - Solicitante: ${response.data[i].salesMan.name}</option>
                `
            }

            document.getElementById('selectOrderToD').innerHTML = llenar;
            openSecondModal();
        })
    }

    //Método para obtener el detalle de una orden
    var seeDetail = () => {
        let id = document.getElementById("selectOrderToD").value;
        updateState = id;
        if(id == "") {
            alert("Es necesario seleccionar una orden")
        }else{
            axios.get('http://129.151.118.226:8082/api/order/'+id)
            .then(response =>{
                let mostrar = "";
                let productos = response.data.products;
                let cantidad  = response.data.quantities;
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

                document.getElementById('tableDeatil').innerHTML = mostrar;
            })
            .catch(err => console.log(err));

            
            closeSecondModal();
            openModal();
        }
        
    }

    //Método para editar el estado de la orden
    var editStatus = () =>{

        let input = document.getElementById('selectEditD').value;
        if(input == ""){
            alert("Debes seleccionar un estado");
        }else{
            if(updateState){
                axios.get('http://129.151.118.226:8082/api/order/'+updateState)
                .then(response =>{
                    response.data.status = input;
                    axios.put('http://129.151.118.226:8082/api/order/update', response.data)
                        .then(response =>{
                            alert('La orden ha cambiado su estado a '+response.data.status);
                            document.location.reload();
                        })
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err));  
            }    
        }
    }

    //Método para obtener el boton
    

    //Metodo para abrir el modal
    const openModal = () => {
        document.getElementById("formEditOrder").style.display = "block";
    }
    
    //Métdo para cerrar el modal
    const closeModal = () => {
        document.getElementById("formEditOrder").style.display = "none";
    }

    const openSecondModal = () => {
        document.getElementById("formSeleccionar").style.display = "block";
    }
    
    const closeSecondModal = () => {
        document.getElementById("formSeleccionar").style.display = "none";
    }
    
    return (
        <>
            <main className="orderTMain">
            <div className="tableOrders">
                <h1>Ordenes asociadas a ti</h1>
                <div className="btnSelectTable">
                    <button type="button" class="btn btn-primary" id="btnSeeDetail" onClick={ask}>Ver Detale de una orden</button>
                </div>
                <table className="table table-secondary table-striped">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Fecha de petición</th>
                            <th>Estado</th>
                            <th>Identificación del asesor</th>
                            <th>Nombre del asesor</th>
                            <th>Email del asesor</th>
                        </tr>
                    </thead>
                    <tbody id="tableB">
                        
                    </tbody>
                </table>
                    
            </div>
        </main>

        <div className="modals" id="formEditOrder">
            <div className="popup">
                <FontAwesomeIcon icon={faTimes} className="formEditOrder" id="close-popup"/>
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
                                <th>Disponible</th>
                                <th>Precio</th>
                                <th>Cantidad en Stock</th>
                                <th>Fotografia</th>
                                <th>Cantidad Solicitada</th>
                            </tr>
                        </thead>
                        <tbody id="tableDeatil">
                            
                        </tbody>
                    </table>
                    <div className="editAvailability">
                        <h5>Editar estado de la orden</h5>
                        <select className="form-select" id="selectEditD">
                            <option value="Pendiente" selected>Pendiente</option>
                            <option value="Aprobada">Aprobada</option>
                            <option value="Rechazada">Rechazada</option>
                        </select>
                        <div className="buttonEditD" id="">
                        <button className="btn btn-primary changeStatus" id="changeStatus" onClick={editStatus} >Actualizar estado</button> 
                        </div>         
                    </div>
                </div>
            </div>
        </div>

        <div className="modals" id="formSeleccionar">
            <div className="popup">
                <FontAwesomeIcon icon={faTimes} className="formEditOrder" id="close-popup"/>
                <div className="contenedorP">
                    <h2>Seleccione la orden la orden a la que quiere ver el detalle</h2>
                    <select className="form-select" name="selectOrderToD" id="selectOrderToD">

                    </select>
                    <button className="btn btn-primary ordenSelectYes" id="ordenSelectYes" onClick={seeDetail} >Seleccionar</button>
                </div>
            </div>
        </div>
        </>
    )
}

export default TableOrder;
