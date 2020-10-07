/**
 * @description: 获取用户列表
 * @param {type}
 * @return {type}
 */
const { User } = require("../../models/User");
const { checkToken } = require("../../until/Token");
const pages = require("mongoose-sex-page");
module.exports = async (req, res) => {
  try {
    const token = req.headers.token;

    // 获取用户角色
    let { role } = await checkToken(token);
    // 如果不是超级管理员角色 直接返回
    if (role !== "super") {
      return res.send({ msg: "非法获取信息", code: 400 });
    }
    const { page = 1 } = req.params;
    // 如果是管理员角色就返回对应的用户信息
    if (page <= 0) {
      page = 1;
    }
    const type = req.query.type;
    let result = await pages(User)
      .find({ role: type })
      .sort("role")
      .populate("college")
      .populate("profession")
      .page(page)
      .size(10)
      .display(5)
      .exec();
    return res.send({ msg: "获取成功", code: 200, result });
  } catch (error) {
    console.log(error);
    return res.send({ msg: "获取失败", code: 401 });
  }
};
