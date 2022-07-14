import React, {FC, useState} from "react";
import {categoriesApi} from "../../services/CategoryService";
import AdminTable, {Field} from "../../components/AdminTable/AdminTable";
import usePagination from "../../hooks/usePagination";
import AppPagination from "../../components/AppPagination/AppPagination";
import AppSpinner from "../../components/AppSpinner/AppSpinner";


const AdminCategories:FC =()=>{

    const prodPerPage = 4

    const [limit,setLimit] = useState(prodPerPage*3)

    const {data:categories,isFetching} = categoriesApi.useFetchCategoriesQuery(limit)

    const [updateCategory] = categoriesApi.useUpdateCategoryMutation()

    const [deleteCategory] = categoriesApi.useDeleteCategoryMutation()

    const [createCategory] = categoriesApi.useCreateCategoryMutation()



    const {
        firstContentIndex,
        lastContentIndex,
        nextPage,
        prevPage,
        page,
        setPage,
        totalPages,
        gaps
    } = usePagination({
        contentPerPage: prodPerPage,
        count: categories ? categories.length: 0,
    });

    if (limit <= totalPages*prodPerPage){
        if (page === totalPages) setLimit(limit + prodPerPage*2)
    }

    if (categories){




        const onUpdate = (id:string,title:string) =>{
            updateCategory({id,title})
        }

        const fields:Field[] = categories.slice(firstContentIndex,lastContentIndex).map(({_id,title})=> {return {id:_id,firstItem:_id,title}})
        return(
            <>
            <AdminTable tableTitle={"Categories"} fields={fields} createField={createCategory} updateField={onUpdate} deleteField={deleteCategory} />
                <div className={"float-end m-4"}>
                    <AppPagination isFetching={isFetching} gaps={gaps} totalPages={totalPages} nextPage={nextPage} page={page} prevPage={prevPage} setPage={setPage}/>
                </div>
            </>
        )
    }
    return <AppSpinner/>

}

export default AdminCategories