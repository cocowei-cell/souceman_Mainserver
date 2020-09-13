module.exports = function getTemplate(code, email) {
  let str = `
  <div style="font-size: 16px;">
      <p>您好：${email}</p>
      <p>您本次的邮箱验证码为:</p>
      <strong>${code}</strong>
      <p>请尽快输入邮箱验证码,不要透露他人</p>
    </div>
  `;
  return str;
};
