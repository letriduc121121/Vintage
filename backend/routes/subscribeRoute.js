const express = require('express');
const router=express.Router();
const Subscriber = require('../models/Subscriber'); // Giả sử model nằm trong thư mục models


router.get('/a', (req, res) => {
    res.send('This sadsds the upload page');
});
//route post /api/subscribe
//desc handle newletter subcription
//access public
router.post('/subscribe', async (req, res)=>{
    const { email } = req.body; 
    if(!email){
        return res.status(400).json({message:"Email is required"});
    }

    try{
        //check if the email is already subcribed
        let subscriber=await Subscriber.findOne({email});
        if(subscriber){
            return res.status(400).json({message:"Email is already subscribed"});
        }
        //create a new subscriber
        subscriber=new Subscriber({email});
        await subscriber.save();
        res.status(201).json({message:"Successfully subscribed to the newletter "});
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:"Server Error"});
    }
});
module.exports = router;