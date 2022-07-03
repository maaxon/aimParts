import React, {FC, useEffect, useState} from "react";
import {Button} from "react-bootstrap";
import {IUpdateCategory} from "../../../models/ICategory";
import {Field} from "../AdminTable";

interface AdminTableItemProps {
    field:Field
    updateField(id:string,title:string):void
    deleteField(id:string):void
}


const AdminTableItem:FC<AdminTableItemProps> =({field,updateField,deleteField})=>{

    const {id,title,firstItem} = field

    useEffect(()=>{
        setState({...state,title})
    },[title])

    const [state,setState] = useState({
        title:"",
        redacting:false
    })

    const onRedact = ()=>{
        const redacting = !state.redacting
        setState({...state,redacting})
    }

    const onConfirm = ()=>{
        updateField(id,state.title)
        const redacting = !state.redacting
        setState({...state,redacting})
    }

    const onChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setState({...state,title: e.target.value})
    }


    return(
        <tr>
            <td >{firstItem}</td>
        <td>{state.redacting ?
            <><input onChange={onChange} value={state.title}  /> <Button onClick={onConfirm}>\/ </Button></>
:state.title}
    </td>
    <td><Button onClick={onRedact} variant={"outline-primary"} >redact</Button></td>
    <td><Button onClick={()=>{deleteField(id)}} variant={"outline-danger"}>delete</Button></td>
    </tr>
)
}

export default AdminTableItem