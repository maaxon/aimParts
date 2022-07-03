import React, {FC} from "react";
import {Button, Card} from "react-bootstrap";

interface ImgCardProps {
    image?: string;
    onImageRemove(): void;
}

const ImgCard: FC<ImgCardProps> =({image,onImageRemove})=>{
    return (

        <Card style={{ width: '10rem' }}>
            <Card.Img variant="top" src={image} />
            <Card.Body className={'d-flex justify-content-around'}>
                <Button onClick={onImageRemove} variant="danger">Delete</Button>
            </Card.Body>
        </Card>

    )
}

export default ImgCard