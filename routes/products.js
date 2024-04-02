var express = require('express');
var router = express.Router();

// // Import thư viện multer
const multer = require('multer');
//Thiết lập nơi lưu trữ và tên file
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
//Kiểm tra file upload
function checkFileUpLoad(req, file, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
    return cb(new Error('Bạn chỉ được upload file ảnh'));
  }
  cb(null, true);
}
//Upload file
let upload = multer({ storage: storage, fileFilter: checkFileUpLoad });

const connectDb = require('../models/db');
/* Show trang sản phẩm. */
router.get('/', async (req, res, next) => {
  const db = await connectDb();
  const productCollection = db.collection('products');
  const products = await productCollection.find().toArray();
  console.log(products);
  res.render('product', { products });
});

/* GET products add page. */
router.get('/add', function (req, res, next) {
  res.render('addPro');
});

//Post để thêm sản phẩm từ form
router.post('/add', upload.single('img'), async (req, res, next) => {
  let { name, price, category_id, description } = req.body;
  let img = req.file ? req.file.originalname : null;
  const db = await connectDb();
  const productCollection = db.collection('products');
  //Lay san pham co id cao nhat bang cach sap xep giam dan (-1) va lay 1 phan tu
  let lastProducts = await productCollection
    .find()
    .sort({ id: -1 })
    .limit(1)
    .toArray();

  let id = lastProducts[0] ? lastProducts[0].id + 1 : 1;
  let newProduct = { id, name, price, category_id, img, description };
  console.log(newProduct);
  await productCollection.insertOne(newProduct);
  res.redirect('/products');
});

router.get('/delete/:id', async (req, res) => {
  let id = req.params.id;
  const db = await connectDb();
  const productsCollection = db.collection('products');
  await productsCollection.deleteOne({ id: parseInt(id) });
  res.redirect('/products');
});

router.get('/edit/:id', async (req, res, next) => {
  const db = await connectDb();
  const productsCollection = db.collection('products');
  const id = req.params.id;
  const product = await productsCollection.findOne({ id: parseInt(id) });
  res.render('editPro', { product });
});

//Post sửa sản phẩm từ form
router.post('/edit', upload.single('img'), async (req, res, next) => {
  const db = await connectDb();
  const productsCollection = db.collection('products');
  let { id, name, price, category_id, description } = req.body;
  let img = req.file ? req.file.originalname : req.body.imgOld;
  let editProduct = { name, price, category_id, img, description };
  await productsCollection.updateOne(
    { id: parseInt(id) },
    { $set: editProduct }
  );
  res.redirect('/products');
});

module.exports = router;
