/**
 * @description: 分数相关路由
 * @param {type}
 * @return {type}
 */

const score = require("express").Router();
//提交材料
score.post("/submit", require("./score/submit"));
//获取学期
score.get("/gettimes", require("./score/gettimes"));
//获取对应时间的表格
score.get("/getitems/:time", require("./score/getitems"));
//修改子项目路由
score.put("/modifyitems", require("./score/modifyitems"));
// 获取分数
score.get("/getscore", require("./score/getsorce"));
// 获取所有的分数
score.get("/getallscore", require("./score/getallscore"));
module.exports = score;
