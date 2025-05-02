import { configureStore } from "@reduxjs/toolkit"; // Sửa lỗi import
import authReducer from "./slices/authSlice";
import productReducer from "./slices/productsSlice";
import cartReducer from "./slices/cartSlice";
import checkoutReducer from "./slices/checkoutSlice";


import orderReducer from "./slices/orderSlice";
import adminReducer from "./slices/adminSlice";
import adminProductReducer from "./slices/adminProductSlice";
import adminOrderReducer from "./slices/adminOrderSlice";
const  store = configureStore({
    reducer:{
        auth:authReducer,
        products:productReducer,
        cart: cartReducer,
        checkout: checkoutReducer,
        orders: orderReducer,
        admin: adminReducer, // thêm adminSlice vào reducer
        adminProducts: adminProductReducer,
        adminOrders: adminOrderReducer, // thêm adminOrderSlice vào reducer
    },
    
});
export default store;