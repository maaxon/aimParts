import React, {FC, useState} from "react";
import {Pagination, Spinner} from "react-bootstrap";
import {Gap} from "../../types/usePagination";
import AppSpinner from "../AppSpinner/AppSpinner";

interface AppPaginationProps {
    nextPage():void
    prevPage():void
    page:number
    setPage(page:number):void
    totalPages:number
    gaps:Gap
    isFetching:boolean
}

const AppPagination:FC<AppPaginationProps> = ({isFetching,nextPage,prevPage,page,setPage,totalPages,gaps}) =>{


    const renderItems = () =>{
       return (
           <>
               <Pagination.Item onClick={()=>{setPage(1)}} key={1} active={1 === page}>
                   1
               </Pagination.Item>
               {gaps.before ? <Pagination.Ellipsis/>:""}
               {gaps.paginationGroup.map((number)=><Pagination.Item onClick={()=>{setPage(number)}} key={number} active={number === page}>
                   {number}
               </Pagination.Item>)}
               {gaps.after ? <Pagination.Ellipsis/>:""}
           </>
       )
    }

    return(
        <div>

            <Pagination>
                <Pagination.Prev onClick={prevPage} disabled={page===1}/>
                    {renderItems()}
                    {  totalPages < 3 && totalPages > 1  ?  <Pagination.Item onClick={()=>{setPage(2)}} key={2} active={2 === page}>2</Pagination.Item> :""}
                    {isFetching && <AppSpinner/>}
                    <Pagination.Next onClick={nextPage} disabled={page === totalPages}/>
            </Pagination>
        </div>
    )
}

export default AppPagination