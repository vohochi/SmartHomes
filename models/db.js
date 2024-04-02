//nhúng thư viện Mongo đã tạo
const { MongoClient } = require('mongodb');

//khai báo url kết nối
const url = 'mongodb://127.0.0.1:27017';
//khai báo tên database
const dbName = 'bookshop';

//hàm kết nối
async function connectDb() {
  const client = new MongoClient(url);
  await client.connect();
  console.log('Kết nối thành công đến server');
  return client.db(dbName);
}
module.exports = connectDb;
