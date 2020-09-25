/**
 * @description: 修改条目
 * @param {type}
 * @return {type}
 */
const { checkToken } = require("../../until/Token");
const { TableItem } = require("../../models/items");
module.exports = async (req, res) => {
  try {
    let token = req.headers.token;
    let { role } = await checkToken(token);
    if (role === "super") {
      //获取删除条目的id值
      const { _id } = req.params;
      const { item_number, description } = req.body;
      //执行删除操作
      if (item_number.trim() === "") {
        await TableItem.deleteOne({ _id });
        return res.send({ msg: "删除成功", code: 200 });
      } else {
        // 更新操作
        await TableItem.updateOne(
          { _id },
          { $set: { item_number, description } }
        );
        return res.send({ msg: "更新成功", code: 200 });
      }
    } else {
      return res.send({ msg: "非法操作", code: 400 });
    }
  } catch (error) {
    console.log(error);
    return res.send({ msg: "删除失败", code: 401 });
  }
};
