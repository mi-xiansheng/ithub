//加载express
const express = require('express');

const app = express();

//app.get('/',(req,res) => res.send('hello world'));
//提取路由模块
const router = require('./router');

app.use(router);
app.listen(3000,() => console.log('running 3000'));