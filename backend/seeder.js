const mongoose = require('mongoose'); // Import mongoose để kết nối MongoDB
const dotenv = require('dotenv'); // Import dotenv để đọc biến môi trường từ file .env
const bcrypt = require('bcryptjs'); // Import bcryptjs để mã hóa mật khẩu
const User = require('./models/User'); // Import model User
const Product = require('./models/Product'); // Import model Product
const Cart = require('./models/Cart'); // Import model Cart
const products = require('./data/products'); // Dữ liệu sản phẩm mẫu

dotenv.config(); // Load biến môi trường từ file .env

// Kết nối tới MongoDB bằng URI trong file .env
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => {
        console.error("MongoDB connection error:", err);
        process.exit(1); // Thoát nếu không thể kết nối tới MongoDB
    });

const seedData = async () => {
    try {
        // Xóa toàn bộ dữ liệu trong các collection để tránh dữ liệu cũ bị trùng lặp
        await Product.deleteMany();
        await User.deleteMany();
        await Cart.deleteMany();

        // Mã hóa mật khẩu cho user
        const hashedPassword = await bcrypt.hash('123456', 10);

        // Tạo một user mới có vai trò admin
        const createdUser = await User.create({
            name: 'Admin User',
            email: 'admin@example.com',
            password: hashedPassword, // Mật khẩu đã được mã hóa
            role: 'admin',
        });

        const userID = createdUser._id; // Lấy _id của admin vừa tạo

        // Gán userID của admin vào mỗi sản phẩm để biết ai đã tạo
        const sampleProducts = products.map((product) => {
            return { ...product, user: userID }; // Gán userID vào mỗi sản phẩm
        });

        // Chèn danh sách sản phẩm mới vào database
        await Product.create(sampleProducts);
        console.log('Product data seeded successfully'); // In thông báo thành công

        process.exit(); // Thoát chương trình sau khi hoàn thành
    } catch (error) {
        console.error(`Error seeding the data: ${error}`);
        process.exit(1); // Log lỗi nếu có vấn đề xảy ra
    }
};

seedData(); // Gọi hàm để thực thi quá trình seed dữ liệu
