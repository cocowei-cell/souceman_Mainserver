/**
 * @description: 验证码是否正确
 * @param {type}
 * @return {type}
 */

module.exports = async (req, res) => {
  let { code } = req.body;
  // console.log(req.session)
  if (req.session.captch === code) {
    return res.send({ msg: "验证码正确", code: 200 });
  } else {
    return res.send({ msg: "验证码错误", code: 400 });
  }
};
