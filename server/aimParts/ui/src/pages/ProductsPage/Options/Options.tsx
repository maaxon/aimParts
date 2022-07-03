import React, {FC, useEffect, useLayoutEffect} from "react";
import classes from "./Options.module.css";
import OptionItem from "./OptionItem/OptionItem";
import {filterApi} from "../../../services/FilterService";
import {checkedOptionsSlice} from "../../../store/reducers/CheckedOptionsSlice";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {useParams} from "react-router-dom";




const Options: FC = ()=>{

    let params = useParams();
    useLayoutEffect(() => () => {
        dispatch(uncheckAllOptions())
    }, [])

    const {data:filters} = filterApi.useFetchFiltersByCategoryQuery(params.categoryId)

    useEffect(()=>{
        if (filters) dispatch(initiateFilters(filters))
    },[filters])

    const dispatch = useAppDispatch()
    const {initiateFilters,uncheckAllOptions} = checkedOptionsSlice.actions
    const {filters:stateFilters} = useAppSelector(state => state.checkedOptionReducer)


    return(
                <div >
                    {
                        filters && filters.map(filter => <OptionItem key={filter._id}
                                                                     options={filter.options}
                                                                     filterId={filter._id}
                                                                     title={filter.title}
                                                                     filters={stateFilters}/>)
                    }
                </div>

    )
}
export default Options