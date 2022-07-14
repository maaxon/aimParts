import React, {FC, useState} from "react";
import { Accordion } from "react-bootstrap";
import AdminWrap from "../../components/AdminWrap/AdminWrap";
import OrderItem from "../../components/OrderItem/OrderItem";
import {orderApi} from "../../services/OrderService";
import AppPagination from "../../components/AppPagination/AppPagination";
import usePagination from "../../hooks/usePagination";
import AppSpinner from "../../components/AppSpinner/AppSpinner";


const AdminOrders:FC= () =>{
    const prodPerPage = 4

    const [limit,setLimit] = useState(prodPerPage*3)

    const {data:orders,isFetching,isLoading} = orderApi.useFetchOrdersQuery(limit)

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
        count: orders ? orders.length: 0,
    });

    if (limit <= totalPages*prodPerPage){
        if (page === totalPages) setLimit(limit + prodPerPage*2)
    }

    if (isLoading) return <AppSpinner/>

    return(
        <AdminWrap>
                    <h1>Orders</h1>
            <div className="card-body">
                <Accordion defaultActiveKey={'0'}>
                    {orders && orders.slice(firstContentIndex,lastContentIndex).map((order,index)=>{
                        return <OrderItem key={order._id} index={index} order={order}/>
                    })}

                </Accordion>
                <div className={"float-end m-4"}>
                    <AppPagination isFetching={isFetching} gaps={gaps} totalPages={totalPages} nextPage={nextPage} page={page} prevPage={prevPage} setPage={setPage}/>
                </div>
            </div>
        </AdminWrap>
    )
}

export default AdminOrders