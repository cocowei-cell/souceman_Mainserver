/**
 * @description: 获取条目
 * @param {type}
 * @return {type}
 */
const { checkToken } = require("../../until/Token");
const { TableItem } = require("../../models/items");
module.exports = async (req, res) => {
  try {
    const token = req.headers.token;
    //核查token
    await checkToken(token);
    //查询结果
    let result = await TableItem.find();
    return res.send({ msg: "获取成功", code: 200, result });
  } catch (error) {
    return res.send({ msg: "token非法", code: 401 });
  }
};
