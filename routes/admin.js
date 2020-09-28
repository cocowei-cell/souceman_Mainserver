/**
 * @description: 普通管理员设置路由
 * @param {type}
 * @return {type}
 */

const admin = require("express").Router();
// 获取条目 根据班级 学期
admin.get("/getitem", require("./admin/getitem"));
//获取单个条目
admin.get("/getoneuser", require("./admin/getoneuseritem"));
module.exports = admin;
