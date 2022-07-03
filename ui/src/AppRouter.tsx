import React, {FC, Suspense} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navigation from "./components/Navbar/Navbar";
import {UserSlice} from "./store/reducers/UserReducer";
import {useAppDispatch} from "./hooks/redux";
import {CartSlice} from "./store/reducers/CartReducer";
import AppSpinner from "./components/AppSpinner/AppSpinner";

import Main from "./pages/Main/Main";
import ProductPage from "./pages/ProductPage/ProductPage";
import Cart from "./pages/Cart/Cart";
import ProductsPage from "./pages/ProductsPage/ProductsPage";

const AdminProducts = React.lazy(()=>import("./pages/AdminProducts/AdminProducts"))
const CreateProduct = React.lazy(()=>import("./pages/CreateProduct/CreateProduct"))
const AdminOrders = React.lazy(()=>import("./pages/AdminOrders/AdminOrders"))
const UpdateProduct = React.lazy(()=>import("./pages/UpdateProduct/UpdateProduct"))
const AdminCategories = React.lazy(()=>import("./pages/AdminCategories/AdminCategories"))
const AdminFilters = React.lazy(()=>import("./pages/AdminFilters/AdminFilters"))
const CreateFilter = React.lazy(()=>import("./pages/CreateFilter/CreateFilter"))
const UpdateFilter = React.lazy(()=>import("./pages/CreateFilter/UpdateFilter"))
const AdminOptions = React.lazy(()=>import("./pages/AdminOptions/AdminOptions"))
const AdminUsers = React.lazy(()=>import("./pages/AdminUsers/AdminUsers"))
const Orders = React.lazy(()=>import("./pages/Orders/Orders"))

const AppRouter: FC =()=>{
    const {initUser} = UserSlice.actions
    const {initCart} = CartSlice.actions
    const dispatch = useAppDispatch()
    dispatch(initUser())
    dispatch(initCart())

    return (
        <>
            <BrowserRouter>
                <Navigation/>
                <Routes>
                    <Route path="/" element={<Main />}/>
                    <Route path={'/products/:categoryId'} element={<ProductsPage/>}/>
                    <Route path={'/product/:productId'} element={<ProductPage/>} />
                    <Route path={'/cart'} element={<Cart/>} />
                    <Route path={'/admin'} element={<Suspense fallback={<AppSpinner/>}><AdminProducts/></Suspense>} />
                    <Route path={'/admin/categories'} element={<Suspense fallback={<AppSpinner/>}><AdminCategories/></Suspense>} />
                    <Route path={'/admin/options'} element={<Suspense fallback={<AppSpinner/>}><AdminOptions/></Suspense>} />
                    <Route path={'/admin/filters'} element={<Suspense fallback={<AppSpinner/>}><AdminFilters/></Suspense>} />
                    <Route path={'/admin/users'} element={<Suspense fallback={<AppSpinner/>}><AdminUsers/></Suspense>}/>
                    <Route path={'/admin/orders'} element={<Suspense fallback={<AppSpinner/>}><AdminOrders/></Suspense>} />
                    <Route path={'/createProduct'} element={<Suspense fallback={<AppSpinner/>}><CreateProduct/></Suspense>} />
                    <Route path={'/createFilter'} element={<Suspense fallback={<AppSpinner/>}><CreateFilter/></Suspense>}/>
                    <Route path={'/updateProduct/:productId'} element={<Suspense fallback={<AppSpinner/>}><UpdateProduct/></Suspense>} />
                    <Route path={'/updateFilter/:filterId'} element={<Suspense fallback={<AppSpinner/>}><UpdateFilter/></Suspense>}/>
                    <Route path={'/orders/:userId'} element={<Suspense fallback={<AppSpinner/>}><Orders/></Suspense>}/>
                </Routes>
            </BrowserRouter>
        </>)
}
export default AppRouter