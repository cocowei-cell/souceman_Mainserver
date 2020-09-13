/*
 * @Descripttion:
 * @Author: zzz
 * @Date: 2020-09-08 17:33:18
 * @LastEditors: zzz
 * @LastEditTime: 2020-09-08 17:52:38
 */

const { checkToken } = require("../../until/Token");
module.exports = async (req, res) => {
  const { token } = req.body;
  try {
    await checkToken(token);
    return res.send({ msg: "token合法", code: 200 });
  } catch (error) {
    if (error.message === "jwt expired") {
      return res.send({ msg: "token已过期", code: 401 });
    } else {
      return res.send({ msg: "token非法", code: 400 });
    }
  }
};
