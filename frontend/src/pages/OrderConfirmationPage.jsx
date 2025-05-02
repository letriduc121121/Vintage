
//trang thong tin don hang duoc tao CAm on da mua hang
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/slices/cartSlice';
// const checkout={
//     _id: "123123",
//     createdAt:new Date(),
//     checkoutItems: [
//         {
//             productId: "1",
//             name: "Jacket",
//             color: "black",
//             size: "M",
//             price: 150,
//             quantity: 1,
//             image: "https://picsum.photos/500/500?random=58",
//         },
//         {
//             productId: "2",
//             name: "T-Shirt",
//             color: "black",
//             size: "M",
//             price: 150,
//             quantity: 2,
//             image: "https://picsum.photos/500/500?random=213",
//         },
//     ],
//     shippingAddress:{
//         address:"123 Fashion Street",
//         city:"New York",
//         country:"United States",
//     }
// };
const OrderConfirmationPage = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {checkout}=useSelector((state)=>state.checkout);
    //clear the cart when the order is confirmed
    useEffect(()=>{
        if(checkout && checkout._id){
            dispatch(clearCart());//xóa giỏ hàng trong Redux.
            localStorage.removeItem("cart");//Một action để xóa toàn bộ giỏ hàng sau khi mua xong
        }
        else{
            navigate("/my-orders");
        }
    },[checkout,dispatch,navigate]);
    const calculateEstimatedDelivery=(createdAt) => {
        const orderDate = new Date(createdAt);
        orderDate.setDate(orderDate.getDate() +10);//add 10 days to the order date
        return orderDate.toLocaleDateString();

    }
  return (
    <div className='max-w-4xl mx-auto p-6 bg-white '>
        <h1 className='text-4xl font-bold text-center text-emerald-700 mb-8'>
            Thank You for Your Order!
        </h1>
    {checkout &&(
        <div className='p-6 rounded-lg border'>
            <div className='flex justify-between mb-20'>
                {/* order id and date */}
                <div>
                    <h2 className='text-xl font-semibold'>
                        Order ID:{checkout._id}
                    </h2>
                    <p className="text-gray-500">
                        Order State: {new Date(checkout.createdAt).toLocaleDateString()}
                    </p>
                </div>
                {/* estimated delivery */}
                <div className="">
                    <p className="text-emerald-700 text-sm">
                        Estimated Delivery:{calculateEstimatedDelivery(checkout.createdAt)}
                    </p>
                </div>
            </div>
            {/* order items */}
            <div className="mb-20">
                {checkout.checkoutItems.map((item)=>(
                    <div className=" flex items-center mb-4" key={item.productId}>
                        <img 
                            src={item.image} 
                            alt={item.image} 
                            className='w-16 h-16 object-cover rounded-md mr-4'/>
                        <div className="">
                            <h4 className="text-md font-semibold">{item.name}</h4>
                            <p className="text-sm text-gray-500">
                                {item.color}||{item.size}
                            </p>
                        </div>
                        <div className="ml-auto text-right">
                            <p className="text-md">${item.price}</p>
                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                    </div>
                ))}
            </div>
            {/* paypal and delivey info*/}
            <div className="grid grid-cols gap-8">
                <div>
                    <h4 className='text-lg font-semibold mb-2'></h4>
                    <p className='text-gray-600'>Paypal</p>
                </div>
                {/* delivery info */}
                <div>
                    <h4 className='text-lg font-semibold mb-2'>Delivery</h4>
                    <p className='text-gray-600'>
                        {checkout.shippingAddress.address}
                    </p>
                    <p className='text-gray-600'>{checkout.shippingAddress.city},{" "}
                        {checkout.shippingAddress.country}
                    </p>
                </div>
            </div>
        </div>
    )}
    </div>
  );
};
export default OrderConfirmationPage