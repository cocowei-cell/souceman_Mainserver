/**
 * @description: 获取学院
 * @param {type}
 * @return {type}
 */
const { Profession } = require("../../models/profession");
const { College } = require("../../models/college");
module.exports = async (req, res) => {
  try {
    // 获取所有的学院
    let col = await College.find();
    let data = [];
    /* 
        转换格式 
         { 
           value:"",
           label:"",
           children:[{

           }]
         }
    */

    for (let i = 0, len = col.length; i < len; i++) {
      // 获取每一个学院中对应的专业
      let profess = await Profession.find({ along_college: col[i]._id });
      // 整理专业数据格式
      let children = [];
      profess.forEach((v) => {
        children.push({
          label: v.profess_name,
          value: v._id,
        });
      });
      // 每一项的临时对象变量
      let tempObj = {};
      tempObj = {
        value: col[i]._id,
        label: col[i].college_name,
        children
      };
      data.push(tempObj);
    }
    return res.send({ msg: "获取成功",code: 200,data})
  } catch (error) {
    console.log(error);
  }
};
