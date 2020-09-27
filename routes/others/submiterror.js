/**
 * @description: 提交错误信息
 * @param {type}
 * @return {type}
 */
const { checkToken } = require("../../until/Token");
const { Dispute } = require("../../models/dispute");
module.exports = async (req, res) => {
  try {
    const token = req.headers.token;
    // 归属用户
    let { _id } = await checkToken(token);
    // 原因，项目id，最终核查人
    const { reason, item_id, check_person } = req.body;
    let tag = await Dispute.findOne({ item_id });
    if (tag) {
      return res.send({
        msg: "你已经提交过该项的异议，请勿重复提交",
        code: 400,
      });
    }
    await Dispute.create({
      along_user: _id,
      reason,
      item_id,
      check_person,
    });
    return res.send({ msg: "添加成功", code: 200 });
  } catch (error) {
    console.log(error);
    return res.send({ msg: "token不合法", code: 401 });
  }
};
