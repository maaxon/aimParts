import React, { FC, useEffect, useState} from "react";
import AdminWrap from "../../components/AdminWrap/AdminWrap";
import classes from "./createProduct.module.css";
import {Accordion, Button, Form} from "react-bootstrap";
import MultipleImageUpload from "../../components/MultipleImageUpload/MultipleImageUpload";
import {categoriesApi} from "../../services/CategoryService";
import {filterApi} from "../../services/FilterService";
import {productApi} from "../../services/ProductService";
import {ICreateProduct} from "../../models/IProduct";
import { useNavigate } from "react-router-dom";


interface option {
   title:string
   id:string
}

interface IForm {
    title:string
    price:number
    desc:string
    images:string[]
    options:option[]
    category:string
}

interface CreateProductProps {
    updatingProduct?:IForm | undefined
    updateProduct?(product:ICreateProduct): Promise<void> | undefined;
}

const CreateProduct: FC<CreateProductProps> =({updatingProduct= undefined,updateProduct = undefined})=>{

    useEffect(()=>{
        if (updatingProduct){
            setForm(updatingProduct)
        }
        else setForm(defaultFormState)
    },[updatingProduct])


    const defaultFormState:IForm = {
        title:"",
        price:0,
        desc:'',
        images:[],
        options:[],
        category:''
    }

    const [form,setForm] = useState(defaultFormState)

    const {data:categories} = categoriesApi.useFetchCategoriesQuery(0)

    const {data:filters} = filterApi.useFetchFiltersByCategoryQuery(form.category)

    const [createProduct] = productApi.useCreateProductMutation()

    const navigate = useNavigate();
    
    const inputChangeHandler = (e:React.ChangeEvent<HTMLInputElement> ) =>{
        setForm({...form,[e.target.name]:e.target.value})
    }

    const selectChangeHandler = (e:React.ChangeEvent<HTMLSelectElement>) => {
        setForm({...form,[e.target.name]:e.target.value})
    }

    const setImages = (images:string[])=>{
        setForm({...form,images})
    }

    const radioChangeHandler = (e:React.ChangeEvent<HTMLInputElement>) =>{
        let  options:option[] = form.options
        const prevSelectedOption = form.options.find((option:option)=>option.title === e.target.name)
        if (prevSelectedOption){
           options = options.filter((option)=> option.title !== prevSelectedOption.title  )
        }
        const option:option = {title:e.target.name,id:e.target.value}
        options = [...options,option]
        setForm({...form,options})
    }

    const submitHandler = async (e:React.SyntheticEvent<EventTarget>)=>{
        e.preventDefault()
        const options = form.options.map((option)=> option.id)
        const img = form.images[0]
        if (img){
            const product = {...form,options,img}
            if (updatingProduct && updateProduct) {
                await updateProduct(product)
                navigate("/admin")
                return
            }
            await createProduct(product)
            navigate("/admin")
        }
    }


    return (
        <AdminWrap>
            <div className={classes.wrap}>
                <h3>Create product</h3>
                <div className={classes.form}>
                    <Form onSubmit={submitHandler} >
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Title</Form.Label>
                            <Form.Control name={'title'} value={form.title} onChange={inputChangeHandler} type="text" placeholder="Enter title" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Price</Form.Label>
                            <Form.Control name={"price"} value={form.price} onChange={inputChangeHandler} type="number" placeholder="price" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Category</Form.Label>
                            <Form.Select onChange={selectChangeHandler} name={"category"} value={form.category} aria-label="Default select example">
                                <option  value="">Select category</option>

                                {categories && categories.map((category)=>{
                                    return <option key={category._id} value={category._id}>{category.title}</option>
                                })}

                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Description</Form.Label>
                            <Form.Control name={"desc"} onChange={inputChangeHandler} value={form.desc} as='textarea' placeholder="write a description here" />
                        </Form.Group>

                        <Form.Group className={"mb-3"}>
                            <MultipleImageUpload images={form.images} setImages={setImages}/>
                        </Form.Group>

                        <Form.Group className={"mb-3"}>
                            <Form.Label>Options</Form.Label>
                            <Accordion defaultActiveKey={'0'}>

                                {filters && filters.map((filter,idx)=>{
                                    return(
                                        <Accordion.Item eventKey={idx.toString()}>
                                            <Accordion.Header>
                                                <p>{filter.title}</p>
                                            </Accordion.Header>
                                            <Accordion.Body>

                                                {filter.options.map(option =>{
                                                   const checked = form.options.find(formOption => formOption.id === option._id)
                                                    return(
                                                        <Form.Check
                                                            key={option._id}
                                                            label={option.title}
                                                            type={'radio'}
                                                            name={filter.title}
                                                            value={option._id}
                                                            onChange={radioChangeHandler}
                                                            checked={checked !== undefined}
                                                        />
                                                    )
                                                })}
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    )
                                })}


                            </Accordion>
                        </Form.Group>


                        <Button variant="primary" type="submit">
                            Submit
                        </Button>

                    </Form>
                </div>
            </div>
        </AdminWrap>)
}
export default CreateProduct