/*
 * @Descripttion:
 * @Author: zzz
 * @Date: 2020-09-08 09:16:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-09-15 12:29:29
 */
const { createToken } = require("../../until/Token");

const { User, ValidateLogin } = require("../../models/User");
const _ = require("lodash");
module.exports = async (req, res) => {
  const body = req.body;
  const { error } = ValidateLogin(body);
  if (error) {
    return res.send({ msg: "学号或密码格式错误", code: 400 });
  }
 
  try {
    //查询学号是否存在
    let result = await User.findOne({ stu_number: body.stu_number });
    if (!result) {
      return res.send({ msg: "用户名或密码不正确", code: 400 });
    } else {
      //比对密码，如果正确就登录成功
      const { stu_pass } = result;
      if (body.stu_pass === stu_pass) {
        let token = createToken({ stu_number: body.stu_number });
        let userInfo = _.pick(result, [
          "stu_number",
          "stu_name",
          "stu_email",
          "role",
        ]);
        //返回信息
        return res.send({
          token,
          ...userInfo,
          msg: "登录成功",
          code: 200,
        });
      } else {
        return res.send({ msg: "密码错误", code: 400 });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
