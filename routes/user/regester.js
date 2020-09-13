const { User, ValidateUserReg } = require("../../models/User");
const _ = require("lodash");
module.exports = async (req, res) => {
  const body = req.body;
  const { stu_number, stu_pass, stu_email, stu_name, stu_class } = body;
  //验证学号是否存在
  try {
    let result = await User.findOne({ stu_number });
    if (result) {
      return res.send({ msg: "学号已经存在", code: 401 });
    }
  } catch (error) {
    console.log(error);
  }
  //验证规则
  const { error } = ValidateUserReg({ stu_number, stu_pass, stu_email });
  if (error) {
    return res.send({ msg: "验证不符合规则", code: 400 });
  }
  try {
    await User.create({
      stu_number,
      stu_pass,
      stu_email,
      stu_name,
      stu_class,
    });
    return res.send({ msg: "注册成功", code: 200 });
  } catch (error) {
    console.log(error);
  }
};
