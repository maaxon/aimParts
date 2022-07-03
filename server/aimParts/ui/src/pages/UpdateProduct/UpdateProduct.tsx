import React, {FC} from "react";
import CreateProduct from "../CreateProduct/CreateProduct";
import {useParams} from "react-router-dom";
import {productApi} from "../../services/ProductService";
import {ICreateProduct} from "../../models/IProduct";


const UpdateProduct:FC = () =>{

    let params = useParams();

    const  [updateProductMutation,{}] = productApi.useUpdateProductMutation()


    const {data:product} = productApi.useFetchProductByIdQuery(params.productId)
    if (product) {
        const {title,price,desc,images,options,category} = product

        const formOptions = options.map(({_id,title}) =>{return {id:_id,title}} )



        const updateProduct = async (product:ICreateProduct) =>{
            const id = params.productId
            if (id) await updateProductMutation({product,id})
        }

        return <CreateProduct updatingProduct={{title,price,options:formOptions,desc,images,category}} updateProduct={updateProduct} />
    }

    return <h1>loading</h1>

}

export default UpdateProduct