/**
 * @description: 表单项目
 * @param {type}
 * @return {type}
 */

const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const itemSchema = new Schema(
  {
    //项目编号
    item_number: {
      type: String,
      default: "",
    },
    //项目描述
    description: {
      type: String,
      default: "",
    },
  },
  { versionKey: false }
);
//创建数据库表格
const TableItem = mongoose.model("table_items", itemSchema);

// 导出项目
module.exports = {
  TableItem,
};
