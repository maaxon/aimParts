import React, {FC} from "react";
import {Accordion, Button} from "react-bootstrap";
import {IFilter} from "../../../models/IFilter";
import {Link} from "react-router-dom";


interface AdminFiltersItemProps {
    index:number
    filter:IFilter
    onDelete(id:string):void
}

const AdminFiltersItem:FC<AdminFiltersItemProps> = ({index,filter,onDelete})=>{



    return(
        <Accordion.Item eventKey={index.toString()}>
            <Accordion.Header >
                <div className={"d-flex justify-content-center w-100"}>{filter.title} </div>
            </Accordion.Header>
            <Accordion.Body>
               <div>
                   <h4>Categories:</h4>
                   <p>{filter.categories.map(category=>category.title).join(", ")}</p>
               </div>
                <div>
                    <h4>Options:</h4>
                    <ul>
                        {filter.options.map(option => <li key={option._id}>{option.title}</li>)}
                    </ul>

                </div>
                    <Link className={"me-2"} to={`/updateFilter/${filter._id}`} ><Button variant={"outline-primary"}>update</Button></Link>
                    <Button variant={"outline-danger"} onClick={()=>{onDelete(filter._id)}} >delete</Button>

            </Accordion.Body>
        </Accordion.Item>
    )
}
export default AdminFiltersItem