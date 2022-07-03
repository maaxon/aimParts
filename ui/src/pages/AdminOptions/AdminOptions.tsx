import React, {FC} from "react";
import AdminTable, {Field} from "../../components/AdminTable/AdminTable";
import {optionsApi} from "../../services/OptionsService";


const AdminOptions:FC =()=>{

    const {data:options} = optionsApi.useFetchOptionsQuery()

    const [updateOption] = optionsApi.useUpdateOptionMutation()

    const [deleteOption] = optionsApi.useDeleteOptionMutation()

    const [createOption] = optionsApi.useCreateOptionMutation()


    if (options){

        const onUpdate = (id:string,title:string) =>{
            updateOption({id,title})
        }
        console.log(options)
        const fields:Field[] = options.map(({_id,title,filter})=> {
            if (!filter)  return {id:_id,firstItem:"",title}

            return {id:_id,firstItem:filter.title,title}
            })

        return(
            <AdminTable fields={fields} createField={createOption} updateField={onUpdate} deleteField={deleteOption} />
        )
    }
    return <h1>loading</h1>

}

export default AdminOptions