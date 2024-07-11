import React from "react";
import {Route,Routes,Navigate} from "react-router-dom";

import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import ProductDetail from "../pages/ProductDetail";
import Checkout from "../pages/Checkout";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";

const Router = () => {
    return(
        <Routes>
        <Route path="/" element={<Navigate to='/home'/>}/>
            <Route path='home' element={<Home/>}/>
            <Route path='shop' element={<Shop/>}/>
            <Route path='cart' element={<Cart/>}/>
            <Route path='login' element={<Login/>}/>
            {/*<Route path='productDetail' element={<ProductDetail/>}/>*/}
            <Route path='checkout' element={<Checkout/>}/>
            <Route path='signUp' element={<SignUp/>}/>
            <Route path='signIn' element={<SignIn/>}/>
            <Route path="/shop/:id" element={<ProductDetail />} />
        </Routes>
    ) ;
};

export default Router;