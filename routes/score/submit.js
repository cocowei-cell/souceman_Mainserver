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
  try {
    const token = req.headers.token;
    //从token中解码出学号
    const { stu_number } = await checkToken(token);
    //查询到用户的id值
    const { _id } = await User.findOne({ stu_number });
    //解析出所有的项目
    const { submit_form, time } = req.body;
    //顺序存储信息
    for (let i = 0, len = submit_form.length; i < len; i++) {
      //如果自评分数为0说明该项未填写 不进行保存
      if(+submit_form[i].self_score==0) {
        continue;
      }
      submit_form[i].along_user = _id;
      submit_form[i].along_time = time;
      //转换为数字格式
      submit_form[i].self_score = +submit_form[i].self_score;
      //保存到数据库中
      await Item.create(submit_form[i]);
    }
    return res.send({ msg: "提交成功", code: 200 });
  } catch (error) {
    return res.send({ msg: "token非法", code: 400 });
  }
};
