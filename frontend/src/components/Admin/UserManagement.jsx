// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { addUser, deleteUser, fetchUsers, updateUser } from '../../redux/slices/adminSlice';
// import { toast } from 'sonner'
// import Loading from '../Common/Loading';

// const UserManagement = () => {
//     // const users=[
//     //     {
//     //         _id: 1201,
//     //         name: 'Tri Duc',
//     //         email: 'john@example.com',
//     //         role: 'admin',
//     //     },
//     //     {
//     //         _id: 2811,
//     //         name: 'Duy Hung',
//     //         email: 'hung@example.com',
//     //         role: 'customer',
//     //     },
//     //     {
//     //         _id: 3911,
//     //         name: 'Nga',
//     //         email: 'nga@example.com',
//     //         role: 'sales',
//     //     },
//     // ]
    
//     const navigate=useNavigate();
//     const dispatch=useDispatch();
//     const {user}=useSelector((state)=>state.auth);
//     const { users, loading ,error} = useSelector((state) => state.admin);
//     useEffect(() => {
//        if(user && user.role !=="admin"){
//             navigate("/");
//        }
//       }, [user,navigate]);
//     useEffect(()=>{
//         if(user && user.role==="admin"){
//             dispatch(fetchUsers());
//         }
//     },[dispatch,user])
    
