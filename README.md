# RecycleHub - Scrap Recycling Platform

RecycleHub is a comprehensive full-stack platform designed to streamline scrap collection, pricing, and management through user-friendly interfaces and intelligent categorization. It connects customers, dealers, and administrators in a secure, role-based ecosystem for sustainable recycling.

Deployed Link:- https://recycle-hub-psi.vercel.app

---

## 🌟 Key Features

### For Customers
- **Pickup Schedule** - Schedule scrap pickups with detailed location tracking
- **Price Lookup** - Check real-time prices for different scrap materials
- **Transaction History** - View all past transactions and related pickups
- **Shopping Cart** - Add scrap items to cart before checkout (with Redux state management)

### For Dealers
- **Pickup Management** - Accept/reject customer pickup requests
- **Pricing Control** - Set prices for scrap categories
- **Invoice Generation** - Create and manage invoices for transactions
- **Payout Requests** - Request payouts for completed transactions
- **Dealer Dashboard** - View statistics and transaction history

### For Admins
- **Full System Control** - Manage all users, prices, and transactions
- **Price Management** - Edit, add, delete scrap material prices
- **Admin Dashboard** - System-wide analytics and monitoring
- **Role Management** - Manage user roles and permissions

### Security & Authentication
- **Email-Based Auth** - OTP verification and password reset via email
- **Google OAuth** - Single sign-on integration
- **Role-Based Access Control (RBAC)** - Three-tier permission system
- **Protected Routes** - Auth persistence across browser refreshes
- **Token Management** - JWT-based secure authentication

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, Vite, Tailwind CSS, Redux Toolkit, React Router |
| **Backend** | Node.js, Express.js, MongoDB, Mongoose |
| **Storage** | Cloudinary (image hosting), MongoDB Atlas (database) |
| **State Management** | Redux with redux-persist (localStorage) |

---

## 📋 Project Architecture

### Frontend Structure
```
frontend/
├── src/
│   ├── components/          # React components organized by feature
│   │   ├── Auth/           # Login, Signup components
│   │   ├── Pricing/        # Price display and management
│   │   ├── Cart/           # Shopping cart
│   │   ├── Pickup/         # Pickup scheduling with AI categorization
│   │   ├── Dashboard/      # User/Admin dashboards
│   │   └── ProtectedRoute/ # Route protection wrapper
│   ├── store/              # Redux slices and store config
│   │   ├── authSlice.js    # Auth state management
│   │   ├── cartSlice.js    # Cart state management
│   │   └── themeSlice.js   # Dark mode toggle
│   └── service/            # API utilities
├── public/                 # Static files
└── index.html             # Entry point
```

### Backend Structure
```
backend/
├── controller/            # Business logic
│   ├── authController.js
│   ├── pickupController.js
│   ├── paymentController.js
│   └── ...
├── models/               # MongoDB schemas
│   ├── user.js
│   ├── pickup.js
│   ├── invoice.js
│   └── ...
├── middlewares/          # Auth, file upload middleware
├── routers/              # API endpoints
├── config/               # Database, Gemini, Cloudinary config
└── index.js              # Express server setup
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js v16+ 
- MongoDB Atlas connection string
- Environment variables configured (see below)

### Installation

```bash
# Clone repository
git clone <repository-url>
cd RecycleHub

# Backend Setup
cd backend
npm install

# Frontend Setup
cd ../frontend
npm install
```

### Environment Configuration

**Backend** - Create `.env` in `/backend`:
```env
# Database
DB_URL=mongodb+srv://username:password@cluster.mongodb.net/recyclehub

# JWT
JWT_SECRET=your_jwt_secret_key

# Email Configuration
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_app_password

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id

# Payment Gateway
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret

# Frontend URLs
FRONTEND_URL=https://deployed-frontend-url.com
FRONTEND_DEV_URL=http://localhost:5173

# Server
PORT=5000
```

**Frontend** - Create `.env.development` in `/frontend`:
```env
VITE_BACKEND_URL=http://localhost:5000
```

### Running Locally

```bash
# Terminal 1: Backend
cd backend
npm run dev
# Runs on http://localhost:5000

# Terminal 2: Frontend
cd frontend
npm run dev
# Runs on http://localhost:5173
```

---

## 📊 Role-Based Access Control

| Feature | Customer | Dealer | Admin |
|---------|----------|--------|-------|
| Browse Prices | ✅ | ✅ | ✅ |
| Schedule Pickup | ✅ | - | ✅ |
| View Cart | ✅ | ✅ | ✅ |
| Accept Pickups | - | ✅ | ✅ |
| Manage Prices | - | - | ✅ |
| View Dashboard | - | ✅ | ✅ |
| Create Invoices | - | ✅ | ✅ |
| Request Payouts | - | ✅ | ✅ |

---

## 🔑 API Endpoints

### Authentication
- `POST /sendotp` - Send OTP for email verification
- `POST /verifyotp` - Verify OTP
- `POST /signup` - Create new account
- `POST /login` - Login user
- `POST /reset-password` - Reset password

### Pricing
- `GET /getPrice` - Get all scrap prices
- `PUT /editPrice/:id` - Update price (Admin only)
- `POST /addItem` - Add new scrap type (Admin only)
- `DELETE /deleteItem/:id` - Delete scrap type (Admin only)

### Pickup Management
- `POST /addPickup` - Schedule pickup request
- `GET /get-requests` - Get all pickup requests (Admin/Dealer)
- `PUT /accept-request` - Accept pickup request (Admin/Dealer)
- `PUT /reject-request` - Reject pickup request (Admin/Dealer)
- `GET /get-orders` - Get user's pickup orders

### Cart & Checkout
- `GET /transactions` - Get user transactions
- `POST /create-subscription` - Create payment subscription
- `POST /verify-payment` - Verify payment

### Gemini Vision
- `POST /categorize-scrap` - Analyze scrap image and auto-categorize

---

## 🎯 Core Implementation Details

### 1. Shopping Cart with Redux
State management persisting to localStorage:
- Add items from pricing page
- Update quantities dynamically
- Clear cart functionality
- Auto-calculate totals

### 1. Email Notifications
- OTP for authentication
- Pickup acceptance notifications to customers
- Password reset emails

### 1. Protected Routes
- ProtectedRoute component wraps authenticated routes
- localStorage persistence for auth state
- Multi-layer security with role validation

---

## 🔐 Security Features

✅ JWT Token-based authentication  
✅ Password hashing with bcrypt  
✅ Role-Based Access Control (RBAC)  
✅ Protected API endpoints with auth middleware  
✅ Secure image uploads to Cloudinary  
✅ Email verification via OTP  
✅ localStorage with auto-logout on token expiry  

---

## 📈 Future Enhancements

- [ ] Real-time pickups tracking with Google Maps
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Bulk pickup requests
- [ ] Rating and review system
- [ ] Environmental impact metrics
- [ ] API rate limiting and optimization
