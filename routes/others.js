/*
 * @Descripttion:
 * @Author: zzz
 * @Date: 2020-09-08 17:33:09
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-09-16 22:29:10
 */
const others = require("express").Router();
//验证token权限
others.post("/auth", require("./others/authToken"));
//验证验证码是否正确
others.post("/authcode", require("./others/authCode"));
//得到随机验证码
others.get("/getcode", require("./others/getCode"));
//获取网站是否开启
others.get('/getopen',require("./others/getOpen"));
module.exports = others;
