import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {ICreateProduct, IProduct, IProductById, IUpdateProduct} from "../models/IProduct";


interface fetchByCategory {
    categoryId:string | undefined
    limit:number
}


export const productApi = createApi({
    reducerPath:"productApi",
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000/products'}),
    tagTypes:['Post','Delete','Patch'],
    endpoints:(build)=> ({
        fetchProducts: build.query<IProduct[],number>({
            query:(limit:number = 0 )=>({
                url: `/${limit}`,
            }),
            providesTags:result => ['Post','Delete','Patch']
        }),
        fetchProductsByIds: build.query<IProduct[],string[]>({
            query:(ids)=>({
                url: `/ids`,
                method:"POST",
                body:ids
            }),
            providesTags:result => ['Post','Delete','Patch']
        }),
        fetchProductsByCategory: build.query<IProduct[],fetchByCategory>({
            query:({categoryId,limit=0})=>({
                url: `/category/${categoryId}/${limit}`,
            }),
            providesTags:result => ['Post','Delete','Patch']
        })
        ,
        fetchProductById: build.query<IProductById,string | undefined>({
            query:(id:string)=>({
                url: `product/${id}`,
            })
        }),
        createProduct: build.mutation<IProduct,ICreateProduct>({
            query:(product)=>({
                url: `/`,
                method:"POST",
                body:product
            }),
            invalidatesTags:['Post']
        }),
        deleteProduct: build.mutation<void,string>({
            query:(id)=>({
                url: `/${id}`,
                method:"Delete",
            }),
            invalidatesTags:['Delete']
        }),
        updateProduct: build.mutation<IProduct,IUpdateProduct>({
            query:({product, id})=>({
                url: `/${id}`,
                method:"PATCH",
                body:product
            }),
            invalidatesTags:['Patch']
        }),
    })
})