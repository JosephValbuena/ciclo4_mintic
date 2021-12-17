import React, { Component } from 'react';

class CreateUser extends Component {

    render() {
        return (
            <main class="align-items-center ps-4">
                <h1>Registrar un usuario nuevo</h1>
                <div class="col d-flex p-4 justify-content-lg-center justify-content-sm-center">
                    <form id="" class="col-lg-4 p-4 form form-user">
                        <div class="d-flex justify-content-between">
                            <div class="mb-3 inputHolder">
                                <label for="name" class="form-label" id="userId"><strong>Número de Identificación</strong></label>
                                <input type="number" class="form-control" id="identification"/>
                            </div>
                            <div class="mb-3 inputHolder">
                                <label for="name" class="form-label" id="userName"><strong>Nombre</strong></label>
                                <input type="text" class="form-control" id="name"/>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between">
                            <div class="mb-3 inputHolder">
                                <label for="name" class="form-label" id="userAddress"><strong>Dirección</strong></label>
                                <input type="text" class="form-control" id="address"/>
                            </div>
                            <div class="mb-3 inputHolder">
                                <label for="name" class="form-label" id="userPhone"><strong>Teléfono</strong></label>
                                <input type="number" class="form-control" id="phone"/>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label" id="userEmail"><strong>Email</strong></label>
                            <input type="email" class="form-control" id="email" aria-describedby="emailHelp"/>
                            <div id="emailHelp" class="form-text text-dark">Nunca comparta su correo electrónico con portales o personas desconcidas.</div>
                        </div>

                        <div class="d-flex justify-content-between">
                            <div class="mb-3 inputHolder">
                                <label for="passw" class="form-label" id="userPassword"><strong>Contraseña</strong></label>
                                <input type="password" class="form-control" id="passw"/>
                            </div>
                            <div class="mb-3 inputHolder">
                                <label for="repeatPassw" class="form-label" id="userPassword"><strong>Repetir Contraseña</strong></label>
                                <input type="password" class="form-control" id="repeatPassw"/>
                            </div>
                        </div>

                        <div class="d-flex justify-content-start">
                            <div class="checksZone me-4">
                                <span class="titleCheck">Zona de trabajo</span>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="zone" id="zona1" value="ZONA 1" checked/>
                                    <label class="form-check-label" for="zona1">
                                    ZONA 1
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="zone" id="zona2" value="ZONA 2"/>
                                    <label class="form-check-label" for="zona2">
                                    ZONA 2
                                    </label>
                                </div>
                            </div>
                            <div class="checksType">
                                <span class="titleCheck">Tipo de usuario</span>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="type" id="typeASESOR" value="ASESOR" checked/>
                                    <label class="form-check-label" for="typeASESOR">
                                    ASESOR COMERCIAL
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="type" id="typeCOORD" value="COORD"/>
                                    <label class="form-check-label" for="typeCOORD">
                                    COORDINADOR DE ZONA
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="d-grid gap-2">
                            <button type="button" class="btn btn-primary" id="btn-sign">
                                Registrar usuario
                            </button>
                        </div>
                        
                    </form>
                </div>
            </main>
        );
    }
}

export default CreateUser;
