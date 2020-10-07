/**
 * @description: 修改是否开启学期审核
 * @param {type}
 * @return {type}
 */
const { checkToken } = require("../../until/Token");
const { Open } = require("../../models/isopen");
module.exports = async (req, res) => {
  try {
    const token = req.headers.token;
    let { role } = await checkToken(token);
    if (role !== "super") {
      return res.send({ msg: "非法获取信息", code: 400 });
    }
    const { auth } = req.body;
    let tag = await Open.findOne();
    // 如果为空
    if (!tag) {
      await Open.create({
        isOpen: auth,
      });
    } else {
      await Open.updateOne({
        isOpen: auth,
      });
    }
    return res.send({ msg: "设置成功", code: 200 });
  } catch (error) {
    console.log(error);
    return res.send({ msg: "设置失败", code: 401 });
  }
};
