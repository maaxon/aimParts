import React, { FC, useEffect, useState} from "react";
import AdminWrap from "../../components/AdminWrap/AdminWrap";
import classes from "../CreateProduct/createProduct.module.css";
import {Accordion, Button, Form} from "react-bootstrap";
import {categoriesApi} from "../../services/CategoryService";
import { useNavigate } from "react-router-dom";
import OptionsModal from "./OptionsModal/OptionsModal";
import {optionsApi} from "../../services/OptionsService";
import {filterApi} from "../../services/FilterService";
import {ICreateFilter} from "../../models/IFilter";

interface option {
    title:string
    id:string
}

interface IForm {
    title:string
    categories:string[]
    options:option[]
}

interface CreateProductProps {
    updatingFilter?:IForm | undefined
    updateFilter?(filter:ICreateFilter): Promise<void> | undefined;
}

const CreateFilter: FC<CreateProductProps> =({updatingFilter= undefined,updateFilter = undefined})=>{

    useEffect(()=>{
        if (updatingFilter) setForm(updatingFilter)
        else setForm(defaultFormState)
    },[updatingFilter])


    const defaultFormState:IForm = {
        title:"",
        categories:[],
        options:[]
    }

    const [form,setForm] = useState(defaultFormState)

    const {data:categories} = categoriesApi.useFetchCategoriesQuery(0)

    const {data:options} = optionsApi.useFetchOptionsQuery(10)

    const [createFilter] = filterApi.useCreateFilterMutation()

    const navigate = useNavigate();

    const inputChangeHandler = (e:React.ChangeEvent<HTMLInputElement> ) =>{
        setForm({...form,[e.target.name]:e.target.value})
    }

    const categoryChangeHandler = (e:React.ChangeEvent<HTMLInputElement>) =>{
        if (form.categories.indexOf(e.target.value)>-1) {
            const categories = form.categories.filter(category => category !== e.target.value)
            setForm({...form,categories})
        }
        else setForm({...form,categories:[...form.categories,e.target.value]})
    }

    const setOptions = (options:option[])=>{
        setForm({...form,options})
    }

    const submitHandler = async (e:React.SyntheticEvent<EventTarget>)=>{
        e.preventDefault()
        const options = form.options.map(option=> option.id)
        if (updatingFilter && updateFilter) {
            await updateFilter({...form,options})
            navigate("/admin/filters")
            return
        }
        createFilter({...form,options})
        navigate("/admin/filters")
    }

    return (
        <AdminWrap>
            <div className={classes.wrap}>
                <h3>Create filter</h3>
                <div className={classes.form}>
                    <Form onSubmit={submitHandler} >
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Title</Form.Label>
                            <Form.Control name={'title'} value={form.title} onChange={inputChangeHandler} type="text" placeholder="Enter title" />
                        </Form.Group>


                        <Form.Group className="mb-3">
                            <Form.Label>Category</Form.Label>
                            <Accordion defaultActiveKey={'0'}>

                                    <Accordion.Item eventKey={"0"}>
                                        <Accordion.Header>
                                            Select categories
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            {categories && categories.map(category=> <Form.Check
                                                key={category._id}
                                                label={category.title}
                                                type={'checkbox'}
                                                name={category.title}
                                                value={category._id}
                                                checked={form.categories.indexOf(category._id)>-1}
                                                onChange={categoryChangeHandler}
                                            />)}
                                        </Accordion.Body>
                                    </Accordion.Item>

                            </Accordion>
                        </Form.Group>



                        <Form.Group className={"mb-3"}>
                            <Form.Label>Options:</Form.Label><br/>
                            <ul>
                                {form.options.map(option=><li key={option.id}>{option.title}</li>)}
                            </ul>
                            <OptionsModal prevSelectedOptions={form.options} options={options} saveOptions={setOptions}/>
                        </Form.Group>


                        <Button variant="primary" type="submit">
                            Submit
                        </Button>

                    </Form>
                </div>
            </div>
        </AdminWrap>)
}
export default CreateFilter