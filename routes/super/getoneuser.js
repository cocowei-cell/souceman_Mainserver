/**
 * @description: 获取指定的用户信息
 * @param {type}
 * @return {type}
 */

const { User } = require("../../models/User");
const { checkToken } = require("../../until/Token");
const _ = require("lodash");
module.exports = async (req, res) => {
  try {
    const token = req.headers.token;
    let { role } = await checkToken(token);
    if (role === "super") {
      let { stu_number } = req.query;
      // console.log(stu_number)
      let result = await User.findOne({ stu_number })
        .populate("college")
        .populate("profession")
        .select("-stu_pass -code -__v");
      if (!result) {
        return res.send({ msg: "用户不存在", code: 400 });
      }
      return res.send({ msg: "获取成功", code: 200, result });
    }
  } catch (error) {
    console.log(error);
    return res.send({ msg: "获取失败", code: 401 });
  }
};
