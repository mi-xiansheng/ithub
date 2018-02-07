const express = require('express')

const userController = require('../controllers/user');

//创建路由
const router = express.Router();

//配置路由表

//用户相关
router
	.get('/signin',userController.showSignin)
	.post('/signin',userController.signin)
	.get('/signup',userController.showSignup)
	.post('/signup',userController.signup)
	.get('/signout',userController.signout)

//导出路由

module.exports = router;