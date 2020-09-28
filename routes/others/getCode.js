/**
 * @description:
 * @param {type}
 * @return {type}
 */
const getImgCode = require("../../until/getValCode");
module.exports = async (req, res) => {
  let datas = getImgCode({
    // 翻转颜色
    inverse: false,
    // 字体大小
    fontSize: 42,
    // 噪声线条数
    noise: 1,
    // 宽度
    width: 80,
    // 高度
    height: 40,
    //生成的验证码的数目
    size: 4,
    ignoreChars: "Oo1l",
  });
  //设置响应头
  res.header("Content-Type", "image/svg+xml");
  req.session.captch = datas.text;
  return res.send(datas.data);
};



/* 
    http://niubi.com   
    
    

*/
  