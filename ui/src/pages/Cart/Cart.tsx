import React, {FC, useEffect} from "react";

import classes from "./cart.module.css";
import {Button, Table} from "react-bootstrap";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {CartSlice} from "../../store/reducers/CartReducer";
import {CreateOrder} from "../../store/reducers/ActionCreators";

const Cart:FC = () => {

    const cartProducts = useAppSelector(state => state.CartReducer)
    const user= useAppSelector(state => state.UserReducer.user)
    const dispatch = useAppDispatch()
    const {incrementProductCount,decrementProductCount} = CartSlice.actions

    let total = 0




    const onConfirm = () => {
        if (user && cartProducts){
            dispatch(CreateOrder(total,cartProducts,user._id))
        }

    }

    return(
        <div className={classes.cartWrap}>
                <h1>Cart</h1>
            <div className={classes.tableWrap}>
                <Table className={"w-100"}>
                    <thead>
                        <tr>
                            <td> </td>
                            <td>Product</td>
                            <td>price</td>
                            <td>count</td>
                            <td>total</td>
                        </tr>
                    </thead>
                    <tbody>
                    {cartProducts.map(({count,product}) =>{
                        total += product.price * count
                        return (
                            <tr key={product._id}>
                               <td><img className={classes.tableImg} src={product.img} /></td>
                               <td className={classes.pg1}>
                                   <b>{product.title}</b>
                                   <p>{product.desc}</p>
                               </td>
                               <td className={classes.pg1}>
                                   ${product.price}
                               </td>
                                <td className={classes.pg1}>
                                    <span onClick={()=>{dispatch(incrementProductCount(product._id))}} className={classes.counterChange}>+</span>
                                    <span className={classes.counter}>{count}</span>
                                    <span onClick={()=>{dispatch(decrementProductCount(product._id))}} className={classes.counterChange}>-</span>
                                </td>
                                <td className={classes.pg1}>${count*product.price}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>
            </div>
            <div className={"d-flex  justify-content-end w-75"}>
                <div>
                    <h5>Total:${total}</h5>
                    <Button onClick={onConfirm} variant={"outline-primary"} >Confirm order</Button>
                </div>
            </div>
        </div>
    )
}

export default Cart