import AdminWrap from "../../components/AdminWrap/AdminWrap";
import React, {FC} from "react";
import {Accordion} from "react-bootstrap";
import AdminFiltersItem from "./AdminFiltersItem/AdminFiltersItem";
import {filterApi} from "../../services/FilterService";
import {productApi} from "../../services/ProductService";


const AdminFilters:FC= () =>{

    const {data:filters} = filterApi.useFetchFiltersQuery()

    const [deleteFilter,{}] = filterApi.useDeleteFilterMutation()

    const onDelete = (id:string) =>{
        deleteFilter(id)
    }

    return(
        <AdminWrap>
            <h1>Filters</h1>
            <div className="card-body">
                <Accordion defaultActiveKey={'0'}>
                    {filters && filters.map((filter,index)=>{
                        return <AdminFiltersItem onDelete={onDelete} key={filter._id} index={index} filter={filter}/>
                    })}
                </Accordion>
            </div>

        </AdminWrap>
    )
}

export default AdminFilters