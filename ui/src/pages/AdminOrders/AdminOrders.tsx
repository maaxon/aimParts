import React, {FC} from "react";
import { Accordion } from "react-bootstrap";
import AdminWrap from "../../components/AdminWrap/AdminWrap";
import OrderItem from "../../components/OrderItem/OrderItem";
import {orderApi} from "../../services/OrderService";


const AdminOrders:FC= () =>{

    const {data:orders} = orderApi.useFetchOrdersQuery()

    return(
        <AdminWrap>
                    <h1>Orders</h1>
            <div className="card-body">
                <Accordion defaultActiveKey={'0'}>
                    {orders && orders.map((order,index)=>{
                        return <OrderItem index={index} order={order}/>
                    })}

                </Accordion>
            </div>
        </AdminWrap>
    )
}

export default AdminOrders