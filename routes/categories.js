var express = require('express');
var router = express.Router();
const connectDb = require('../models/db');

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

// const categories = [
//   { id: 1, name: 'category 1', img: '1.jpg' },
//   { id: 2, name: 'category 2', img: '1.jpg' },
//   { id: 3, name: 'category 3', img: '1.jpg' },
// ];

/* GET categories page. */
router.get('/', async (req, res, next) => {
  const db = await connectDb();
  const categoryCollection = db.collection('categories');
  const categories = await categoryCollection.find().toArray();
  console.log(categories);
  res.render('category', { categories });
});

/* GET để hiển thị trang thêm danh mục. */
router.get('/add', function (req, res, next) {
  res.render('addCat');
});

/*POST để thêm danh mục từ form*/
router.post('/add', upload.single('img'), async (req, res, next) => {
  let { name } = req.body;
  let img = req.file.originalname;
  const db = await connectDb();
  const categoryCollection = db.collection('categories');
  //Lay san pham co id cao nhat bang cach sap xep giam dan (-1) va lay 1 phan tu
  let lastCategories = await categoryCollection
    .find()
    .sort({ id: -1 })
    .limit(1)
    .toArray();
  //Kiem tra xem co lastProduct hay khong, neu co thi id+1, khong co san pham nao thi id=1
  let id = lastCategories[0] ? lastCategories[0].id + 1 : 1;
  let newCategories = { id, name, img };
  await categoryCollection.insertOne(newCategories);
  res.redirect('/categories');
});

//Get trang sửa sản phẩm
router.get('/edit/:id', async (req, res, next) => {
  const db = await connectDb();
  const categoryCollection = db.collection('categories');
  const id = req.params.id;
  const categories = await categoryCollection.findOne({ id: parseInt(id) });
  res.render('editCat', { categories });
});

//Post sửa sản phẩm từ form
router.post('/edit', upload.single('img'), async (req, res, next) => {
  const db = await connectDb();
  const categoryCollection = db.collection('categories');
  let { id, name, category_id } = req.body;
  let img = req.file ? req.file.originalname : req.body.imgOld;
  let editCat = { name, category_id, img };
  await categoryCollection.updateOne({ id: parseInt(id) }, { $set: editCat });
  res.redirect('/categories');
});

/* GET categories Delete page. */
router.get('/delete/:id', async (req, res) => {
  let id = req.params.id;
  const db = await connectDb();
  const categoryCollection = db.collection('categories');
  await categoryCollection.deleteOne({ id: parseInt(id) });
  res.redirect('/categories');
});

/* GET category details page. */

// router.get('/:id', (req, res, next) => {
//   let id = req.params.id;
//   let category = categories.find((c) => c.id == id);
//   if (category) {
//     res.send(`
//         <h1>Category Details</h1>
//         <h2>Name: ${category.name}</h2>
//         <img src="../images/${category.img}" alt="${category.name}" width="200">
//         `);
//   } else {
//     res.send('Category not found');
//   }
// });

module.exports = router;
