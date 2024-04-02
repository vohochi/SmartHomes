const nodemailer = require('nodemailer');
const mailConfig = require('../models/mail.config');
require('dotenv').config();
exports.sendMail = async (to, subject, htmlContent) => {
  const transporter = nodemailer.createTransport({
    host: mailConfig.HOST,
    port: mailConfig.PORT,
    secure: false,
    auth: {
      user: mailConfig.USERNAME,
      pass: mailConfig.PASSWORD,
    },
  });
  console.log(transporter);

  const mailOptions = {
    from: mailConfig.FROM_DRESS,
    to: to,
    subject: subject,
    html: htmlContent,
  };
  console.log(mailOptions);
  try {
    return await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Lỗi gửi mail:', error);
  }
};
