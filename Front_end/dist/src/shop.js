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
const showProducts = (page = 1) => __awaiter(void 0, void 0, void 0, function* () {
    let data1 = yield fetchAPI(`${url}/products/paginations/?page=${page}`);
    data1 = data1.data;
    console.log(data1);
    const divProducts = document.getElementById('showcase');
    divProducts.innerHTML = data1
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
                      />
</a>
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

                        <button class="btn-action" id="${item.id}" data-id="${item.category_id}">
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
const renderPageNumbers = () => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield fetchAPI(`${url}/products/paginations`);
    const page = data.pagination.page;
    const totalPages = data.pagination.totalPages;
    console.log(data);
    let result = '';
    result += `<li class="page-item ${page === 1 ? 'disabled' : ''}">
    <a class="page-link" href="?page=${page - 1}" data-page="${page - 1}">Previous</a>
  </li>`;
    for (let i = 1; i <= totalPages; i++) {
        result += `<li class="page-item ${page === i ? 'active' : ''}">
      <a class="page-link" href="?page=${i}" data-page="${i}">${i}</a>
    </li>`;
    }
    result += `<li class="page-item ${page === totalPages ? 'disabled' : ''}">
    <a class="page-link" href="?page=${page + 1}" data-page="${page + 1}">Next</a>
  </li>`;
    const pagination = document.getElementById('pagination');
    if (pagination) {
        pagination.innerHTML = result;
    }
    window.addEventListener('click', (event) => {
        const target = event.target;
        const page = target.getAttribute('data-page');
        if (page && pagination) {
            event.preventDefault();
            const lis = pagination.querySelectorAll('li');
            lis.forEach((li) => {
                li.classList.remove('active');
            });
            const parentLi = target.closest('li');
            if (parentLi) {
                parentLi.classList.add('active');
            }
            console.log(page);
            showProducts(parseInt(page, 10));
        }
    });
});
renderPageNumbers();
showProducts();
const showCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield fetchAPI(`${url}/categories`);
    const divCategories = document.getElementById('category-item');
    divCategories.innerHTML = data
        .map((item) => {
        return `     
              <li class="sidebar-menu-category"  >
                <button class="sidebar-accordion-menu" data-id="${item.id}">
                  <div class="menu-title-flex" >
                    <img
                      src="./assets/images/icons/${item.image}"
                      alt="clothes"
                      width="20"
                      height="20"
                      class="menu-title-img"
                    />

                    <p class="menu-title">${item.name}</p>
                  </div>

                  <div>
                    <ion-icon
                      name="add-outline"
                      class="add-icon md hydrated"
                      role="img"
                      aria-label="add outline"
                    ></ion-icon>
                    <ion-icon
                      name="remove-outline"
                      class="remove-icon md hydrated"
                      role="img"
                      aria-label="remove outline"
                    ></ion-icon>
                  </div>
                </button>

                <ul class="sidebar-submenu-category-list" data-accordion="">
                  <li class="sidebar-submenu-category">
                    <a href="#" class="sidebar-submenu-title">
                      <p class="product-name">Shirt</p>
                      <data value="300" class="stock" title="Available Stock"
                        >300</data
                      >
                    </a>
                  </li>

                  <li class="sidebar-submenu-category">
                    <a href="#" class="sidebar-submenu-title">
                      <p class="product-name">shorts &amp; jeans</p>
                      <data value="60" class="stock" title="Available Stock"
                        >60</data
                      >
                    </a>
                  </li>

                  <li class="sidebar-submenu-category">
                    <a href="#" class="sidebar-submenu-title">
                      <p class="product-name">jacket</p>
                      <data value="50" class="stock" title="Available Stock"
                        >50</data
                      >
                    </a>
                  </li>

                  <li class="sidebar-submenu-category">
                    <a href="#" class="sidebar-submenu-title">
                      <p class="product-name">dress &amp; frock</p>
                      <data value="87" class="stock" title="Available Stock"
                        >87</data
                      >
                    </a>
                  </li>
                </ul>
              </li>
              `;
    })
        .join('');
});
showCategories();
window.addEventListener('click', (event) => {
    const category = event.target;
    if (category.dataset.id) {
        const categories = category.dataset.id;
        changeProduct(categories);
    }
});
const changeProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield fetchAPI(`${url}/products/categoryName/${id}`);
    const divProducts = document.getElementById('showcase');
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
                    />
                    </a>

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

                      <button class="btn-action"  id="${item.id}" data-id="${item.category_id}">
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
const productData = localStorage.getItem('cart');
const cart = productData ? JSON.parse(productData) : [];
const count = document.getElementById('count');
if (count) {
    count.textContent = cart.length.toString();
}
window.addEventListener('click', (event) => {
    const target = event.target;
    if (target.getAttribute('id')) {
        const category_id = target.getAttribute('id');
        productDetail(category_id);
    }
});
const productDetail = (category_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = yield fetchAPI(`${url}products/${category_id}`);
        localStorage.setItem('productData', JSON.stringify(productData));
        window.location.href = 'detail.html';
    }
    catch (error) {
        console.error('Error fetching product data:', error);
    }
});
window.addEventListener('keyup', (event) => {
    const target = event.target;
    if (target.id === 'form1') {
        let searchProducts = target.closest('input');
        const search = searchProducts.value;
        console.log(search);
        searchProduct(search);
    }
});
const searchProduct = (searchProduct) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield fetchAPI(`${url}/products`);
    const divProducts = document.getElementById('showcase');
    divProducts.innerHTML = data
        .filter((item) => {
        return item.name.toLowerCase().includes(searchProduct.toLowerCase());
    })
        .map((item) => {
        return `
          <div class="showcase">
                  <div class="showcase-banner">
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
                    />

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

                      <button class="btn-action" data-id="${item.category_id}">
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
const fetchAndDisplayProductsByPrice = (priceRangeOption) => __awaiter(void 0, void 0, void 0, function* () {
    let response;
    try {
        if (priceRangeOption == '0') {
            response = yield fetch(`${url}/products`);
        }
        else {
            response = yield fetch(`${url}/products/price/${priceRangeOption}`);
        }
        if (!response.ok)
            throw new Error('Network response was not ok');
        const products = yield response.json();
        const divProducts = document.getElementById('showcase');
        divProducts.innerHTML = products
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
                      />
</a>
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

                        <button class="btn-action" id="${item.id}" data-id="${item.category_id}">
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
        console.log(products);
    }
    catch (error) {
        console.error('Error fetching products:', error);
    }
});
const filterPriceSelect = document.getElementById('filterPrice');
filterPriceSelect.addEventListener('change', () => {
    const selectedOption = filterPriceSelect.value;
    let priceRangeOption = '';
    switch (selectedOption) {
        case '0':
            priceRangeOption = '0';
            break;
        case '1':
            priceRangeOption = 'option1';
            break;
        case '2':
            priceRangeOption = 'option2';
            break;
        case '3':
            priceRangeOption = 'option3';
            break;
        default:
            console.log('Please select a valid price range.');
            return;
    }
    fetchAndDisplayProductsByPrice(priceRangeOption);
});
window.addEventListener('click', (event) => {
    const target = event.target;
    const data = target.closest('button');
    if (data) {
        const id = data.getAttribute('id');
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
});
document.addEventListener('DOMContentLoaded', function () {
    const userActionButton = document.getElementById('user-action-btn');
    const userData = JSON.parse(localStorage.getItem('user'));
    const logoutButton = document.getElementById('logout-btn');
    if (userData && userData.img) {
        userActionButton.innerHTML = `<img src="../../public/images/${userData.img}" id="userProfile" alt="User Image"> `;
        logoutButton.innerHTML = `<img src="assets/images/shutdown.png" alt="">`;
    }
    else {
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
            }
            else {
                console.log('Mã thông báo không hợp lệ hoặc hết hạn');
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
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = 'login.html';
    });
});
