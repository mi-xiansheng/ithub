const user = require('../models/user')
const md5 = require('blueimp-md5')
const moment = require('moment');
exports.showSignin = (req, res,next) => {
    res.render('signin.html')
}
exports.signin = (req, res,next) => {
    // 1. 获取表单 POST 提交数据
  // 2. 普通数据验证
  // 3. 业务数据验证
  // 4. 验证通过，使用 Session 存储会话标识
  // 5. 发送响应
  const body = req.body
  user.findByEmail(body.email, (err, ret) => {
    if (err) {
      // return res.status(500).json({
      //   error: err.message // err 错误对象有一个 message 属性是具体的错误消息
      // })
      return next(err);
    }
    // 如果用户不存在
    if (!ret) {
      return res.status(200).json({
        code: 1,
        message: 'user not exists'
      })
    }

    // 校验密码是否正确
    if (md5(body.password) !== ret.password) {
      return res.status(200).json({
        code: 2,
        message: 'password invalid'
      })
    }

    // 使用 Session 存储用户登陆状态
    req.session.user = ret

    res.status(200).json({
      code: 0,
      message: 'success'
    })
  })
}
exports.showSignup = (req, res,next) =>{
    res.render('signup.html')
}

exports.signup = (req, res,next) => {
    // console.log(JSON.stringify({foo:'ddd'}))
    // console.log(req.body);
    //1接受表单提交数据
    //2验证数据的有效性
    //普通数据校验,业务数据校验
    //3验证通过,持久化保存到数据库中
    //4发送响应
    var body = req.body;
    user.findByEmail(body.email, (err, ret) => {
        if (err) {
            // return res.status(500).json({ error: err.message }) //err 错误对象有一个message属性是具体错误消息
            return next(err)
       }
        if (ret) {
            return res.status(200).json({
                code: 1,
                message: 'email exists'
            })
        }
        //校验昵称是否存在
        user.findByNickname(body.nickname, (err, ret) => {
            if (err) {
                // return res.status(500).json({ error: err.message }) //err 错误对象有一个message属性是具体错误消息
                return next(err);
            }
            if (ret) {
                return res.status(200).json({
                    code: 2,
                    message: 'nickname exists'
                })
            }
            body.password = md5(body.password);
            body.createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
            //持久化存储信息
            user.save(body, (err, results) => {
                if (err) {
                    // return res.status(500).json({
                    //     error: err.message
                    // })
                    return next(err);
                }
                //注册及登陆使用session保存登录状态
                req.session.user = {
                    ...body,
                    id: results.insertId
                }
                res.status(200).json({
                    code: 0,
                    message: 'success'
                })
            })
        })
    })

}
exports.signout = (req, res,next) => {
    //清除session
    delete req.session.user;
    //重定向到登录页面
    res.redirect('/signin');
}