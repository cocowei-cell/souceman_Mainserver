/**
 * @description: 获取专业
 * @param {type}
 * @return {type}
 */
const { Profession } = require("../../models/profession");
module.exports = async (req, res) => {
  try {
    const id = req.params.cid;
    let data = await Profession.find({ along_college: id });
    return res.send({ msg: "获取成功", code: 200, data });
  } catch (error) {
    console.log(error);
    return res.send({ msg: "获取失败", code: 401 });
  }
};
