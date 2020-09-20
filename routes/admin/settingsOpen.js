/**
 * @description:
 * @param {type}
 * @return {type}
 */
const { User } = require("../../models/User");
const { Time } = require("../../models/alongTime");
const { checkToken } = require("../../until/Token");
module.exports = async (req, res) => {
  const token = req.headers.token;
  try {
    // let { stu_number } = await checkToken(token);
    //获取权限
    let { auth, time, _id,stu_number } = req.body;
    //获取用户信息
    let { role } = await User.findOne({ stu_number });
    //如果是超级管理员 执行设置站点操作
    if (role === "super") {
      //判断是否携带id值，如果携带，说明修改已经存在的权限
      if (!_id) {
        await Time.create({
          time,
          isOpen: auth,
        });
        return res.send({ msg: "设置成功", code: 200 });
      } else {
        //如果已经设置了站点操作，那么就更新操作
        await Time.updateOne({ _id }, { $set: { isOpen: auth } });
        return res.send({ msg: "设置成功", code: 200 });
      }
    } else {
      return res.send({ msg: "非法越权操作", code: 401 });
    }
  } catch (error) {
    return res.send({ msg: "token非法", code: 400 });
  }
};
