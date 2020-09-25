/**
 * @description: 修改用户角色信息
 * @param {type}
 * @return {type}
 */

const { User } = require("../../models/User");
const { checkToken } = require("../../until/Token");

module.exports = async (req, res) => {
  try {
    const token = req.headers.token;
    let { role } = await checkToken(token);
    if (role !== "super") {
      return res.send({ msg: "非法获取信息", code: 400 });
    }
    // 获取权限
    const { _id, stu_class, stu_email, auth } = req.body;
    // 更新角色，班级，邮箱
    await User.updateOne(
      { _id },
      { $set: { role: auth, stu_email, stu_class } }
    );
    return res.send({ msg: "设置成功", code: 200 });
  } catch (error) {
    console.log(error);
    return res.send({ msg: "设置失败", code: 401 });
  }
};
