/*
 * @Descripttion: 主入口文件
 * @Author: zzz
 * @Date: 2020-09-08 02:40:33
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-09-23 22:45:59
 */

const express = require("express");

const app = express();

const mongoose = require("mongoose");

const bodyParser = require("body-parser");

const cookieParser = require("cookie-parser");

const session = require("express-session");

const URL = require("url");
app.use(
  session({
    secret: "asdasda",
    cookie: { maxAge: 600000000 },
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser());

const { dbConnection, serverListeningPort } = require("./config"); //配置信息

app.use(bodyParser.urlencoded({ extended: true })); //解析body 挂载中间件
//配置跨域
app.use((req, res, next) => {
  let refer = req.headers.referer;
  //当不是在服务器上请求时，设置为默认，去掉后当用浏览器的URL发送请求时会
  //得到refer为undefined，造成客户端返回500的错误
  if (!refer) refer = "http://localhost:8080";
  let url = URL.parse(refer);
  // 转换为源地址，不req.headers.referer任何参数
  let finalUrl = `${url.protocol}//${url.host}`;
  res.header("Access-Control-Allow-Origin", finalUrl); //设置跨域请求源
  res.header(
    "Access-Control-Allow-Headers",
    "content-type,Content-Length, Authorization,token, Accept,Access-Token,X-Requested-With"
  );
  res.header("Access-Control-Allow-Methods", "GET,DELETE,PUT,POST");
  // 跨域携带cookie
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Server", "nginx");
  next();
});
//路由
require("./routes")(app);

//数据库链接操作
mongoose
  .connect(dbConnection.connect, dbConnection.options)
  .then(() => console.log("The database connection!"))
  .catch(() => console.log("The database connection failed!"));

app.listen(serverListeningPort, () => {
  console.log("The server listening on port" + serverListeningPort);
});
