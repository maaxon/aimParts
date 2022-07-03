import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {IOption, IUpdateOption} from "../models/IOption";



export const optionsApi = createApi({
    reducerPath: "optionsApi",
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000/options'}),
    tagTypes:['Post','Delete','Patch'],
    endpoints:(build)=> ({
        fetchOptions: build.query<IOption[],void>({
            query:()=>({
                url: `/`,
            }),
            providesTags:result => ['Post','Delete','Patch']
        }),
        fetchOption: build.query<IOption,string>({
            query:(id:string)=>({
                url: `/${id}`,
            })
        }),
        createOption: build.mutation<void,void>({
            query:()=>({
                url: `/`,
                method:"POST",
                body:{title:"New option"}
            }),
            invalidatesTags:['Post']
        }),
        deleteOption: build.mutation<void,string>({
            query:(id)=>({
                url: `/${id}`,
                method:"Delete",
            }),
            invalidatesTags:['Delete']
        }),
        updateOption: build.mutation<void,IUpdateOption>({
            query:({title, id})=>({
                url: `/${id}`,
                method:"PATCH",
                body:{title}
            }),
            invalidatesTags:['Patch']
        }),
    })
})