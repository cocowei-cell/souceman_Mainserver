/**
 * @description: 获取所有的项目
 * @param {type}
 * @return {type}
 */
const { checkToken } = require("../../until/Token");
const { TableItem } = require("../../models/items");
const pages = require("mongoose-sex-page");
module.exports = async (req, res) => {
  try {
    const token = req.headers.token;
    let { role } = await checkToken(token);
    if (role !== "super") {
      return res.send({ msg: "非法获取信息", code: 400 });
    }
    // 查询结果
    const { page } = req.params;
    // console.log(page)
    let result = await pages(TableItem)
      .sort("item_number")
      .page(page)
      .size(8)
      .exec();
    return res.send({ msg: "获取成功", code: 200, result });
  } catch (error) {
    console.log(error);
    return res.send({ msg: "获取失败", code: 401 });
  }
};
