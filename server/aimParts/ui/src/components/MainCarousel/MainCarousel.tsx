import React, {FC} from "react";
import {Carousel} from "react-bootstrap";

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
                        className="d-block w-100"
                        src={slide.img}
                        alt="First slide"
                        style={{height:'60vh'}}
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