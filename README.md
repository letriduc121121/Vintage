# 🛍️ Vintage - Fashion E-commerce Platform

A modern e-commerce platform specializing in clothing and fashion items, built with React, Node.js, and MongoDB. Features a beautiful, responsive interface with comprehensive functionality from user authentication, product management, shopping cart to payment processing.

## ⚡ Live Demo

- **Frontend Website**: [https://vintage-hggu.vercel.app](https://vintage-hggu.vercel.app)

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

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (version 16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn** - [Download Yarn](https://yarnpkg.com/)
- **Git** - [Download here](https://git-scm.com/)
- **MongoDB** - [Local installation](https://docs.mongodb.com/manual/installation/) or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (cloud)

### 1. Clone Repository

```bash
# Clone the repository
git clone https://github.com/yourusername/Vintage.git

# Navigate to project directory
cd Vintage

# Verify the structure
ls -la
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file (if .env.example doesn't exist, create manually)
touch .env
```

**Configure your backend `.env` file:**

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration

MONGO_URI=mongodb+srv://letriduc121121:yu1jSiqLgIF2HoKh@cluster0.xexwf.mongodb.net/rabbit?retryWrites=true&w=majority&appName=Cluster0


# JWT Configuration
JWT_SECRET=7W(i$/?"Z"*/vi1GB%PNc>9:.FA{{*CIQvMSj>j$I_BmuOs-:<X_hv~jai))!e

# Cloudinary Configuration (for image uploads)
CLOUDINARY_CLOUD_NAME=dqbzw0jb2
CLOUDINARY_API_KEY=941722434945332
CLOUDINARY_API_SECRET=26LOJZLUPNySPk6Z-nvbmMF6VwE

# Optional: PayPal Configuration (for backend payment processing)
PAYPAL_CLIENT_ID=your_paypal_client_id

```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Create .env file
touch .env
```

**Configure your frontend `.env` file:**

```env
# Backend API URL
VITE_BACKEND_URL=http://localhost:3000

# PayPal Configuration
VITE_PAYPAL_CLIENT_ID=your_paypal_client_id

# Optional: Environment
VITE_NODE_ENV=development
```

### 4. Database Setup

```bash
# Navigate to backend directory
cd ../backend

# Run database seeder to populate with sample data
npm run seed
```

**Note:** The seeder will create:

- Sample products (clothing items)
- Admin user (email: `admin@example.com`, password: `123456`)
- Sample categories and collections

### 5. Running the Application

#### Development Mode

**Start Backend Server:**

```bash
# In backend directory
npm run dev
```

Backend will run on `http://localhost:3000`

**Start Frontend Development Server:**

```bash
# In frontend directory (open new terminal)
npm run dev
```

Frontend will run on `http://localhost:5173`

#### Production Mode

**Build Frontend:**

```bash
# In frontend directory
npm run build
```

**Start Backend Production:**

```bash
# In backend directory
npm start
```

### 6. Verify Installation

1. **Backend Check:** Visit `http://localhost:3000` - should see "welcome to rabbit API"
2. **Frontend Check:** Visit `http://localhost:5173` - should see the Vintage homepage
3. **Admin Login:** Use `admin@example.com` / `123456` to access admin panel
4. **Database Check:** Verify MongoDB connection in backend console

### 7. Available Scripts

**Backend Scripts:**

```bash
npm run dev          # Start development server with nodemon
npm start           # Start production server
npm run seed        # Populate database with sample data
```

**Frontend Scripts:**

```bash
npm run dev         # Start development server
npm run build       # Build for production
npm run preview     # Preview production build
npm run lint        # Run ESLint
```

### 8. Troubleshooting

**Common Issues:**

- **Port already in use:** Change PORT in .env or kill existing processes
- **MongoDB connection failed:** Check MONGO_URI and ensure MongoDB is running
- **Module not found:** Run `npm install` in both frontend and backend directories
- **CORS errors:** Ensure backend is running and VITE_BACKEND_URL is correct
- **Admin login fails:** Run `npm run seed` to create admin user
- **Build errors:** Clear node_modules and reinstall dependencies

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


**MIT License Benefits:**

- ✅ Free to use, modify, and distribute
- ✅ Commercial use allowed
- ✅ No warranty provided
- ✅ Simple and permissive license
- ✅ Compatible with most other licenses

**Copyright © 2024 Vintage E-commerce Platform**

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - Frontend framework
- [Express.js](https://expressjs.com/) - Backend framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Cloudinary](https://cloudinary.com/) - Image storage
- [PayPal](https://www.paypal.com/) - Payment processing

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact me letriduc121121@gmail.com

---

⭐ **Star this repository if you found it helpful!**
