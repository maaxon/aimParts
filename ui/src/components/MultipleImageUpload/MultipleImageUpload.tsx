import React, {FC} from "react";
import AliceCarousel from "react-alice-carousel";
import 'react-alice-carousel/lib/alice-carousel.css';
import ImgCard from "./ImgCard/ImgCard";
import {Button, Card} from "react-bootstrap";


interface MultipleImageUploadProps {
    images: string[],
    setImages: (images:string[]) => void
}



const MultipleImageUpload:FC<MultipleImageUploadProps> = ({images,setImages}) => {
    const maxNumber = 5;

    const responsive = {
        0: { items: 1 },
        568: { items: 2 },
        1024: { items: 3 },
    };


    const changeHandler = async (e:React.ChangeEvent<HTMLInputElement>) =>{
        if (e.target.files){
            const reader = new FileReader()
            reader.readAsDataURL(e.target.files[0])

            reader.onload = function() {
                setImages([...images,reader.result] as string[])
            };
        }

    }

    const onDelete = (index:number) =>{
        const updated = images.filter((img,idx)=>idx !== index)
        setImages(updated)
    }

    return (


        <div className="d-flex justify-content-between">
            <div>
                <label htmlFor="upload-photo">
            <Card  style={{ width: '10rem'}}>
                <Card.Img variant="top" src={'https://i1.sndcdn.com/avatars-000298500548-ifhxxl-t500x500.jpg'} />
                <Card.Body className={'d-flex justify-content-around'}>
                    <Card.Text>click or drop image</Card.Text>

                    <input
                        style={{ display:'none' }}
                        id="upload-photo"
                        type="file"
                        onChange={changeHandler}
                    />
                </Card.Body>
            </Card>
                </label>
            </div>
            <div className={images.length > 0 ? 'w-100':'d-none'}>
            <AliceCarousel
                mouseTracking
                items={images.map((image, index) => (
                    <ImgCard image={image} onImageRemove={() => {onDelete(index)}}/>
                ))}
                responsive={responsive}
            />
        </div>


    </div>

);
}

export default MultipleImageUpload