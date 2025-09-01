# 🛍️ Vintage - Fashion E-commerce Platform

A modern e-commerce platform specializing in clothing and fashion items, built with React, Node.js, and MongoDB. Features a beautiful, responsive interface with comprehensive functionality from user authentication, product management, shopping cart to payment processing.

## ✨ Key Features

### 🎨 User Interface
- **Modern Design** - Beautiful, responsive interface with Tailwind CSS
- **Product Catalog** - Browse clothing with smart filtering and search
- **Smart Shopping Cart** - Add/remove items with quantity management
- **User Authentication** - Secure login/register with JWT
- **Product Details** - Detailed product pages with image galleries
- **Featured Products** - Display best-selling clothing items
- **New Arrivals** - Latest products with horizontal scrolling
- **Order Management** - Track orders and purchase history

### 🔧 Backend Features
- **RESTful API** - Express.js with MongoDB
- **Secure Authentication** - JWT-based authentication
- **Product Management** - CRUD operations for clothing items
- **Image Upload** - Cloudinary integration
- **Payment Processing** - PayPal payment gateway
- **Order Processing** - Complete order workflow
- **Admin Panel** - User and product management

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with hooks
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Icons** - Icon library
- **Sonner** - Toast notifications

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **Multer** - File upload handling
- **Cloudinary** - Cloud image storage
- **PayPal API** - Payment processing
- **bcrypt** - Password hashing

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 16 or higher)
- **npm** or **yarn**
- **MongoDB** (local or Atlas)
- **Git**

## 🚀 Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/vintage.git
cd vintage
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env
```

**Configure your `.env` file:**

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env
```

**Configure your `.env` file:**

```env
VITE_BACKEND_URL=http://localhost:3000
VITE_PAYPAL_CLIENT_ID=your_paypal_client_id
```

### 4. Database Setup

```bash
# Navigate to backend directory
cd ../backend

# Run database seeder (optional)
npm run seed
```

### 5. Running the Application

#### Start Backend Server

```bash
# In backend directory
npm run dev
```

Backend will run on `http://localhost:3000`

#### Start Frontend Development Server

```bash
# In frontend directory (open new terminal)
npm run dev
```

Frontend will run on `http://localhost:5173`

## 📁 Project Structure

```
Vintage/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   │   ├── Admin/       # Admin components
│   │   │   ├── Cart/        # Shopping cart components
│   │   │   ├── Common/      # Shared components
│   │   │   ├── Layout/      # Layout components
│   │   │   └── Product/     # Product components
│   │   ├── pages/           # Page components
│   │   ├── redux/           # Redux store and slices
│   │   ├── assets/          # Static assets
│   │   └── App.jsx          # Main component
│   ├── package.json
│   └── vite.config.js
├── backend/                  # Node.js backend
│   ├── routes/              # API routes
│   ├── models/              # MongoDB models
│   ├── middleware/          # Custom middleware
│   ├── config/              # Configuration files
│   ├── data/                # Sample data
│   ├── server.js            # Main server file
│   └── package.json
└── README.md
```

## 🔐 Environment Variables

### Backend (.env)
- `PORT` - Server port (default: 3000)
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret

### Frontend (.env)
- `VITE_BACKEND_URL` - Backend API URL
- `VITE_PAYPAL_CLIENT_ID` - PayPal client ID

## 🎯 Detailed Features

### Product Management
- **Product CRUD** - Create, read, update, delete clothing items
- **Image Upload** - Multiple image upload with Cloudinary
- **Category Management** - Organize products by categories
- **Search & Filter** - Advanced filtering and search functionality

### User Management
- **Authentication** - Secure login/register system
- **Profile Management** - User profiles and preferences
- **Admin Panel** - Admin-only features for user management

### Shopping Experience
- **Shopping Cart** - Persistent cart with Redux
- **Checkout Process** - Complete checkout flow
- **Payment Integration** - PayPal payment processing
- **Order Tracking** - Order history and status

## 🚀 Deployment

### Backend Deployment (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Frontend Deployment (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables
3. Deploy automatically

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - Frontend framework
- [Express.js](https://expressjs.com/) - Backend framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Cloudinary](https://cloudinary.com/) - Image storage
- [PayPal](https://www.paypal.com/) - Payment processing

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact me at your.email@example.com.

---

⭐ **Star this repository if you found it helpful!**
