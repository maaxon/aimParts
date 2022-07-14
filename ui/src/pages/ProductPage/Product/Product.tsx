import React, {FC} from "react";
import MainCarousel from "../../../components/MainCarousel/MainCarousel";
import classes from "./product.module.css";
import {Button, ListGroup} from "react-bootstrap";
import {IProductById} from "../../../models/IProduct";
import {useAppDispatch} from "../../../hooks/redux";
import {CartSlice} from "../../../store/reducers/CartReducer";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

interface ProductPageProps {
    product:IProductById | undefined
}

const Product:FC<ProductPageProps> = ({product})=>{

    const slides = product ? product.images.map(img=>{return {img}}):[]

    const dispatch = useAppDispatch()
    const {addToCart} = CartSlice.actions

    const onAddToCart = () =>{

        if (product) {
            const {_id,desc,title,price,img} = product
            dispatch(addToCart({_id,title,price,desc,img}))
        }
    }

    if (!product){
        return (
            <>
                <div className={classes.wrapper}>
                        <Skeleton className={classes.skeleton}/>
                    <div className={classes.elementsWrap}>
                        <ListGroup className={'w-100'}>
                            <ListGroup.Item className={'d-flex justify-content-around'}><h5>Характеристики</h5></ListGroup.Item>
                            <ListGroup.Item  className={'d-flex justify-content-around'}><Skeleton containerClassName={"w-25"}/><Skeleton containerClassName={"w-25"}/></ListGroup.Item>
                            <ListGroup.Item  className={'d-flex justify-content-around'}><Skeleton containerClassName={"w-25"}/><Skeleton containerClassName={"w-25"}/></ListGroup.Item>
                            <ListGroup.Item  className={'d-flex justify-content-around'}><Skeleton containerClassName={"w-25"}/><Skeleton containerClassName={"w-25"}/></ListGroup.Item>
                        </ListGroup>
                    </div>

                </div>
            </>
        )
    }

    return(
        <>
            <div className={classes.wrapper}>
                <div className={classes.elementsWrap}>
                    <MainCarousel slides={slides}/>
                </div>
                <Button variant={"outline-dark"} onClick={onAddToCart} >add to cart</Button>
                <div className={classes.elementsWrap}>
                    <ListGroup className={'w-100'}>
                        <ListGroup.Item className={'d-flex justify-content-around'}><h5>Характеристики</h5></ListGroup.Item>
                        {product && product.options.map(option =>{
                            return <ListGroup.Item key={option._id} className={'d-flex justify-content-around'}><span>{option.filter.title}</span><span>{option.title}</span></ListGroup.Item>
                        })}
                    </ListGroup>
                </div>

            </div>
        </>
    )
}
export default Product