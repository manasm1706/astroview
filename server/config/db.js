const mongoose = require('mongoose');

/**
 * Connect to MongoDB Atlas using the MONGO_URI from environment variables.
 * Handles TLS/SSL issues common with Node.js v20+ on Windows.
 */
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 10,
            socketTimeoutMS: 30000,
            connectTimeoutMS: 5000,
        });
        console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ MongoDB connection error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;

