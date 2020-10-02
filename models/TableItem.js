/*
 * @Descripttion: 审核表的表单项
 * @Author: zzz
 * @Date: 2020-09-08 02:56:02
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-09-29 13:53:06
 */
const { Schema } = require("mongoose");
const mongoose = require("mongoose");
//外键ID值
const IDs = mongoose.Schema.Types.ObjectId;

//创建规则
const itemSchema = new Schema(
  {
    //表单序号
    item_number: {
      type: String,
      required: true,
    },
    //描述
    description: {
      type: String,
      required: true,
    },
    //个人自评
    self_score: {
      type: Number,
      default: 0,
    },
    //归属用户
    along_user: {
      type: IDs,
      ref: "user",
      required: true,
    },
    //第一审核人
    first: {
      //分数
      score: { type: Number, default: 0 },
      user: { type: IDs, ref: "user" },
    },
    //第二审核人 最终分数以第二审核人为准
    second: {
      //分数
      score: { type: Number, default: 0 },
      user: { type: IDs, ref: "user" },
    },
    //证明材料
    pictures: {
      type: Array,
      default: [],
    },
    //加分原因
    reason: {
      type: String,
      default: "",
    },
    //该项归属学期
    along_time: {
      type: String,
      default: "",
    },
    //是否已经审核
    is_checked: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

//创建项目表

const Item = mongoose.model("item", itemSchema);

//导出
module.exports = {
  Item,
};
