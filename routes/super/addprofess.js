/**
 * @description: 添加专业
 * @param {type}
 * @return {type}
 */
const { checkToken } = require("../../until/Token");
const { Profession } = require("../../models/profession");
module.exports = async (req, res) => {
  try {
    const token = req.headers.token;
    let { role } = await checkToken(token);
    if (role !== "super") {
      return res.send({ msg: "非法获取信息", code: 400 });
    }
    const { profess_name, collegeID } = req.body;
    let tag = await Profession.findOne({ profess_name });
    if (tag) {
      return res.send({ msg: "专业已经存在", code: 400 });
    }
    await Profession.create({
      profess_name,
      along_college: collegeID,
    });
    return res.send({ msg: "添加成功", code: 200 });
  } catch (error) {
    console.log(error);
    return res.send({ msg: "添加失败", code: 401 });
  }
};
