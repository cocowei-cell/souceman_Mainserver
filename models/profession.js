/**
 * @description: 专业表
 * @param {type}
 * @return {type}
 */

const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const ProfessionSchema = new Schema({
  // 学院名字
  profess_name: {
    type: "string",
    default: "",
  },
  // 所属学院 指向学院
  along_college: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "college",
  },
},{versionKey: false});

const Profession = mongoose.model("profession", ProfessionSchema);

module.exports = {
  Profession,
};
