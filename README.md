# 🛍️ Vintage - Modern E-commerce Platform

A full-stack e-commerce application built with React, Node.js, and MongoDB. Features a modern UI design with comprehensive admin management system.

## ✨ Features

### 🛒 Customer Features
- **Product Browsing**: Browse products with advanced filtering and search
- **Shopping Cart**: Add/remove items with size and color selection
- **User Authentication**: Secure login/register system with JWT
- **Order Management**: Track order status and history
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Payment Integration**: PayPal payment processing
- **Guest Shopping**: Shop without registration

### 🔧 Admin Features
- **Product Management**: CRUD operations for products
- **User Management**: Manage customer accounts and roles
- **Order Management**: Process and track orders
- **Image Upload**: Cloudinary integration for product images
- **Analytics Dashboard**: Sales and inventory overview

## 🏗️ Tech Stack

### Frontend
- **React 18** - UI framework
- **Redux Toolkit** - State management
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Axios** - HTTP client
- **Sonner** - Toast notifications
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Multer** - File upload
- **Cloudinary** - Image storage
- **bcrypt** - Password hashing

## 📁 Project Structure

```
Vintage/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── Admin/       # Admin panel components
│   │   │   ├── Cart/        # Shopping cart components
│   │   │   ├── Common/      # Shared components
│   │   │   ├── Layout/      # Layout components
│   │   │   └── Product/     # Product-related components
│   │   ├── pages/           # Page components
│   │   ├── redux/           # Redux store and slices
│   │   └── assets/          # Static assets
│   ├── package.json
│   └── vite.config.js
│
├── backend/                  # Node.js backend API
│   ├── config/              # Configuration files
│   ├── data/                # Seed data
│   ├── middleware/          # Custom middleware
│   ├── models/              # MongoDB schemas
│   ├── routes/              # API routes
│   ├── server.js            # Main server file
│   └── package.json
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/vintage.git
   cd vintage
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   
   # Create .env file
   cp .env.example .env
   
   # Add your environment variables
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   
   # Start the server
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   
   # Create .env file
   cp .env.example .env
   
   # Add backend URL
   VITE_BACKEND_URL=http://localhost:3000
   
   # Start the development server
   npm run dev
   ```

4. **Seed Database (Optional)**
   ```bash
   cd backend
   npm run seed
   ```

## 🌐 Environment Variables

### Backend (.env)
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
PORT=3000
NODE_ENV=development
```

### Frontend (.env)
```env
VITE_BACKEND_URL=http://localhost:3000
```

## 📱 Features Overview

### Customer Experience
- **Homepage**: Featured products, new arrivals, and collections
- **Product Catalog**: Filter by category, size, color, price range
- **Product Details**: Size/color selection, quantity, add to cart
- **Shopping Cart**: Persistent cart with guest/user support
- **Checkout**: Address input, payment processing
- **Order Tracking**: Order history and status updates

### Admin Panel
- **Dashboard**: Sales overview and analytics
- **Product Management**: Add, edit, delete products
- **User Management**: Customer accounts and role management
- **Order Management**: Process orders and update status
- **Image Upload**: Drag-and-drop image upload to Cloudinary

## 🔐 Authentication & Security

- JWT-based authentication
- Password hashing with bcrypt
- Protected routes for admin access
- CORS configuration
- Input validation and sanitization

## 🎨 UI/UX Features

- **Responsive Design**: Works on all devices
- **Modern UI**: Clean, minimalist design
- **Loading States**: Smooth loading indicators
- **Error Handling**: User-friendly error messages
- **Toast Notifications**: Success/error feedback
- **Image Gallery**: Product image carousel

## 🚀 Deployment

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy both frontend and backend

### Environment Variables for Production
```env
# Backend
MONGO_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
NODE_ENV=production

# Frontend
VITE_BACKEND_URL=https://your-backend-domain.vercel.app
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - *Initial work* - [YourGitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- React and Redux communities
- Tailwind CSS for styling
- MongoDB for database
- Cloudinary for image storage
- PayPal for payment processing

---

⭐ Star this repository if you found it helpful!
