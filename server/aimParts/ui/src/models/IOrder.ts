import {IUser} from "./IUser";
import {IProduct} from "./IProduct";

interface IOrderProduct {
    product:IProduct
    count:number
}


export interface IOrder {
    _id:string
    user:IUser
    products:IOrderProduct[]
    total:number
}

interface ICreateOrderProduct{
    product:string
    count:number
}

export interface ICreateOrder {
    products:ICreateOrderProduct[]
    user:string
    total:number
}