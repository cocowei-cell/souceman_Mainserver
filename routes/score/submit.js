/**
 * @description: 提交
 * @param {type}
 * @return {type}
 */
//用户相关
const { User } = require("../../models/User");
//表单项相关
const { Item } = require("../../models/TableItem");
//检查token是否过期
const { checkToken } = require("../../until/Token");

module.exports = async (req, res) => {
  const token = req.headers.token;
  try {
    //从token中解码出学号
    const { stu_number } = await checkToken(token);
    //查询到用户的id值
    const { _id } = await User.findOne({ stu_number });
    //解析出所有的项目
    const submitItem = req.body;
    //顺序存储信息
    submitItem.forEach((item, index) => {

    })

    return res.send({ msg: "提交成功",code: 200});
  } catch (error) {
    return res.send({ msg: "token非法", code: 400 });
  }
};
