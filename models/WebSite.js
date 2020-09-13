/*
 * @Descripttion: 
 * @Author: zzz
 * @Date: 2020-09-08 02:56:13
 * @LastEditors: zzz
 * @LastEditTime: 2020-09-08 15:53:22
 */
const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const web = new Schema({
  isOpen: {
    type: Boolean,
    default: true,
  },
});

const Web = mongoose.model("web", web);

module.exports = Web;
