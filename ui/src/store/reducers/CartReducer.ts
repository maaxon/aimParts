import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getStorageItem, setStorageItem} from "../../storage/storage";
import {ICartProduct} from "../../models/IProduct";



export interface CartState {
    product:ICartProduct
    count:number
}



const initialState:CartState[] =[]

export const  CartSlice = createSlice({
    name:'Cart',
    initialState,
    reducers:{
        initCart(state){
            const cart = getStorageItem("cart")
            if (cart) return cart
        },
       addToCart(state,payload:PayloadAction<ICartProduct>){
           const prodIdx = state.findIndex(product => product.product._id === payload.payload._id )
           if (prodIdx > -1) {
               state[prodIdx].count ++
           }else {
               state.push({product:payload.payload,count:1})
               setStorageItem("cart",state)
           }
       },
       incrementProductCount(state,payload:PayloadAction<string>){
           const  index = state.findIndex(cartItem => cartItem.product._id === payload.payload )
           if (index >-1) state[index].count ++
           setStorageItem("cart",state)
       },
        decrementProductCount(state,payload:PayloadAction<string>){
            const  index = state.findIndex(cartItem => cartItem.product._id === payload.payload )
            if (index >-1){
                if (state[index].count <= 1) {
                    state.splice(index,1)
                }
                else state[index].count --
            }
            setStorageItem("cart",state)
        },
        orderConfirmed(state){
            setStorageItem('cart',[])
            return []
        }
    }
})

export default CartSlice.reducer