/**
 * @description: 获取学期
 * @param {type}
 * @return {type}
 */
const { Time } = require("../../models/alongTime");
module.exports = async (req, res) => {
  try {
    //获取所有的学期
    let result = await Time.find();
    return res.send({ msg: "ok", code: 200, time: result.reverse() });
  } catch (error) {
    console.log(error);
    return res.send({ msg: "获取失败", code: 400 });
  }
};
