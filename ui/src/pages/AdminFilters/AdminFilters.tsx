import AdminWrap from "../../components/AdminWrap/AdminWrap";
import React, {FC, useState} from "react";
import {Accordion} from "react-bootstrap";
import AdminFiltersItem from "./AdminFiltersItem/AdminFiltersItem";
import {filterApi} from "../../services/FilterService";
import usePagination from "../../hooks/usePagination";
import AppPagination from "../../components/AppPagination/AppPagination";
import 'react-loading-skeleton/dist/skeleton.css'
import AppSpinner from "../../components/AppSpinner/AppSpinner";

const AdminFilters:FC= () =>{

    const prodPerPage = 4

    const [limit,setLimit] = useState(prodPerPage*3)

    const {data:filters,isFetching,isLoading} = filterApi.useFetchFiltersQuery(limit)

    const [deleteFilter] = filterApi.useDeleteFilterMutation()

    const onDelete = (id:string) =>{
        deleteFilter(id)
    }

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
        count: filters ? filters.length: 0,
    });

    if (limit <= totalPages*prodPerPage){
        if (page === totalPages) setLimit(limit + prodPerPage*2)
    }

    if (isLoading){
       return <AppSpinner/>
    }

    return(
        <AdminWrap>
            <h1>Filters</h1>
            <div className="card-body">
                <Accordion defaultActiveKey={'0'}>
                    {filters && filters.slice(firstContentIndex,lastContentIndex).map((filter,index)=>{
                        return <AdminFiltersItem onDelete={onDelete} key={filter._id} index={index} filter={filter}/>
                    })}
                </Accordion>
                <div className={"float-end m-4"}>
                    <AppPagination isFetching={isFetching} gaps={gaps} totalPages={totalPages} nextPage={nextPage} page={page} prevPage={prevPage} setPage={setPage}/>
                </div>
            </div>

        </AdminWrap>
    )
}

export default AdminFilters