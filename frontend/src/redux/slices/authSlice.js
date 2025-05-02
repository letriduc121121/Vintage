import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

//retrieve uer info and token form localStorage if available
const userFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

//check for an existing guest id in the localStorage or generate a new one\
const initialGuestId = 
    localStorage.getItem("guestId")||`guest_${new Date().getTime()}`;
localStorage.setItem("guestId", initialGuestId);
// initialGuestId: Kiểm tra xem có guestId nào trong localStorage không. Nếu có thì dùng guestId đã lưu, nếu không có, 
// tạo một guestId mới bằng cách sử dụng thời gian hiện tại (new Date().getTime()).
//initial state
const initialState = {
    user: userFromStorage, // Lưu thông tin người dùng
    guestId: initialGuestId, // Lưu ID khách
    
    loading: false, // Trạng thái tải khi đang xử lý đăng nhập
    error: null, // Lưu lỗi nếu có lỗi trong quá trình đăng nhập
};

//asynce thank for user login
export const loginUser=createAsyncThunk("auth/loginUser",async (userData,{rejectWithValue})=>{
    try{
        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/user/login`,
            userData
    );
    localStorage.setItem('userInfo',JSON.stringify(response.data.user));
    localStorage.setItem('userToken',response.data.token);


    return response.data.user;//return the user object from the response 
    }
    catch(error){
        return rejectWithValue(error.response.data);
    }
});
export const registerUser=createAsyncThunk(
    "auth/registerUser",
    async (userData,{rejectWithValue})=>{
    try{
        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/user/register`,
            userData
    );
    localStorage.setItem('userInfo',JSON.stringify(response.data.user));
    localStorage.setItem('userToken',response.data.token);

    return response.data.user;//return the user object from the response 
    }
    catch(error){
        return rejectWithValue(error.response.data.message);
    }
});
//sclie
const authSlice = createSlice({
    name: "auth", // Tên slice trong Redux
    initialState,  // Trạng thái ban đầu (user, guestId, loading, error)
    reducers: {  // Các reducer (hàm cập nhật trạng thái)
        logout: (state) => {
            state.user = null; // Xóa thông tin người dùng khi đăng xuất
            state.guestId = `guest_${new Date().getTime()}`; // Tạo guestId mới
            localStorage.removeItem('userInfo');
            localStorage.removeItem('userToken');

            // Cập nhật guestId mới vào localStorage
            localStorage.setItem('guestId', state.guestId);
        },

        generateNewGuesId: (state) => {
            // Tạo guestId mới khi gọi hành động này
            state.guestId = `guest_${new Date().getTime()}`;

            // Lưu guestId mới vào localStorage
            localStorage.setItem('guestId', state.guestId);
        },
    },

    extraReducers: (builder) => {
        // Sẽ thêm các case xử lý bất đồng bộ (loginUser) ở đây
        builder
            .addCase(loginUser.pending,(state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled,(state,action)=>{
                state.loading =false;
                state.user = action.payload;
            })

            .addCase(loginUser.rejected,(state,action)=>{
                state.loading =false;
                state.error = action.payload.message;
            })
            .addCase(registerUser.pending,(state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled,(state,action)=>{
                state.loading =false;
                state.user = action.payload;
            })

            .addCase(registerUser.rejected,(state,action)=>{
                state.loading =false;
                state.error = action.payload.message;
            });
    },
});
export const {logout,generateNewGuesId}=authSlice.actions;
export default authSlice.reducer;

