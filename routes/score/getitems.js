/**
 * @description: 获取对应的条目
 * @param {type}
 * @return {type}
 */

const { User } = require("../../models/User");
const { checkToken } = require("../../until/Token");
const { Item } = require("../../models/TableItem");
const _ = require("lodash")
module.exports = async (req, res) => {
  try {
    const token = req.headers.token;
    let { _id } = await checkToken(token);
    // 获取时间
    const { time } = req.params;
    let result = await Item.find({ along_time: time, along_user: _id });
    return res.send({ msg: "获取成功", code: 200, data: result });
  } catch (error) {
    return res.send({ msg: "token非法", code: 401 });
  }
};
