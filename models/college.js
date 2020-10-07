/**
 * @description: 学院表格
 * @param {type}
 * @return {type}
 */

const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const CollegeSchema = new Schema({
  // 学院名字
  college_name: {
    type: String,
    default: "",
  },
},{versionKey: false});

const College = mongoose.model("college", CollegeSchema);

module.exports = {
  College,
};
