/**
 * @description: 添加学院
 * @param {type}
 * @return {type}
 */
const { checkToken } = require("../../until/Token");
const { College } = require("../../models/college");
module.exports = async (req, res) => {
  try {
    const token = req.headers.token;
    let { role } = await checkToken(token);
    if (role !== "super") {
      return res.send({ msg: "非法获取信息", code: 400 });
    }
    const { college } = req.body;
    const tag = await College.findOne({ college_name: college });
    if (tag) {
      return res.send({ msg: "学院已存在", code: 400 });
    }
    await College.create({
      college_name: college,
    });
    return res.send({ msg: "添加成功", code: 200 });
  } catch (error) {
    console.log(error);
    return res.send({ msg: "获取失败", code: 401 });
  }
};
