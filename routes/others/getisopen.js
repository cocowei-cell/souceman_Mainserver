/**
 * @description: 获取站点是否开起
 * @param {type}
 * @return {type}
 */

const { Open } = require("../../models/isopen");
module.exports = async (req, res) => {
  try {
    let data = await Open.findOne();
    return res.send({ msg: "获取成功", code: 200, isOpen: data.isOpen });
  } catch (error) {
    console.log(error);
  }
};
