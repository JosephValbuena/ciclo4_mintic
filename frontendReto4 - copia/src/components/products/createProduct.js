import React, { Component } from 'react'
import '../../styles/createProduct.css';


class CreateProduct extends Component {

    render() {
        return(
            <main className="d-flex align-items-center">
                <div className="col d-flex  justify-content-center form-container">
                <form className="col-lg-4 p-4 form-prod">
                        <h2 className="text-center text-dark">Registrar Producto</h2>
                        <div className="d-flex justify-content-between">
                            <div className="form-group">
                                <label for="Codigoproducto" className="text-black">Codigo</label><br />
                                <input type="text" name="Codigoproducto" id="Codigoproducto" className="form-control" required />
                            </div>
                            <div className="form-group">
                                <label for="brandProd" className="text-black">Marca</label><br />
                                <input type="text" name="brandProd" id="brandProd" className="form-control" required />
                            </div>
                        </div>
                        <div className="d-flex justify-content-between">
                            <div className="form-group">
                                <label for="modelProd" className="text-black">Modelo</label><br />
                                <input type="text" name="modelProd" id="modelProd" className="form-control" required/>
                            </div>
                            <div className="form-group">
                                <label for="processorProd" className="text-black">Procesador</label><br/>
                                <input type="text" name="processorProd" id="processorProd" className="form-control" required/>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between">
                            <div className="form-group">
                                <label for="osProd" className="text-black">Sistema Operativo</label><br/>
                                <input type="text" name="osProd" id="osProd" className="form-control" required/>
                            </div>
                            <div className="form-group">
                                <label for="memoryProd" className="text-black">Memoria</label><br/>
                                <input type="text" name="memoryProd" id="memoryProd" className="form-control" required/>
                            </div>
                        </div>

                        <div className="d-flex justify-content-between">
                            <div className="form-group">
                                <label for="hardDriveProd" className="text-black">Disco duro</label><br/>
                                <input type="text" name="hardDriveProd" id="hardDriveProd" className="form-control" required/>
                            </div>
                            <div className="form-group">
                                <label for="descriptionProd" className="text-black">Descripción</label>
                                <input type="text" name="descriptionProd" id="descriptionProd" className="form-control" required/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label for="availabilityProd" className="text-black">Disponibilidad</label><br/>
                            <select name="availabilityProd" id="availabilityProd" className="form-control" required>
                                <option selected value="">Selecciona disponibilidad</option>
                                <option value="disponible">Disponible</option>
                                <option value="noDisponible">No disponible</option>
                            </select>
                        </div>

                        <div className="d-flex justify-content-between">
                            <div className="form-group">
                                <label for="priceProd" className="text-black">Precio</label><br/>
                                <input type="number" name="priceProd" id="priceProd" className="form-control" required/>
                            </div>
                            <div className="form-group">
                                <label for="quantityProd" className="text-black">Cantidad</label><br/>
                                <input type="number" name="quantityProd" id="quantityProd" className="form-control" required/>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="photoProd" className="text-black">Fotografía</label><br/>
                            <input type="url" name="photoProd" id="photoProd" className="form-control" required/>
                        </div>
                        <div class="form-group text-center mt-4">
                            <input type="button" name="guardaeDatos" className="btn btn-dark btn-md me-4" value="Guardar" onclick="saveProd()" />
                            <input type="button" name="cancelarDatos" className="btn btn-dark btn-md" value="Cancelar" onclick="backProdList()" />
                        </div>
                    </form>
                </div>
            </main>
        );
    }
}

export default CreateProduct;