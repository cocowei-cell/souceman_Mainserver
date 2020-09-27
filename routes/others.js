/*
 * @Descripttion:
 * @Author: zzz
 * @Date: 2020-09-08 17:33:09
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-09-26 16:28:38
 */
const others = require("express").Router();
//验证token权限
others.post("/auth", require("./others/authToken"));
//验证验证码是否正确
others.post("/authcode", require("./others/authCode"));
//得到随机验证码
others.get("/getcode", require("./others/getCode"));
//得到条目
others.get("/getitems", require("./others/getItems"));
//提交错误信息
others.post('/submiterror', require("./others/submiterror"))
module.exports = others;
