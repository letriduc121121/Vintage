const express=require('express');
const Order=require('../models/Order');
const {protect,admin}=require('../middleware/authMiddleware');

const router = express.Router();
//route get api/admin/orders
//desc get all order (admin only)
//access private/admin

router.get('/',protect,admin,async (req,res)=>{
    try{
        //find all order
        const orders=await Order.find().populate("user","name email");
        res.json(orders);
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:"Server Error"});
    }
});
//route put api/admin/ỏder/:id
router.put('/:id',protect,admin,async (req,res)=>{
    try{
        const order=await Order.findById(req.params.id).populate("user","name email");
        if(order){
            order.status=req.body.status||order.status;
            order.isDelivered=
                req.body.status==="Delivered"?true:order.isDelivered;
            order.deliveredAt=
                req.body.status==="Delivered"?Date.now():order.isDelivered.deliveredAt;

            const updateOrder=await order.save();
            res.json(updateOrder);
        }
        else{
            res.status(404).json({message:"Order not found"});
        }
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:"Server Error"});
    }
})
router.delete('/:id',protect,admin, async (req,res)=>{
    try{
        const order = await Order.findById(req.params.id);
        if(order){
            await order.deleteOne(); 
            res.status(200).json({message:"Order removed successfully"});
        }
        else{
            res.status(404).json({message:"Order not found"});
        }
    }   
    catch(error){
        console.error(error);
        res.status(500).json({message:"Server Error"});
    }
})
module.exports =router;