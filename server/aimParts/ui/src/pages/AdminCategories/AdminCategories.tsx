import React, {FC} from "react";
import {categoriesApi} from "../../services/CategoryService";
import AdminTable, {Field} from "../../components/AdminTable/AdminTable";


const AdminCategories:FC =()=>{

    const {data:categories} = categoriesApi.useFetchCategoriesQuery()

    const [updateCategory] = categoriesApi.useUpdateCategoryMutation()

    const [deleteCategory] = categoriesApi.useDeleteCategoryMutation()

    const [createCategory] = categoriesApi.useCreateCategoryMutation()


    if (categories){




        const onUpdate = (id:string,title:string) =>{
            updateCategory({id,title})
        }

        const fields:Field[] = categories.map(({_id,title})=> {return {id:_id,firstItem:_id,title}})
        return(
            <AdminTable fields={fields} createField={createCategory} updateField={onUpdate} deleteField={deleteCategory} />
        )
    }
    return <h1>loading</h1>

}

export default AdminCategories