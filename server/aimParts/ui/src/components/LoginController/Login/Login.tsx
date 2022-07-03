import React, {FC, useState} from "react";
import {Button, Form, Modal, Nav} from "react-bootstrap";
import LoginForm from "./LoginForm/LoginForm";
import RegisterForm from "./RegistrationForm/RegistrationForm";
import {useAppDispatch} from "../../../hooks/redux";
import {UserSlice} from "../../../store/reducers/UserReducer";



const Login:FC =()=> {
    const [show, setShow] = useState(false);
    const [form,setForm] = useState(<LoginForm/>)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    return (
        <>
            <span className={'nav-link'} onClick={handleShow}>
                Login
            </span>

            <Modal centered show={show} onHide={handleClose}>
                <Modal.Body>
                    <Nav className={'flex-row justify-content-evenly'}>
                        <Nav.Item>
                            <Nav onClick={()=>{setForm(<LoginForm />)}}>Active</Nav>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav onClick={()=>{setForm(<RegisterForm />)}}>Option 2</Nav>
                        </Nav.Item>
                    </Nav>

                    {form}

                </Modal.Body>
            </Modal>
        </>
    );
}






export default Login