/**
 * @description: 提交
 * @param {type}
 * @return {type}
 */
//表单项相关
const { Item } = require("../../models/TableItem");
const { Time } = require("../../models/alongTime");
//检查token是否过期
const { checkToken } = require("../../until/Token");

module.exports = async (req, res) => {
  try {
    const token = req.headers.token;
    //从token中解码出id
    const { _id } = await checkToken(token);
    //解析出所有的项目
    const { submit_form, time } = req.body;
    //查询是否开启审核时间
    let { isOpen } = await Time.findOne({ time });
    //核查审核时间是否过期
    if (isOpen === false) {
      return res.send({ msg: "审核时间已过，提交失败", code: 400 });
    }
    //判断是否已经提交过该学期的项目
    let itemContent = await Item.findOne({ along_user: _id, along_time: time });
    if (itemContent) {
      return res.send({
        msg: "已经提交过该学期啦！请在我的提交中查看",
        code: 400,
      });
    }
    //顺序存储信息
    for (let i = 0, len = submit_form.length; i < len; i++) {
      //如果自评分数为0和原因为空说明该项未填写 不进行保存
      if (
        +submit_form[i].self_score == 0 ||
        submit_form[i].reason.trim() === ""
      ) {
        continue;
      }
      submit_form[i].along_user = _id;
      submit_form[i].along_time = time;
      //转换为数字格式
      submit_form[i].self_score = +submit_form[i].self_score;
      //删除提交表单中的_id字段
      delete submit_form[i]._id;
      //保存到数据库中
      await Item.create(submit_form[i]);
    }
    return res.send({ msg: "提交成功", code: 200 });
  } catch (error) {
    console.log(error);
    return res.send({ msg: "token非法", code: 400 });
  }
};
