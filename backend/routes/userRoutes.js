const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const {protect}=require('../middleware/authMiddleware');
const router = express.Router();

//@route GET /api/users/register
//@desc Hướng dẫn đăng ký
//@access Public
router.get('/register', (req, res) => {
    res.send('Đây là trang đăng ký - Hãy dùng POST để đăng ký người dùng');
});

//@route POST /api/users/register
//@desc Đăng ký người dùng mới
//@access PublicQ
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin' });
    }

    try {
        // Kiểm tra email đã tồn tại chưa
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'Email đã tồn tại' });
        }

        // Tạo user mới
        user = new User({ name, email, password });
        await user.save();

        // Tạo payload JWT
        const payload = { user: { id: user._id,role: user.role } };

        // Ký token JWT với xử lý lỗi
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "40h" }, (err, token) => {
            if (err) {
                console.error('JWT Sign Error:', err.message);
                return res.status(500).json({ message: 'Lỗi khi tạo token' });
            }
            // Trả về user và token
            res.status(201).json({
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
                token
            });
        });
    } catch (err) {
        console.error('Register Error:', err.message, err.stack);
        res.status(500).send('Server Error');
    }
});
//@route pót/api/users/login
//desc authenicate user
//access public 

router.post('/login', async (req, res) =>{
    const  {email, password} = req.body;
    try{
        let user=await User.findOne({email});
        if(!user) return res.status(400).json({message:"Invalid Credentials"});
        const isMatch=await user.matchPassword(password);
        if(!isMatch) return res.status(400).json({message:"Invalid Credentials"});

        const payload = { user: { id: user._id ,role:user.role} };
        // Ký token JWT
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "40h" }, (err, token) => {
            if (err) throw err;
            // Trả về user và token
            res.json({
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
                token
            });
        });


    }
    catch(err){
        console.error(err);
        res.status(500).send('Server Error');
    }
});
router.get('/profile',protect,async(req, res)=>{
    res.json(req.user);
});

module.exports = router;
