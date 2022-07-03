import React, {FC} from "react";
import CreateProduct from "../CreateProduct/CreateProduct";
import {useParams} from "react-router-dom";
import {productApi} from "../../services/ProductService";
import {ICreateProduct} from "../../models/IProduct";
import CreateFilter from "./CreateFilter";
import {filterApi} from "../../services/FilterService";
import {ICreateFilter} from "../../models/IFilter";


const UpdateFilter:FC = () =>{

    let params = useParams();

    const  [updateFilterMutation,{}] = filterApi.useUpdateFilterMutation()


    const {data:filter} = filterApi.useFetchFilterQuery(params.filterId)
    if (filter) {
        const {title,options,categories} = filter

        const formOptions = options.map(({_id,title}) =>{return {id:_id,title}} )


        const updateFilter = async (filter:ICreateFilter) =>{
            const id = params.filterId
            if (id) await updateFilterMutation({filter,id})
        }

        return <CreateFilter updatingFilter={{title,options:formOptions,categories}} updateFilter={updateFilter} />
    }

    return <h1>loading</h1>

}

export default UpdateFilter