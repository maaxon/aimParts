import React, {FC} from "react";
import {Button, Form} from "react-bootstrap";
import {IUpdateUserRole, IUser} from "../../../models/IUser";


interface AdminUsersItemProps {
    user:IUser
    deleteUser(id:string):void
    updateUserRole(data:IUpdateUserRole):void
}

const AdminUsersItem:FC<AdminUsersItemProps> =({user,deleteUser,updateUserRole})=>{

    const onSelect = (e:React.ChangeEvent<HTMLSelectElement>)=>{
        let confirmed = window.confirm(`to you want to change role of user with email ${user.email} to ${e.target.value}`)
        if (confirmed){
            updateUserRole({id:user._id,role:e.target.value})
        }
    }

    return(
        <tr>
            <td>{user.name} {user.surname}</td>
            <td>{user.address}</td>
            <td>{user.email}</td>
            <td><Form.Select onChange={onSelect} name={"role"} value={user.role}>
                <option value={"user"}>user</option>
                <option value={"admin"}>admin</option>
            </Form.Select>
            </td>
            <td><Button onClick={()=>deleteUser(user._id)} variant={"outline-danger"}>delete</Button></td>
        </tr>
    )
}

export default AdminUsersItem