//     const [formData,setFormData] =useState({
//         name: "",
//         email: "",
//         password: "",
//         role: "customer",
//     });
//     const handleChange=(e)=>{
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         })
//     };
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (formData.email === '' || formData.password === '' || formData.name === '') {
//             return toast.error('Vui lòng nhập đầy đủ thông tin');
//         }
//         if (formData.password.length < 6) {
//             return toast.error('Mật khẩu phải có tối thiểu 6 kí tự');
//         }
    
//         try {
//             await dispatch(addUser(formData)).unwrap();
         
//             toast.success('Thêm người dùng thành công');
            
//             setFormData({
//                 name: '',
//                 email: '',
//                 password: '',
//                 role: 'customer',
//             });
//             dispatch(fetchUsers()); 
//         } catch (error) {
//             toast.error(error.message || "Thêm người dùng không thành công");
//         }
//     };
    
//     const handleRoleChange=(userId,newRole)=>{
//          dispatch(updateUser({id:userId,role:newRole}));
        
//         toast.success('Phân quyền người dùng thành công.');
       
        
//         // console.log({id: userId,role: newRole});
//     };
//     const handleDeleteUser =  (id) => {
//         const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa người dùng này?");
//         if (isConfirmed) {
//             try {
//                  dispatch(deleteUser({id}));
//                 toast.success('Xóa người dùng thành công.');
//             } catch (error) {
//                 toast.error(error.message || "Xóa người dùng thất bại.");
//             }
//         }
//     };
//     if(loading){
//         return <Loading />
//       }
//   return (
//     <div className='max-w-7xl mx-auto p-6'>
//         <h2 className='text-2xl font-bold mb-6'>User Management</h2>
//         {/* add new */}
//         {loading && <p>Loading...</p>}
//         {error && <p>Error:{error}</p>}
//         <div className='p-6 rounded-lg mb-6'>
//             <h3 className='text-lg font-bold mb-4'>Add New User</h3>
//             <form onSubmit={handleSubmit} action="">
//                 {/* ten */}
//                 <div className='mb-4'>
//                 <label htmlFor="name" className='block text-gray-700'>Name</label>
//                     <input 
//                         type="text"
//                         name='name'
//                         value={formData.name}
//                         onChange={handleChange}
//                         className='w-full p-2 border rounded'
//                         required
//                     />

//                 </div>
//                 {/* email */}
//                 <div className='mb-4'>
//                     <label htmlFor="email " className='block text-gray-700'>Email</label>
//                     <input 
//                         type="email"
//                         name='email'
//                         value={formData.email}
//                         onChange={handleChange}
//                         className='w-full p-2 border rounded'
//                         required
//                     />

//                 </div>
//                 {/* matkhau */}
//                 <div className='mb-4'>
//                     <label htmlFor="p " className='block text-gray-700'>Password</label>
//                     <input 
//                         type="password"
//                         name='password'
//                         value={formData.password}
//                         onChange={handleChange}
//                         className='w-full p-2 border rounded'
//                         required
//                     />

//                 </div>
//                 {/* phan quyen */}
//                 <div className='mb-4'>
//                     <label htmlFor=" " className='block text-gray-700'>Role</label>
//                     <select 
//                         name="role" 
//                         id="" 
//                         value={formData.role} 
//                         onChange={handleChange}
//                         className='w-full p-2 border rounded'
//                     >
//                         <option value='customer'>Customer</option>
//                         <option value='admin'>Admin</option>
//                      </select>
//                 </div>
//                 <button type="submit" className='bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600'>Add</button>
//             </form>
//         </div>
//         {/* danh sach user  */}
//         <div className="overflow-x-auto shadow-md sm:rounded-lg">
//             <table className='min-w-full text-left text-gray-500'>
//                 <thead className='bg-gray-100 text-xs uppercase text-gray-700'>
//                     <tr>
//                         <th className='py-3 px-4'>Name</th>
//                         <th className='py-3 px-4'>Email</th>
//                         <th className='py-3 px-4'>Role</th>
//                         <th className='py-3 px-4'>Actions</th>

//                     </tr>
//                 </thead>
//                 <tbody>
//                     {users && users.length > 0 ? (
//                         users.map((user) =>
//                         user ? (
//                             <tr key={user._id} className='border-b hover:bg-gray-50'>
//                             <td className='p-4 font-medium text-gray-900 whitespace-nowrap'>{user.name}</td>
//                             <td className='p-4 font-medium text-gray-900 whitespace-nowrap'>{user.email}</td>
//                             <td className='p-4 font-medium text-gray-900 whitespace-nowrap'>
//                                 <select 
//                                 value={user.role || "customer"} 
//                                 onChange={(e) => handleRoleChange(user._id, e.target.value)}
//                                 className='p-2 border rounded'
//                                 >
//                                 <option value="customer">Customer</option>
//                                 <option value="admin">Admin</option>
//                                 <option value="sales">Sales</option>
//                                 </select>
//                             </td>
//                             <td className='p-4 font-medium text-gray-900 whitespace-nowrap'>
//                                 <button 
//                                 onClick={() => handleDeleteUser(user._id)}
//                                 className='bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600'      
//                                 >
//                                 Delete
//                                 </button>
//                             </td>
//                             </tr>
//                         ) : null // if user is undefined, render nothing
//                         )
//                     ) : (
//                         <tr>
//                         <td colSpan="4" className="p-4 text-center">No users found</td>
//                         </tr>
//                     )}
//                     </tbody>

//             </table>
//         </div>

//     </div>
//   )
// }

// export default UserManagement


// // import React, { useEffect, useState } from 'react'
// // import { useDispatch, useSelector } from 'react-redux';
// // import { useNavigate } from 'react-router-dom';
// // import { addUser, deleteUser, updateUser, fetchUsers } from '../../redux/slices/adminSlice';

// // const UserManagement = () => {
// //     const dispatch = useDispatch();
// //     const navigate = useNavigate();
// //     const { user } = useSelector((state) => state.auth);
// //     const { users , loading, error } = useSelector((state) => state.admin);
    
// //     useEffect(() => {
// //         // Check if user is admin, if not redirect to homepage
// //         if (user && user.role !== "admin") {
// //             navigate("/");
// //         }
        
// //         // Fetch users if user is admin
        
// //     }, [user, navigate]);
// //     useEffect(()=>{
// //                 if(user &&user.role==="admin"){
// //                     dispatch(fetchUsers());
// //                 }
// //             },[dispatch,user]);
// //     const [formData, setFormData] = useState({
// //         name: '',
// //         email: '',
// //         password: '',
// //         role: 'customer', // Set default role
// //     });
    
// //     const handleChange = (e) => {
// //         setFormData({
// //             ...formData,
// //             [e.target.name]: e.target.value,
// //         })
// //     };
    
// //     const handleSubmit = (e) => {
// //         e.preventDefault();
// //         dispatch(addUser(formData));
// //         // reset the form after submission       
// //         setFormData({
// //             name: '',
// //             email: '',
// //             password: '',
// //             role: 'customer',
// //         });
// //     };
    
// //     const handleRoleChange = (userId, newRole) => {
// //         dispatch(updateUser({id: userId, role: newRole}));
// //     };
    
// //     const handleDeleteUser = (userId) => {
// //         if (window.confirm('Are you sure you want to delete')) {
// //             dispatch(deleteUser(userId));
// //         }
// //     };
    
// //     return (
// //         <div className='max-w-7xl mx-auto p-6'>
// //             <h2 className='text-2xl font-bold mb-6'>User Management</h2>
// //             {/* add new */}
// //             {loading && <p>Loading...</p>}
// //             {error && <p>Error: {error}</p>}
// //             <div className='p-6 rounded-lg mb-6'>
// //                 <h3 className='text-lg font-bold mb-4'>Add New User</h3>
// //                 <form onSubmit={handleSubmit} action="">
// //                     {/* name */}
// //                     <div className='mb-4'>
// //                         <label htmlFor="name" className='block text-gray-700'>Name</label>
// //                         <input 
// //                             type="text"
// //                             id="name"
// //                             name='name'
// //                             value={formData.name}
// //                             onChange={handleChange}
// //                             className='w-full p-2 border rounded'
// //                             required
// //                         />
// //                     </div>
// //                     {/* email */}
// //                     <div className='mb-4'>
// //                         <label htmlFor="email" className='block text-gray-700'>Email</label>
// //                         <input 
// //                             type="email"
// //                             id="email"
// //                             name='email'
// //                             value={formData.email}
// //                             onChange={handleChange}
// //                             className='w-full p-2 border rounded'
// //                             required
// //                         />
// //                     </div>
// //                     {/* password */}
// //                     <div className='mb-4'>
// //                         <label htmlFor="password" className='block text-gray-700'>Password</label>
// //                         <input 
// //                             type="password"
// //                             id="password"
// //                             name='password'
// //                             value={formData.password}
// //                             onChange={handleChange}
// //                             className='w-full p-2 border rounded'
// //                             required
// //                         />
// //                     </div>
// //                     {/* role */}
// //                     <div className='mb-4'>
// //                         <label htmlFor="role" className='block text-gray-700'>Role</label>
// //                         <select 
// //                             name="role"
// //                             id="role" 
// //                             value={formData.role} 
// //                             onChange={handleChange}
// //                             className='w-full p-2 border rounded'
// //                         >
// //                             <option value='customer'>Customer</option>
// //                             <option value='admin'>Admin</option>
// //                             <option value='sales'>Sales</option>
// //                         </select>
// //                     </div>
// //                     <button type="submit" className='bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600'>Add</button>
// //                 </form>
// //             </div>
// //             {/* user list */}
// //             <div className="overflow-x-auto shadow-md sm:rounded-lg">
// //                 <table className='min-w-full text-left text-gray-500'>
// //                     <thead className='bg-gray-100 text-xs uppercase text-gray-700'>
// //                         <tr>
// //                             <th className='py-3 px-4'>Name</th>
// //                             <th className='py-3 px-4'>Email</th>
// //                             <th className='py-3 px-4'>Role</th>
// //                             <th className='py-3 px-4'>Actions</th>
// //                         </tr>
// //                     </thead>
// //                     <tbody>
// //                         {users && users.length > 0 ? (
// //                             users.map((user) => user && (
// //                                 <tr key={user._id} className='border-b hover:bg-gray-50'>
// //                                     <td className='p-4 font-medium text-gray-900 whitespace-nowrap'>{user.name}</td>
// //                                     <td className='p-4 font-medium text-gray-900 whitespace-nowrap'>{user.email}</td>
// //                                     <td className='p-4 font-medium text-gray-900 whitespace-nowrap'>
// //                                         <select 
// //                                             value={user.role || "customer"} 
// //                                             onChange={(e) => handleRoleChange(user._id, e.target.value)}
// //                                             className='p-2 border rounded'
// //                                         >
// //                                             <option value="customer">Customer</option>
// //                                             <option value="admin">Admin</option>
// //                                             <option value="sales">Sales</option>
// //                                         </select>
// //                                     </td>
// //                                     <td className='p-4 font-medium text-gray-900 whitespace-nowrap'>
// //                                         <button 
// //                                             onClick={() => handleDeleteUser(user._id)}
// //                                             className='bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600'      
// //                                         >
// //                                             Delete
// //                                         </button>
// //                                     </td>
// //                                 </tr>
// //                             ))
// //                         ) : (
// //                             <tr>
// //                                 <td colSpan="4" className="p-4 text-center">No users found</td>
// //                             </tr>
// //                         )}
// //                     </tbody>
// //                 </table>
// //             </div>
// //         </div>
// //     )
// // }

// // export default UserManagement


import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser, deleteUser, fetchUsers, updateUser } from '../../redux/slices/adminSlice';
import { toast } from 'sonner'
import Loading from '../Common/Loading';

