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
});

const Time = mongoose.model("time", time);
module.exports = {
  Time,
};
