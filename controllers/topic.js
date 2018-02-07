const topic = require('../models/topic')

const moment = require('moment');

exports.showCreate = (req, res,next) => {
  topic.findAll((err,topics) => {
  	if(err) {
  		return next(err);
  	}
  	 // console.log(topics);
  	res.render('topic/create.html',{
  		topics
  	})
  })
}

exports.create = (req,res,next) => {
  // res.send('post create')
  //获取表单提交数据
  //验证数据 操作数据库 发送响应
  
  const topicData = {
  	...req.body,
  	createdAt:moment().format("YYYY-MM-DD HH:mm:ss"),
  	userId : req.session.user.id
  }

  //保存到数据库
  topic.save(topicData,(err,results) => {
  	if(err) {
  		return next(err)
  	}
  	res.status(200).json({
  		code:0,
  		message:'success'
  	})
  })
}

exports.showDetail = (req, res,next) => {
  res.send('fddf')
}

exports.showEdit = (req, res,next) => {
  res.send('get showEdit')
}

exports.edit = (req, res,next) => {
  res.send('post edit')
}

exports.delete = (req, res,next) => {
  res.send('post delete')
}
