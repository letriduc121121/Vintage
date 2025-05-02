const express = require('express');
const Product = require('../models/Product');
const {protect,admin}=require('../middleware/authMiddleware');
const router = express.Router(); 
//route get/api.admin/products
//desc get all products (admin only)
//access private/admin
router.get('/',protect,admin,async(req,res)=>{
    try{
        const products =await Product.find({});
        res.json(products);
    }
    catch(err){
        console.error(err.message);
        res.status(500).json({message:"Server Error"});    
    }
});
module.exports = router;
