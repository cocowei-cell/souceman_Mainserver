/* 
  获取某用户该学期审核
*/

const { Item } = require("../../models/TableItem");
const { checkToken } = require("../../until/Token");

module.exports = async (req, res) => {
  try {
    const token = req.headers.token;
    let { role } = await checkToken(token);
    //如果不是管理员
    if (role !== "admin") {
      return res.send({ msg: "非法操作", code: 400 });
    }
    // 权限验证通过
    // 时间 归属用户的id值
    const { time, user_id } = req.query;
    console.log(time,user_id)
    let result = await Item.find({ along_time: time, along_user: user_id });
    return res.send({ msg: "获取成功", code: 200, data: result });
  } catch (error) {
    console.log(error);
    return res.send({ msg: "获取失败", code: 401 });
  }
};

//   jwt
