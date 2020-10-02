/**
 * @description: 获取错误的条目
 * @param {type}
 * @return {type}
 */
const { checkToken } = require("../../until/Token");
const { Dispute } = require("../../models/dispute");

module.exports = async (req, res) => {
  try {
    const token = req.headers.token;
    let { _id } = await checkToken(token);
    let count = await Dispute.count({ along_user: _id, is_checked: false });
    return res.send({ msg: "获取成功", code: 200, count });
  } catch (error) {
    console.log(error);
    return res.send({ msg: "获取失败", code: 401 });
  }
};
