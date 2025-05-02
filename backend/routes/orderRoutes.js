const express = require('express');
const Order= require('../models/Order');
const {protect}=require('../middleware/authMiddleware');
const { route } = require('./checkoutRoutes');

const router = express.Router();
//route GET/api/orders/,y-orders
//desc Get logged-in user's order
//access private
router.get('/my-orders',protect,async (req,res)=>{
    try{
        //find order for the authenicated user
        const orders=await Order.find({user:req.user._id}).sort({
            createdAt:-1,
        });//sort order by created
        res.json(orders);
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:"Server Error"});
    }
})
//@route GET /api/orders/:id
//desc GEt order details by ID
//access private
router.get('/:id',protect,async (req,res)=>{
    try{
        const order=await Order.findById(req.params.id).populate(
            "user",
            "name email"
        );
        if(!order){
            return res.status(404).json({message:"Order not found"});
        }
        res.json(order);
    }   
    catch(error){
        console.error(error);
        res.status(500).json({message:"Server Error"});
    } 
})
module.exports =router;