/**
 * @description: 设置审核人权限是否开启
 * @param {type}
 * @return {type}
 */
const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const SchemaOPener = new Schema(
  {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);
const Open = mongoose.model("isopen", SchemaOPener);
module.exports = {
  Open,
};
