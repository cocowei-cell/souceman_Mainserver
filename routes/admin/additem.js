/**
 * @description: 添加表单项路由
 * @param {type}
 * @return {type}
 */
const { TableItem } = require("../../models/items");
const { checkToken } = require("../../until/Token");
const { User } = require("../../models/User");
module.exports = async (req, res) => {
  try {
    //获取token
    const token = req.headers.token;
    // 验证token
    // let { stu_number } = await checkToken(token);
    let stu_number = 201819716;
    //查询角色信息
    let { role } = await User.findOne({ stu_number });
    if (role === "normal") {
      //执行添加操作 获取前台传递的项目编号和描述
      const { item_number, description } = req.body;
      //保存到数据库中
      let tagRes = await TableItem.findOne({ item_number });
      //查询这个条目
      if (tagRes) {
        return res.send({ msg: "该条目已经存在", code: 400 });
      }
      await TableItem.create({ item_number, description });
      return res.send({ msg: "添加成功", code: 200 });
    } else {
      return res.send({ msg: "非法操作", code: 400 });
    }
  } catch (error) {
    console.log(error);
    return res.send({ msg: "token非法", code: 401 });
  }
};
