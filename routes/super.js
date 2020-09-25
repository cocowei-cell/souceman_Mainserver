/**
 * @description: 超级管理员页面
 * @param {type}
 * @return {type}
 */

const supers = require("express").Router();

//设置站点权限
supers.post("/settings", require("./super/settingsOpen"));
//添加条目
supers.post("/additems", require("./super/additem"));
//修改条目
supers.put("/modifyitems/:_id", require("./super/modifyitems"));
//获取用户列表
supers.get("/getuser/:page", require("./super/getuser"));
//查询指定的用户
supers.get("/getuserbynum", require("./super/findbystunum"));
//更新指定用户的权限
supers.put("/modifyinfo", require("./super/modifyinfo"));
//获取指定用户的信息
supers.get("/getoneuser",require("./super/getoneuser"))
//获取对应的条目
supers.get("/getitems/:page", require('./super/getitems'))
module.exports = supers;
