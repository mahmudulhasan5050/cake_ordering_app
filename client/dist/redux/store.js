import { configureStore } from '@reduxjs/toolkit';
import cakeReducer from '../features/cake/cakeSlice';
import userReducer from '../features/user/userSlice';
import authReducer from '../features/auth/authSlice';
import orderReducer from '../features/orders/orderSlice';
import myOrderReducer from '../features/myOrders/myOrdersSlice';
var store = configureStore({
    reducer: {
        cake: cakeReducer,
        user: userReducer,
        auth: authReducer,
        order: orderReducer,
        myOrder: myOrderReducer
    },
});
export default store;
