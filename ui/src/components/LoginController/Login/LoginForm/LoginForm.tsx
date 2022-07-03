import {Button, Form} from "react-bootstrap";
import React, {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {LoginUser} from "../../../../store/reducers/ActionCreators";

export default function LoginForm() {

    const [state,setState] = useState({
        email:'',
        password:''
    })
    const dispatch = useAppDispatch()


    const submitHandler =(e:React.SyntheticEvent<EventTarget>)=>{
            e.preventDefault()
            dispatch(LoginUser(state))
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
        <Button variant="primary" type="submit">
            Submit
        </Button>
    </Form>)
}