import React, {FC, useState} from "react";
import {Button, Offcanvas} from "react-bootstrap";

interface SideBarProps {
    children: React.ReactNode
}

const SideBar:FC<SideBarProps> = ({children})=>{

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    if (window.innerWidth >=992){
        return <>{children}</>
    }

    return(
        <>
                <div>
                <Button variant="outline" className="d-lg-none" onClick={handleShow}>
                  <img className="navbar-toggler-icon" src={"https://i.ya-webdesign.com/images/hamburger-icon-png-7.png"}/>
                </Button>
                </div>

                <Offcanvas show={show} onHide={handleClose} responsive="lg">
                    <Offcanvas.Header closeButton/>
                    <Offcanvas.Body>
                        {children}
                    </Offcanvas.Body>
                </Offcanvas>
        </>
    )
}
export default SideBar