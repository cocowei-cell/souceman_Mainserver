const { User, ValidateUserReg } = require("../../models/User");
const _ = require("lodash");
const { Grade } = require("../../models/grades");
module.exports = async (req, res) => {
  const body = req.body;
  const {
    stu_number,
    stu_pass,
    stu_email,
    stu_name,
    stu_class,
    college,
  } = body;
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
  // 截取前4位作为年级
  const grade = stu_number.substr(0, 4);
  let tag = await Grade.findOne({ grade });
  if (!tag) {
    await Grade.create({
      grade,
    });
  }
  try {
    await User.create({
      stu_number,
      stu_pass,
      stu_email,
      stu_name,
      stu_class,
      college: college[0],
      profession: college[1],
      grade,
    });
    return res.send({ msg: "注册成功", code: 200 });
  } catch (error) {
    console.log(error);
    return res.send({ msg: "发生未知错误", code: 500 });
  }
};
