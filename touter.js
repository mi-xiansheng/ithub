//路由模块 
//1需要加载express
const express = require('express');

//2创建路由
const router  = express.Router();

//3配置路由表
router.get('',(req,res) => {
	res.send('hello world');
})
router.get('/signin', (req, res) => {
   res.send('signin')
 })
 
 router.get('/signup', (req, res) => {
   res.send('signup')
 })
 
 router.get('/signout', (req, res) => {
   res.send('signout')
 })
 //4导出路由容器
 //app.js加载路由模块得到路由容器
 module.exports = router;