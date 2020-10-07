/**
 * @description: 获取班级导引图
 * @param {type}
 * @return {type}
 */

const { checkToken } = require("../../until/Token");
const { User } = require("../../models/User");

module.exports = async (req, res) => {
  try {
    const token = req.headers.token;
    let { role, _id } = await checkToken(token);
    if (role !== "admin") {
      return res.send({ msg: "非法操作", code: 400 });
    }
    //查询对应的班级和数据
    let userInfo = await User.findOne({ _id })
      .populate("college")
      .populate("profession");
    /* 
      取学号前4位作为年级，获取对应的专业和学院
    */
    //  年级
    let grade = userInfo.stu_number.substr(0, 4);
    // 学院
    let college = userInfo.college;
    // 专业
    let profession = userInfo.profession;
    // 获取所有的班级
    let classes = [];
    // 设置正则表达式
    const regexp = new RegExp(grade, "gi");
    let allClasses = await User.find({
      stu_number: regexp,
      college: college._id,
      profession: profession._id,
    }).select("stu_class -_id");
    // 循环获取班级
    const set = new Set();
    allClasses.forEach((v) => {
      set.add(v.stu_class);
    });
    classes = [...set];
    const data = {
      classes,
      college,
      profession,
    };
    return res.send({ msg: "获取成功", code: 200, data });
  } catch (error) {
    console.log(error);
    return res.send({ msg: "获取失败", code: 401 });
  }
};
