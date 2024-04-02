var express = require('express');
var router = express.Router();
const multer = require('multer');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

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
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('Bạn chỉ được upload file ảnh'));
  }
  cb(null, true);
}
//Upload file
let upload = multer({ storage: storage, fileFilter: checkFileUpLoad });
//Imort model
const connectDb = require('../models/db');

// Phân trang
router.get('/products/paginations', async (req, res, next) => {
  try {
    const db = await connectDb();
    const productCollection = db.collection('products');

    // Lấy giá trị page từ Query Parameters
    const page = parseInt(req.query.page, 10) || 1;

    // Lấy số lượng dữ liệu mỗi trang
    const pageSize = 16;

    // Lấy tổng số lượng dữ liệu
    const totalData = await productCollection.countDocuments();

    // Tính số lượng trang
    const totalPages = Math.ceil(totalData / pageSize);

    // Lấy dữ liệu theo trang
    const data = await productCollection
      .find({})
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .toArray();

    // Gửi dữ liệu và thông tin phân trang trở lại cho client
    // Cấu trúc đúng (nếu giả sử cách bạn gán data là đúng)
    res.json({
      data: data, // Đối tượng dữ liệu chính
      pagination: {
        page,
        pageSize,
        totalData,
        totalPages,
      },
    });
  } catch (error) {
    // Xử lý lỗi và gửi thông báo lỗi trở lại cho client
    res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
});
//Lấy danh sách sản phẩm và sắp xếp theo tăng dần về giá và giới hạn số lượngư
router.get('/products/increaseProducts', async (req, res, next) => {
  const db = await connectDb();
  const productCollection = db.collection('products');

  try {
    const products = await productCollection
      .find() // Lấy tất cả sản phẩm
      .sort({ price: 1 })
      .limit(5) // Sắp xếp theo price tăng dần
      .toArray();

    if (products) {
      res.status(200).json(products);
    } else {
      res.status(404).json({ message: 'Không tìm thấy sản phẩm nào' });
    }
  } catch (error) {
    console.error('error', error);
    res.status(500).send('Lỗi hệ thống');
  }
});

// sap xep giam dan
router.get('/products/decreaseProducts', async (req, res, next) => {
  const db = await connectDb();
  const productCollection = db.collection('products');

  try {
    const products = await productCollection
      .find() // Lấy tất cả sản phẩm
      .sort({ price: -1 })
      .limit(5) // Sắp xếp theo price tăng dần
      .toArray();

    if (products) {
      res.status(200).json(products);
    } else {
      res.status(404).json({ message: 'Không tìm thấy sản phẩm nào' });
    }
  } catch (error) {
    console.error('error', error);
    res.status(500).send('Lỗi hệ thống');
  }
});

//Trả về json danh sách sản phẩm
router.get('/products', async (req, res, next) => {
  const db = await connectDb();
  const productCollection = db.collection('products');
  const products = await productCollection.find().toArray();
  if (products) {
    res.status(200).json(products);
  } else {
    res.status(404).json({ message: 'Không tìm thấy' });
  }
});

router.get('/products/hot', async (req, res, next) => {
  const db = await connectDb();

  const productCollection = db.collection('products');

  try {
    const products = await productCollection.find({ hot: true }).toArray();

    if (products) {
      res.status(200).json(products);
    } else {
      res.status(404).json({ message: 'Không tìm thấy sản phẩm nào' });
    }
  } catch (error) {
    console.log('error', error);
    res.status(500).send('Lỗi hệ thống');
  }
});
router.get('/products/trending', async (req, res, next) => {
  const db = await connectDb();

  const productCollection = db.collection('products');

  try {
    const products = await productCollection.find({ trending: true }).toArray();

    if (products) {
      res.status(200).json(products);
    } else {
      res.status(404).json({ message: 'Không tìm thấy sản phẩm nào' });
    }
  } catch (error) {
    console.log('error', error);
    res.status(500).send('Lỗi hệ thống');
  }
});
router.get('/products/topRate', async (req, res, next) => {
  const db = await connectDb();

  const productCollection = db.collection('products');

  try {
    const products = await productCollection.find({ topRate: true }).toArray();

    if (products) {
      res.status(200).json(products);
    } else {
      res.status(404).json({ message: 'Không tìm thấy sản phẩm nào' });
    }
  } catch (error) {
    console.log('error', error);
    res.status(500).send('Lỗi hệ thống');
  }
});

//Trả về json sản phẩm theo id
router.get('/products/:id', async (req, res, next) => {
  const db = await connectDb();
  const productCollection = db.collection('products');
  let id = req.params.id;
  const products = await productCollection.findOne({ id: parseInt(id) });
  if (products) {
    res.status(200).json(products);
  } else {
    res.status(404).json({ message: 'Không tìm thấy' });
  }
});

//Post thêm sản phẩm
router.post('/products', upload.single('img'), async (req, res, next) => {
  let { name, price, categoryId, description } = req.body;
  let img = req.file.originalname;
  const db = await connectDb();
  const productCollection = db.collection('products');
  let lastProduct = await productCollection
    .find()
    .sort({ id: -1 })
    .limit(1)
    .toArray();
  let id = lastProduct[0] ? lastProduct[0].id + 1 : 1;
  let newProduct = { id, name, price, categoryId, img, description };
  await productCollection.insertOne(newProduct);
  if (newProduct) {
    res.status(200).json(newProduct);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});

//Put sửa sản phẩm từ form
router.put('/products/:id', upload.single('img'), async (req, res, next) => {
  let id = req.params.id;
  const db = await connectDb();
  const productsCollection = db.collection('products');
  let { name, price, categoryId, description } = req.body;
  if (req.file) {
    var img = req.file.originalname;
  } else {
    //láy sản phâm tư id để lấy img cũ
    let product = await productsCollection.findOne({ id: parseInt(id) });
    var img = product.img;
  }
  let editProduct = { name, price, categoryId, img, description };
  product = await productsCollection.updateOne(
    { id: parseInt(id) },
    { $set: editProduct }
  );
  if (product) {
    res.status(200).json(editProduct);
  } else {
    res.status(404).json({ message: 'Sửa không thang kông.' });
  }
});

//Xóa sản phẩm
router.delete('/products/:id', async (req, res, next) => {
  let id = req.params.id;
  const db = await connectDb();
  const productsCollection = db.collection('products');
  let product = await productsCollection.deleteOne({ id: parseInt(id) });
  if (product) {
    res.status(200).json({ message: 'Xoa thanhkong.' });
  } else {
    res.status(404).json({ message: 'Xoa khong thanhkong.' });
  }
});

//---------------------------Categories--------------------------------//

//Trả về json danh sách danh mục
router.get('/categories', async (req, res, next) => {
  const db = await connectDb();
  const productCollection = db.collection('categories');
  const categories = await productCollection.find().toArray();
  if (categories) {
    res.status(200).json(categories);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});

//Trả về json danh mục theo id
router.get('/categories/:id', async (req, res, next) => {
  const db = await connectDb();
  const categoriesCollection = db.collection('categories');
  let id = req.params.id;
  const categories = await categoriesCollection.findOne({ id: parseInt(id) });
  if (categories) {
    res.status(200).json(categories);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});

//Post thêm danh mục
router.post('/categories', upload.single('img'), async (req, res, next) => {
  let { name } = req.body;
  let img = req.file.originalname;
  const db = await connectDb();
  const categoriesCollection = db.collection('categories');
  let lastCategory = await categoriesCollection
    .find()
    .sort({ id: -1 })
    .limit(1)
    .toArray();
  let id = lastCategory[0] ? lastCategory[0].id + 1 : 1;
  let newCategories = { id, name, img };
  await categoriesCollection.insertOne(newCategories);
  if (newCategories) {
    res.status(200).json(newCategories);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});

//Put sửa danh mục từ form
router.put('/categories/:id', upload.single('img'), async (req, res, next) => {
  let id = req.params.id;
  const db = await connectDb();
  const categoriesCollection = db.collection('categories');
  let { name } = req.body;
  if (req.file) {
    var img = req.file.originalname;
  } else {
    //láy danh mục tư id để lấy img cũ
    let categories = await categoriesCollection.findOne({ id: parseInt(id) });
    var img = categories.img;
  }
  let editCategories = { name, img };
  categories = await categoriesCollection.updateOne(
    { id: parseInt(id) },
    { $set: editCategories }
  );
  if (categories) {
    res.status(200).json(editCategories);
  } else {
    res.status(404).json({ message: 'Sửa không thành kông.' });
  }
});

//Xóa sản phẩm
router.delete('/categories/:id', async (req, res, next) => {
  let id = req.params.id;
  const db = await connectDb();
  const categoriesCollection = db.collection('categories');
  let category = await categoriesCollection.deleteOne({ id: parseInt(id) });
  if (category) {
    res.status(200).json({ message: 'Xoa thanhkong.' });
  } else {
    res.status(404).json({ message: 'Xoa khong thanhkong.' });
  }
});

//---------------------------Users--------------------------------//

//Trả về json danh sách danh mục
router.get('/users', async (req, res, next) => {
  const db = await connectDb();
  const userCollection = db.collection('users');
  const users = await userCollection.find().toArray();
  if (users) {
    res.status(200).json(users);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});

//Trả về json danh mục theo id
router.get('/users/:id', async (req, res, next) => {
  const db = await connectDb();
  const usersCollection = db.collection('users');
  let id = req.params.id;
  const users = await usersCollection.findOne({ id: parseInt(id) });
  if (users) {
    res.status(200).json(users);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});

//Post thêm danh mục
router.post('/users', upload.single('img'), async (req, res, next) => {
  let { username, password, repassword, email, role } = req.body;
  let img = req.file.originalname;
  const db = await connectDb();
  const usersCollection = db.collection('users');
  let lastUser = await usersCollection
    .find()
    .sort({ id: -1 })
    .limit(1)
    .toArray();
  let id = lastUser[0] ? lastUser[0].id + 1 : 1;
  let newUser = {
    id,
    username,
    password,
    email,
    img,
    isAdmin: role === 'admin',
  };
  await usersCollection.insertOne(newUser);
  if (newUser) {
    res.status(200).json(newUser);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});

//Put sửa danh mục từ form
router.put('/users/:id', upload.single('img'), async (req, res, next) => {
  let id = req.params.id;
  const db = await connectDb();
  const usersCollection = db.collection('users');
  let { username, password, email } = req.body;
  if (req.file) {
    var img = req.file.originalname;
  } else {
    //láy danh mục tư id để lấy img cũ
    let users = await usersCollection.findOne({ id: parseInt(id) });
    var img = users.img;
  }
  let editUsers = { username, password, email, img };
  users = await usersCollection.updateOne(
    { id: parseInt(id) },
    { $set: editUsers }
  );
  if (users) {
    res.status(200).json(editUsers);
  } else {
    res.status(404).json({ message: 'Sửa không thành kông.' });
  }
});

//Xóa người dùng
router.delete('/users/:id', async (req, res, next) => {
  let id = req.params.id;
  const db = await connectDb();
  const usersCollection = db.collection('users');
  let user = await usersCollection.deleteOne({ id: parseInt(id) });
  if (user) {
    res.status(200).json({ message: 'Xoa thanhkong.' });
  } else {
    res.status(404).json({ message: 'Xoa khong thanhkong.' });
  }
});

// lay san pham theo ma danh muc
router.get('/products/category_id/:id', async (req, res, next) => {
  let category_id = parseInt(req.params.id);
  const db = await connectDb();
  const productCollection = db.collection('products');
  const products = await productCollection
    .find({ category_id: category_id })
    .toArray();
  if (products) {
    res.status(200).json(products);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});

// show san pham theo danh muc
router.get('/products/categoryName/:danhmuc', async (req, res, next) => {
  const id = req.params.danhmuc;
  const db = await connectDb();
  console.log(typeof name);
  const productCollection = db.collection('products');
  const categoryCollection = db.collection('categories');

  try {
    let category = await categoryCollection.findOne({ id: +id });
    let catid = category.id;
    // console.log(cat.id);
    const products = await productCollection
      .find({ category_id: catid })
      .toArray();

    if (products.length > 0) {
      res.status(200).json(products);
    } else {
      console.log(name);
      console.log(category);
      // console.log(catid);
      res.status(404).json({ message: 'Không tìm thấy sản phẩm nào' });
    }
  } catch (error) {
    console.log('error', error);
    res.status(500).send('Lỗi hệ thống');
  }
});
// tim kiem san pham
// ...other routes...

router.get('/products/search/:searchQuery', async (req, res, next) => {
  const { searchQuery } = req.params;
  const db = await connectDb();
  const productCollection = db.collection('products');
  const categoryCollection = db.collection('categories');

  try {
    // Tìm kiếm theo tên sản phẩm (không phân biệt trường hợp)
    const nameRegex = new RegExp(searchQuery, 'i');

    // Tìm kiếm theo tên danh mục (không phân biệt trường hợp)
    const category = await categoryCollection.findOne({ name: nameRegex });

    let products;
    if (category) {
      // Tìm kiếm theo danh mục ID nếu tìm thấy danh mục phù hợp
      products = await productCollection
        .find({ category_id: category.id })
        .toArray();
    } else {
      // Tìm kiếm trực tiếp theo tên sản phẩm
      products = await productCollection.find({ name: nameRegex }).toArray();
    }

    res.status(200).json(products);
  } catch (error) {
    console.error('Error in search:', error);
    res.status(500).send('Server error');
  }
});
router.get('/products/price/:option', async (req, res, next) => {
  const { option } = req.params;
  const db = await connectDb();
  const productCollection = db.collection('products');

  let priceQuery = {};

  switch (option) {
    case 'option1':
      priceQuery = { price_sale: { $lt: 250000 } };
      break;
    case 'option2':
      priceQuery = { price_sale: { $gte: 250000, $lte: 400000 } };
      break;
    case 'option3':
      priceQuery = { price_sale: { $gt: 400000 } };
      break;
    default:
      return res.status(400).send('Tùy chọn phạm vi giá không hợp lệ');
  }

  try {
    const products = await productCollection.find(priceQuery).toArray();
    res.status(200).json(products);
  } catch (error) {
    console.error('Lỗi tìm nạp sản phẩm:', error);
    res.status(500).send('Server error');
  }
});
// register
router.post('/users/register', upload.single('img'), async (req, res, next) => {
  let { email, password, password2, username } = req.body;
  let img = req.file ? req.file.originalname : null;

  // Check if passwords match
  if (password !== password2) {
    return res.status(400).send('Mật khẩu không phù hợp');
  }

  const db = await connectDb();
  const userCollection = db.collection('users');

  // Check if user already exists
  const existingUser = await userCollection.findOne({ email });
  if (existingUser) {
    return res.status(400).send('Người dùng đã tồn tại');
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Get the user with the highest id by sorting in descending order (-1) and taking 1 element
  let lastUser = await userCollection
    .find()
    .sort({ id: -1 })
    .limit(1)
    .toArray();

  let id = lastUser[0] ? lastUser[0].id + 1 : 1;

  await userCollection.insertOne({
    id,
    email,
    password: hashedPassword,
    username,
    img,
  });

  res.redirect('/users/login');
});
// login
router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
  const db = await connectDb();
  const userCollection = db.collection('users');
  const user = await userCollection.findOne({ username });
  if (user.isLocked) {
    return res
      .status(403)
      .send('Your account is locked. Please contact an administrator.');
  }
  if (!user) {
    return res.status(401).send('Invalid username or password');
  }

  // Compare the provided password with the stored hashed password
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(401).send('Username hoặc mật khẩu không hợp lệ');
  }

  // res.redirect('http://127.0.0.1:57773/Front_end/index.html');
});

// Nhập chức năng SendMail
const { sendMail } = require('../utils/mailers');

// Bên trong tuyến đường quên của bạn
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const db = await connectDb();
    const userCollection = db.collection('users');
    const user = await userCollection.findOne({ email });
    if (!user) {
      return res.send(
        'Nếu một tài khoản có email đó tồn tại, một liên kết đặt lại đã được gửi.'
      );
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetTokenExpiration = Date.now() + 3600000;

    await userCollection.updateOne(
      { _id: user._id },
      { $set: { resetToken, resetTokenExpiration } }
    );

    const resetLink = `https://mail.google.com/mail/u/2/#inbox`;

    const htmlContent = `
    <p>  ${new Date().toLocaleString()} </p>
      <p>Bạn đã yêu cầu đặt lại mật khẩu.</p>
      <p>Nhấp vào liên kết này để đặt lại mật khẩu của bạn:</p>
      <a href="http://localhost:3000/users/reset-password/${resetToken}">Đặt lại mật khẩu</a>
      `;
    const htmlContent1 = `
      <p>Bạn đã yêu cầu đặt lại mật khẩu.</p>
      <p> Vui lòng kiểm tra email của bạn để đặt lại mật khẩu của bạn.</p>
      <a href="${resetLink}">Kiểm tra email</a>
    `;
    // Sử dụng chức năng SendMail
    await sendMail(user.email, 'Password Reset', htmlContent);
    res.send(
      `<html><body>
      ${htmlContent1}
      </body></html>`
    );
  } catch (err) {
    if (err.code === 'ECONNREFUSED') {
      return res.status(503).send('Database connection error.');
    } else {
      return res.status(500).send('Server error');
    }
  }
});

router.get('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  try {
    const db = await connectDb();
    const userCollection = db.collection('users');
    const user = await userCollection.findOne({
      resetTokenExpiration: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).send('Token không hợp lệ hoặc đã hết hạn.');
    }

    res.render('reset-password', { token }); // Render your form
  } catch (err) {
    return res.status(500).send('Server error');
  }
});
router.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  const db = await connectDb();
  const userCollection = db.collection('users');
  const user = await userCollection.findOne({
    resetToken: token,
    resetTokenExpiration: { $gt: Date.now() },
  });

  if (!user) {
    return res.send('Token không hợp lệ hoặc đã hết hạn.');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await userCollection.updateOne(
    { _id: user._id },
    {
      $set: {
        password: hashedPassword,
        resetToken: undefined,
        resetTokenExpiration: undefined,
      },
    }
  );
  res.redirect('/users/login');
});

module.exports = router;
