import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {ICreateFilter, IFilter, IFilterById, IUpdateFilter} from "../models/IFilter";




export const filterApi = createApi({
    reducerPath:"filterApi",
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000/filters'}),
    tagTypes:['Post','Delete','Patch'],
    endpoints:(build)=> ({
        fetchFilters: build.query<IFilter[],void>({
            query:()=>({
                url: `/`,
            }),
            providesTags:result => ['Post','Delete','Patch']
        }),
        fetchFilter: build.query<IFilterById,string | undefined>({
            query:(id:string)=>({
                url: `/${id}`,
            }),
            providesTags:result => ['Post','Delete','Patch']
        }),
        fetchFiltersByCategory: build.query<IFilter[],string | undefined>({
            query:(categoryId:string)=>({
                url: `/category/${categoryId}`,
            }),
            providesTags:result => ['Post','Delete','Patch']
        }),
        createFilter: build.mutation<void,ICreateFilter>({
            query:(filter)=>({
                url: `/`,
                method:"POST",
                body:filter
            }),
            invalidatesTags:['Post']
        }),
        deleteFilter: build.mutation<void,string>({
            query:(id)=>({
                url: `/${id}`,
                method:"Delete",
            }),
            invalidatesTags:['Delete']
        }),
        updateFilter: build.mutation<void,IUpdateFilter>({
            query:({filter, id})=>({
                url: `/${id}`,
                method:"PATCH",
                body:filter
            }),
            invalidatesTags:['Patch']
        }),
    })
})