//加载express
const express = require('express');

const app = express();

const indexRouter = require('./routers/index');
const userRouter = require('./routers/user');
const topicRouter= require('./routers/topic');
const resonseTime = require('response-time');
const morgan = require('morgan');
const serverIndex = require('server-index');
//配置express-session中间键
const session = require('express-session');

const compression = require('compression');
const {checkLogin} = require('./middlewares/auth');
app.use(morgan('tiny'));
app.use(compression());
// 都一定要配置在挂载路由之前
// console.log(app.locals);
 // 该插件会为 req 请求对象添加一个成员：req.session 默认是一个对象
 // 这是最简单的配置方式，暂且先不用关心里面参数的含义
app.use(session({
   // 配置加密字符串，它会在原有加密基础之上和这个字符串拼起来去加密
   // 目的是为了增加安全性，防止客户端恶意伪造
   secret: 'itcast',
   resave: false,
   saveUninitialized: true // 无论你是否使用 Session ，我都默认直接给你分配一把钥匙
}))
// 将 public 目录开放为一个类似于 Apache 的静态文件目录列表
app.use('/public', express.static('./public/'), serveIndex('./public/', {'icons': true}))
//注意该中间键一定要写在配置session中间键后以及路由之前
app.use((req,res,next) =>  {
	app.locals.user = req.session.user;
	next();
})
//配置body-parser
const bodyParser = require('body-parser');

//解析表单请求体
app.use(bodyParser.urlencoded({ extended: true }))
//app.get('/',(req,res) => res.send('hello world'));
//提取路由模块
// const router = require('./router');

//开放静态资源
app.use('/node_modules',express.static('./node_modules/'))
app.use('/public',express.static('./public/'))
//配置模板引擎
app.engine('html',require('express-art-template'))
app.use(indexRouter);
app.use('/topic',checkLogin,topicRouter);
app.use(userRouter);
app.use(function(err,req,res,next) {
	res.status(500).send({
		error:err.message
	})
})
app.use((req,res,next) => {
  res.render('404.html');
}) 
app.listen(3000,() => console.log('running 3000'));