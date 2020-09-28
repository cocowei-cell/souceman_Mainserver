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
    let { role } = await checkToken(token);
    if (role !== "admin") {
      return res.send({ msg: "非法获取数据", code: 400 });
    }
    //如果是管理员
    // 时间  班级或者学号 模式 1为班级 2 为学号
    const { time, cla_num, mode } = req.query;
    let data = [];
    if (mode == 1) {
      //按班级查找
      //获取对应班级的用户
      const userData = await User.find({ stu_class: cla_num }).sort(
        "stu_number"
      );
      if (userData.length === 0)
        return res.send({ msg: "无此班级", code: 400 });
      for (let value of userData) {
        //查询该学生的对应表格信息
        const stuInfo = await Item.find({
          along_user: value._id,
          along_time: time,
        })
          .populate("first.user", "stu_name -_id")
          .populate("second.user", "stu_name -_id");
        // 循环遍历stuInfo数组取出其中的分数并进行合并
        // 整理用户数据
        let selfTotal = 0,
          firstTotal = 0,
          secondTotal = 0,
          is_checked = true,
          first_per = "",
          second_per = "";
        for (let item of stuInfo) {
          if (item.is_checked == false) {
            is_checked = false;
          }
          // 计算自评分数
          selfTotal += item.self_score;
          // 计算第一审核人分数
          firstTotal += item.first.score;
          // 计算第二审核人分数
          secondTotal += item.second.score;
        }
        if (stuInfo.length == 0) {
          // 第一审核人姓名
          first_per = "无";
          // 第二审核人姓名
          second_per = "无";
        } else {
          (first_per = stuInfo[0].first.user || "无"),
            (second_per = stuInfo[0].second.user || "无");
        }
        // 返回数据对象
        const dataObj = {
          stu_number: value.stu_number,
          stu_name: value.stu_name,
          stu_class: value.stu_class,
          first_per,
          second_per,
          selfTotal,
          firstTotal,
          secondTotal,
          time,
          is_checked,
          user_id: value._id,
        };
        data.push(dataObj);
      }
      return res.send({ msg: "获取success", code: 200, data });
    } else {
      // 按学号查找
      let user = await User.findOne({ stu_number: cla_num });
      if (!user) {
        return res.send({ msg: "该用户不存在", code: 400 });
      }
      // 查找这个用户所有的子项
      let userDataOne = await Item.find({
        along_time: time,
        along_user: user._id,
      })
        .populate("first.user", "stu_name -_id")
        .populate("second.user", "stu_name -_id");
      let selfTotal = 0,
        firstTotal = 0,
        secondTotal = 0,
        is_checked = true,
        first_per = "",
        second_per = "";
      for (let item of userDataOne) {
        if (item.is_checked == false) {
          is_checked = false;
        }
        // 计算自评分数
        selfTotal += item.self_score;
        // 计算第一审核人分数
        firstTotal += item.first.score;
        // 计算第二审核人分数
        secondTotal += item.second.score;
      }
      if (userDataOne.length == 0) {
        // 第一审核人姓名
        first_per = "无";
        // 第二审核人姓名
        second_per = "无";
      } else {
        (first_per = userDataOne[0].first.user || "无"),
          (second_per = userDataOne[0].second.user || "无");
      }
      // 返回数据对象
      const dataObj = {
        stu_number: user.stu_number,
        stu_name: user.stu_name,
        stu_class: user.stu_class,
        first_per,
        second_per,
        selfTotal,
        firstTotal,
        secondTotal,
        time,
        is_checked,
        user_id: user._id,
      };
      data.push(dataObj);
      return res.send({ msg: "获取success", code: 200, data });
    }
  } catch (error) {
    console.log(error);
    return res.send({ msg: "获取失败", code: 401 });
  }
};
