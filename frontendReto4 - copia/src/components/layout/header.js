import React from 'react'
import {  Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";

import logo from '../../logo8Bits.png'

const Header = () =>{
    var user = JSON.parse(localStorage.getItem('user'));
    var userExist;

    if(user){
        userExist = true;
        
    }else{
        userExist = false;
    }

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="/auth"> 
                    <img
                        src={logo}
                        width="33"
                        height="30"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    />
                    Ocho Bits LTDA
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    {userExist ? <Nav.Link href="/users">Usuarios</Nav.Link> : ''}
                    {userExist && <Nav.Link href="/products">Productos</Nav.Link>}
                    {userExist && <Nav.Link href="/profile" >Perfil</Nav.Link>}
                </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Conectado como: <a href="#login">Mark Otto</a>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
            </Navbar>
        </header>
    );
}

export default Header;