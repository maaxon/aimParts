import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../models/IUser";
import {getStorageItem, setStorageItem} from "../../storage/storage";
import {InitUserAction, LoginAction, tokenData} from "../../types/types";


interface UserState {
   tokenData?:tokenData
   user?:IUser
}



const initialState:UserState ={}

export const  UserSlice = createSlice({
    name:'User',
    initialState,
    reducers:{
        initUser(state){
            const user = getStorageItem('user')
            const tokenData =getStorageItem('tokenData')
            if (user && tokenData){
                state.user = user
                state.tokenData = tokenData
            }
        },
        setUser(state,action:PayloadAction<LoginAction | undefined>){
            if (action){
                state.tokenData = action.payload?.tokenData
                state.user = action.payload?.user
            }
        },
        logOut(state){
            state.user = undefined
            state.tokenData=undefined
            setStorageItem('user',{})
            setStorageItem('tokenData',{})
        },
    }
})

export default UserSlice.reducer