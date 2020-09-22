/**
 * @description: 删除条目
 * @param {type}
 * @return {type}
 */
const { checkToken } = require("../../until/Token");
const { User } = require("../../models/User");
const { TableItem } = require("../../models/items");
module.exports = async (req, res) => {
  try {
    let token = req.headers.token;
    // let { stu_number } = await checkToken(token);
    let stu_number = "201819716";
    let { role } = await User.findOne({ stu_number });
    if (role === "normal") {
      //获取删除条目的id值
      const { _id } = req.params;
      await TableItem.deleteOne({ _id });
      return res.send({ msg: "删除成功", code: 200 });
    } else {
      return res.send({ msg: "非法操作", code: 400 });
    }
  } catch (error) {
    console.log(error);
    return res.send({ msg: "token非法", code: 401 });
  }
};
