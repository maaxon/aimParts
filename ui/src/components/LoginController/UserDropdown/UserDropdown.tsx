import React, {FC} from "react";
import {NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";
import {UserSlice} from "../../../store/reducers/UserReducer";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";

const UserDropdown:FC = ()=>{

    const {logOut} = UserSlice.actions
    const dispatch = useAppDispatch()
    const {user} = useAppSelector(state => state.UserReducer)
    let admin
    if (user){
        admin = user.role == "admin" ?    <NavDropdown.Item as={"div"} ><Link className={'nav-link'} to={'/admin'}>admin panel</Link></NavDropdown.Item> :''
    }

    return(
        <NavDropdown title="User" id="nav-dropdown">
            <NavDropdown.Item as={"div"} ><Link className={'nav-link'} to={'/profile'}>profile</Link></NavDropdown.Item>
            {
                user ? <NavDropdown.Item as={"div"} ><Link className={'nav-link'} to={`/orders/${user._id}`}>orders</Link></NavDropdown.Item>:''
            }
            {admin}
            <NavDropdown.Divider />
            <NavDropdown.Item as={"div"} ><div onClick={()=>{dispatch(logOut())}} className={'nav-link'}>Log Out</div></NavDropdown.Item>
        </NavDropdown>
    )
}

export default UserDropdown