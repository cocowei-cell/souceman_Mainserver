/*
 * @Author: zzz
 * @Date: 2020-09-08 02:55:49
 * @LastEditTime: 2020-10-05 17:16:47
 * @LastEditors: Please set LastEditors
 * @Description: 用户表
 * @FilePath: \mainServe\models\User.js
 */
const { Schema } = require("mongoose");
const mongoose = require("mongoose");
const Joi = require("joi");
const IDs = mongoose.Schema.Types.ObjectId;
//创建集合规则
const userSchema = new Schema(
  {
    //学号
    stu_number: {
      type: String,
      default: "",
      required: true,
      unique: true,
    },
    //姓名
    stu_name: {
      type: String,
      default: "",
      required: true,
    },
    // 学院
    college: {
      type: IDs,
      ref: "college",
    },
    // 专业
    profession: {
      type: IDs,
      ref: "profession",
    },
    grade: {
      type: String,
      default: "",
    },
    stu_class: {
      type: String,
      default: "",
      required: true,
    },
    //QQ邮箱
    stu_email: {
      type: String,
      default: "",
      required: true,
    },
    code: {
      type: String,
      default: "",
    },
    //密码
    stu_pass: {
      type: String,
      default: "",
      required: true,
    },
    //角色
    role: {
      type: String,
      default: "normal",
      enum: ["normal", "admin", "super"],
    },
  },
  { versionKey: false }
);

const User = mongoose.model("user", userSchema); //创建用户表

/**
 * @description: 注册验证函数
 * @param {Object}
 * @return {Object}
 */

/* 
      说明：在17.x版本发布后，使用Joi.object(rule)来创建规则校验，返回schema对象 再使用
            schema.validate(data,rule,[options]) 进行同步验证 返回{error,value}
 */
const ValidateUserReg = (data) => {
  const rule = {
    stu_number: Joi.string()
      .max(9)
      .min(9)
      .required()
      .error(new Error("学号不符合规则")),
    stu_email: Joi.string()
      .pattern(/[1-9]\d{7,10}@qq\.com/)
      .required()
      .error(new Error("QQ邮箱不符合")),
    stu_pass: Joi.string()
      .pattern(/^[0-9A-Za-z]{6,12}$/)
      .required()
      .error(new Error("密码不符合")),
  };
  const schema = Joi.object(rule);
  return schema.validate(data, rule, {
    abortEarly: false,
    allowUnknown: true,
  });
};

/**
 * @description: 登录校验
 * @param {Object}
 * @return {Object}
 */

const ValidateLogin = (data) => {
  const rule = {
    stu_number: Joi.string()
      .pattern(/^\d{9}$/)
      .required()
      .error(new Error("学号不符合规则")),
    stu_pass: Joi.string()
      .pattern(/^[0-9A-Za-z]{6,12}$/)
      .required()
      .error(new Error("密码不符合规则")),
  };
  const schema = Joi.object(rule);
  return schema.validate(data, rule, {
    abortEarly: false,
    allowUnknown: true,
  });
};

/**
 * @description: 修改密码
 * @param {Object}
 * @return {Object}
 */

const ValidateModifyPass = (data) => {
  const rule = {
    stu_pass: Joi.string()
      .pattern(/^[0-9A-Za-z]{6,12}$/)
      .required()
      .error(new Error("密码不符合")),
  };
  const schema = Joi.object(rule);
  return schema.validate(data, rule, {
    abortEarly: false,
    allowUnknown: true,
  });
};

module.exports = {
  User,
  ValidateUserReg,
  ValidateLogin,
  ValidateModifyPass,
};
