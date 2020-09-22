/**
 * @description: 更改项目路由
 * @param {type}
 * @return {type}
 */

const { checkToken } = require("../../until/Token");
const { Item } = require("../../models/TableItem");
const { Time } = require("../../models/alongTime");
const { TableItem } = require("../../models/items");
module.exports = async (req, res) => {
  try {
    const token = req.headers.token;
    //获取用户ID
    let { _id } = await checkToken(token);
    //获取更新后的信息 材料 原因 自评分数 项目id
    const {
      pictures,
      reason,
      self_score,
      item_id,
      time,
      item_number,
    } = req.body;
    // 传递的分数为0 删除对应的项目
    //查询是否开启审核时间
    let { isOpen } = await Time.findOne({ time });
    //核查审核时间是否过期
    if (isOpen === false) {
      return res.send({ msg: "审核时间已过，提交失败", code: 400 });
    }
    //判断是否存在
    let resTag = await Item.findOne({ _id: item_id });
    //根据项目编号查询项目描述
    let description = await TableItem.findOne({ item_number });
    //如果不存在 就创建
    if (!resTag) {
      if (+self_score == 0 || reason.trim() === "") {
        return res.send({ msg: "置为0分的项目将不会添加！" });
      }
      await Item.create({
        along_user: _id,
        self_score: +self_score,
        pictures,
        reason,
        along_time: time,
        item_number,
        description,
      });
      return res.send({ msg: "添加成功", code: 200 });
    }
    if (+self_score === 0) {
      await Item.deleteOne({ _id: item_id });
      return res.send({ msg: "删除成功", code: 200 });
    }
    await Item.updateOne(
      { _id: item_id },
      { $set: { pictures, reason, self_score } }
    );
    return res.send({ msg: "更新成功", code: 200 });
  } catch (error) {
    console.log(error);
    return res.send({ msg: "token非法", code: 401 });
  }
};
