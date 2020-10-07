/**
 * @description: 年级
 * @param {type}
 * @return {type}
 */

const mongoose = require("mongoose");

const gradeSchema = new mongoose.Schema(
  {
    grade: {
      type: String,
      default: "",
    },
  },
  { versionKey: false }
);

const Grade = mongoose.model("grade", gradeSchema);

module.exports = {
  Grade,
};
