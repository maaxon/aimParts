import React, {FC} from "react";
import AdminWrap from "../AdminWrap/AdminWrap";
import {Button} from "react-bootstrap";
import AdminTableItem from "./AdminTableItem/AdminTableItem";

interface AdminTableProps {
    fields:Field[]
    createField():void
    updateField(id:string,title:string):void
    deleteField(id:string):void
    tableTitle:string
}
export interface Field {
    firstItem:string
    title:string
    id:string
}

const AdminTable:FC<AdminTableProps> =({fields,createField,updateField,deleteField,tableTitle})=>{



    return(
        <AdminWrap>
            <h1>{tableTitle}</h1>
            <div className="card-body table-responsive">
                <table className={"align-middle table text-center"}>
                    <thead className="table-light">
                    <tr >
                        <th>ID</th>
                        <th>title</th>
                        <th>update</th>
                        <th>delete</th>
                    </tr>
                    </thead>
                    <tbody>

                    {fields.map(field => <AdminTableItem key={field.id} field={field} updateField={updateField} deleteField={deleteField}/>)}

                    </tbody>

                </table>
                <div className="d-flex justify-content-end">
                    <Button onClick={createField} className={"align-right"} variant={"outline-primary"} >Create {tableTitle}</Button>
                </div>

            </div>

        </AdminWrap>

    )
}

export default AdminTable