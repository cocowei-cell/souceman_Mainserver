/**
 * @description:  得到QQ邮箱验证码
 * @param {type}
 * @return {type}
 */

const { User } = require("../../models/User");
const sendEmail = require("../../until/sendEmail");
const getHtml = require("../../src/template");
const getRandomCode = require("../../until/getRandomCode");

module.exports = async (req, res) => {
  //获取学号
  const { stu_number } = req.body;
  try {
    let result = await User.findOne({ stu_number });
    if (!result) {
      return res.send({ msg: "用户不存在", code: 400 });
    }
    //如果用户存在
    let { stu_email } = result;
    let codes = getRandomCode(6); //获取验证码
    let Html = getHtml(codes, stu_email); //获取HTML结构
    await sendEmail({
      html: Html,
      to: stu_email,
    });
    // 保存到数据库中
    await User.updateOne({ stu_number }, { $set: { code: codes } });
    return res.send({ msg: "邮箱已发送", code: 200 });
  } catch (error) {
    console.log(error);
  }
};
