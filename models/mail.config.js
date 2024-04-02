require('dotenv').config();

module.exports = {
  MAILER: process.env.MAILER,
  HOST: process.env.MAILER_HOST,
  PORT: process.env.MAILER_PORT,
  USERNAME: process.env.MAILER_USER,
  PASSWORD: process.env.MAILER_PASS,
  ENCRYPT: process.env.MAILER_ENCRYPT,
  FROM_DRESS: process.env.MAILER_DRESS,
  FROM_NAME: process.env.MAILER_NAME,
};
