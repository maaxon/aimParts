import React, {FC} from "react";
import {Accordion} from "react-bootstrap";
import {IOrder} from "../../models/IOrder";
import {Link} from "react-router-dom";

interface OrderItemProps {
    index:number
    order:IOrder
}

const OrderItem:FC<OrderItemProps> = ({index,order})=>{

    const {_id,total,products,user} = order

    return(
                <Accordion.Item eventKey={index.toString()}>
                    <Accordion.Header >
                      <div className={"d-flex justify-content-center w-100"}>order №{_id}</div>
                    </Accordion.Header>
                 <Accordion.Body>
                    <div>
                        <p>Name: {`${user.name} ${user.surname} `}</p>
                        <p>Address: {user.address}</p>
                        <p>Total:${total}</p>
                        <p>Ordered products:</p>

                                    <div>
                                        <table className="table align-middle">
                                            <thead className="table-light">
                                            <tr>
                                                <th>Product</th>
                                                <th>Price</th>
                                                <th>Count</th>
                                                <th>Total price</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {products && products.map((orderProduct)=>{

                                                const {count,product} = orderProduct
                                                const {_id,img,title,price} = product

                                                return(    <tr key={_id}>
                                                    <td> <Link to={`/product/${_id}`}><div className="product-box d-flex flex-column align-items-center">
                                                        <img style={{width:"8vw"}} src={img} />
                                                        <h6 className="mb-0 text-center product-title">{title}</h6>

                                                    </div></Link>
                                                    </td>
                                                    <td>${price}</td>
                                                    <td>{count}</td>
                                                    <td>${price*count}</td>
                                                </tr>  ) })}
                                            </tbody>
                                        </table>
                                    </div>



                    </div>

                 </Accordion.Body>
                </Accordion.Item>
    )
}
export default OrderItem