/**
 * @description: 获取异议表格
 * @param {type}
 * @return {type}
 */

const { checkToken } = require("../../until/Token");
const { Dispute } = require("../../models/dispute");
const _ = require("lodash")
module.exports = async (req, res) => {
  try {
    const token = req.headers.token;
    let { _id, role } = await checkToken(token);
    if (role !== "admin") {
      return res.send({ msg: "非法获取", code: 400 });
    }
    // 查询数据-> 该管理员的 并且未审核的
    let result = await Dispute.find({
      check_person: _id,
      is_checked: false,
    }).populate('along_user','stu_name stu_number').populate('item_id');
    return res.send({ msg: "获取成功", code: 200, data: result });
  } catch (error) {
    console.log(error);
    return res.send({ msg: "获取失败", code: 401 });
  }
};
