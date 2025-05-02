const express=require('express');
const User=require('../models/User');
const {protect,admin}=require('../middleware/authMiddleware');

const router=express.Router();
//route Get /api/admin/users
//desc Get all users (admin only)
//@access private/admin

router.get('/',protect,admin,async(req,res)=>{
    try{
        const users=await User.find({});//Trả về tất cả các bản ghi phù hợp với điều kiện.
        res.json(users);
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:"Server Error"});
    
    }
});

//route post /api/admin/users
//desc add a new user (admin only)
//access private/admin
router.post('/',protect,admin,async (req,res)=>{
    const {name,email,password,role}=req.body;
    try{
        let user=await User.findOne({email});
        if(user){
            return res.status(400).json({message:"User already exists"});
        }
        user=new User({
            name,
            email,
            password,
            role:role||'customer',
        });
        await user.save();
        res.status(201).json({message:"User created successfully"});
    }
    catch(error){
        console.error(error);
        return res.status(500).json({message:"Server Error"});
    }
});

//route Put /api/admin/users/:id
//desc updatte user into (admin only admin)-name,email,pass,role
//access private/admin
router.put('/:id',protect,admin,async(req,res)=>{
    try{
        const user=await User.findById(req.params.id);
        if(user){
            user.name=req.body.name||user.name;
            user.email=req.body.email||user.email;
            user.role=req.body.role||user.role;

        }
        const updatedUser=await user.save();
        res.json({message:"User updated successfully",user:updatedUser});
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:"Server Error"});
    }
});
router.delete('/:id',protect,admin,async(req,res)=>{
    try{
        const user=await User.findById(req.params.id);
        if(user){
            await user.deleteOne();
            res.json({message:"User removed successfully"});
        }
        else{
            res.status(404).json({message:'User not found'});
        }
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:"Server Error"});
    }
});
module.exports = router;