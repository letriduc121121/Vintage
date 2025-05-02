const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/.+\@.+\..+/, "Please enter a valid email address"],
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    role: {
        type: String,
        enum: ['admin', 'customer', 'sales'],
        default: 'customer',
    },
}, { timestamps: true });

// Password hash middleware
userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
        return next(); // Nếu mật khẩu không thay đổi, bỏ qua mã hóa
    }
    const salt = await bcrypt.genSalt(10); // Tạo salt
    this.password = await bcrypt.hash(this.password, salt); // Mã hóa mật khẩu
    next(); // Tiếp tục lưu
});

// Match user entered password to hashed password
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password); // So sánh mật khẩu đã nhập với mật khẩu đã được mã hóa
};

module.exports = mongoose.model("User", userSchema);