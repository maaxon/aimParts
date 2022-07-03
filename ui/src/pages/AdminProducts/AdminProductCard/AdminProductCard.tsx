import React, {FC} from "react";
import {Button} from "react-bootstrap";
import {productApi} from "../../../services/ProductService";
import {Link} from "react-router-dom";

interface AdminProductCardProps {
    id:string
    price:number
    title:string
    img:string
}

const AdminProductCard:FC<AdminProductCardProps> = ({id,price,title,img})=>{

    const [deleteProduct,{}] = productApi.useDeleteProductMutation()

    const onDelete = (id:string) =>{
        deleteProduct(id)
    }

    return(
        <tr>
            <td>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox"/>
                </div>
            </td>
            <td className="productlist">
                    <div className="product-box">
                        <img style={{width:"8vw"}} src={img} />
                    </div>
                    <div>
                        <h6 className="mb-0 product-title">{title}</h6>
                    </div>
            </td>
            <td><span>${price}</span></td>
            <td><span className="badge rounded-pill alert-success">Active</span></td>
            <td><span>5-31-2020</span></td>
            <td>
                <div className="d-flex align-items-center gap-3 fs-6">
                    <Button onClick={()=>{onDelete(id)}} variant={"danger"}>delete</Button>
                    <Link to={`/updateProduct/${id}`}><Button variant={"primary"}>update</Button></Link>
                </div>
            </td>
        </tr>
    )
}

export default AdminProductCard