/**
 * @description: 获取所有的分数
 * @param {type}
 * @return {type}
 */
const { checkToken } = require("../../until/Token");
const { Item } = require("../../models/TableItem");
const { User } = require("../../models/User");
module.exports = async (req, res) => {
  try {
    const token = req.headers.token;
    let { role } = await checkToken(token);
    if (role !== "super" && role !== "admin") {
      return res.send({ msg: "非法操作", code: 400 });
    }
    const { classModel, college, grades, selectTime } = req.query;

    // 查询条件
    const tagData = {
      college: college[0],
      profession: college[1],
      grade: grades,
      along_time: selectTime,
    };
    // 设置正则匹配对应的学期
    const regexp1 = new RegExp(selectTime + "第一学期");
    const regexp2 = new RegExp(selectTime + "第二学期");
    // console.log(regexp)
    const data = [];
    // 定义计算总分函数
    // 获取总排名
    function caclulateRank(data) {
      // 排序第一学年 降序
      data.sort((a, b) => {
        return b.firstTotal - a.firstTotal;
      });
      data.forEach((v, index) => {
        v.firstRank = index + 1;
      });
      // 排序第二学年
      data.sort((a, b) => {
        return b.secondTotal - a.secondTotal;
      });
      data.forEach((v, index) => {
        v.secondRank = index + 1;
      });
      // 排序最终成绩
      data.sort((a, b) => {
        return b.finalTotal - a.finalTotal;
      });
      data.forEach((v, index) => {
        v.finalRank = index + 1;
      });
      // 最终按照学年总排名进行排序
    }
    async function caclulateScore(target) {
      // 查询出该用户所有对应的学期分数
      for (let i = 0, len = target.length; i < len; i++) {
        // 一个人在指定条件下的项 (已经审核过) 先计算第一学期
        let itemInfo1 = await Item.find({
          along_user: target[i]._id,
          along_time: regexp1,
          is_checked: true,
        });
        // 获取第二学期
        let itemInfo2 = await Item.find({
          along_user: target[i]._id,
          along_time: regexp2,
          is_checked: true,
        });
        // 计算第一学期分数和第二学期分数以及总分数
        let firstTotal = 0,
          secondTotal = 0,
          finalTotal = 0;
        itemInfo1.forEach((v) => {
          firstTotal += v.second.score;
        });
        itemInfo2.forEach((v) => {
          secondTotal += v.second.score;
        });
        // 计算最终分数
        finalTotal = firstTotal + secondTotal;
        data.push({
          stu_number: target[i].stu_number,
          stu_name: target[i].stu_name,
          firstTotal,
          secondTotal,
          finalTotal,
          profess_name:target[i].profession.profess_name
        });
        caclulateRank(data);
      }
    }
    // 如果没有输入班级 获取本专业本年级所有的数据
    if (classModel.trim() === "") {
      // 获取所有的用户 按照学院 专业 年级来查找
      let userInfo = await User.find({
        college: tagData.college,
        profession: tagData.profession,
        grade: tagData.grade,
      }).populate('profession','profess_name');
      // 查询出该用户所有对应的学期分数
      await caclulateScore(userInfo);
    } else {
      // 如果携带班级参数 先查询班级是否存在
      let userByClass = await User.find({
        stu_class: classModel,
        grade: tagData.grade,
        college: tagData.college,
        profession: tagData.profession,
      }).populate('profession','profess_name');
      if (userByClass.length == 0) {
        return res.send({ msg: "无此班级", code: 400 });
      }
      // 如果班级存在 计算其数据
      await caclulateScore(userByClass);
    }
    return res.send({ msg: "获取成功", code: 200, data });
  } catch (error) {
    console.log(error);
    return res.send({ msg: "获取失败", code: 401 });
  }
};
