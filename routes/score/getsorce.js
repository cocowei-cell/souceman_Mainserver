/**
 * @description: 获取分数
 * @param {type}
 * @return {type}
 */

const { checkToken } = require("../../until/Token");
const { Item } = require("../../models/TableItem");
const _ = require("lodash");
module.exports = async (req, res) => {
  try {
    const token = req.headers.token;
    let { _id } = await checkToken(token);
    const { time } = req.query;
    //获取指定用户的项目
    let result = await Item.find({
      along_time: time,
      along_user: _id,
    }).populate("first.user","stu_name").populate("second.user","stu_name"); //选择出名字去除_id字段
    // 第一审核人总分和第二审核人总分
    let firstTotal = 0,
      secondTotal = 0,
      selfTotal = 0,
      tagCheck = true;
    data = {
      info: [],
    };
    //如果未提交
    if (result.length === 0) {
      data.firstTotal = firstTotal;
      data.secondTotal = secondTotal;
      data.selfTotal = selfTotal;
      data.is_checked = tagCheck;
      return res.send({
        msg: "获取成功",
        data,
      });
    }
    // 计算总分
    result.forEach((v) => {
      // 如果有一个未审核，整体就未审核
      if (v.is_checked == false) {
        tagCheck = false;
      }
      firstTotal += v.first.score;
      secondTotal += v.second.score;
      selfTotal += v.self_score;
    });
    //处理表单项
    result.forEach((v) => {
      let temp = _.pick(v, [
        "first",
        "second",
        "self_score",
        "reason",
        "item_number",
        "description",
        "along_user",
        "_id"
      ]);
      data.info.push(temp);
    });
    data.firstTotal = firstTotal;
    data.secondTotal = secondTotal;
    data.selfTotal = selfTotal;
    data.is_checked = tagCheck;
    return res.send({ msg: "ok", code: 200, data });
  } catch (error) {
    console.log(error);
    return res.send({ msg: "获取失败", code: 401 });
  }
};
