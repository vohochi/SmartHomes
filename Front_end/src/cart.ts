const showCart = () => {
  const productData = localStorage.getItem('cart');
  const cart = productData ? JSON.parse(productData) : [];
  const count = document.getElementById('count');
  if (count) {
    count.textContent = cart.length.toString();
  }
  showCartHTML(cart);
  if (cart.length === 0) {
    document.getElementById('emptyCart').style.display = 'block';
  } else {
    document.getElementById('emptyCart').style.display = 'none';
    // Hiển thị sản phẩm trong giỏ hàng ở đây
  }
};
const showCartHTML = (data) => {
  const cartHTML = data
    .map((item) => {
      return `
      <div
                        class="row mb-4 d-flex justify-content-between align-items-center carts"
                      >
                        <div class="col-md-2 col-lg-2 col-xl-2">
                          <img
  src="./assets/images/products/${item.image}"
                          class="img-fluid rounded-3"
                            alt="Cotton T-shirt"
                          />
                        </div>
                        <div class="col-md-3 col-lg-3 col-xl-3">
                          <h6 class="text-muted">${item.name}</h6>
                          <h6 class="text-black mb-0">Cotton T-shirt</h6>
                        </div>
                        <div class="col-md-3 col-lg-3.5 col-xl-3 d-flex">
                        
                          <div class="input-group formInput">
            <span class="input-group-btn">
              <button data-id="${item.id}"
                type="button"
                class="btn btn-secondary btn-number"
                data-type="minus"
                data-field="quant[2]"
              >
                <span class="glyphicon glyphicon-minus">-</span>
              </button>
            </span> 
            <input
              type="text"
              name="quant[2]"
              class="form-control input-number text-center"
              value="${item.quantity}"
              min="1"
              max="100"
            />
            <span class="input-group-btn">
              <button data-id="${item.id}"
                type="button"
                class="btn btn-secondary btn-number"
                data-type="plus"
                data-field="quant[2]"
              >
                <span class="glyphicon glyphicon-plus">+</span>
              </button>
            </span>
          </div>
                        </div>
                        <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                          <h6 class="mb-0">${Intl.NumberFormat('en-DE').format(
                            item.price
                          )}</h6>
                        </div>
                        <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                          <a href="#!" class="text-muted"
                            ><i class="fas fa-times"></i
                          ></a>
<button type="button" class="btn btn-warning" data-id="${item.id}">X</button>
                        </div>
                      </div>
`;
    })
    .join('');

  const divProducts = document.getElementById('cartProduct');

  divProducts.insertAdjacentHTML('afterend', cartHTML);
};

showCart();

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}
// tăng giảm số lượng sản phẩm
window.addEventListener('click', (event: Event) => {
  const button = event.target as HTMLElement;
  if (!button.classList.contains('btn-number')) return;

  const inputField = button.parentElement.parentElement.querySelector('input');
  if (!inputField) return;

  let inputValue = parseInt(inputField.value, 10);

  if (button.getAttribute('data-type') === 'minus') {
    if (inputValue === 1) {
      const userConfirmed = window.confirm(
        'Sản phẩm của bạn không thể nhỏ hơn 1? Bạn có muốn xóa sản phẩm này khỏi giỏ hàng 🛒 của bạn?'
      );
      if (!userConfirmed) return;
      const productId = +button.getAttribute('data-id');
      const cartData = JSON.parse(
        localStorage.getItem('cart') || '[]'
      ) as Product[];
      const productIndex = cartData.findIndex(
        (product) => product.id === productId
      );
      if (productIndex !== -1) {
        cartData.splice(productIndex, 1);
        localStorage.setItem('cart', JSON.stringify(cartData));
        button.parentElement.parentElement?.parentElement.parentElement?.remove();
        const productData = localStorage.getItem('cart');
        const cart = productData ? JSON.parse(productData) : [];
        if (cart.length === 0) {
          document.getElementById('emptyCart').style.display = 'block';
        } else {
          document.getElementById('emptyCart').style.display = 'none';
          // Hiển thị sản phẩm trong giỏ hàng ở đây
        }
      }
      return;
    }
    inputValue = Math.max(inputValue - 1, 1);
  } else {
    inputValue += 1;
  }
  inputField.value = inputValue.toString();
  const productId = +button.getAttribute('data-id');
  const cartData = JSON.parse(
    localStorage.getItem('cart') || '[]'
  ) as Product[];
  const productIndex = cartData.findIndex((product) => product.id == productId);
  cartData[productIndex].quantity = inputValue;
  localStorage.setItem('cart', JSON.stringify(cartData));
});
// Xóa sản phẩm
window.addEventListener('click', (event: Event) => {
  const button = event.target as HTMLElement;
  if (!button.classList.contains('btn-warning')) return;

  const userConfirmed = window.confirm(
    'Bạn có chắc là bạn muốn xóa sản phẩm khỏi giỏ hàng không?'
  );
  if (!userConfirmed) return;

  const productId = +button.getAttribute('data-id');
  const cartData = JSON.parse(
    localStorage.getItem('cart') || '[]'
  ) as Product[];

  // Tạo một mảng mới không chứa sản phẩm cần xóa
  const updatedCartData = cartData.filter(
    (product) => product.id !== productId
  );

  // Cập nhật localStorage với dữ liệu giỏ hàng mới
  localStorage.setItem('cart', JSON.stringify(updatedCartData));

  // Xóa sản phẩm khỏi giao diện người dùng
  button.closest('.row')?.remove();
  const productData = localStorage.getItem('cart');
  const cart = productData ? JSON.parse(productData) : [];
  if (cart.length === 0) {
    document.getElementById('emptyCart').style.display = 'block';
  } else {
    document.getElementById('emptyCart').style.display = 'none';
    // Hiển thị sản phẩm trong giỏ hàng ở đây
  }
});

