const mongoose = require('mongoose');
const cartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId, // ID của sản phẩm trong database
        ref: 'Product', // Liên kết đến model 'Product'
        required: true, // Bắt buộc phải có
    },
    name: String, // Tên sản phẩm
    image: String, // Ảnh sản phẩm
    price: String, // Giá sản phẩm
    size: String, // Kích thước (S, M, L, XL...)
    color: String, // Màu sắc (Đỏ, Đen, Trắng...)
    quantity: {
        type: Number, // Số lượng sản phẩm trong giỏ hàng
        default: 1, // Mặc định là 1
    }
}, { _id: false }); // Không tạo `_id` riêng cho từng sản phẩm trong giỏ

const cartSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        
    },
    guestId:{
        type:String,

    },
    products:[cartItemSchema],
    totalPrice:{
        type:Number,
        required:true,
        default:0,
    }
},
    {timeseries:true}
);
module.exports = mongoose.model('Cart',cartSchema);