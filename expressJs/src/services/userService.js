require('dotenv').config();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

const createUserService = async (name,email,password) => {
    try {
        const user = await User.findOne({ email});
        if (user) {
            return { success: false, message: 'Username already exists' };
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new User({ name: name, email, password: hashedPassword, role: 'user' });
        await newUser.save();
        return { success: true, message: 'User created successfully' };
    } catch (error) {
        console.error('Error creating user:', error);
        return { success: false, message: 'Error creating user' };
    }
}

const loginService = async (email, password) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return { success: false, message: 'User not found' };
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return { success: false, message: 'Invalid credentials' };
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return { success: true, message: 'Login successful', token };
    } catch (error) {
        console.error('Error during login:', error);
        return { success: false, message: 'Error during login' };
    }
}

const getUserService = async() => {
    try {
        const users = await User.find({}, '-password'); // Exclude password field
        return { success: true, users };
    } catch (error) {
        console.error('Error fetching users:', error);
        return { success: false, message: 'Error fetching users' };
    }
}

const forgotPasswordService = async (email) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return { success: false, message: 'User not found' };
        }
        // Here you would typically generate a reset token and send an email
        return { success: true, message: 'Password reset link sent' };
    } catch (error) {
        console.error('Error during password reset:', error);
        return { success: false, message: 'Error during password reset' };
    }
}
module.exports = { createUserService, loginService, getUserService,forgotPasswordService };