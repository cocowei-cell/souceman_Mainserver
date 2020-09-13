/*
 * @Author: zzz
 * @Date: 2020-09-08 02:43:04
 * @LastEditTime: 2020-09-13 13:55:44
 * @LastEditors: Please set LastEditors
 * @Description: 配置文件
 * @FilePath: \mainServe\config.js
 */
//数据库链接配置信息
const dbConnection = {
  connect: "mongodb://localhost:27017/souce",
  options: {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
};

const serverListeningPort = 3000; //服务器监听的端口号
const URL = `http://localhost:${serverListeningPort}`;
//QQ邮箱配置文件
const emailConfig = {
  host: "smtp.qq.com", //QQ邮箱的 smtp 服务器地址
  secure: true, //使用 SSL 协议
  secureConnection: false, //是否使用对 https 协议的安全连接
  port: 465, //QQ邮件服务所占用的端口
  auth: {
    user: "2368299717@qq.com", //开启 smtp 服务的发件人邮箱，用于发送邮件给其他人
    pass: "qierbikrultndibd", //SMTP 服务授权码
  },
};

module.exports = {
  dbConnection,
  serverListeningPort,
  emailConfig,
};
