/**
 * @description: 忘记密码路由
 * @param {type}
 * @return {type}
 */
const { User, ValidateModifyPass } = require("../../models/User");
module.exports = async (req, res) => {
  const { stu_number, stu_pass, qqcode } = req.body;
  try {
    let result = await User.findOne({ stu_number });
    //如果不存在
    if (!result) {
      return res.send({ msg: "用户不存在", code: 400 });
    }
    
    //如果存在
    if (result && !stu_pass && !qqcode) {
      return res.send({ msg: "存在用户", code: 200 });
    } else if (result && !stu_pass && qqcode) {
      //如果用户存在，并且没有输入密码，输入qq验证码
      //从数据库中取出数据
      let { code } = await User.findOne({ stu_number });
      if (code === qqcode) {
        return res.send({ msg: "邮箱正确", code: 200 });
      } else {
        return res.send({ msg: "邮箱不正确", code: 400 });
      }
    } else if (result && stu_pass && qqcode) {
      //用户存在，输入密码，输入qq验证码
      let { code } = await User.findOne({ stu_number });
      if (code !== qqcode) {
        return res.send({ msg: "邮箱不正确", code: 400 });
      }
      const { error } = ValidateModifyPass({ stu_pass }); //验证密码
      if (error) {
        return res.send({ msg: "密码格式不正确", code: 400 });
      } else {
        await User.updateOne({ stu_number }, { $set: { stu_pass } }); //更新密码
        return res.send({ msg: "密码修改成功", code: 200 });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
