import React, {FC, useState} from "react";
import AdminWrap from "../../components/AdminWrap/AdminWrap";
import {userApi} from "../../services/UserService";
import AdminUsersItem from "./AdminUsersItem/AdminUsersItem";
import usePagination from "../../hooks/usePagination";
import AppPagination from "../../components/AppPagination/AppPagination";
import AppSpinner from "../../components/AppSpinner/AppSpinner";

const AdminUsers:FC = () =>{
    const prodPerPage = 4

    const [limit,setLimit] = useState(prodPerPage*3)

    const {data:users,isFetching,isLoading} = userApi.useFetchAllUsersQuery(limit)

    const [updateUserRole] = userApi.useUpdateUserRoleMutation()

    const [deleteUser] = userApi.useDeleteUserMutation()

    const {
        firstContentIndex,
        lastContentIndex,
        nextPage,
        prevPage,
        page,
        setPage,
        totalPages,
        gaps
    } = usePagination({
        contentPerPage: prodPerPage,
        count: users ? users.length: 0,
    });

    if (limit <= totalPages*prodPerPage){
        if (page === totalPages) setLimit(limit + prodPerPage*2)
    }

    if (isLoading){
        return <AppSpinner/>
    }

    return(
        <AdminWrap>
            <h1>Users</h1>
            <div className="card-body table-responsive">
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
                    {users && users.slice(firstContentIndex,lastContentIndex).map(user => <AdminUsersItem key={user._id} deleteUser={deleteUser} updateUserRole={updateUserRole} user={user}/>)}
                    </tbody>
                </table>
            </div>
            <div className={"float-end m-4"}>
                <AppPagination isFetching={isFetching} gaps={gaps} totalPages={totalPages} nextPage={nextPage} page={page} prevPage={prevPage} setPage={setPage}/>
            </div>
        </AdminWrap>
    )}

export default AdminUsers