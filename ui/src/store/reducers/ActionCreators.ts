import {AppDispatch} from "../store";
import axios from "axios";
import { UserSlice} from "./UserReducer";
import {ILogin} from "../../models/ILogin";
import {IRegister} from "../../models/IRegister";
import {getStorageItem, setStorageItem} from "../../storage/storage";
import {LoginAction} from "../../types/types";
import {CartSlice, CartState} from "./CartReducer";
import {IUser} from "../../models/IUser";




export const LoginUser = (user:ILogin) => async (dispatch: AppDispatch) =>{
    let res = await axios.post("http://localhost:5000/auth/login",user)
    res.data.user.password = user.password
    const data:LoginAction = res.data
    setStorageItem('user',data.user)
    setStorageItem('tokenData',data.tokenData)
    dispatch(UserSlice.actions.setUser(data))
}



export const RegisterUser = (user:IRegister) => async (dispatch: AppDispatch) =>{
    let res = await axios.post("http://localhost:5000/auth/registration",user)
    res.data.user.password = user.password
    const data:LoginAction = res.data
    setStorageItem('user',data.user)
    setStorageItem('tokenData',data.tokenData)
    dispatch(UserSlice.actions.setUser(data))
}


export const CreateOrder = (total:number,cartProducts:CartState[],userId:string) => async (dispatch: AppDispatch) =>{
    if (cartProducts.length > 0){
        const orderProducts  =cartProducts.map(item=> {return {product:item.product._id,count:item.count}})
        await axios.post("http://localhost:5000/orders",{products:orderProducts,user:userId,total})
        dispatch(CartSlice.actions.orderConfirmed())
    }
}

