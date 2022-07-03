import React, {FC, useState} from "react";
import {Pagination} from "react-bootstrap";
import {Gap} from "../../types/usePagination";

interface AppPaginationProps {
    nextPage():void
    prevPage():void
    page:number
    setPage(page:number):void
    totalPages:number
    gaps:Gap
}

const AppPagination:FC<AppPaginationProps> = ({nextPage,prevPage,page,setPage,totalPages,gaps}) =>{


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

    if (totalPages == 1) return <></>

    return(
        <div>

            <Pagination>
                <Pagination.Prev onClick={prevPage} disabled={page===1}/>
                    {renderItems()}
                    {totalPages < 3 ?  <Pagination.Item onClick={()=>{setPage(2)}} key={2} active={2 === page}>2</Pagination.Item> :""}
                    <Pagination.Next onClick={nextPage} disabled={page === totalPages}/>
            </Pagination>
        </div>
    )
}

export default AppPagination