const UserManagement = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { users, loading, error } = useSelector((state) => state.admin);
    
    // State cho modal xóa
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    
    // State cho modal thêm người dùng
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    
    useEffect(() => {
       if(user && user.role !=="admin"){
            navigate("/");
       }
    }, [user, navigate]);
    
    useEffect(() => {
        if(user && user.role === "admin"){
            dispatch(fetchUsers());
        }
    }, [dispatch, user])
    
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "customer",
    });
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.email === '' || formData.password === '' || formData.name === '') {
            return toast.error('Vui lòng nhập đầy đủ thông tin');
        }
        if (formData.password.length < 6) {
            return toast.error('Mật khẩu phải có tối thiểu 6 kí tự');
        }
    
        try {
            await dispatch(addUser(formData)).unwrap();
            toast.success('Thêm người dùng thành công');
            
            setFormData({
                name: '',
                email: '',
                password: '',
                role: 'customer',
            });
            
            // Đóng modal sau khi thêm thành công
            setIsAddModalOpen(false);
            
            // Refresh danh sách người dùng
            dispatch(fetchUsers()); 
        } catch (error) {
            toast.error(error.message || "Thêm người dùng không thành công");
        }
    };
    
    const handleRoleChange = (userId, newRole) => {
        dispatch(updateUser({id: userId, role: newRole}));
        toast.success('Phân quyền người dùng thành công.');
    };
    
    const handleDeleteClick = (userData) => {
        setUserToDelete(userData);
        setIsDeleteModalOpen(true);
    };
    
    const confirmDelete = async () => {
        if (!userToDelete) return;
        
        try {
            await dispatch(deleteUser({id: userToDelete._id})).unwrap();
            toast.success('Xóa người dùng thành công.');
            setIsDeleteModalOpen(false);
            setUserToDelete(null);
            // Fetch lại danh sách người dùng sau khi xóa
            dispatch(fetchUsers());
        } catch (error) {
            toast.error(error?.message || "Xóa người dùng thất bại.");
            console.error("Delete user error:", error);
        }
    };
    
    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setUserToDelete(null);
    };
    
    const openAddModal = () => {
        setIsAddModalOpen(true);
    };
    
    const closeAddModal = () => {
        setIsAddModalOpen(false);
        // Reset form data khi đóng modal
        setFormData({
            name: '',
            email: '',
            password: '',
            role: 'customer',
        });
    };
    
    if(loading){
        return <Loading />
    }
    if(error){
        return <p>Error :{error}</p>
    }
    return (
        <div className='max-w-7xl mx-auto p-6'>
            <h2 className="text-3xl font-bold mb-6">User Management</h2>
            {/* add new button */}
            <div className="mb-6">
                <button 
                    onClick={openAddModal}
                    className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors'
                >
                    <span className="mr-2">+</span> Add new user
                </button>
            </div>
            
            {/* error message */}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                    <strong className="font-bold">Lỗi! </strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            )}
            
            {/* danh sach user  */}
            <div className="overflow-x-auto shadow-md sm:rounded-lg">
                <table className='min-w-full text-left text-gray-500'>
                    <thead className='bg-gray-100 text-xs uppercase text-gray-700'>
                        <tr>
                            <th className='py-3 px-4'>ID</th>
                            <th className='py-3 px-4'>NAME</th>
                            <th className='py-3 px-4'>EMAIL</th>
                            <th className='py-3 px-4'>ROLE</th>
                            <th className='py-3 px-4'>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && users.length > 0 ? (
                            users.map((userData) =>
                            userData ? (
                                <tr key={userData._id} className='border-b hover:bg-gray-50'>
                                <td className='p-4 font-medium text-gray-900 whitespace-nowrap'>{userData._id}</td>
                                <td className='p-4 font-medium text-gray-900 whitespace-nowrap'>{userData.name}</td>
                                <td className='p-4 font-medium text-gray-900 whitespace-nowrap'>{userData.email}</td>
                                <td className='p-4 font-medium text-gray-900 whitespace-nowrap'>
                                    <select 
                                    value={userData.role || "customer"} 
                                    onChange={(e) => handleRoleChange(userData._id, e.target.value)}
                                    className='p-2 border rounded'
                                    >
                                    <option value="customer">Customer</option>
                                    <option value="admin">Admin</option>
                                    <option value="sales">Sales</option>
                                    </select>
                                </td>
                                <td className='p-4 font-medium text-gray-900 whitespace-nowrap'>
                                    <button 
                                    onClick={() => handleDeleteClick(userData)}
                                    className='bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600'      
                                    >
                                    Xóa
                                    </button>
                                </td>
                                </tr>
                            ) : null
                            )
                        ) : (
                            <tr>
                            <td colSpan="4" className="p-4 text-center">No users found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Add User Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl transform transition-all">
                        <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-4">
                            <div className="flex items-center">
                                <div className="bg-blue-100 p-2 rounded-full mr-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900">Add New User</h3>
                            </div>
                            <button 
                                onClick={closeAddModal}
                                className="text-gray-400 hover:text-gray-500 focus:outline-none"
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        
                        <form onSubmit={handleSubmit}>
                            {/* Tên */}
                            <div className='mb-4'>
                                <label htmlFor="name" className='block text-gray-700 font-medium mb-1'>Name</label>
                                <input 
                                    type="text"
                                    name='name'
                                    id="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className='w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors'
                                    required
                                    placeholder="Nhập tên người dùng"
                                />
                            </div>
                            
                            {/* Email */}
                            <div className='mb-4'>
                                <label htmlFor="email" className='block text-gray-700 font-medium mb-1'>Email</label>
                                <input 
                                    type="email"
                                    name='email'
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className='w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors'
                                    required
                                    placeholder="example@domain.com"
                                />
                            </div>
                            
                            {/* Mật khẩu */}
                            <div className='mb-4'>
                                <label htmlFor="password" className='block text-gray-700 font-medium mb-1'>Password</label>
                                <input 
                                    type="password"
                                    name='password'
                                    id="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className='w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors'
                                    required
                                    placeholder="Tối thiểu 6 ký tự"
                                />
                                <p className="text-xs text-gray-500 mt-1">Mật khẩu phải có ít nhất 6 ký tự</p>
                            </div>
                            
                            {/* Phân quyền */}
                            <div className='mb-6'>
                                <label htmlFor="role" className='block text-gray-700 font-medium mb-1'>Role</label>
                                <select 
                                    name="role" 
                                    id="role" 
                                    value={formData.role} 
                                    onChange={handleChange}
                                    className='w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors'
                                >
                                    <option value='customer'>Customer</option>
                                    <option value='admin'>Admin</option>
                                    <option value='sales'>Sales</option>
                                </select>
                            </div>
                            
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={closeAddModal}
                                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-gray-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-96 max-w-md shadow-2xl transform transition-all">
                        <div className="flex items-center border-b border-gray-200 pb-3 mb-4">
                            <div className="bg-red-100 p-2 rounded-full mr-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900">Xác nhận xóa người dùng</h3>
                        </div>
                        
                        {userToDelete && (
                            <div className="bg-gray-50 rounded-lg p-3 mb-4">
                                <div className="flex items-center mb-2">
                                    <span className="text-sm font-medium text-gray-500 w-20">Tên:</span>
                                    <span className="font-semibold text-gray-800">{userToDelete.name}</span>
                                </div>
                                <div className="flex items-center mb-2">
                                    <span className="text-sm font-medium text-gray-500 w-20">Email:</span>
                                    <span className="font-semibold text-gray-800">{userToDelete.email}</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-sm font-medium text-gray-500 w-20">Vai trò:</span>
                                    <span className="font-normal text-gray-700">
                                        {userToDelete.role === 'admin' ? 'Quản trị viên' : 
                                         userToDelete.role === 'sales' ? 'Nhân viên bán hàng' : 'Khách hàng'}
                                    </span>
                                </div>
                            </div>
                        )}
                        
                        <div className="mb-6">
                            <p className="text-gray-600 mb-2">
                                Bạn có chắc chắn muốn xóa người dùng này không?
                            </p>
                            <p className="text-red-500 text-sm font-medium">
                                Hành động này không thể hoàn tác và sẽ xóa vĩnh viễn người dùng khỏi hệ thống.
                            </p>
                        </div>
                        
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={closeDeleteModal}
                                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-gray-300"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            >
                                Xóa người dùng
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserManagement

