import React, {FC} from "react";
import AdminProductCard from "./AdminProductCard/AdminProductCard";
import AdminWrap from "../../components/AdminWrap/AdminWrap";
import {productApi} from "../../services/ProductService";


const AdminProducts: FC =()=>{

    const {data:products} = productApi.useFetchProductsQuery(0)


    return (
        <AdminWrap>
            <div className="card">
                <div className="card-header py-3">
                    <div className="row align-items-center m-0">
                        <div className="col-md-3 col-12 me-auto mb-md-0 mb-3">
                            <select className="form-select">
                                <option>All category</option>
                                <option>Fashion</option>
                                <option>Electronics</option>
                                <option>Furniture</option>
                                <option>Sports</option>
                            </select>
                        </div>
                        <div className="col-md-2 col-6">
                            <input type="date" className="form-control"/>
                        </div>
                        <div className="col-md-2 col-6">
                            <select className="form-select">
                                <option>Status</option>
                                <option>Active</option>
                                <option>Disabled</option>
                                <option>Show all</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="card-body">

                    <div className="table-responsive">
                        <table className="table align-middle table-striped">
                            <tbody>
                            {
                                products && products.map((product)=> <AdminProductCard img={product.img} title={product.title} id={product._id} price={product.price} /> )
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminWrap>)
}
export default AdminProducts