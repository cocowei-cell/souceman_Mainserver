/**
 * @description: 提交审核
 * @param {type}
 * @return {type}
 */
const { Item } = require("../../models/TableItem");
const { checkToken } = require("../../until/Token");
const { Open } = require("../../models/isopen");
module.exports = async (req, res) => {
  try {
    const token = req.headers.token;
    // 获取角色和审核人id值
    let { role, _id } = await checkToken(token);
    if (role !== "admin") {
      return res.send({ msg: "非法操作", code: 400 });
    }
    let tag = await Open.findOne();
    // 如果不存在该学期或者不开启审核
    if (!tag || tag.isOpen == false) {
      return res.send({ msg: "管理员已关闭该学期审核", code: 400 });
    }
    const { dataArr, author } = req.body;
    //如果是第一审核人
    if (author == 1) {
      for (let i = 0; i < dataArr.length; i++) {
        // 更新操作
        await Item.updateOne(
          { _id: dataArr[i]._id },
          {
            $set: {
              first: {
                score: dataArr[i].first.score,
                user: _id,
              },
            },
          }
        );
      }
    } else {
      for (let i = 0; i < dataArr.length; i++) {
        // 更新操作
        await Item.updateOne(
          { _id: dataArr[i]._id },
          {
            $set: {
              second: {
                score: dataArr[i].second.score,
                user: _id,
              },
              // 不论第一审核人是否审核，只要第二审核人提交，那么就完成审核
              is_checked: true,
            },
          }
        );
      }
    }
    return res.send({ msg: "添加成功", code: 200 });
  } catch (error) {
    console.log(error);
    return res.send({ msg: "提交失败", code: 401 });
  }
};
