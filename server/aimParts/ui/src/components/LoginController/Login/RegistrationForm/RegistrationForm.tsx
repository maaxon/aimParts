import {Button, Form} from "react-bootstrap";
import React, {useState} from "react";
import {useAppDispatch} from "../../../../hooks/redux";
import {RegisterUser} from "../../../../store/reducers/ActionCreators";

export default function RegisterForm() {

    const [state,setState] = useState({
        email:'',
        password:'',
        address:'',
        name:'',
        surname:''
    })

    const dispatch = useAppDispatch()

    const submitHandler =(e:React.SyntheticEvent<EventTarget>)=>{
        e.preventDefault()
        dispatch(RegisterUser(state))
    }

    const changeHandler=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setState({...state,[e.target.name]:e.target.value})
    }

    return(<Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control value={state.email} onChange={changeHandler} name="email" type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
                We'll never share your email with anyone else.
            </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control value={state.password} name={'password'} onChange={changeHandler} type="password" placeholder="Password" />
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label>name</Form.Label>
            <Form.Control value={state.name} name={'name'} onChange={changeHandler} type="text" placeholder="Enter name" />
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>surname</Form.Label>
            <Form.Control value={state.surname} name={'surname'} onChange={changeHandler} type="text" placeholder="Enter surname" />
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>address</Form.Label>
            <Form.Control value={state.address} name={'address'} onChange={changeHandler} type="text" placeholder="Enter address" />
        </Form.Group>
        <Button variant="primary" type="submit">
            Submit
        </Button>
    </Form>)
}