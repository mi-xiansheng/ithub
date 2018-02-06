//路由模块 
//1需要加载express
const express = require('express');

//1.1加载控制器
const userController = require('./controllers/user.js');
const indexController = require('./controllers/index.js');
const commentController = require('./controllers/comment.js');
const topicController = require('./controllers/topic.js');
//2创建路由
const router  = express.Router();

// //3配置路由表
// router.get('',(req,res) => {
// 	res.send('hello world');
// })
// router.get('/signin', (req, res) => {
//    res.send('signin')
//  })
 
//  router.get('/signup', (req, res) => {
//    res.send('signup')
//  })
 
//  router.get('/signout', (req, res) => {
//    res.send('signout')
//  })
//分类配置路由方法
//首页相关
router.get('/',indexController.showIndex);
//用户相关
router
	.get('/signin',userController.showSignin)
	.post('signin',userController.signin)
	.get('/signup',userController.showSignup)
	.post('/signup',userController.signup)
	.get('/signout',userController.signout)
//话题相关
router  
	.get('/topic/create', topicController.showCreate)
  	.post('/topic/create', topicController.create)
  	.get('/topic/:topicId', topicController.showDetail)
  	.get('/topic/:topicID/edit', topicController.showEdit)
  	.post('/topic/:topicID/edit', topicController.edit)
  	.post('/topic/:topicID/delete', topicController.delete)	
 //4导出路由容器
 //app.js加载路由模块得到路由容器
 module.exports = router;