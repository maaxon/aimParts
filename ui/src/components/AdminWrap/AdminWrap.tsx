import React, {FC} from "react";
import classes from "../../pages/ProductsPage/Products/Products.module.css";

interface AdminWrapProps  {
    children?: React.ReactNode
}

const AdminWrap: FC =(props:AdminWrapProps)=>{



    return (
        <>
            <div className={classes.title}><h3>Cars</h3></div>
            <div className={classes.mainWrap}>
                <div className={classes.leftSide}>
                    <ul className="nav nav-pills flex-column ">
                        <li className="nav-item">
                            <a href="#" className="nav-link active" aria-current="page">

                                Home
                            </a>
                        </li>
                        <li>
                            <a href="#" className="nav-link link-dark">

                                Dashboard
                            </a>
                        </li>
                        <li>
                            <a href="#" className="nav-link link-dark">

                                Orders
                            </a>
                        </li>
                        <li>
                            <a href="#" className="nav-link link-dark">

                                Products
                            </a>
                        </li>
                        <li>
                            <a href="#" className="nav-link link-dark">

                                Customers
                            </a>
                        </li>
                    </ul>
                </div>
                <div>
                    {props.children}
                </div>
            </div>
        </>)
}
export default AdminWrap