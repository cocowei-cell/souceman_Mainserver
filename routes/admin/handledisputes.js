/**
 * @description: 处理异议审核路由
 * @param {type}
 * @return {type}
 */
const { Item } = require("../../models/TableItem");
const { checkToken } = require("../../until/Token");
const { Dispute } = require("../../models/dispute");
module.exports = async (req, res) => {
  try {
    const token = req.headers.token;
    let { role, _id } = await checkToken(token);
    if (role !== "admin") {
      return res.send({ msg: "非法操作", code: 400 });
    }
    // 项目Id 最终分数 异议项id值
    const { item_id, final_score, error_id } = req.body;
    // 更新最终分数
    await Item.updateOne(
      { _id: item_id },
      { $set: { second: { score: final_score, user: _id } } }
    );
    // 修改异议项的状态
    await Dispute.updateOne({ _id: error_id }, { $set: { is_checked: true } });
    return res.send({ msg: "修改成功", code: 200 });
  } catch (error) {
    console.log(error);
    return res.send({ msg: "修改失败", code: 401 });
  }
};
