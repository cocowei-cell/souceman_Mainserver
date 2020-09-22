/**
 * @description: 
 * @param {type} 
 * @return {type} 
 */

const admin = require("express").Router();

//设置站点权限

admin.post('/settings',require('./admin/settingsOpen'));

//添加条目

admin.post('/additems',require('./admin/additem'));

//删除条目

admin.delete('/deleteitems/:_id',require('./admin/deleteitems'));
module.exports = admin