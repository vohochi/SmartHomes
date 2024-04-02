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
    }
    else {
        document.getElementById('emptyCart').style.display = 'none';
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
                          <h6 class="mb-0">${Intl.NumberFormat('en-DE').format(item.price)}</h6>
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
window.addEventListener('click', (event) => {
    var _a, _b;
    const button = event.target;
    if (!button.classList.contains('btn-number'))
        return;
    const inputField = button.parentElement.parentElement.querySelector('input');
    if (!inputField)
        return;
    let inputValue = parseInt(inputField.value, 10);
    if (button.getAttribute('data-type') === 'minus') {
        if (inputValue === 1) {
            const userConfirmed = window.confirm('Sản phẩm của bạn không thể nhỏ hơn 1? Bạn có muốn xóa sản phẩm này khỏi giỏ hàng 🛒 của bạn?');
            if (!userConfirmed)
                return;
            const productId = +button.getAttribute('data-id');
            const cartData = JSON.parse(localStorage.getItem('cart') || '[]');
            const productIndex = cartData.findIndex((product) => product.id === productId);
            if (productIndex !== -1) {
                cartData.splice(productIndex, 1);
                localStorage.setItem('cart', JSON.stringify(cartData));
                (_b = (_a = button.parentElement.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement.parentElement) === null || _b === void 0 ? void 0 : _b.remove();
                const productData = localStorage.getItem('cart');
                const cart = productData ? JSON.parse(productData) : [];
                if (cart.length === 0) {
                    document.getElementById('emptyCart').style.display = 'block';
                }
                else {
                    document.getElementById('emptyCart').style.display = 'none';
                }
            }
            return;
        }
        inputValue = Math.max(inputValue - 1, 1);
    }
    else {
        inputValue += 1;
    }
    inputField.value = inputValue.toString();
    const productId = +button.getAttribute('data-id');
    const cartData = JSON.parse(localStorage.getItem('cart') || '[]');
    const productIndex = cartData.findIndex((product) => product.id == productId);
    cartData[productIndex].quantity = inputValue;
    localStorage.setItem('cart', JSON.stringify(cartData));
});
window.addEventListener('click', (event) => {
    var _a;
    const button = event.target;
    if (!button.classList.contains('btn-warning'))
        return;
    const userConfirmed = window.confirm('Bạn có chắc là bạn muốn xóa sản phẩm khỏi giỏ hàng không?');
    if (!userConfirmed)
        return;
    const productId = +button.getAttribute('data-id');
    const cartData = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCartData = cartData.filter((product) => product.id !== productId);
    localStorage.setItem('cart', JSON.stringify(updatedCartData));
    (_a = button.closest('.row')) === null || _a === void 0 ? void 0 : _a.remove();
    const productData = localStorage.getItem('cart');
    const cart = productData ? JSON.parse(productData) : [];
    if (cart.length === 0) {
        document.getElementById('emptyCart').style.display = 'block';
    }
    else {
        document.getElementById('emptyCart').style.display = 'none';
    }
});
window.addEventListener('click', (event) => {
    const button = event.target;
    if (!button.classList.contains('btn-danger'))
        return;
    const userConfirmed = window.confirm('Bạn có chắc là bạn muốn loại bỏ tất cả các mặt hàng khỏi giỏ hàng của bạn?\n⚠️⚠️⚠️');
    if (!userConfirmed)
        return;
    const cartProducts = document.querySelectorAll('.carts');
    cartProducts.forEach((product) => {
        product.innerHTML = '';
    });
    localStorage.removeItem('cart');
    const productData = localStorage.getItem('cart');
    const cart = productData ? JSON.parse(productData) : [];
    if (cart.length === 0) {
        document.getElementById('emptyCart').style.display = 'block';
    }
    else {
        document.getElementById('emptyCart').style.display = 'none';
    }
    showCart();
});
let shippingCost = 0;
window.addEventListener('click', (event) => {
    const target = event.target;
    const totalPrice = document.getElementById('totalPrice');
    const selectBtn = document.querySelector('.select.btn');
    const shipping = document.getElementById('shipping');
    if (totalPrice) {
        const cartData = JSON.parse(localStorage.getItem('cart') || '[]');
        const total = cartData.reduce((acc, product) => acc + product.price * product.quantity, 0) + shippingCost;
        totalPrice.innerHTML = `${Intl.NumberFormat('en-DE').format(total)} VNĐ  `;
    }
    if (selectBtn) {
        selectBtn.addEventListener('change', (event) => {
            const selectedOption = event.target;
            shippingCost = selectedOption.value == '2' ? 52000 : 36000;
            shipping.textContent = `${Intl.NumberFormat('en-DE').format(shippingCost)} VNĐ`;
        });
    }
});
const discountCode1 = 'ANHCHIS';
const totalPrice = document.getElementById('totalPrice');
const applyCoupon = document.getElementById('applyCoupon');
window.addEventListener('click', (event) => {
    const button = event.target;
    const input = button.parentElement.querySelector('input');
    const small = button.parentElement.querySelector('small');
    if (!button.getAttribute('id').includes('applyCoupon'))
        return;
    if (input.value.trim() !== discountCode1 && input.value.trim() !== '') {
        small.textContent = 'Mã giảm giá không hợp lệ';
        small.style.color = 'red';
    }
    else if (input.value.trim() === '') {
        small.textContent = 'Vui lòng nhập mã giảm giá';
        small.style.color = 'darkblue';
    }
    else if (input.value.trim() == discountCode1) {
        small.textContent = 'Mã giảm giá hợp lệ';
        small.style.color = 'green';
        const cartData = JSON.parse(localStorage.getItem('cart') || '[]');
        const total = cartData.reduce((acc, product) => acc + product.price * product.quantity, 0) + shippingCost;
        const discountedTotal = total * 0.8;
        totalPrice.innerHTML = `
    <del style="color: rgb(89, 92, 89,0.1)">${Intl.NumberFormat('en-DE').format(total)} VNĐ</del>
    <br>
    <span style="color: red;">-20%</span>
    <br>
    ${Intl.NumberFormat('en-DE').format(discountedTotal)} VNĐ 
  `;
    }
});
if (totalPrice) {
    const cartData = JSON.parse(localStorage.getItem('cart') || '[]');
    const total = cartData.reduce((acc, product) => acc + product.price * product.quantity, 0) + shippingCost;
    totalPrice.innerHTML = ` ${Intl.NumberFormat('en-DE').format(total)} VNĐ  `;
}
const checkoutBtn = document.getElementById('checkout');
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        var _a;
        const productData = localStorage.getItem('cart');
        if (!productData || productData === '[]') {
            alert('Giỏ hàng của bạn đang trống');
            return;
        }
        const shipping = document.getElementById('shipping');
        if (shipping.textContent === '') {
            alert(' Vui lòng chọn phương thức vận chuyển');
        }
        else {
            const cartData = JSON.parse(productData);
            localStorage.setItem('checkout', JSON.stringify(cartData));
            const total = (_a = document.getElementById('totalPrice')) === null || _a === void 0 ? void 0 : _a.textContent;
            localStorage.setItem('total', total);
            localStorage.removeItem('cart');
            window.location.href = 'http://127.0.0.1:57773/Front_end/checkout.html';
        }
    });
}
