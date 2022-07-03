import {combineReducers, configureStore} from "@reduxjs/toolkit"
import checkedOptionReducer from './reducers/CheckedOptionsSlice'
import UserReducer from './reducers/UserReducer'
import CartReducer from './reducers/CartReducer'
import {userApi} from "../services/UserService";
import {productApi} from "../services/ProductService";
import {filterApi} from "../services/FilterService";
import {categoriesApi} from "../services/CategoryService";
import {orderApi} from "../services/OrderService";
import {optionsApi} from "../services/OptionsService";



const rootReducer = combineReducers({
    checkedOptionReducer,
    UserReducer,
    CartReducer,
    [userApi.reducerPath]:userApi.reducer,
    [productApi.reducerPath]:productApi.reducer,
    [filterApi.reducerPath]:filterApi.reducer,
    [categoriesApi.reducerPath]:categoriesApi.reducer,
    [orderApi.reducerPath]:orderApi.reducer,
    [optionsApi.reducerPath]:optionsApi.reducer
})

export const setupStore = () =>{
    return configureStore({
        reducer: rootReducer,
        middleware:(getDefaultMiddleware  )=>
            getDefaultMiddleware().concat(
                userApi.middleware,
                productApi.middleware,
                filterApi.middleware,
                categoriesApi.middleware,
                orderApi.middleware,
                optionsApi.middleware
            )
    })
}

export  type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']