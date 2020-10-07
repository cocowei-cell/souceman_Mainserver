/**
 * @description: 获取该专业所有的年级
 * @param {type}
 * @return {type}
 */
const { Grade } = require("../../models/grades");
module.exports = async (req, res) => {
  try {
    let result = await Grade.find().sort('-grade');
    let data = [];
    result.forEach((v) => {
      data.push({
        label: v.grade,
        value: v.grade,
      });
    });
    return res.send({ msg: "获取成功", code: 200, data });
  } catch (error) {
    console.log(error);
    return res.send({ msg: "获取失败", code: 401 });
  }
};
