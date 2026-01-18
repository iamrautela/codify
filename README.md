# 🚀 Codify — AI-Powered Website Builder

**Codify** is a full-stack web application that transforms your thoughts into websites instantly using AI. Built with React, Node.js, Express, and MongoDB, featuring Google OAuth authentication.

---

## ✨ Features

* 🎨 **Beautiful Modern UI** — Enhanced landing page with gradient backgrounds and smooth animations
* 🔐 **Google OAuth Authentication** — Secure login/signup with Google
* 🛡️ **Protected Routes** — Dashboard accessible only after authentication
* ⚡ **Full-Stack Architecture** — React frontend + Express backend + MongoDB database
* 🎯 **AI-Powered** — Describe your website and let AI build it for you

---

## 🧱 Tech Stack

### Frontend
* **React 19** with TypeScript
* **Vite** for fast development
* **React Router** for navigation
* **Tailwind CSS** for styling
* **Google OAuth** for authentication
* **Axios** for API calls

### Backend
* **Node.js** with Express
* **MongoDB** with Mongoose
* **JWT** for token-based authentication
* **Google Auth Library** for OAuth verification

---

## 📂 Project Structure

```
codify/
├── frontend/              # Frontend React app
│   ├── src/              # Source code
│   │   ├── components/   # Reusable components
│   │   ├── context/      # React context (Auth)
│   │   ├── pages/        # Page components
│   │   │   ├── Login.tsx
│   │   │   ├── Signup.tsx
│   │   │   └── Dashboard.tsx
│   │   ├── config/       # Configuration files
│   │   ├── App.tsx       # Main app component
│   │   └── main.tsx      # Entry point
│   ├── public/           # Static assets
│   ├── package.json      # Frontend dependencies
│   └── vite.config.ts    # Vite configuration
├── backend/              # Backend Express app
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── middleware/       # Express middleware
│   ├── server.js         # Server entry point
│   └── package.json      # Backend dependencies
├── package.json          # Root package.json (scripts)
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites

* Node.js (v18 or higher)
* MongoDB (local installation or MongoDB Atlas)
* Google OAuth credentials

### 1. Clone and Install

```bash
# Install all dependencies (frontend + backend)
npm run install:all

# Or install separately:
# Frontend
cd frontend && npm install && cd ..

# Backend
cd backend && npm install && cd ..
```

### 2. Set Up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:3000` (for development)
6. Copy your Client ID and Client Secret

### 3. Configure Environment Variables

#### Frontend (frontend/.env)

Create a `.env` file in the `frontend` directory:

```env
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
VITE_API_URL=http://localhost:5000
```

#### Backend (backend/.env)

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/codify
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
FRONTEND_URL=http://localhost:3000
```

### 4. Start MongoDB

If using local MongoDB:

```bash
# macOS (with Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
# Start MongoDB service from Services panel
```

Or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for cloud database.

### 5. Run the Application

#### Option 1: Run together (Recommended)

```bash
npm run dev:all
```

#### Option 2: Run separately

```bash
# Terminal 1: Start frontend
npm run dev

# Terminal 2: Start backend
npm run dev:backend
```

### 6. Access the Application

* Frontend: http://localhost:3000
* Backend API: http://localhost:5000

---

## 🎯 Usage

1. **Sign Up / Login**: Click "Get started" or navigate to login/signup page
2. **Google Authentication**: Sign in with your Google account
3. **Dashboard**: After authentication, you'll be redirected to the dashboard
4. **Create Website**: Enter a description of your website and click "Create with AI"

---

## 🔒 Authentication Flow

1. User clicks Google Sign In button
2. Frontend receives Google OAuth token
3. Frontend sends token to backend `/api/auth/google`
4. Backend verifies token with Google
5. Backend creates/finds user in MongoDB
6. Backend generates JWT token
7. Frontend stores JWT and user data
8. Protected routes check for valid JWT

---

## 📝 API Endpoints

### Authentication
* `POST /api/auth/google` — Authenticate with Google OAuth token
* `GET /api/auth/verify` — Verify JWT token

### User
* `GET /api/user/profile` — Get user profile (protected)

### Health
* `GET /api/health` — Server health check

---

## 🛠️ Development

### Frontend Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Backend Scripts
```bash
cd backend
npm run dev      # Start with auto-reload
npm start        # Start production server

# Or from root:
npm run dev:backend
npm run start:backend
```

---

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy the `dist` folder
3. Set environment variables in your hosting platform

### Backend (Heroku/Railway/Render)
1. Deploy the `backend` folder
2. Set environment variables
3. Ensure MongoDB connection (use MongoDB Atlas for cloud)

---

## 📦 Dependencies

### Frontend
- `react` & `react-dom` — UI framework
- `react-router-dom` — Routing
- `@react-oauth/google` — Google OAuth
- `axios` — HTTP client
- `tailwindcss` — CSS framework

### Backend
- `express` — Web framework
- `mongoose` — MongoDB ODM
- `jsonwebtoken` — JWT tokens
- `google-auth-library` — Google OAuth verification
- `cors` — CORS middleware
- `dotenv` — Environment variables

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📜 License

MIT License — feel free to use this project for learning and building.

---

## ⭐ Features Roadmap

- [ ] AI website generation implementation
- [ ] Project management dashboard
- [ ] Website preview and editing
- [ ] Export website functionality
- [ ] User profile management
- [ ] Payment integration for premium features

---

**Built with ❤️ using React, Node.js, and MongoDB**
