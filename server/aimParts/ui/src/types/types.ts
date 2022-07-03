import {IUser} from "../models/IUser";

export interface tokenData {
    token:string
    expiresIn:number
}
export interface LoginAction {
    tokenData:tokenData
    user:IUser
}

export interface InitUserAction {
    user:IUser
}