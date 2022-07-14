import React, {FC, useState} from "react";
import classes from "./orders.module.css";
import {orderApi} from "../../services/OrderService";
import {useParams} from "react-router-dom";
import OrderItem from "../../components/OrderItem/OrderItem";
import {Accordion} from "react-bootstrap";
import AppSpinner from "../../components/AppSpinner/AppSpinner";
import usePagination from "../../hooks/usePagination";
import AppPagination from "../../components/AppPagination/AppPagination";

const Orders:FC =()=>{

    const params = useParams();

    const {data:orders,isLoading,isFetching} = orderApi.useFetchOrdersByUserIdQuery(params.userId)
    const prodPerPage = 4

    const [limit,setLimit] = useState(prodPerPage*3)

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
        <>
        <div className={classes.wrapper}>
            <h1>User orders</h1>
            <Accordion className={"w-75"} defaultActiveKey={"0"}>
                {orders && orders.slice(firstContentIndex,lastContentIndex).map((order,index) => <OrderItem key={order._id} index={index} order={order}/>)}
            </Accordion>

        </div>
            <div className={"float-end pe-4 mt-5"}>
                <AppPagination isFetching={isFetching} gaps={gaps} totalPages={totalPages} nextPage={nextPage} page={page} prevPage={prevPage} setPage={setPage}/>
            </div>
        </>
    )
}
export default Orders