/*
 * @Descripttion:
 * @Author: zzz
 * @Date: 2020-09-08 03:55:43
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-09-10 21:39:28
 */
module.exports = async (app) => {
  
  //用户相关
  app.use('/api/user',require('./user'))

  app.use('/api/others',require('./others'));
  
  

};
