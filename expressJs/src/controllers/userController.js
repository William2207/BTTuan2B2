const {createUserService, loginService, getUserService,forgotPasswordService} = require('../services/userService');

const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }
    const result = await createUserService(name, email, password);
    if (result.success) {
        return res.status(201).json(result);
    } else {
        return res.status(400).json(result);
    }
}
const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }
    const result = await loginService(email, password);
    if (result.success) {
        return res.status(200).json(result);
    } else {
        return res.status(400).json(result);
    }
}
const getUser = async (req, res) => {
    const result = await getUserService();
    if (result.success) {
        return res.status(200).json(result);
    } else {
        return res.status(400).json(result);
    }
}
const getAccount = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    return res.status(200).json({ success: true, user: req.user });
}
const handleForgotPassword = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }
    const result = await forgotPasswordService(email);
    if (result.success) {
        return res.status(200).json(result);
    }
    else {
        return res.status(400).json(result);
    }
}

module.exports = { createUser, handleLogin, getUser, getAccount,handleForgotPassword};