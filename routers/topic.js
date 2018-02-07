const express = require('express')

const topicController = require('../controllers/topic.js')

const router = express.Router()

//话题相关
router  
	.get('/create', topicController.showCreate)
  	.post('/create', topicController.create)
  	.get('/:topicId', topicController.showDetail)
  	.get('/:topicID/edit', topicController.showEdit)
  	.post('/:topicID/edit', topicController.edit)
  	.post('/:topicID/delete', topicController.delete)	
 //4导出路由容器
 //app.js加载路由模块得到路由容器
 module.exports = router;