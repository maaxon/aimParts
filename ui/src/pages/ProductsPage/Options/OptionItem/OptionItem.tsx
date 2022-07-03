import React, {FC} from "react";
import { Form } from "react-bootstrap";
import classes from "./OptionItem.module.css";
import {IOption} from "../../../../models/IOption";
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {checkedOptionsSlice} from "../../../../store/reducers/CheckedOptionsSlice";
import {IStateFilter} from "../../../../models/IStateFilter";


interface OptionItemProps {
    options:IOption[] | undefined
    title:string
    filterId:string
    filters:IStateFilter[]
}

const OptionItem: FC<OptionItemProps> = ({options,title,filterId,filters})=>{

    const {checkOption,uncheckOption} = checkedOptionsSlice.actions
    const dispatch = useAppDispatch()
    let checkedOptions: string[];
    let filter:IStateFilter | undefined
    if (filters) {
        filter = filters.find((filter) => filter.id === filterId)
        if (filter) {
            checkedOptions = filter.options
        }
    }


    const changeHandler = (e:React.ChangeEvent) => {
        if (checkedOptions) {
            if (checkedOptions.includes(e.target.id)) dispatch(uncheckOption({id:filterId,option:e.target.id}))
        else dispatch(checkOption({id:filterId,option:e.target.id}))}
    }
    if (filters.length < 1){
        return <h1>awaiting</h1>
    }

    else {
    return(
    <div className={classes.wrapper}>
        <h5>{title}</h5>
        {options && options.map((option)=>{
            if (checkedOptions){
                return(
                    <Form.Check checked={checkedOptions.includes(option._id)}  onChange={changeHandler} id={option._id} key={option._id} label={option.title} />
                )
            }
        })}
    </div>
    )}
}

export default OptionItem