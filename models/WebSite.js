/*
 * @Descripttion: 
 * @Author: zzz
 * @Date: 2020-09-08 02:56:13
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-09-16 23:11:34
 */
const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const web = new Schema({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const Web = mongoose.model("web", web);



module.exports = {Web};
