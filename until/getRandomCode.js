const getRandom = require("./getRandom");

/**
 * @description: 生成随机验证码
 * @param {Number} 
 * @return {String} 
 */
module.exports = function getCode(length) {
  let arrCode = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let str = "";
  for (let i = 0; i < length; i++) {
    let random = getRandom(0, 9);
    str +=arrCode[random];
  }
  return str;
};
