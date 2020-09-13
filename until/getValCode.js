/**
 * @description:生成随机验证码 图片
 * @param {}
 * @return {Object}
 */
const svgCap = require("svg-captcha");

module.exports = function getCode(options) {
  let svg = svgCap.create(options);
  return {
    text: svg.text,  //验证码的文字
    data: svg.data,  //验证码
  };
};
