import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IFilter} from "../../models/IFilter";
import {IStateFilter} from "../../models/IStateFilter";

interface checkedOptionsState {
    filters:IStateFilter[]
}
interface ActionFilter {
    id:string
    option:string
}


const initialState:checkedOptionsState ={
    filters:[]
}

export const  checkedOptionsSlice = createSlice({
    name:'checkedOptions',
    initialState,
    reducers:{
        initiateFilters(state,action:PayloadAction<IFilter[]>){
            state.filters = action.payload.map((filter)=>{
                return {id:filter._id,options:[]}
            })
        },
        checkOption(state,action:PayloadAction<ActionFilter>){
            const filter = state.filters.find(filter => filter.id === action.payload.id)
            if (filter) filter.options.push(action.payload.option)
        },
        uncheckOption(state,action:PayloadAction<ActionFilter>){
            const filter = state.filters.find(filter => filter.id === action.payload.id)
            if (filter) filter.options.splice(filter.options.indexOf(action.payload.option),1)
        },
        uncheckAllOptions(state){
            state.filters =state.filters.map(filter => {return {id:filter.id,options:[]}})
        }
    }
})

export default checkedOptionsSlice.reducer