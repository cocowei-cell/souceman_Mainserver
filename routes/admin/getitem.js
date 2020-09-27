/**
 * @description: admin页面 获取项目
 * @param {type}
 * @return {type}
 */

const _ = require("lodash");
const { Item } = require("../../models/TableItem");
const { checkToken } = require("../../until/Token");
const { User } = require("../../models/User");
module.exports = async (req, res) => {
  try {
    const token = req.headers.token;
    // 获取角色和_id
    let { role, _id } = await checkToken(token);
    if (role !== "admin") {
      return res.send({ msg: "非法获取数据", code: 400 });
    }
    //如果是管理员
    // 时间  班级或者学号 模式 1为班级 2 为学号
    const { time, cla_num, mode } = req.query;
    let stuInfo = null;
    if (mode == 1) {
      //按班级查找
      //获取对应班级的用户
      var userData = await User.find({ stu_class: cla_num });
      // 整理用户数据
      userData.forEach(async v=>{
        //查询该学生的对应信息
       stuInfo = await Item.find({
          along_user:v._id,
          along_time:time
        }).populate('first.user','-stu_pass').populate('second.user','-stu_pass');
        console.log(time)
      })
    }
    // } else if (mode == 2) {
    //   //按学号查找
    //   var result = await Item.findOne({
    //     along_time: time,
    //   }).populate("user");
    // }
    console.log(stuInfo);
    return res.send({ msg: "获取success", code: 200, data: userData });
  } catch (error) {
    console.log(error);
    return res.send({ msg: "获取失败", code: 401 });
  }
};
