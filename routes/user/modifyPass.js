/**
 * @description: 修改密码
 * @param {type}
 * @return {type}
 */
const { checkToken } = require("../../until/Token");
const { User, ValidateModifyPass } = require("../../models/User");
module.exports = async (req, res) => {
  //获取token
  const token = req.headers.token;
  //原始密码，新密码
  const { old_stu_pass, new_stu_pass } = req.body;
  try {
    //查询出学号
    let { stu_number } = await checkToken(token);
    let { stu_pass } = await User.findOne({ stu_number });
    if (old_stu_pass === stu_pass) {
      const { error } = ValidateModifyPass({ stu_pass: new_stu_pass });
      if (error) {
        return res.send({ msg: "新密码格式错误", code: 400 });
      }
      //如果正确格式，更新密码
      await User.updateOne(
        { stu_number },
        { $set: { stu_pass: new_stu_pass } }
      );
      return res.send({ msg: "密码修改成功", code: 200 });
    } else {
      return res.send({ msg: "密码不正确", code: 400 });
    }
  } catch (error) {
    return res.send({ msg: "token不合法", code: 401 });
  }
};
