import React, {FC, useState} from "react";
import Products from "./Products/Products";
import {productApi} from "../../services/ProductService";
import {useAppSelector} from "../../hooks/redux";
import {IStateFilter} from "../../models/IStateFilter";
import {IProduct} from "../../models/IProduct";
import { useParams } from "react-router-dom";
import AppSpinner from "../../components/AppSpinner/AppSpinner";
import AppPagination from "../../components/AppPagination/AppPagination";
import usePagination from "../../hooks/usePagination";

const ProductsPage: FC = ()=>{
    let params = useParams();

    const prodPerPage = 1

    const [limit,setLimit] = useState(prodPerPage*3)

    const {data:productsQuery} = productApi.useFetchProductsByCategoryQuery({categoryId:params.categoryId,limit})

    const {filters} = useAppSelector(state => state.checkedOptionReducer)

    const products = getByOptions(filters,productsQuery)

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
        count: products ? products.length: 0,
    });



    function getByOptions(filters:IStateFilter[],productsQuery:IProduct[] | undefined): IProduct[] | undefined {
        if (productsQuery) {
            if (filters.length === 0) return productsQuery
            let products;
            products = productsQuery.filter((product) => matchOptions(product.options, filters))
            return products
        }
        return undefined
    }

    function matchOptions(productOptions:string[],filters:IStateFilter[]):boolean{
        let match = true
        filters.forEach((filter)=>{
            if (filter.options.length < 1) return
            let matching = 0
            filter.options.forEach((option)=>{
                if (productOptions.includes(option)) matching++
            })
            match = matching > 0;
        })
        return match
    }

    if (limit <= totalPages*prodPerPage){
        if (page === totalPages) setLimit(limit + prodPerPage*2)
    }


    return (
        <>
        <Products productsPerPage={prodPerPage} products={products?.slice(firstContentIndex,lastContentIndex)} />
            {products &&
                <div className="float-end m-4" >
                    <AppPagination gaps={gaps} totalPages={totalPages} nextPage={nextPage} page={page} prevPage={prevPage} setPage={setPage}/>
                </div>}
        </>
    )
}

export default ProductsPage