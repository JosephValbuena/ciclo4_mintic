import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import '../styles/login.css';

const Auth = () => {

    const navigate = useNavigate();
    const {register, formState: { errors }, handleSubmit} = useForm();

    useEffect(() => {
        // axios.get('http://localhost:8086/api/user/all')
        //     .then(response => console.log(response))
        //     .catch(error => console.error(error))
    }, []);


    const onSubmit = (data) =>{
        axios.get('http://129.151.118.226:8082/api/user/'+data.email+'/'+data.password)
            .then(response => {
                if(response.data.id == null){
                    alert("Verifica tus credenciales");
                }else{
                    localStorage.setItem('user',JSON.stringify(response.data));
                    navigate('profile', { replace: true });
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    const goToCreate = () =>{
        navigate('register', { replace: true });
    }
    
    return (
        <>
        <div className="auth">
            <div className="formulario">
                <main className="d-flex align-items-center ps-4 mainIndex">
                    <div className="col d-flex p-4 justify-content-lg-end justify-content-sm-center">
                        <form className="formLogin col-lg-4 p-4" onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-3">
                                <label htmlFor='email' className="form-label" id="userEmail"><strong>Email</strong></label>
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    id="email" 
                                    aria-describedby="emailHelp" 
                                    name="email" 
                                    {...register("email", {required:true, })}
                                />
                                <span className="text-danger text-small d-block mb-2">
                                    {errors.email && "El email es requerido"}
                                </span>
                                <div id="emailHelp" className="form-text text-dark">Nunca comparta su correo electrónico con portales o personas desconcidas.</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label" id="userPassword"><strong>Password</strong></label>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    id="password" 
                                    name="password" 
                                    {...register("password", {required:true, })}  
                                />
                                <span className="text-danger text-small d-block mb-2">
                                    {errors.password?.type === 'required' && "La contraseña es requerida"}
                                </span>
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Ingresar
                            </button>
                            <p id="label-registro">¿No tienes cuenta? <a id="link-registro" href="/register"> Crea tu cuenta aquí</a></p>
                        </form>
                    </div>
                </main>
            </div>
        </div>
        </>
    );
}

export default Auth;