import {Navbar,Container,Nav,} from "react-bootstrap";
import React from "react";
import {Link} from "react-router-dom";
import classes from "./Navbar.module.css";
import {categoriesApi} from "../../services/CategoryService";
import Login from "../LoginController/Login/Login";
import LoginController from "../LoginController/LoginController";


export  default function Navigation() {

    const {data:categories} = categoriesApi.useFetchCategoriesQuery()

    return(
        <Navbar bg="light" expand="lg" className={classes.mainNav}>
        <Container>
            <Navbar.Brand ><Nav><Link className={'nav-link'} to="/">AIMparts</Link></Nav></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className={classes.collapse}>
                <Nav>
                    <Nav><Link className={'nav-link'} to="/">Home</Link></Nav>
                    {categories && categories.map(category => {
                        return <Nav key={category._id}><Link className={'nav-link'} to={`/products/${category._id}`}>{category.title}</Link></Nav>
                    })}
                    <Nav><Link className={'nav-link'} to="/cart">Cart</Link></Nav>
                    <Nav><LoginController/></Nav>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>


)
}