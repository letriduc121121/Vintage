const jwt = require('jsonwebtoken'); // Import thư viện jsonwebtoken để xử lý JWT
const User = require('../models/User'); // Import model User từ file models/User.js để truy vấn database

// Middleware protect để xác thực token và bảo vệ route
const protect = async (req, res, next) => {
    let token; // Khai báo biến token để lưu giá trị token từ header

    // Kiểm tra xem header Authorization có tồn tại và bắt đầu bằng "Bearer" không
    if (
        req.headers.authorization && // Kiểm tra header authorization có tồn tại
        req.headers.authorization.startsWith('Bearer') // Kiểm tra xem có bắt đầu bằng "Bearer" không
    ) {
        try {
            // Tách token từ header (dạng "Bearer <token>")
            token = req.headers.authorization.split(" ")[1]; // Chia chuỗi bằng dấu cách, lấy phần tử thứ 2 (token)

            // Xác minh token bằng khóa bí mật (JWT_SECRET) từ file .env
            const decoded = jwt.verify(token, process.env.JWT_SECRET); // Giải mã token, trả về payload

            // Truy vấn database để lấy thông tin người dùng dựa trên ID trong token
            req.user = await User.findById(decoded.user.id).select("-password"); // Lấy user từ DB, loại bỏ password

            // Chuyển request sang middleware hoặc route tiếp theo
            next(); // Gọi next() để tiếp tục xử lý request
        } catch (error) {
            // Xử lý lỗi nếu token không hợp lệ (hết hạn, sai khóa, v.v.)
            console.error("Token verification failed:", error); // Ghi log lỗi để debug
            return res.status(401).json({ message: 'Not authorized, token failed' }); // Trả về lỗi 401 nếu token sai
        }
    } else {
        // Nếu không có token hoặc header không đúng định dạng
        return res.status(401).json({ message: 'Not authorized, token failed' }); // Trả về lỗi 401
    }
};
//Middleware to check if the user is authorized
const admin=(req,res,next) => {
    if(req.user && req.user.role=='admin'){
        next();
    }
    else{
        return res.status(403).json({ message: 'Not authorized as an admin' });
    }
}
// Export middleware để sử dụng ở file khác
module.exports = {protect,admin};