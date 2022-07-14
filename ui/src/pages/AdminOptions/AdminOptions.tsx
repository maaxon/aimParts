import React, {FC, useState} from "react";
import AdminTable, {Field} from "../../components/AdminTable/AdminTable";
import {optionsApi} from "../../services/OptionsService";
import usePagination from "../../hooks/usePagination";
import AppPagination from "../../components/AppPagination/AppPagination";
import AppSpinner from "../../components/AppSpinner/AppSpinner";


const AdminOptions:FC =()=>{

    const prodPerPage = 7

    const [limit,setLimit] = useState(prodPerPage*3)

    const {data:options,isFetching} = optionsApi.useFetchOptionsQuery(limit)

    const [updateOption] = optionsApi.useUpdateOptionMutation()

    const [deleteOption] = optionsApi.useDeleteOptionMutation()

    const [createOption] = optionsApi.useCreateOptionMutation()

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
        count: options ? options.length: 0,
    });

    if (limit <= totalPages*prodPerPage){
        if (page === totalPages) setLimit(limit + prodPerPage*2)
    }


    if (options){

        const onUpdate = (id:string,title:string) =>{
            updateOption({id,title})
        }

        const fields:Field[] = options.slice(firstContentIndex,lastContentIndex).map(({_id,title,filter})=> {
            if (!filter)  return {id:_id,firstItem:"",title}

            return {id:_id,firstItem:filter.title,title}
            })

        return(
            <>
            <AdminTable tableTitle={"Options"} fields={fields} createField={createOption} updateField={onUpdate} deleteField={deleteOption} />
                <div className={"float-end m-4"}>
                    <AppPagination isFetching={isFetching} gaps={gaps} totalPages={totalPages} nextPage={nextPage} page={page} prevPage={prevPage} setPage={setPage}/>
                </div>
            </>
            )
    }
    return <AppSpinner/>

}

export default AdminOptions