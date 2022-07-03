import React, {FC} from "react";
import {Spinner} from "react-bootstrap";
import classes from "./appSpinner.module.css";

const AppSpinner:FC = () =>{
    return(
        <div className={classes.loaderWrapper} >
            <Spinner className={classes.loader} animation={"border"} />
        </div>
    )
}
export default AppSpinner