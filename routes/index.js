/*
 * @Descripttion:
 * @Author: zzz
 * @Date: 2020-09-08 03:55:43
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-09-16 22:51:04
 */
module.exports = async (app) => {
  //用户相关
  app.use("/api/user", require("./user"));
  //其他模块
  app.use("/api/others", require("./others"));
  //分数模块
  app.use("/api/score", require("./score"));
  //管理员模块
  app.use("/api/admin",require("./admin"))
};
