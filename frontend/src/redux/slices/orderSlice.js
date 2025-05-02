import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

//async thunk to fetch user orders Lấy danh sách đơn hàng của người dùng
export const fetchUserOrders=createAsyncThunk("orders/fetchUserOrders",async(_,{rejectedWithValue})=>{
    try{
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/my-orders`,
            {
                headers:{
                    'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
                },
            }

        );
        return response.data;
    }
    catch(error){
        // console.error(error);
        return rejectedWithValue(error.response.data);
    }

}
);
//async thhunk ro fetch orders details by id  Lấy chi tiết đơn hàng theo ID
export const fetchOrderDetails=createAsyncThunk("orders/fetchOrderDetails",async(orderId,{rejectedWithValue})=>{
    try{
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/${orderId}`,
        {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
        });
        return response.data;

    }
    catch(error){
        // console.error(error);
        return rejectedWithValue(error.response.data);
    }
});

const orderSlice=createSlice({
    name:"orders",
    initialState:{
        orders: [],
        totalOrders: 0,
        orderDetails:null,
        loading:false,
        error:null,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
       .addCase(fetchUserOrders.pending,(state)=>{
            state.loading=true;
            state.error=null;

       })
       .addCase(fetchUserOrders.fulfilled,(state,action)=>{
            state.loading=false;
            state.orders=action.payload;
        })
        .addCase(fetchUserOrders.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload.message;
       })

       //fetch order details
       .addCase(fetchOrderDetails.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(fetchOrderDetails.fulfilled,(state,action)=>{
            state.loading=false;
            state.orderDetails=action.payload;
            })
        .addCase(fetchOrderDetails.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload.message;
        })
    }
})
export default orderSlice.reducer;
// pending: bắt đầu fetch dữ liệu → hiện loading spinner

// fulfilled: gọi API thành công → lưu kết quả vào state

// rejected: gọi API thất bại → hiển thị lỗi

