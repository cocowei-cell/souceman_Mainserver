/**
 * @description: 分数相关路由
 * @param {type} 
 * @return {type} 
 */

const score = require("express").Router();

//提交材料
score.post('/submit',require('./score/submit'))

score.get('/gettimes',require('./score/gettimes'))

module.exports = score