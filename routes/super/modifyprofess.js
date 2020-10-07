/**
 * @description: 修改专业信息
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
    const { _id, profess_name } = req.body;
    //如果置为空 执行删除专业的操作
    if (profess_name.trim() === "") {
      await Profession.deleteOne({ _id });
      return res.send({ msg: "删除成功", code: 200 });
    } else {
      await Profession.updateOne({ _id }, { $set: { profess_name } });
      return res.send({ msg: "修改成功",code: 200})
    }
  } catch (error) {
    console.log(error);
    return res.send({ msg: "获取失败", code: 401 });
  }
};
