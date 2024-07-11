import { configureStore } from "@reduxjs/toolkit";

import cartSlice from "./slices/cartSlice";
import userReducer from "./slices/userSlice";

const store = configureStore({
    reducer:{
        cart : cartSlice,
        user: userReducer,
    }
})

export default store;