const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');
const authMiddleware = require('./middleware/authMiddleware');

// Load environment variables
dotenv.config();

const app = express();

// ── Middleware ──
app.use(cors());
app.use(express.json());

// ── Public Routes ──

// Landing route — public
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to AstroView API' });
});

// Auth routes — public (signup, login)
app.use('/api/auth', authRoutes);

// ── Protected Routes ──
// All routes under /api (except /api/auth) require authentication
app.use('/api', authMiddleware, protectedRoutes);

// ── Centralized Error Handler ──
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    res.status(statusCode).json({
        message: err.message,
        // Only show stack trace in development
        stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
    });
});

// ── Start Server ──
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 AstroView server running on port ${PORT}`);
    });
});
