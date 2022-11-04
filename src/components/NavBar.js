import React, { useContext } from "react";
import { Context } from "..";
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import { NavLink } from "react-router-dom";
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from "../utils/consts";
import Button from 'react-bootstrap/Button';
import { observer } from "mobx-react-lite";
import Container from 'react-bootstrap/Container'
import {useNavigate} from 'react-router-dom'

const NavBar = observer(() => {
    const { user } = useContext(Context)
    const navigate  = useNavigate()

    const logOut = () =>{
        user.setUser({})
        user.setIsAuth(false)
    }
    return (
        <Navbar bg="dark" variant="dark" >
            <Container>
                <NavLink 
                    style={{ color: 'white' }} 
                    to={{ SHOP_ROUTE }}
                >
                    My Book</NavLink>

                {user.isAuth ?
                <Nav className="ml-auto" style={{ color: 'white'}}>
                    <Button 
                        onClick={() => navigate(ADMIN_ROUTE)}
                        variant={"outline-light"} 
                        style={{marginRight:10}}
                    >
                        Admin</Button>
                    <Button 
                        onClick={() => logOut()} 
                        variant={"outline-light"}
                    >
                        Выйти</Button>
                </Nav>
                :
                <Nav className="ml-auto" style={{ color: 'white' }}>
                    <Button 
                        variant={"outline-light"}
                        onClick={() => navigate(LOGIN_ROUTE)}
                    >
                        Авторизация</Button>
                </Nav>
                }
            </Container>
        </Navbar>
    );
})

export default NavBar;