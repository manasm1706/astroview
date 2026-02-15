const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * User Schema — AstroView
 * Stores user credentials, location, role, and notification preferences.
 */
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [6, 'Password must be at least 6 characters'],
        },
        location: {
            latitude: { type: Number, default: null },
            longitude: { type: Number, default: null },
            city: { type: String, default: '' },
            country: { type: String, default: '' },
        },
        role: {
            type: String,
            enum: ['student', 'farmer', 'astronomy_enthusiast'],
            default: 'student',
        },
        preferences: {
            notifyISS: { type: Boolean, default: true },
            notifySolar: { type: Boolean, default: true },
            notifyDisaster: { type: Boolean, default: true },
            notificationToken: { type: String, default: '' },
        },
    },
    {
        timestamps: true,
    }
);

/**
 * Pre-save hook — hash password before storing.
 * Only hashes if the password field has been modified (e.g. on creation or update).
 */
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(8);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

/**
 * Instance method — compare entered password with hashed password in DB.
 * @param {string} enteredPassword - Plain text password from login request
 * @returns {Promise<boolean>}
 */
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
