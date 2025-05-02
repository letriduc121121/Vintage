import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

//fetch all users (admin only  )ấy danh sách tất cả người dùng từ backend (chỉ có thể thực hiện bởi admin).
export const fetchUsers =createAsyncThunk("admin/fetchUsers", async()=>{
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            }
        }
    );
   return response.data;
});
//add the create user action
//Thực hiện: Gửi yêu cầu POST tới API /api/admin/users 
// với dữ liệu người dùng mới (userData) và Authorization header xác nhận quyền admin.
export const addUser = createAsyncThunk("admin/addUser", async(userData,{rejectWithValue})=>{
    try{
        const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,
            userData,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`,//phai la admin
                },
            }
        );
        console.log(response.data)
        return response.data;
    }
    catch(error){
        return rejectWithValue(error.response.data);
    }
});
// export const addUser = createAsyncThunk("admin/addUser", async (userData, { rejectWithValue }) => {
//     try {
//         const response = await axios.post(
//             `${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,
//             userData,
//             {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('userToken')}`,
//                 },
//             }
//         );
//         return response.data;
//     }
//     catch (error) {
//         return rejectWithValue(error.response?.data || { message: "Failed to add user" });
//     }
// });
//update a user
//Thực hiện: Gửi yêu cầu PUT tới API /api/admin/users/{id} với dữ liệu mới (name, email, role)
export const updateUser=createAsyncThunk("admin/updateUser",async({id,name,email,role})=>{
    
        const response=await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`,
            {name,email,role},
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`,//phai la admin
                },
            }
        );
            console.log(response.data);
            return response.data.user;
   
    
});

//delete a user
export const deleteUser = createAsyncThunk("admin/deleteUser", async ({ id }, { rejectWithValue }) => {
    try {
        await axios.delete(
            `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`,
                },
            }
        );
        // Trả về id đã xóa luôn
        return id;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

//State là trạng thái của ứng dụng, chứa dữ liệu mà bạn quản lý trong Redux store. Nó c
//
//
//Action là một đối tượng (object) mà bạn gửi đến store để thông báo một hành động đã xảy ra và yêu cầu thay đổi trạng thái của ứng dụng
const adminSlice=createSlice({
    name: "admin",
    initialState: {
        users: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchUsers.pending,(state)=>{
            state.loading=true;
            
        })
        .addCase(fetchUsers.fulfilled,(state,aciton)=>{
            state.loading=false;
            state.users=aciton.payload;
           
        })
        .addCase(fetchUsers.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message;
        })



        // .addCase(updateUser.pending,(state)=>{
        //     state.loading=true;
        //     state.error=null;
        // })
        // .addCase(updateUser.fulfilled, (state, action) => {
        //     const updatedUser = action.payload; // Dữ liệu người dùng đã được cập nhật (từ API)
        //     const userIndex = state.users.findIndex((user) => user._id === updatedUser._id);
        //     if (userIndex !== -1) {
        //         state.users[userIndex] = updatedUser; // Cập nhật thông tin người dùng vào danh sách users
        //     }
        // })
        
        // .addCase(deleteUser.fulfilled,(state,action)=>{
        //     state.users=state.users.filter((user)=>user._id !==action.payload);
        // })
        .addCase(addUser.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(addUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.users.push(action.payload.user);
         
        })
        .addCase(addUser.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload.message;
        })

        // .addCase(deleteUser.fulfilled, (state, action) => {
        //     state.users = state.users.filter((user) => user._id !== action.payload);
        // })
       
        .addCase(updateUser.fulfilled, (state, action) => {
            const updatedUser = action.payload;
            // console.log(action.payload);
            const userIndex = state.users.findIndex((user) => user._id === updatedUser._id);
            if (userIndex !== -1) {
                state.users[userIndex] = updatedUser;
            }
        })
        
        
   
          // deleteUser
          .addCase(deleteUser.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(deleteUser.fulfilled, (state, action) => {
            state.loading = false;
            state.users = state.users.filter(
              (user) => user._id !== action.payload
            );
            state.error = null;
          })
          .addCase(deleteUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || action.error.message;
          });
       
    }     
});
export default adminSlice.reducer;