import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { fetchAllOrders, updateOrderStatus } from '../../redux/slices/adminOrderSlice';
import Loading from '../Common/Loading';

const OrderManagement = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const { orders, loading, error } = useSelector((state) => state.adminOrders);
    const [activeTab, setActiveTab] = useState('pending'); // 'pending', 'shipping', 'delivered', 'cancelled'

    useEffect(() => {
        if (!user || user.role !== "admin") {
            navigate("/");
        } else {
            dispatch(fetchAllOrders());
        }
    }, [dispatch, user, navigate]);

    const handleStatusChange = (orderId, status) => {
        // Only allow status changes for orders that are not delivered or cancelled
        const order = orders.find(o => o._id === orderId);
        if (order && order.status !== "Delivered" && order.status !== "Cancelled") {
            dispatch(updateOrderStatus({ id: orderId, status }));
        }
    }

    const getFilteredOrders = () => {
        switch (activeTab) {
            case 'pending':
                return orders.filter(order => order.status === "Processing");
            case 'shipping':
                return orders.filter(order => order.status === "Shipped");
            case 'delivered':
                return orders.filter(order => order.status === "Delivered");
            case 'cancelled':
                return orders.filter(order => order.status === "Cancelled");
            default:
                return orders;
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    // Format order ID to be shorter and more readable
    const formatOrderId = (id) => {
        if (!id) return '';
        return id.substring(id.length - 6).toUpperCase();
    }

    if (loading) {
        return <Loading />
    }

    if (error) {
        return <p className="text-center text-red-500 p-4">Error: {error}...</p>
    }

    const filteredOrders = getFilteredOrders();

    return (
        <div className='max-w-7xl mx-auto p-6'>
            <h2 className="text-3xl font-bold mb-6">Orders Management</h2>


            {/* Tab navigation */}
            <div className="border-b border-gray-200 mb-6">
            <nav className="flex justify-center -mb-px">
                <button
                onClick={() => setActiveTab('pending')}
                className={`py-4 px-6 text-center text-lg font-semibold ${
                    activeTab === 'pending'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                >
                Processing
                </button>
                <button
                onClick={() => setActiveTab('shipping')}
                className={`py-4 px-6 text-center text-lg font-semibold ${
                    activeTab === 'shipping'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                >
                Shipping
                </button>
                <button
                onClick={() => setActiveTab('delivered')}
                className={`py-4 px-6 text-center text-lg font-semibold ${
                    activeTab === 'delivered'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                >
                Delivered
                </button>
                <button
                onClick={() => setActiveTab('cancelled')}
                className={`py-4 px-6 text-center text-lg font-semibold ${
                    activeTab === 'cancelled'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                >
                Cancelled
                </button>
            </nav>
            </div>


            <div className='overflow-x-auto shadow-md sm:rounded-lg'>
                <table className='min-w-full text-left text-gray-500'>
                    <thead className='bg-gray-50 text-xs uppercase text-gray-700'>
                        <tr>
                            <th className='py-3 px-4'>ID_Order</th>
                            <th className='py-3 px-4'>NAME</th>
                            <th className='py-3 px-4'>address</th>
                            <th className='py-3 px-4'>status</th>
                            <th className='py-3 px-4'>TIME</th>
                            {(activeTab === 'pending' || activeTab === 'shipping') && (
                                <th className='py-3 px-4'>ACTIONS</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.length > 0 ? (
                            filteredOrders.map((order) => (
                                <tr key={order._id} className='bg-white border-b hover:bg-gray-50'>
                                    <td className='py-4 px-4 font-medium text-gray-900 whitespace-nowrap'>
                                        #{formatOrderId(order._id)}
                                    </td>
                                    <td className='p-4'>{order.user ? order.user.name : "Unknown User"}</td>
                                    <td className='p-4'>{order.shippingAddress.address +","+ order.shippingAddress.city|| "N/A"}</td>
                                    <td className='p-4'>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            order.status === "Processing" ? "bg-yellow-100 text-yellow-800" :
                                            order.status === "Shipped" ? "bg-blue-100 text-blue-800" :
                                            order.status === "Delivered" ? "bg-green-100 text-green-800" :
                                            "bg-red-100 text-red-800"
                                        }`}>
                                            {order.status === "Processing" ? "Processing" :
                                             order.status === "Shipped" ? "Shipped" :
                                             order.status === "Delivered" ? "Delivered" :
                                             "Cancelled"}
                                        </span>
                                    </td>
                                    <td className='p-4'>{formatDate(order.createdAt)}</td>
                                    
                                    {(activeTab === 'pending' || activeTab === 'shipping') && (
                                        <td className='p-4 flex gap-2'>
                                            {activeTab === 'pending' && (
                                                <>
                                                    <button 
                                                        onClick={() => handleStatusChange(order._id, "Shipped")}
                                                        className='bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm'
                                                    >
                                                      approve   
                                                    </button>
                                                    <button 
                                                        onClick={() => handleStatusChange(order._id, "Cancelled")}
                                                        className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm'
                                                    >
                                                        Cancelled
                                                    </button>
                                                </>
                                            )}
                                            {activeTab === 'shipping' && (
                                                <button 
                                                    onClick={() => handleStatusChange(order._id, "Delivered")}
                                                    className='bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm'
                                                >
                                                   Confirmed delivery
                                                </button>
                                            )}
                                        </td>
                                    )}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={(activeTab === 'pending' || activeTab === 'shipping') ? 6 : 5}
                                    className='p-4 text-center text-gray-500'
                                >
                                      No Orders found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default OrderManagement


// import React, { useEffect } from 'react'

// import { useDispatch, useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom';
// import { fetchAllOrders, updateOrderStatus } from '../../redux/slices/adminOrderSlice';
// import Loading from '../Common/Loading';


// const OrderManagement = () => {
//     // const orders=[
//     //     {
//     //         _id: 123123,
//     //         user: {
//     //             name: "John Doe",
//     //         },
//     //         totalPrice: 110,
//     //         status: "Processing",
            
//     //     },
//     // ]
//     const dispatch=useDispatch();
//     const navigate=useNavigate();
//     const {user}=useSelector((state)=>state.auth);
//     const {orders,loading,error}=useSelector((state)=>state.adminOrders);
//     useEffect(()=>{
//         if(!user ||user.role!=="admin"){
//             navigate("/");
//         }
//         else{
//             dispatch(fetchAllOrders());
//         }
//     },[dispatch,user,navigate]);

//     const handleStatusChange=(orderId,status)=>{
//         // console.log({id:orderId,status:status})
//         dispatch(updateOrderStatus({id:orderId,status}));
//     }
//     if(loading){
//         return <Loading/>
//     }
//     if(error){
//         return <p>Error: {error}...</p>
//     }
//   return (
//     <div className='max-w-7xl mx-auto p-6'>
//         <h2 className='text-2xl font-bold mb-6'>Order Management</h2>

//         <div className='overflow-x-auto shadow-md sm:rounded-lg'>
//             <table className='min-w-full text-left text-gray-500'>
//                 <thead className='bg-gray-100 text-xs uppercase text-gray-700'>
//                     <tr>
//                         <th className='py-3 px-4'>Order ID</th>
//                         <th className='py-3 px-4'>Customer</th>
//                         <th className='py-3 px-4'>Total Price</th>
//                         <th className='py-3 px-4'>Status</th>
//                         <th className='py-3 px-4'>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     { orders.length > 0 ?
//                         (
//                             orders.map((order) => (
//                                 <tr key={order._id} className='border-b hover:bg-gray-50 cursor-pointer'>
//                                     <td className='py-4 px-4 font-medium text-gray-900 whitespace-nowrap'>
//                                         #{order._id}
//                                     </td>
//                                     <td className='p-4'>{order.user ? order.user.name : "Unknown User"}</td>

//                                     <td className='p-4'>${order.totalPrice.toFixed(2)}</td>
//                                     <td className='p-4'>
//                                         <select  
//                                             value={order.status} 
//                                             onChange={(e)=>handleStatusChange(order._id,e.target.value)} 
//                                             name="" id=""
//                                             className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5'    
//                                         >
//                                             <option value="Processing">Processing</option>
//                                             <option value="Shipped">Shipped</option>
//                                             <option value="Delivered">Delivered</option>
//                                             <option value="Cancelled">Cancelled</option>

//                                         </select>
//                                     </td>
//                                     <td className='p-4'>
//                                         <button 
//                                             onClick={()=>handleStatusChange(order._id,"Delivered")}
//                                             className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'        
//                                         >
//                                             Mark as Delivered
                                            
//                                         </button>
//                                     </td>

//                                 </tr>
//                             ))
//                         )
//                         :
//                         (
//                             <tr>
//                                 <td colSpan={5}
//                                     className='P-4 text-center text-gray-500'
//                                     >
//                                         No Orders found.
//                                     </td>
//                             </tr>
//                     )
//                      }
//                 </tbody>
//             </table>
//         </div>
//     </div>
//   )
// }

// export default OrderManagement