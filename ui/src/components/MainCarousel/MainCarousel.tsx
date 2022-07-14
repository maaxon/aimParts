import React, {FC} from "react";
import {Carousel} from "react-bootstrap";
import classes from "./mainCarousel.module.css";


interface CarouselProps{
    slides:ISlides[]
}

interface ISlides {
    img:string;
    interval?:number;
    text?:string;
    title?:string
}

const MainCarousel: FC<CarouselProps> =({slides})=> {
    return(
        <Carousel>
            {slides.map((slide,idx)=>{
                return(
                <Carousel.Item key={idx} interval={slide.interval}>
                    <img
                        className={classes.slideImg}
                        src={slide.img}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>{slide.title}</h3>
                        <p>{slide.text}</p>
                    </Carousel.Caption>
                </Carousel.Item>)
            })}
        </Carousel>
    )
}
export default MainCarousel