// xóa hết sản phẩm
window.addEventListener('click', (event: Event) => {
  const button = event.target as HTMLElement;
  if (!button.classList.contains('btn-danger')) return;

  const userConfirmed = window.confirm(
    'Bạn có chắc là bạn muốn loại bỏ tất cả các mặt hàng khỏi giỏ hàng của bạn?\n⚠️⚠️⚠️'
  );
  if (!userConfirmed) return;

  // Xóa DOM
  const cartProducts = document.querySelectorAll('.carts'); // Sửa lại đây nếu 'carts' là id
  cartProducts.forEach((product) => {
    (product as HTMLElement).innerHTML = '';
  });

  localStorage.removeItem('cart');

  const productData = localStorage.getItem('cart');
  const cart = productData ? JSON.parse(productData) : [];
  if (cart.length === 0) {
    document.getElementById('emptyCart').style.display = 'block';
  } else {
    document.getElementById('emptyCart').style.display = 'none';
    // Hiển thị sản phẩm trong giỏ hàng ở đây
  }
  showCart();
});

// bản tóm tắt
//Tính tổng giá trị
// event change total price
let shippingCost = 0; // Khởi tạo shippingCost

window.addEventListener('click', (event: Event) => {
  const target = event.target as HTMLElement;
  const totalPrice = document.getElementById('totalPrice');
  const selectBtn = document.querySelector('.select.btn');
  const shipping = document.getElementById('shipping');
  if (totalPrice) {
    const cartData = JSON.parse(
      localStorage.getItem('cart') || '[]'
    ) as Product[];
    const total =
      cartData.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0
      ) + shippingCost; // Thêm shippingCost vào total
    totalPrice.innerHTML = `${Intl.NumberFormat('en-DE').format(total)} VNĐ  `;
  }
  if (selectBtn) {
    selectBtn.addEventListener('change', (event) => {
      const selectedOption = event.target as HTMLSelectElement;
      shippingCost = selectedOption.value == '2' ? 52000 : 36000; // Cập nhật shippingCost
      shipping.textContent = `${Intl.NumberFormat('en-DE').format(
        shippingCost
      )} VNĐ`;

      // Cập nhật totalPrice mỗi khi shippingCost thay đổi
    });
  }
});
// giảm giá sản phẩm khi nhập mã giảm giá
const discountCode1 = 'ANHCHIS';
const totalPrice = document.getElementById('totalPrice');
const applyCoupon = document.getElementById('applyCoupon');
window.addEventListener('click', (event) => {
  const button = event.target as HTMLInputElement;
  const input = button.parentElement.querySelector('input');
  const small = button.parentElement.querySelector('small');
  if (!button.getAttribute('id').includes('applyCoupon')) return;
  if (input.value.trim() !== discountCode1 && input.value.trim() !== '') {
    small.textContent = 'Mã giảm giá không hợp lệ';
    small.style.color = 'red';
  } else if (input.value.trim() === '') {
    small.textContent = 'Vui lòng nhập mã giảm giá';
    small.style.color = 'darkblue';
  } else if (input.value.trim() == discountCode1) {
    // Assuming discountCode1 is already declared
    small.textContent = 'Mã giảm giá hợp lệ';
    small.style.color = 'green';

    // Simplified logic for fetching cart data, total calculations, and price display
    const cartData = JSON.parse(
      localStorage.getItem('cart') || '[]'
    ) as Product[];
    const total =
      cartData.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0
      ) + shippingCost;
    const discountedTotal = total * 0.8;
    localStorage.setItem('discountedTotal', JSON.stringify(discountedTotal));

    totalPrice.innerHTML = `
    <del style="color: rgb(89, 92, 89,0.1)">${Intl.NumberFormat('en-DE').format(
      total
    )} VNĐ</del>
    <br>
    <span style="color: red;">-20%</span>
    <br>
    ${Intl.NumberFormat('en-DE').format(discountedTotal)} VNĐ 
  `;
  }
});
if (totalPrice) {
  const cartData = JSON.parse(
    localStorage.getItem('cart') || '[]'
  ) as Product[];
  const total =
    cartData.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    ) + shippingCost; // Thêm shippingCost vào total
  totalPrice.innerHTML = ` ${Intl.NumberFormat('en-DE').format(total)} VNĐ  `;
  localStorage.setItem('totals', JSON.stringify(total));
}

