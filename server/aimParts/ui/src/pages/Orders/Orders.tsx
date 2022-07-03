import React, {FC} from "react";
import classes from "./orders.module.css";
import {orderApi} from "../../services/OrderService";
import {useParams} from "react-router-dom";
import OrderItem from "../../components/OrderItem/OrderItem";
import {Accordion} from "react-bootstrap";
import AppSpinner from "../../components/AppSpinner/AppSpinner";

const Orders:FC =()=>{

    const params = useParams();

    const {data:orders,isLoading} = orderApi.useFetchOrdersByUserIdQuery(params.userId)

    if (isLoading) return <AppSpinner/>

    return(
        <div className={classes.wrapper}>
            <h1>User orders</h1>
            <Accordion className={"w-75"} defaultActiveKey={"0"}>
                {orders && orders.map((order,index) => <OrderItem key={order._id} index={index} order={order}/>)}
            </Accordion>

        </div>
    )
}
export default Orders