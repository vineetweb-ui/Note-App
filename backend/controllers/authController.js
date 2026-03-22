const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, error: 'Please add all fields' });
        }

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ success: false, error: 'User already exists' });
        }

        const user = await User.create({
            name,
            email,
            password,
        });

        if (user) {
            res.status(201).json({
                success: true,
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        }
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, error: 'Please add email and password' });
        }

        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(400).json({ success: false, error: 'Invalid credentials' });
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(400).json({ success: false, error: 'Invalid credentials' });
        }

        res.status(200).json({
            success: true,
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
};

// @desc    Get user data
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            user: {
                id: req.user.id,
                name: req.user.name,
                email: req.user.email
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
};
