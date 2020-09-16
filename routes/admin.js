/**
 * @description: 
 * @param {type} 
 * @return {type} 
 */

const admin = require("express").Router();

//设置站点权限

admin.post('/settings',require('./admin/settingsOpen'));


module.exports = admin