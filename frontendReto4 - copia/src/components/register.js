import React from 'react';

//Components
import {useForm} from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

//CSS
import '../styles/register.css'

const Register = () => {

    const navigate = useNavigate();
    const {register, formState: { errors }, handleSubmit} = useForm();

    const create = (data) => {
        console.log(data);
    }

    return(
        <>
        <main className="mainR">
            <h1>Registrar un usuario nuevo</h1>
            <div className="formR">
                <form id="" className="formularioR" onSubmit={handleSubmit(create)}>
                    <div className="d-flex justify-content-between">
                        <div className="mb-3 inputHolder">
                            <label for="name" className="form-label" id="userId"><strong>Número de Identificación</strong></label>
                            <input 
                                type="number" 
                                className="form-control" 
                                id="identification"
                                name="identification"
                                {...register("identification", {required:true, })}
                            />
                            <span className="text-danger text-small d-block mb-2">
                                {errors.identification && "La identificacion es requerida"}
                            </span>
                        </div>
                        <div className="mb-3 inputHolder">
                            <label for="name" className="form-label" id="userName"><strong>Nombre</strong></label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="name"
                                name="name"
                                {...register("name", {required:true, })}   
                            />
                            <span className="text-danger text-small d-block mb-2">
                                {errors.name && "El nombre es requerido"}
                            </span>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div className="mb-3 inputHolder">
                            <label for="birthtDay" className="form-label"><strong>Cumpleaños</strong></label>
                            <input 
                                type="date" 
                                className="form-control" 
                                id="birthtDay"
                                name="birthtDay"
                                {...register("birthtDay", {required:true, })}  
                            />
                            <span className="text-danger text-small d-block mb-2">
                                {errors.address && "El cumpleaños es requerido"}
                            </span>
                        </div>
                        <div className="mb-3 inputHolder">
                            <label for="monthBirthtDay" className="form-label"><strong>Mes de cumpleaños</strong></label>
                            <input 
                                type="number"
                                max="12"
                                min="1"
                                className="form-control" 
                                id="monthBirthtDay"
                                {...register("monthBirthtDay", {required:true, })}
                            />
                            <span className="text-danger text-small d-block mb-2">
                                {errors.monthBirthtDay && "El mes de cumpleaños es requerido"}
                            </span>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div className="mb-3 inputHolder">
                            <label for="address" className="form-label"><strong>Dirección</strong></label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="address"
                                name="address"
                                {...register("address", {required:true, })}  
                            />
                            <span className="text-danger text-small d-block mb-2">
                                {errors.address && "La direccion es requerida"}
                            </span>
                        </div>
                        <div className="mb-3 inputHolder">
                            <label for="cellPhone" className="form-label" ><strong>Teléfono</strong></label>
                            <input 
                                type="number" 
                                min="0"
                                className="form-control" 
                                id="cellPhone"
                                {...register("cellPhone", {required:true, })}
                            />
                            <span className="text-danger text-small d-block mb-2">
                                {errors.address && "El teléfono es requerido"}
                            </span>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label for="email" className="form-label"><strong>Email</strong></label>
                        <input 
                            type="email" 
                            className="form-control" 
                            id="email"
                            name="email"
                            aria-describedby="emailHelp"
                            {...register("email", {required:true, })}
                        />
                        <span className="text-danger text-small d-block mb-2">
                            {errors.email && "El correo es requerido"}
                        </span>
                        <div id="emailHelp" className="form-text text-dark">Nunca comparta su correo electrónico con portales o personas desconcidas.</div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div className="mb-3 inputHolder">
                            <label for="password" className="form-label"><strong>Contraseña</strong></label>
                            <input 
                                type="password"
                                className="form-control" 
                                id="password"
                                name="password"
                                {...register("password", {required:true, })}
                            />
                            <span className="text-danger text-small d-block mb-2">
                                {errors.password && "La contraseña es requerida"}
                            </span>
                        </div>
                        <div className="mb-3 inputHolder">
                            <label for="repeatPassw" className="form-label"><strong>Repetir Contraseña</strong></label>
                            <input 
                                type="password" 
                                className="form-control" 
                                id="repeatPassw"
                                name="repeatPassw"
                                {...register("repeatPassw", {required:true, })}
                            />
                            <span className="text-danger text-small d-block mb-2">
                                {errors.repeatPassw && "La contraseña es requerida"}
                            </span>
                        </div>
                    </div>

                    <div className="d-flex justify-content-start">
                        <div className="checksZone me-4">
                            <span className="titleCheck">Zona de trabajo</span>
                            <div className="form-check">
                                <input 
                                    className="form-check-input" 
                                    type="radio" 
                                    name="zone" 
                                    id="zona1" 
                                    value="ZONA 1" 
                                    checked 
                                    {...register("zone", {required:true, })}
                                />
                                <label className="form-check-label" for="zona1">
                                  ZONA 1
                                </label>
                            </div>
                            <div className="form-check">
                                <input 
                                    className="form-check-input" 
                                    type="radio" 
                                    name="zone" 
                                    id="zona2" 
                                    value="ZONA 2" 
                                    {...register("zone", {required:true, })}
                                />
                                <label className="form-check-label" for="zona2">
                                  ZONA 2
                                </label>
                            </div>
                        </div>
                        <div className="checksType">
                            <span className="titleCheck">Tipo de usuario</span>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="type" id="typeASESOR" value="ASESOR" checked {...register("type", {required:true, })}/>
                                <label className="form-check-label" for="typeASESOR">
                                  ASESOR COMERCIAL
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="type" id="typeCOORD" value="COORD" {...register("type", {required:true, })}/>
                                <label className="form-check-label" for="typeCOORD">
                                  COORDINADOR DE ZONA
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-primary" id="btn-sign">
                            Registrar usuario
                        </button>
                    </div>
                    <p id="label-registro">¿Ya tienes cuenta? <a id="link-registro" href="/auth"> Inicia Sesión aquí</a></p>
                </form>
            </div>
        </main>
        </>
    );
}

export default Register;