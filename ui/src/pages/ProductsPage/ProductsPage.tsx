import React, {FC, useEffect, useState} from "react";
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

    const prodPerPage = 3

    const [limit,setLimit] = useState(prodPerPage*3)

    const {filters} = useAppSelector(state => state.checkedOptionReducer)

    const {data:products,isFetching} = productApi.useFetchProductsByCategoryQuery({categoryId:params.categoryId,limit,filters})

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

    useEffect(()=>{
        if (products){
            setPage(1)
        }

    },[filters])

    if (limit <= totalPages*prodPerPage){
        if (page === totalPages) setLimit(limit + prodPerPage*2)
    }

    return (
        <>
        <Products productsPerPage={prodPerPage} products={products?.slice(firstContentIndex,lastContentIndex)} />
            {products &&
                <div className="float-end m-4" >
                    <AppPagination isFetching={isFetching} gaps={gaps} totalPages={totalPages} nextPage={nextPage} page={page} prevPage={prevPage} setPage={setPage}/>
                </div>}
        </>
    )
}

export default ProductsPage