var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { url, fetchAPI } from '../src/app.js';
const id = window.location.href.split('id=')[1];
const divProducts = document.getElementById('detailProduct');
fetch(`http://localhost:3000/api/products/${id}`)
    .then((response) => response.json())
    .then((data) => {
    divProducts.innerHTML = `<div class="showcase-wrapper has-scrollbar">
  <div class="showcase-container">
    <div class="showcase">
      <div class="showcase-banner">
        <img
          src="./assets/images/products/${data.image}"
          alt="shampoo, conditioner & facewash packs"
          class="showcase-img"
        />

        
      </div>

      <div class="showcase-content">
        <div class="showcase-rating">
          <ion-icon name="star"></ion-icon>
          <ion-icon name="star"></ion-icon>
          <ion-icon name="star"></ion-icon>
          <ion-icon name="star-outline"></ion-icon>
          <ion-icon name="star-outline"></ion-icon>
        </div>

        <a href="#">
          <h3 class="showcase-title">${data.name}</h3>
        </a>

        <p class="showcase-desc">
         ${data.description}
        </p>

        <div class="price-box">
          <p class="price">${Intl.NumberFormat('en-DE').format(data.price_sale)}</p>

          <del>${Intl.NumberFormat('en-DE').format(data.price)}</del>
        </div>

        <button class="add-cart-btn" data-id="${data.category}" id="${data.id}">thêm vào giỏ hàng</button>
        <div class="center">
          <div class="input-group">
            <span class="input-group-btn">
              <button
                type="button"
                class="btn btn-danger btn-number"
                data-type="minus"
                data-field="quant[2]"
              >
                <span class="glyphicon glyphicon-minus"></span>
              </button>
            </span>
            <input
              type="text"
              name="quant[2]"
              class="form-control input-number"
              id="input-number"
              value="1"
              min="1"
              max="100"
            />
            <span class="input-group-btn">
              <button
                type="button"
                class="btn btn-success btn-number"
                data-type="plus"
                data-field="quant[2]"
              >
                <span class="glyphicon glyphicon-plus"></span>
              </button>
            </span>
            
          </div>
          </div>
          <div class="dropdown">
   <button class=""btn btn-success dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
     Lựa chọn size
   </button>
   <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
     <a class="dropdown-item" href="#">S</a>
     <a class="dropdown-item" href="#">M</a>
     <a class="dropdown-item" href="#">L</a>
     <a class="dropdown-item" href="#">Xl</a>
   </div>
        </div>
        
        <div class="showcase-status">
          <div class="wrapper">
            <p>
              Đã bán: <b>20</b>
            </p>

            <p>
              có sẵn: <b>40</b>
            </p>
          </div>

          <div class="showcase-status-bar"></div>
        </div>

        <div class="countdown-box">
          <p class="countdown-desc">Nhanh lên!Ưu đãi kết thúc trong:</p>

          <div class="countdown">
            <div class="countdown-content">
              <p class="display-number" id="days">360</p>

              <p class="display-text">Days</p>
            </div>

            <div class="countdown-content">
              <p class="display-number" id="hours">24</p>
              <p class="display-text">Hours</p>
            </div>

            <div class="countdown-content">
              <p class="display-number" id="minutes">59</p>
              <p class="display-text">Min</p>
            </div>

            <div class="countdown-content">
              <p class="display-number" id="seconds">00</p>
              <p class="display-text">Sec</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>;
`;
});
const endDate = new Date(2024, 3, 10, 23, 59, 59);
const updateCountdown = () => {
    const now = new Date();
    const diff = endDate.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    document.getElementById('days').textContent = days.toString();
    document.getElementById('hours').textContent = hours
        .toString()
        .padStart(2, '0');
    document.getElementById('minutes').textContent = minutes
        .toString()
        .padStart(2, '0');
    document.getElementById('seconds').textContent = seconds
        .toString()
        .padStart(2, '0');
};
setInterval(updateCountdown, 1000);
window.addEventListener('click', (event) => {
    const target = event.target;
    const cart = target.closest('button');
    const id = cart.getAttribute('id');
    if (id) {
        addCart(+id);
    }
});
const addCart = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield fetchAPI(`${url}/products/${id}`);
    console.log(data);
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingProduct = cart.find((product) => product.id === data.id);
    const inputNumber = document.getElementById('input-number');
    if (existingProduct) {
        existingProduct.quantity += +inputNumber.value;
    }
    else {
        const product = {
            id: data.id,
            name: data.name,
            price: data.price_sale,
            image: data.image,
            quantity: +inputNumber.value ? +inputNumber.value : 1,
        };
        cart.push(product);
        console.log(product);
    }
    console.log(cart);
    localStorage.setItem('cart', JSON.stringify(cart));
    const count = document.getElementById('count');
    if (count) {
        count.textContent = cart.length.toString();
    }
    const userConfirmed = confirm('Thêm vào giỏ hàng thành công. Bạn có muốn chuyển đến giỏ hàng không?');
    inputNumber.value = '1';
    if (userConfirmed) {
        window.location.href = 'cart.html';
    }
});
window.addEventListener('click', (event) => {
    const button = event.target;
    if (!button.classList.contains('btn-number'))
        return;
    const inputField = button.parentElement.parentElement.querySelector('input');
    if (!inputField)
        return;
    let inputValue = parseInt(inputField.value, 10);
    if (button.getAttribute('data-type') === 'minus') {
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
const productData = localStorage.getItem('cart');
const cart = productData ? JSON.parse(productData) : [];
const count = document.getElementById('count');
if (count) {
    count.textContent = cart.length.toString();
}
document.addEventListener('DOMContentLoaded', function () {
    const userActionButton = document.getElementById('user-action-btn');
    const userData = JSON.parse(localStorage.getItem('user'));
    const logoutButton = document.getElementById('logout-btn');
    if (userData && userData.img) {
        userActionButton.innerHTML = `    <img src="./images/${userData.img}" id="userProfile" alt="User Image"> `;
        logoutButton.innerHTML = `<img src="assets/images/shutdown.png" alt="">`;
    }
    else {
        userActionButton.innerHTML = `
            <a href="login.html">
                <ion-icon name="person-outline"></ion-icon>
            </a>
        `;
    }
});
document.addEventListener('DOMContentLoaded', function () {
    const logoutButton = document.getElementById('logout-btn');
    logoutButton.addEventListener('click', function () {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = 'login.html';
    });
});
