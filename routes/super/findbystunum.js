/**
 * @description: 按照学号查找用户
 * @param {type}
 * @return {type}
 */

const { User } = require("../../models/User");
const { checkToken } = require("../../until/Token");

module.exports = async (req, res) => {
  try {
    const token = req.headers.token;
    let { role } = await checkToken(token);
    if (role !== "super") {
      return res.send({ msg: "非法获取信息", code: 400 });
    }
    let { stu_number } = req.query;
    // 查询对应的信息
    let result = await User.findOne({ stu_number }).select(
      "-stu_pass -code -__v"
    );
    // 如果为空 代表查询不到这个用户
    if (!result) {
      return res.send({ msg: "用户不存在", code: 400 });
    } else {
      return res.send({ msg: "获取成功", code: 200, result });
    }
  } catch (error) {
    console.log(error.message);
    return res.send({ msg: "获取失败", code: 401 });
  }
};
