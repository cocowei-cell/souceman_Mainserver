/**
 * @description: 获取学院
 * @param {type}
 * @return {type}
 */
const { College } = require("../../models/college");
const { checkToken } = require("../../until/Token");
module.exports = async (req, res) => {
  try {
    const token = req.headers.token;
    let { role } = await checkToken(token);
    if (role !== "super") {
      return res.send({ msg: "非法获取信息", code: 400 });
    }
    const data = await College.find().select("-_v");
    return res.send({ msg: "获取成功", code: 200, data });
  } catch (error) {
    console.log(error);
    return res.send({ msg: "获取失败", code: 401 });
  }
};
