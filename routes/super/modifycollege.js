/**
 * @description: 修改学院信息
 * @param {type}
 * @return {type}
 */
const { checkToken } = require("../../until/Token");
const { College } = require("../../models/college");
const { Profession } = require("../../models/profession");
module.exports = async (req, res) => {
  try {
    const token = req.headers.token;
    const { role } = await checkToken(token);
    if (role !== "super") {
      return res.send({ msg: "非法操作", code: 400 });
    }
    // 如果是删除学院操作，就删除学院下面的所有的专业
    const { _id, college_name } = req.body;
    if (college_name.trim() === "") {
      //执行删除操作
      /* 
          先删除专业，后删除学院
      */
      await Profession.deleteMany({ along_college: _id });
      await College.deleteOne({ _id });
      return res.send({ msg: "删除成功", code: 200 });
    } else {
      // 修改信息
      await College.updateOne({ _id }, { $set: { college_name } });
      return res.send({ msg: "修改成功",code: 200})
    }
  } catch (error) {
    console.log(error);
    return res.send({ msg: "设置失败", code: 401 });
  }
};
