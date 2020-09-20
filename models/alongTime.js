/**
 * @description: 项目归属的学期
 * @param {type}
 * @return {type}
 */

const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const time = new Schema({
  //归属的学期，需要符合 2018-2019第一学期   2020-2021第一学期  2020-2021第二学期的规则
  time: {
    type: String,
    default: "",
  },
  //是否开启本学期审核权限
  isOpen: {
    type: Boolean,
    default: false,
  },
},{versionKey:false});

const Time = mongoose.model("time", time);
module.exports = {
  Time,
};
