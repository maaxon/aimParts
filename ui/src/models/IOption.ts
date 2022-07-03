import {IFilter} from "./IFilter";

export interface IOption{
    _id:string
    title:string
    filter:IFilter
}

export interface IUpdateOption{
    id:string
    title:string
}