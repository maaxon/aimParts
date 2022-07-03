import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {IUpdateUserRole, IUser} from "../models/IUser";
import {IProduct, IUpdateProduct} from "../models/IProduct";


export const userApi = createApi({
    reducerPath:"userApi",
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000/users'}),
    tagTypes:['Delete','Patch'],
    endpoints:(build)=> ({
        fetchAllUsers: build.query<IUser[],void>({
            query:()=>({
                url: `/`,
            }),
            providesTags:result => ['Delete','Patch']
        }),
        fetchUser: build.query<IUser,string>({
            query:(id:string)=>({
                url: `/${id}`,
            }),
            providesTags:result => ['Delete','Patch']
        }),
        deleteUser: build.mutation<void,string>({
            query:(id)=>({
                url: `/${id}`,
                method:"Delete",
            }),
            invalidatesTags:['Delete']
        }),
        updateUserRole: build.mutation<void,IUpdateUserRole>({
            query:({role, id})=>({
                url: `/${id}`,
                method:"PATCH",
                body:{role}
            }),
            invalidatesTags:['Patch']
        }),
    })
})