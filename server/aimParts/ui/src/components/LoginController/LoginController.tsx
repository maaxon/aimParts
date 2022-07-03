import React, {FC} from "react";
import Login from "./Login/Login";
import {UserSlice} from "../../store/reducers/UserReducer";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {LoginUser} from "../../store/reducers/ActionCreators";
import {NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";
import UserDropdown from "./UserDropdown/UserDropdown";

const LoginController: FC = () =>{

    const dispatch = useAppDispatch()

    const {tokenData,user} = useAppSelector(state => state.UserReducer)

    function checkLogined():boolean {
        if (tokenData){
            const isToken = checkToken(tokenData.expiresIn)

            if (isToken) return true
            if (!isToken && user) {
                const {email,password} = user
                dispatch(LoginUser({email,password}))
            }
        }

        return false
    }

    function checkToken(expiresIn:number):boolean {
        if (expiresIn){
            return Date.now() < expiresIn;
        }
        return false
    }

    if (checkLogined()){
       return <UserDropdown/>
    }

    return <Login/>

}

export default LoginController