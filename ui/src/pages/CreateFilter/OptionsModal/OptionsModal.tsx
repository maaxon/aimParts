import React, {FC, useEffect, useState} from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {IOption} from "../../../models/IOption";
import classes from "./OptionsModal.module.css";


interface OptionsModalProps {
    options:IOption[] | undefined
    saveOptions(selectedOptions:option[]):void
    prevSelectedOptions:option[]
}

interface option {
    title:string
    id:string
}


const OptionsModal:FC<OptionsModalProps>=({options,saveOptions,prevSelectedOptions})=> {

    useEffect(()=>{
        if (prevSelectedOptions) setOptions(prevSelectedOptions)
    },[prevSelectedOptions])

    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false)
        console.log(selectedOptions)
        saveOptions(selectedOptions)
    }
    const handleShow = () => setShow(true);



    const [selectedOptions,setOptions] = useState<option[]>([])


    const optionsChangeHandler = (e:React.ChangeEvent<HTMLInputElement>) =>{
        if (selectedOptions.find(option=> option.id === e.target.value )) {
            const options = selectedOptions.filter(option => option.id !== e.target.value)
            setOptions(options)
        }
        else {
            const newOption = {id:e.target.value,title:e.target.name}
            setOptions([...selectedOptions,newOption])
        }
    }


    return (
        <>
            <Button variant="outline-primary" onClick={handleShow}>
        add option
    </Button>

    <Modal  size="lg" show={show} onHide={handleClose} >
        <Modal.Header closeButton>
        <Modal.Title>Change options</Modal.Title>
    </Modal.Header>
    <Modal.Body >
        <div className={classes.optionsWrap}>
            {options && options.map(option=>{
                const checked = selectedOptions.find(selectedOption => selectedOption.id === option._id)
                
                return(
                    <Form.Check
                        key={option._id}
                        label={option.title}
                        name={option.title}
                        value={option._id}
                        className={classes.option}
                        onChange={optionsChangeHandler}
                        checked={checked !== undefined}
                    />
                )
            })}
        </div>
    </Modal.Body>
    <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
        Save Changes
    </Button>
    </Modal.Footer>
    </Modal>
    </>
)
}

export default OptionsModal