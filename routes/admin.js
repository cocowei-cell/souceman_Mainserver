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
//提交表格审核
admin.put("/submititem", require("./admin/submititem"));
// 获取异议的表格
admin.get("/geterror", require("./admin//geterror"));
// 获取异议表格的数目
admin.get("/getcount", require("./admin/getcounterror"));
// 处理异议
admin.put("/handledisputes", require("./admin/handledisputes"));
// 获取班级导引图
admin.get("/getdrawer", require("./admin/getdrawer"));
module.exports = admin;