const checkoutBtn = document.getElementById('checkout');
checkoutBtn.addEventListener('click', () => {
  const productData = localStorage.getItem('cart');
  if (!productData || productData === '[]') {
    alert('Giỏ hàng của bạn đang trống');
    return;
  }
  // Lấy nội dung của phương thức vận chuyển
  const shippingMethodElement = document.getElementById('shipping');
  const shipping = shippingMethodElement
    ? shippingMethodElement.textContent
    : null;
  const userData = JSON.parse(localStorage.getItem('user'));

  // Lấy giá đã giảm từ localStorage
  const discountedTotal = localStorage.getItem('discountedTotal');
  const totals = localStorage.getItem('totals');

  // Lưu thông tin checkout và tổng tiền vào localStorage
  const cartData = JSON.parse(productData);
  localStorage.setItem('checkout', JSON.stringify(cartData));

  if (discountedTotal == null) {
    localStorage.setItem('total', totals); // Lưu totals nếu không có discountedTotal
  } else {
    localStorage.setItem('total', discountedTotal); // Ngược lại, lưu discountedTotal
  }
  // Kiểm tra xem người dùng đã đăng nhập và đã chọn phương thức vận chuyển chưa
  if (!userData) {
    alert('Vui lòng đăng nhập trước khi thanh toán.');
  } else if (!shipping) {
    alert('Vui lòng chọn phương thức vận chuyển.');
  } else {
    // Nếu đã đăng nhập và đã chọn phương thức vận chuyển, tiến hành xóa giỏ hàng và chuyển trang
    localStorage.removeItem('cart');
    window.location.href = 'checkout.html';
  }
});
// info

// profile
document.addEventListener('DOMContentLoaded', function () {
  const userActionButton = document.getElementById('user-action-btn');
  const userData = JSON.parse(localStorage.getItem('user'));
  const logoutButton = document.getElementById('logout-btn');

  if (userData && userData.img) {
    // Nếu người dùng đã đăng nhập, thay đổi nội dung của nút để hiển thị ảnh
    userActionButton.innerHTML = `    <img src="./images/${userData.img}" id="userProfile" alt="User Image"> `;
    logoutButton.innerHTML = `<img src="assets/images/shutdown.png" alt="">`;
  } else {
    // Nếu người dùng chưa đăng nhập, để nguyên nút đăng nhập
    userActionButton.innerHTML = `
            <a href="login.html">
                <ion-icon name="person-outline"></ion-icon>
            </a>
        `;
  }
  const token = localStorage.getItem('token');
  if (token) {
    fetch('http://localhost:3000/api/token/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: token }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Token is valid.') {
          console.log('Mã thông báo vẫn còn hiệu lực');
          // Token is still valid, perform your actions here.
        } else {
          console.log('Mã thông báo không hợp lệ hoặc hết hạn');
          // Token is not valid or expired, redirect to login page.
          localStorage.removeItem('token');
          alert('Vui lòng đăng nhập lại Tài khoản của bạn');
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        window.location.href = 'login.html';
      });
  }
});
document.addEventListener('DOMContentLoaded', function () {
  const logoutButton = document.getElementById('logout-btn');

  logoutButton.addEventListener('click', function () {
    // Xóa token và thông tin người dùng khỏi localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Chuyển hướng người dùng về trang đăng nhập hoặc trang chủ
    window.location.href = 'login.html';
  });
});
