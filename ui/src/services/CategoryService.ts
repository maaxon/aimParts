import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {ICategory, IUpdateCategory} from "../models/ICategory";





export const categoriesApi = createApi({
    reducerPath: "categoriesApi",
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000/categories'}),
    tagTypes:['Post','Delete','Patch'],
    endpoints:(build)=> ({
        fetchCategories: build.query<ICategory[],number>({
            query:(limit)=>({
                url: `/${limit}`,
            }),
            providesTags:result => ['Post','Delete','Patch']
        }),
        fetchCategory: build.query<ICategory,string>({
            query:(id:string)=>({
                url: `/${id}`,
            })
        }),
        createCategory: build.mutation<void,void>({
            query:()=>({
                url: `/`,
                method:"POST",
                body:{title:"New category"}
            }),
            invalidatesTags:['Post']
        }),
        deleteCategory: build.mutation<void,string>({
            query:(id)=>({
                url: `/${id}`,
                method:"Delete",
            }),
            invalidatesTags:['Delete']
        }),
        updateCategory: build.mutation<void,IUpdateCategory>({
            query:({title, id})=>({
                url: `/${id}`,
                method:"PATCH",
                body:{title}
            }),
            invalidatesTags:['Patch']
        }),
    })
})