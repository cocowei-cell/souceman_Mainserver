/**
 * @description:
 * @param {type}
 * @return {type}
 */
const { User } = require("../../models/User");
const { Web } = require("../../models/WebSite");
const { checkToken } = require("../../until/Token");
module.exports = async (req, res) => {
  const token = req.headers.token;
  try {
    let { stu_number } = await checkToken(token);
    //获取权限
    let { auth } = req.body;
    //获取用户信息
    let { role } = await User.findOne({ stu_number });
    //如果是超级管理员 执行设置站点操作
    if (role === "super") {
      let result = await Web.findOne();
      //如果不存在，那么就创建站点操作对象
      if (!result) {
        await Web.create({
          isOpen: auth,
        });
        return res.send({ msg: "设置成功", code: 200 });
      } else {
        //如果已经设置了站点操作，那么就更新操作
        await Web.updateOne({ $set: { isOpen: auth } });
        return res.send({ msg: "设置成功", code: 200 });
      }
    } else {
      return res.send({ msg: "非法越权操作", code: 401 });
    }
  } catch (error) {
    return res.send({ msg: "token非法", code: 400 });
  }
};
