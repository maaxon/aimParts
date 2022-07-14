import React, {FC, useEffect} from "react";
import classes from "../../pages/ProductsPage/Products/Products.module.css";
import {Container, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import {useAppSelector} from "../../hooks/redux";
import { useNavigate } from "react-router-dom";


interface AdminWrapProps  {
    children: React.ReactNode
}

const AdminWrap: FC<AdminWrapProps> =({children})=>{

    const {user} = useAppSelector(state => state.UserReducer)
    const navigate = useNavigate();


    useEffect(()=>{
        if (!user || user.role !== "admin") navigate('/')
    })

    return (
        <>
            <div className={classes.mainWrap}>
                <SideBar>
                    <div className={classes.leftSide}>
                        <Navbar>
                            <Container >
                                <Nav className={"d-flex flex-column"}>
                                    <Nav><Link className={'nav-link'} to="/admin">Products</Link></Nav>
                                    <Nav><Link className={'nav-link'} to="/createProduct">Create product</Link></Nav>
                                    <Nav><Link className={'nav-link'} to="/admin/categories">Categories</Link></Nav>
                                    <Nav><Link className={'nav-link'} to="/admin/filters">Filters</Link></Nav>
                                    <Nav><Link className={'nav-link'} to="/createFilter">Create filter</Link></Nav>
                                    <Nav><Link className={'nav-link'} to="/admin/options">Options</Link></Nav>
                                    <Nav><Link className={'nav-link'} to="/admin/users">Users</Link></Nav>
                                    <Nav><Link className={'nav-link'} to="/admin/orders">Orders</Link></Nav>
                                </Nav>
                            </Container>
                        </Navbar>
                    </div>
                </SideBar>
                <div>
                    {children}
                </div>
            </div>
        </>)
}
export default AdminWrap