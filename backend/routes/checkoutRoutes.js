const express=require('express');
const Checkout=require('../models/Checkout');
const Cart=require('../models/Cart');
const Product=require('../models/Product');
const Order=require('../models/Order');
const { protect } = require('../middleware/authMiddleware');
const router=express.Router();
//router post api/checkout
//desc create a new checkiut session
//access private 
router.get('/', (req, res) => {
    res.send('Đây là trang đăng ký - Hãy dùng POST để đăng ký người dùng');
});
router.post("/",protect,async(req,res)=>{
    const {checkoutItems,shippingAddress,paymentMethod,totalPrice}
    =req.body;
    if(!checkoutItems || checkoutItems.length===0){
        return res.status(400).json({message:"No items in checkout "});
    } 
    try{
        //create a new checkout item
        const newCheckout =await Checkout.create({
            user: req.user._id,
            checkoutItems:checkoutItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            paymentStatus: "Pending",
            isPaid: false,
        });
        console.log(`Checkout created for user:${req.user._id}`);
        res.status(201).json(newCheckout);
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:"Server Error"});
    }
});


//roite put api/checkout/:id/pay
//désc update checkout to mảk as paid after successfull payment
//access private
// thay toan don hang xong
router.put('/:id/pay',protect,async(req,res)=>{
    const {paymentStatus,paymentDetails}=req.body;
    try{
        const checkout=await Checkout.findById(req.params.id);
        if(!checkout){
            return res.status(404).json({message:"Checkout not found"});
        }
        if(paymentStatus==='paid'){
            checkout.isPaid=true;
            checkout.paymentStatus=paymentStatus;
            checkout.paymentDetails=paymentDetails;
            checkout.paidAt=Date.now();
            await checkout.save();
            res.status(200).json(checkout);
        }
        else{
            res.status(400).json({message:'Invalid Payment Status'});
        }
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:"Server Error"});
    }
});
// route post /api/checkout/:id/finalize
// desc finalize checkout and convert to an order after payment confrmation
router.post('/:id/finalize',protect,async(req,res)=>{
    try{
        const checkout=await Checkout.findById(req.params.id);
        if(!checkout){
            return res.status(404).json({message:"Checkout not found"});
        }
        //neu da thanh toan thanh cong va don hang chua duco tao
        if(checkout.isPaid && !checkout.isFinalized){
            //create final order base on the checkout details
            const finalOrder = await Order.create({
                user: checkout.user,                     // Người đặt hàng
                orderItems: checkout.checkoutItems,         // Danh sách sản phẩm
                shippingAddress: checkout.shippingAddress, // Địa chỉ giao hàng
                paymentMethod: checkout.paymentMethod,   // Phương thức thanh toán
                totalPrice: checkout.totalPrice,         // Tổng tiền
                isPaid: true,  
                paidAt:checkout.paidAt,               // Đã thanh toán, lưu ngày thanh toán
                isDelivered: false,                       // Mặc định chưa giao hàng
                paymentStatus: "paid",                   // Trạng thái thanh toán
                paymentDetails: checkout.paymentDetails, // Chi tiết thanh toán (transaction ID, v.v.)
            });
            
            //mark the checkout as finalized and
            checkout.isFinalized=true;
            checkout.finalizedAt=Date.now();
            await checkout.save();
            //delete the cart associated with the user
            await Cart.findOneAndDelete({user:checkout.user});//Vì người dùng đã hoàn tất đặt hàng, giỏ hàng không còn cần thiết.
  
            

            //send email to the user with the order details
            //..
            res.status(201).json(finalOrder);
        }
        //Nếu checkout.isFinalized === true, nghĩa là đơn hàng này đã được tạo rồi.
        else if(checkout.isFinalized){
            res.status(400).json({message: "Checkout already finalized"});


        }
        //Nếu checkout.isPaid === false, nghĩa là chưa thanh toán → Không thể tạo Order.
        else{
            return res.status(400).json({message:"Checkout is not paid"});
        }
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:"Server Error"});
    }
});

// route POST /api/checkout/create
// desc create a new order with stock check and update
// access private
// router.post('/create', protect, async (req, res) => {
//     try {
//       const { user, orderItems, shippingAddress, totalPrice, name, phone } = req.body;
  
//       if (!Array.isArray(orderItems) || orderItems.length === 0) {
//         return res.status(400).json({ message: "Danh sách sản phẩm không hợp lệ!" });
//       }
  
//       // Check product availability before placing order
//       for (const item of orderItems) {
//         const product = await Product.findById(item.productId);
//         if (!product) {
//           return res.status(404).json({ message: `Sản phẩm ${item.productId} không tồn tại` });
//         }
//         if (product.quantity < item.quantity) {
//           return res.status(400).json({ message: `Sản phẩm ${product.name} không đủ hàng` });
//         }
//       }
  
//       // Create a new checkout session
//       const newCheckout = await Checkout.create({
//         user,
//         checkoutItems: orderItems,
//         shippingAddress,
//         paymentMethod: "Pending",  // Payment method set as pending
//         totalPrice,
//         paymentStatus: "Pending",
//         isPaid: false,
//       });
  
//       console.log(`Checkout created for user:${user}`);
  
//       // Reduce stock quantity for each item in the checkout
//       await Promise.all(orderItems.map(async (item) => {
//         const product = await Product.findById(item.productId);
//         if (product) {
//           product.quantity -= item.quantity;
//           await product.save();
//         } else {
//           return res.status(500).json({ message: "Lỗi server khi cập nhật sản phẩm", error: error.message });
//         }
//       }));
  
//       // Delete the user's cart after placing the order
//       await Cart.findOneAndDelete({ user });
  
//       return res.status(201).json(newCheckout);
//     } catch (error) {
//       console.error("Error creating checkout:", error);
//       res.status(500).json({ message: "Lỗi server", error: error.message });
//     }
//   });
  
module.exports =router;