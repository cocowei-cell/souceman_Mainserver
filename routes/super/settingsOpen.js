/**
 * @description: 设置学期站点权限 设置该学期是否开启审核
 * @param {type}
 * @return {type}
 */
const { Time } = require("../../models/alongTime");
const { checkToken } = require("../../until/Token");
module.exports = async (req, res) => {
  const token = req.headers.token;
  try {
    let { role } = await checkToken(token);
    //获取权限
    let { time, _id, auth } = req.body;
    //如果是超级管理员 执行设置站点操作
    if (role === "super") {
      //判断是否携带id值，如果未携带 创建这个学期
      if (!_id) {
        let isHas = await Time.findOne({ time });
        if (isHas) {
          return res.send({ msg: "本学期已经存在，请勿重复添加", code: 400 });
        }
        //不存在就添加
        await Time.create({
          time,
          isOpen: auth,
        });
        return res.send({ msg: "添加成功", code: 200 });
      } else {
        //如果已经设置了站点操作，那么就更新操作
        await Time.updateOne({ _id }, { $set: { isOpen: auth } });
        return res.send({ msg: "设置成功", code: 200 });
      }
    } else {
      return res.send({ msg: "非法越权操作", code: 401 });
    }
  } catch (error) {
    return res.send({ msg: "设置失败", code: 400 });
  }
};
