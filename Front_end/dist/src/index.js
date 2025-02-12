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
const showProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield fetchAPI(`${url}/products`);
    data = data.splice(0, 16);
    const divProducts = document.getElementById('products');
    divProducts.innerHTML = data
        .map((item) => {
        return `
          <div class="showcase" >
                  <div class="showcase-banner" >
                   <a href="detail.html?id=${item.id}">>
   <img 
                      src="./assets/images/products/${item.image}"
                      alt="Mens Winter Leathers Jackets"
                      width="300"
                      class="product-img default"
                    />
                    <img  data-id="${item.category}" id="${item.id}"
                      src="./assets/images/products/${item.image_hover}"
                      alt="Mens Winter Leathers Jackets"
                      width="300"
                      class="product-img hover"
                    /></a>

                    <p class="showcase-badge" >15%</p>

                    <div class="showcase-actions" >
                      <button class="btn-action">
                        <ion-icon name="heart-outline"></ion-icon>
                      </button>

                      <button class="btn-action">
                        <ion-icon name="eye-outline"></ion-icon>
                      </button>

                      <button class="btn-action">
                        <ion-icon name="repeat-outline"></ion-icon>
                      </button>

                      <button class="btn-action cart"  data-id="${item.category}" id="${item.id}" >
                        <ion-icon name="bag-add-outline"></ion-icon>
                      </button>
                    </div>
                  </div>

                  <div class="showcase-content">

                    <a href="#" class="showcase-category">${item.category}</a>

                    <a href="#">
                      <h3 class="showcase-title">
                        ${item.name}
                      </h3>
                    </a>

                    <div class="showcase-rating">
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star-outline"></ion-icon>
                      <ion-icon name="star-outline"></ion-icon>
                    </div>

                    <div class="price-box">
                      <p class="price">${Intl.NumberFormat('en-DE').format(item.price_sale)}</p>
                      <del>${Intl.NumberFormat('en-DE').format(item.price)}</del>
                    </div>
                  </div>
                </div>
       `;
    })
        .join('');
});
showProducts();
const showCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    const urlCategories = `${url}/categories`;
    const data = yield fetchAPI(urlCategories);
    const divCategories = document.getElementById('category-item');
    divCategories.innerHTML = data
        .map((item) => {
        return `
          <div class="category-item" data-id={${item.category}} id="${item.id}">
                  <div class="category-img-box">
                    <img
                      src="./assets/images/icons/${item.image}"
                      alt="${item.name}"
                      width="30"
                    />
                  </div>
                  <a  class="category-name">${item.name}</a>
                </div>
       `;
    })
        .join('');
});
showCategories();
const productDiv = document.getElementById('products');
const anyDiv = document.getElementById('category-item');
anyDiv.addEventListener('click', () => {
    productDiv.scrollIntoView({
        behavior: 'smooth',
    });
});
window.addEventListener('click', (event) => {
    const category = event.target;
    if (category.id) {
        const categories = category.id;
        changeProduct(+categories);
    }
});
const changeProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield fetchAPI(`${url}/products/categoryName/${id}`);
    const divProducts = document.getElementById('products');
    divProducts.innerHTML = data
        .map((item) => {
        return `
        <div class="showcase">
                <div class="showcase-banner">
 <a href="detail.html?id=${item.id}">
                  <img
                    src="./assets/images/products/${item.image}"
                    alt="Mens Winter Leathers Jackets"
                    width="300"
                    class="product-img default"
                  />
                  
                  <img  
                    src="./assets/images/products/${item.image_hover}"
                    alt="Mens Winter Leathers Jackets"
                    width="300"
                    class="product-img hover"
                    
                  /></a>

                  <p class="showcase-badge">15%</p>

                  <div class="showcase-actions">
                    <button class="btn-action">
                      <ion-icon name="heart-outline"></ion-icon>
                    </button>

                    <button class="btn-action">
                      <ion-icon name="eye-outline"></ion-icon>
                    </button>

                    <button class="btn-action">
                      <ion-icon name="repeat-outline"></ion-icon>
                    </button>

                    <button class="btn-action" data-id="${item.category}" id="${item.id}"  >
                      <ion-icon name="bag-add-outline"></ion-icon>
                    </button>
                  </div>
                </div>

                <div class="showcase-content">
                  <a href="#" class="showcase-category">${item.category}</a>

                  <a href="#">
                    <h3 class="showcase-title">
                      ${item.name}
                    </h3>
                  </a>

                  <div class="showcase-rating">
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star-outline"></ion-icon>
                    <ion-icon name="star-outline"></ion-icon>
                  </div>

                  <div class="price-box">
                    <p class="price">${Intl.NumberFormat('en-DE').format(item.price_sale)}</p>
                    <del>${Intl.NumberFormat('en-DE').format(item.price)}</del>
                  </div>
                </div>
              </div>
     `;
    })
        .join('');
});
const saleOff = () => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield fetchAPI(`${url}/products/topRate`);
    const divProducts = document.getElementById('saleOff');
    divProducts.innerHTML = data
        .map((item) => {
        return `
        <div class="showcase-container">
                  <div class="showcase">
                    <div class="showcase-banner" >
                      <img
                        src="./assets/images/products/${item.image}"
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
                        <h3 class="showcase-title">
                         ${item.name}
                        </h3>
                      </a>

                      <p class="showcase-desc">
                        ${item.description}
                      </p>

                      <div class="price-box">
                        <p class="price">${Intl.NumberFormat('en-DE').format(item.price_sale)}</p>

                        <del>${Intl.NumberFormat('en-DE').format(item.price)}</del>
                      </div>
<a  href="detail.html?id=${item.id}">
                      <button class="add-cart-btn">Chi tiết</button>
</a>
                      <div class="showcase-status">
                        <div class="wrapper">
                          <p>already sold: <b>20</b></p>

                          <p>available: <b>40</b></p>
                        </div>

                        <div class="showcase-status-bar"></div>
                      </div>

                      <div class="countdown-box">
                        <p class="countdown-desc">Hurry Up! Offer ends in:</p>

                        <div class="countdown">
                          <div class="countdown-content">
                            <p class="display-number" id="days">3</p>

                            <p class="display-text">Days</p>
                          </div>

                          <div class="countdown-content">
                            <p class="display-number" id="hours">8</p>
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
                </div>`;
    })
        .join('');
});
const endDate = new Date(2024, 3, 5, 23, 59, 59);
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
saleOff();
const newArrival = () => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield fetchAPI(`${url}/products/hot`);
    const divNewArrival = document.getElementById('showcase1');
    data = data.slice(0, 3);
    divNewArrival.innerHTML = data
        .map((item) => {
        return `
        <div class="showcase" >
                      <a  href="detail.html?id=${item.id}"  class="showcase-img-box">
                        <img   
                          src="./assets/images/products/${item.image}"
                          alt="relaxed short full sleeve t-shirt"
                          width="70"
                          class="showcase-img"
                        />
                      </a>

                      <div class="showcase-content">
                        <a href="#">
                          <h4 class="showcase-title">
                            ${item.name}
                          </h4>
                        </a>

                        <a href="#" class="showcase-category">Clothes</a>

                        <div class="price-box">
                          <p class="price">${Intl.NumberFormat('en-DE').format(item.price_sale)}</p>
                          <del>${Intl.NumberFormat('en-DE').format(item.price)}</del>
                        </div>
                      </div>
                    </div>
`;
    })
        .join('');
});
const newArrival1 = () => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield fetchAPI(`${url}/products/hot`);
    const divNewArrival = document.getElementById('showcase2');
    data = data.slice(3, 6);
    divNewArrival.innerHTML = data
        .map((item) => {
        return `
        <div class="showcase">
                      <a  href="detail.html?id=${item.id}" class="showcase-img-box">
                        <img
                          src="./assets/images/products/clothes-1.jpg"
                          alt="relaxed short full sleeve t-shirt"
                          width="70"
                          class="showcase-img"
                        />
                      </a>

                      <div class="showcase-content">
                        <a href="#">
                          <h4 class="showcase-title">
                            Relaxed Short full Sleeve T-Shirt
                          </h4>
                        </a>

                        <a href="#" class="showcase-category">Clothes</a>

                        <div class="price-box">
                          <p class="price">${Intl.NumberFormat('en-DE').format(item.price_sale)}</p>
                          <del>${Intl.NumberFormat('en-DE').format(item.price)}</del>
                        </div>
                      </div>
                    </div>
`;
    })
        .join('');
});
const trending = () => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield fetchAPI(`${url}/products/trending`);
    const divNewArrival = document.getElementById('showcase3');
    data = data.slice(0, 3);
    divNewArrival.innerHTML = data
        .map((item) => {
        return `
        <div class="showcase">
                      <a  href="detail.html?id=${item.id}"" class="showcase-img-box">
                        <img
                          src="./assets/images/products/${item.image}"
                          alt="relaxed short full sleeve t-shirt"
                          width="70"
                          class="showcase-img"
                        />
                      </a>

                      <div class="showcase-content">
                        <a href="#">
                          <h4 class="showcase-title">
                            ${item.name}
                          </h4>
                        </a>

                        <a href="#" class="showcase-category">Clothes</a>

                        <div class="price-box">
                          <p class="price">${Intl.NumberFormat('en-DE').format(item.price_sale)}</p>
                          <del>${Intl.NumberFormat('en-DE').format(item.price)}</del>
                        </div>
                      </div>
                    </div>
`;
    })
        .join('');
});
const trending1 = () => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield fetchAPI(`${url}/products/hot`);
    data = data.slice(3, 6);
    const divNewArrival = document.getElementById('showcase4');
    divNewArrival.innerHTML = data
        .map((item) => {
        return `
        <div class="showcase">
                      <a  href="detail.html?id=${item.id}" class="showcase-img-box">
                        <img
                          src="./assets/images/products/${item.image}"
                          alt="relaxed short full sleeve t-shirt"
                          width="70"
                          class="showcase-img"
                        />
                      </a>

                      <div class="showcase-content">
                        <a href="#">
                          <h4 class="showcase-title">
                          ${item.name}
                          </h4>
                        </a>

                        <a href="#" class="showcase-category">Clothes</a>

                        <div class="price-box">
                          <p class="price">${Intl.NumberFormat('en-DE').format(item.price_sale)}</p>
                          <del>${Intl.NumberFormat('en-DE').format(item.price)}</del>
                        </div>
                      </div>
                    </div>
`;
    })
        .join('');
});
const topRate = () => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield fetchAPI(`${url}/products/topRate`);
    const divNewArrival = document.getElementById('showcase5');
    divNewArrival.innerHTML = data
        .map((item) => {
        return `
        <div class="showcase">
                      <a href="detail.html?id=${item.id}" class="showcase-img-box">
                        <img 
                          src="./assets/images/products/${item.image}"
                          alt="relaxed short full sleeve t-shirt"
                          width="70"
                          class="showcase-img"
                        />
                      </a>

                      <div class="showcase-content">
                        <a href="#">
                          <h4 class="showcase-title">
                            Relaxed Short full Sleeve T-Shirt
                          </h4>
                        </a>

                        <a href="#" class="showcase-category">Clothes</a>

                        <div class="price-box">
                          <p class="price">${Intl.NumberFormat('en-DE').format(item.price_sale)}</p>
                          <del>${Intl.NumberFormat('en-DE').format(item.price)}</del>
                        </div>
                      </div>
                    </div>
`;
    })
        .join('');
});
const topRate1 = () => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield fetchAPI(`${url}/products/topRate`);
    const divNewArrival = document.getElementById('showcase6');
    divNewArrival.innerHTML = data
        .map((item) => {
        return `
        <div class="showcase">
                      <a  href="detail.html?id=${item.id}" class="showcase-img-box">
                        <img 
                          src="./assets/images/products/${item.image}"
                          alt="relaxed short full sleeve t-shirt"
                          width="70"
                          class="showcase-img"
                        />
                      </a>

                      <div class="showcase-content">
                        <a href="#">
                          <h4 class="showcase-title">
                            Relaxed Short full Sleeve T-Shirt
                          </h4>
                        </a>

                        <a href="#" class="showcase-category">Clothes</a>

                        <div class="price-box">
                          <p class="price">${Intl.NumberFormat('en-DE').format(item.price_sale)}</p>
                          <del>${Intl.NumberFormat('en-DE').format(item.price)}</del>
                        </div>
                      </div>
                    </div>
`;
    })
        .join('');
});
topRate();
topRate1();
trending();
trending1();
newArrival1();
newArrival();
window.addEventListener('click', (event) => {
    const target = event.target;
    if (target) {
        const cart = target.closest('button');
        const id = cart.getAttribute('id');
        addCart(+id);
    }
});
const addCart = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield fetchAPI(`${url}/products/${id}`);
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingProduct = cart.find((product) => product.id === data.id);
    if (existingProduct) {
        existingProduct.quantity += 1;
    }
    else {
        const product = {
            id: data.id,
            name: data.name,
            price: data.price_sale,
            image: data.image,
            quantity: 1,
        };
        cart.push(product);
    }
    const count = document.getElementById('count');
    if (count) {
        count.textContent = cart.length.toString();
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Thêm vào giỏ hàng thành công');
    const userConfirmed = confirm('Thêm vào giỏ hàng thành công. Bạn có muốn chuyển đến giỏ hàng không?');
    if (userConfirmed) {
        window.location.href = 'cart.html';
    }
    console.log('cart', cart);
});
const productData = localStorage.getItem('cart');
const cart = productData ? JSON.parse(productData) : [];
const count = document.getElementById('count');
const sliderItem = document.getElementsByClassName('slider-item');
if (count) {
    count.textContent = cart.length.toString();
}
