import React, {FC, useState} from "react";
import AdminProductCard from "./AdminProductCard/AdminProductCard";
import AdminWrap from "../../components/AdminWrap/AdminWrap";
import {productApi} from "../../services/ProductService";
import usePagination from "../../hooks/usePagination";
import AppPagination from "../../components/AppPagination/AppPagination";
import AppSpinner from "../../components/AppSpinner/AppSpinner";


const AdminProducts: FC =()=>{

    const prodPerPage = 4

    const [limit,setLimit] = useState(prodPerPage*3)

    const {data:products,isFetching,isLoading} = productApi.useFetchProductsQuery(limit)

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

    if (limit <= totalPages*prodPerPage){
        if (page === totalPages) setLimit(limit + prodPerPage*2)
    }

    if (isLoading) return <AppSpinner/>

    return (
        <AdminWrap>
            <div className="card">
                <div className="card-header py-3">
                    <div className="row align-items-center m-0">
                        <div className="col-md-3 col-12 me-auto mb-md-0 mb-3">
                            <select className="form-select">
                                <option>All category</option>
                                <option>Fashion</option>
                                <option>Electronics</option>
                                <option>Furniture</option>
                                <option>Sports</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="card-body">

                    <div className="table-responsive">
                        <table className="table align-middle table-striped">
                            <tbody>
                            {
                                products && products.slice(firstContentIndex,lastContentIndex).map((product)=> <AdminProductCard key={product._id} img={product.img} title={product.title} id={product._id} price={product.price} /> )
                            }
                            </tbody>
                        </table>
                    </div>
                    <div className={"float-end"}>
                        <AppPagination isFetching={isFetching} gaps={gaps} totalPages={totalPages} nextPage={nextPage} page={page} prevPage={prevPage} setPage={setPage}/>
                    </div>

                </div>
            </div>
        </AdminWrap>)
}
export default AdminProducts