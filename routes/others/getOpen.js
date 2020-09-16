/**
 * @description: 获取网站是否开启
 * @param {type}
 * @return {type}
 */
const { Web } = require("../../models/WebSite");
module.exports = async (req, res) => {
  //如果没有设置，默认为false，未开启审核
  const { isOpen = false } = await Web.findOne();
  return res.send({ msg: "ok", isOpen, code: 200 });
};
