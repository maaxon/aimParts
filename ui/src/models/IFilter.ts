import {IOption} from "./IOption";
import {ICategory} from "./ICategory";

export interface IFilter {
    _id:string
    title:string
    type:string
    options:IOption[]
    categories:ICategory[]
}
export interface IFilterById {
    _id:string
    title:string
    type:string
    options:IOption[]
    categories:string[]
}

export interface ICreateFilter {
    title:string
    type?:string
    options:string[]
    categories:string[]
}
export interface IUpdateFilter {
    filter:ICreateFilter
    id:string
}