import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {ICreateOrder, IOrder} from "../models/IOrder";


export const orderApi = createApi({
    reducerPath:"orderApi",
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000/orders'}),
    tagTypes:['Post','Delete'],
    endpoints:(build)=> ({
        fetchOrders: build.query<IOrder[],number>({
            query:(limit)=>({
                url: `/${limit}`,
            }),
            providesTags:result => ['Post','Delete']
        }),
        fetchOrder: build.query<IOrder,string>({
            query:(id:string)=>({
                url: `/${id}`,
            }),
            providesTags:result => ['Post','Delete']
        }),
        fetchOrdersByUserId: build.query<IOrder[],string | undefined>({
            query:(id:string)=>({
                url: `/user/${id}`,
            }),
            providesTags:result => ['Post','Delete']
        }),
        createOrder: build.mutation<void,ICreateOrder>({
            query:(order)=>({
                url: `/`,
                method:"POST",
                body:order
            }),
            invalidatesTags:['Post']
        }),
        deleteOrder: build.mutation<void,string>({
            query:(id)=>({
                url: `/${id}`,
                method:"Delete",
            }),
            invalidatesTags:['Delete']
        }),
    })
})