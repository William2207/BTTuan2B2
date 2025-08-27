const express = require('express');
const {createUser, handleLogin, handleRegister,getUser,getAccount, handleForgotPassword} = require('../controllers/userController');
const auth = require('../middlewares/auth');
const delay = require('../middlewares/delay');

const routerAPI = express.Router();
routerAPI.all('*', delay); // Apply delay middleware to all routes

routerAPI.get('/', (req, res) => {
  res.status(200).json({message: 'Welcome to the API'});
})
routerAPI.post("/register", createUser);
routerAPI.post("/login", handleLogin);
routerAPI.get("/user", getUser);
routerAPI.get("/account",delay, getAccount);
routerAPI.post("/forgot-password",handleForgotPassword);


module.exports = routerAPI;