const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const multer = require('multer');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const connectDb = require('../models/db');

// Thiết lập nơi lưu trữ và tên file
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// Kiểm tra file upload
function checkFileUpload(req, file, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
    return cb(new Error('Bạn chỉ được upload file ảnh'));
  }
  cb(null, true);
}

// Upload file
let upload = multer({ storage: storage, fileFilter: checkFileUpload });

router.get('/', async (req, res, next) => {
  const db = await connectDb();
  const userCollection = db.collection('users');
  const users = await userCollection.find().toArray();
  res.render('user', { users });
});

router.get('/register', function (req, res, next) {
  res.render('register');
});

router.post('/register', upload.single('img'), async (req, res, next) => {
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
router.get('/login', function (req, res, next) {
  res.render('login');
});

router.post('/login', async (req, res, next) => {
  const { id, email, password } = req.body;
  const db = await connectDb();
  const userCollection = db.collection('users');
  const user = await userCollection.findOne({ email });
  if (user.isLocked) {
    return res
      .status(403)
      .send('Your account is locked. Please contact an administrator.');
  }
  if (!user) {
    return res.status(401).send('Invalid email or password');
  }

  // Compare the provided password with the stored hashed password
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(401).send('Email hoặc mật khẩu không hợp lệ');
  }

  res.redirect('http://127.0.0.1:57773/Front_end/index.html');
});

// Quên  mật khẩu
router.get('/forgot-password', (req, res) => {
  res.render('forgotPassword');
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
  console.log(password);
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

// Xóa người dùng
router.get('/delete/:id', async (req, res) => {
  let id = req.params.id;
  const db = await connectDb();
  const userCollection = db.collection('users');
  await userCollection.deleteOne({ id: parseInt(id) });
  res.redirect('/users');
});

router.get('/edit/:id', async (req, res, next) => {
  const db = await connectDb();
  const userCollection = db.collection('users');
  const id = req.params.id;
  const user = await userCollection.findOne({ id: parseInt(id) });
  res.render('editUser', { user });
});

//Post sửa sản phẩm từ form
router.post('/edit', upload.single('img'), async (req, res, next) => {
  const db = await connectDb();
  const userCollection = db.collection('users');
  let { id, name, email } = req.body;
  let img = req.file ? req.file.originalname : req.body.imgOld;
  let editProduct = { name, img, email };
  await userCollection.updateOne({ id: parseInt(id) }, { $set: editProduct });
  res.redirect('/users');
});
/* GET users add page. */
router.get('/add', function (req, res, next) {
  res.render('addUser');
});

//Post để thêm sản phẩm từ form
router.post('/add', upload.single('img'), async (req, res, next) => {
  let { name, email, password, username } = req.body;
  let img = req.file ? req.file.originalname : null;
  const db = await connectDb();
  const userCollection = db.collection('users');
  //Lay san pham co id cao nhat bang cach sap xep giam dan (-1) va lay 1 phan tu
  let lastusers = await userCollection
    .find()
    .sort({ id: -1 })
    .limit(1)
    .toArray();

  let id = lastusers[0] ? lastusers[0].id + 1 : 1;
  let newProduct = { id, name, email, password, img, username };
  await userCollection.insertOne(newProduct);
  res.redirect('/users');
});
// Khóa người dùng
router.get('/lock/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const db = await connectDb();
  const userCollection = db.collection('users');

  await userCollection.updateOne({ id }, { $set: { isLocked: true } });
  res.redirect('/users');
});
router.get('/unlock/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const db = await connectDb();
  const userCollection = db.collection('users');

  await userCollection.updateOne({ id }, { $set: { isLocked: false } });
  res.redirect('/users');
});

//Tìm kiếm người dùng
router.get('/users/search', async (req, res) => {
  const { query, role } = req.query;

  // Tạo bộ lọc tìm kiếm
  const filters = {};
  if (query) {
    filters.$text = { $search: query };
  }
  if (role) {
    filters.role = role;
  }

  // Tìm kiếm users
  const db = await connectDb();
  const userCollection = db.collection('users');
  const users = await userCollection.find(filters).toArray();

  // Render file EJS với dữ liệu users
  res.render('search', { users });
});

module.exports = router;
