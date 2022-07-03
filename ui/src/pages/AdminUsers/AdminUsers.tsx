import React, {FC} from "react";
import AdminWrap from "../../components/AdminWrap/AdminWrap";
import {userApi} from "../../services/UserService";
import AdminUsersItem from "./AdminUsersItem/AdminUsersItem";

const AdminUsers:FC = () =>{

    const {data:users} = userApi.useFetchAllUsersQuery()

    const [updateUserRole] = userApi.useUpdateUserRoleMutation()

    const [deleteUser] = userApi.useDeleteUserMutation()

    return(
        <AdminWrap>
            <h1>Categories</h1>
            <div className="card-body">
                <table className={"align-middle table text-center"}>
                    <thead className="table-light">
                    <tr >
                        <th>User name</th>
                        <th>address</th>
                        <th>email</th>
                        <th>role</th>
                        <th>actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users && users.map(user => <AdminUsersItem key={user._id} deleteUser={deleteUser} updateUserRole={updateUserRole} user={user}/>)}
                    </tbody>
                </table>
            </div>
        </AdminWrap>
    )}

export default AdminUsers