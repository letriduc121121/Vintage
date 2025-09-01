# 🚀 Setup Guide - Vintage Shop

## 📋 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or Atlas)
- Git

### 1. Clone & Install

```bash
# Clone repository
git clone https://github.com/yourusername/vintage-shop.git
cd vintage-shop

# Install backend dependencies
cd Vintage/backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Environment Setup

#### Backend (.env)
Create `Vintage/backend/.env`:

```env
PORT=9000
MONGO_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/your_database?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key_here_make_it_long_and_random
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

#### Frontend (.env)
Create `Vintage/frontend/.env`:

```env
VITE_BACKEND_URL=http://localhost:9000
VITE_PAYPAL_CLIENT_ID=your_paypal_client_id_here
```

### 3. Database Setup

```bash
# Navigate to backend
cd Vintage/backend

# Run seeder (optional)
npm run seed
```

### 4. Start Development Servers

#### Terminal 1 - Backend
```bash
cd Vintage/backend
npm run dev
```

#### Terminal 2 - Frontend
```bash
cd Vintage/frontend
npm run dev
```

### 5. Access Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:9000

## 🔧 Configuration Details

### MongoDB Setup
1. Create MongoDB Atlas account
2. Create new cluster
3. Get connection string
4. Replace `your_username`, `your_password`, `your_cluster`, `your_database` in MONGO_URI

### Cloudinary Setup
1. Create Cloudinary account
2. Get cloud name, API key, and API secret
3. Add to backend .env file

### PayPal Setup
1. Create PayPal Developer account
2. Create app to get client ID
3. Add to frontend .env file

## 🐛 Troubleshooting

### Common Issues

**Port already in use**
```bash
# Kill process on port 9000
npx kill-port 9000
```

**MongoDB connection failed**
- Check MONGO_URI format
- Ensure network access is enabled
- Verify username/password

**Frontend can't connect to backend**
- Ensure backend is running on port 9000
- Check VITE_BACKEND_URL in frontend .env
- Verify CORS settings in backend

## 📚 Additional Resources

- [MongoDB Atlas Setup](https://docs.atlas.mongodb.com/getting-started/)
- [Cloudinary Setup](https://cloudinary.com/documentation/node_integration)
- [PayPal Developer Setup](https://developer.paypal.com/docs/)
- [Vite Documentation](https://vitejs.dev/)
- [Express.js Documentation](https://expressjs.com/)
