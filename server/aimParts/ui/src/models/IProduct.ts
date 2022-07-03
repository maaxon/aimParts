import {IOption} from "./IOption";

export interface IProductById{
    _id:string
    title:string
    price:number
    img:string
    desc:string
    images:string[]
    options:IOption[]
    category:string
}

export interface IProduct {
    _id:string
    title:string
    price:number
    img:string
    desc:string
    images:string[]
    options:string[]
}

export interface ICartProduct {
    _id:string
    title:string
    price:number
    img:string
    desc:string
}

export interface ICreateProduct {
    title:string
    price:number
    img:string
    desc:string
    images:(string | undefined)[]
    options:string[]
}
export interface IUpdateProduct {
    product:ICreateProduct
    id:string
}