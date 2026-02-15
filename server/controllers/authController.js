const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Generate a JWT token for a given user ID.
 * Token expires in 30 days.
 */
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

/**
 * @desc    Register a new user
 * @route   POST /api/auth/signup
 * @access  Public
 */
const signup = async (req, res, next) => {
    try {
        const { name, email, password, role, location } = req.body;

        // Validate required fields
        if (!name || !email || !password) {
            res.status(400);
            throw new Error('Please provide name, email, and password');
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400);
            throw new Error('User with this email already exists');
        }

        // Create user (password is hashed via pre-save hook)
        const user = await User.create({
            name,
            email,
            password,
            role: role || 'student',
            location: location || {},
        });

        // Generate token and return user data (without password)
        const token = generateToken(user._id);

        res.status(201).json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                location: user.location,
                preferences: user.preferences,
            },
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Authenticate user & get token
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            res.status(400);
            throw new Error('Please provide email and password');
        }

        // Find user by email (select password explicitly for comparison)
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            res.status(401);
            throw new Error('Invalid email or password');
        }

        // Compare passwords
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            res.status(401);
            throw new Error('Invalid email or password');
        }

        // Generate token and return user data (without password)
        const token = generateToken(user._id);

        res.status(200).json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                location: user.location,
                preferences: user.preferences,
            },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { signup, login };
