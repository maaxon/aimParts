import React, {FC} from "react";
import {Card} from "react-bootstrap";
import classes from './ProductItem.module.css'
import {Link} from "react-router-dom";

interface ProductItemProps {
   img:string
   title:string
   desc:string
   price:number
   id:string
}

const ProductItem:FC<ProductItemProps> = ({img,title,desc,price,id}) =>{
    return(
        <Card className={classes.card}>
            <Link className={classes.link} to={`/product/${id}`}>
            <Card.Img variant="top" src={img} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                    <Card.Text>
                        {desc}
                    </Card.Text>
            </Card.Body>
            </Link>
    </Card>
    )
}

export default ProductItem