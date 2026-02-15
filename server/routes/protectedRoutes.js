const express = require('express');
const router = express.Router();

// @route   GET /api/dashboard
// @desc    Get authenticated user's profile data
// @access  Protected (requires valid JWT)
router.get('/dashboard', (req, res) => {
    res.status(200).json({
        message: 'Welcome to AstroView Dashboard',
        user: req.user,
    });
});

module.exports = router;
