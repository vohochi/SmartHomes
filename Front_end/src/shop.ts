import { url, fetchAPI } from '../src/app.js';
import { Products } from '../src/app.js';
//   viết hàm showProducts

// const showPage = new Products()

const showProducts = async (page = 1) => {
  // Phan trang

  let data1 = await fetchAPI(`${url}/products/paginations/?page=${page}`);
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

                        <button class="btn-action" id="${item.id}" data-id="${
        item.category_id
      }">
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
                        <p class="price">${Intl.NumberFormat('en-DE').format(
                          item.price_sale
                        )}</p>
                        <del>${Intl.NumberFormat('en-DE').format(
                          item.price
                        )}</del>
                      </div>
                    </div>
                  </div>
        `;
    })
    .join('');
};

// Hàm render các nút đánh số trang
const renderPageNumbers = async () => {
  let data = await fetchAPI(`${url}/products/paginations`);
  const page = data.pagination.page;
  const totalPages = data.pagination.totalPages;

  console.log(data);
  let result = '';

  // Add "Previous" button
  result += `<li class="page-item ${page === 1 ? 'disabled' : ''}">
    <a class="page-link" href="?page=${page - 1}" data-page="${
    page - 1
  }">Previous</a>
  </li>`;

  // Add page numbers
  for (let i = 1; i <= totalPages; i++) {
    result += `<li class="page-item ${page === i ? 'active' : ''}">
      <a class="page-link" href="?page=${i}" data-page="${i}">${i}</a>
    </li>`;
  }

  // Add "Next" button
  result += `<li class="page-item ${page === totalPages ? 'disabled' : ''}">
    <a class="page-link" href="?page=${page + 1}" data-page="${
    page + 1
  }">Next</a>
  </li>`;

  // Update pagination content
  const pagination = document.getElementById('pagination');
  if (pagination) {
    pagination.innerHTML = result;
  }

  // Add event listeners
  window.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
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
};
renderPageNumbers();
showProducts();

const showCategories = async () => {
  const data = await fetchAPI(`${url}/categories`);
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
};
showCategories();

// Lấy ID của thẻ div category
interface ClickEventWithCategory extends Event {
  target: HTMLElement & { dataset: { id?: string } };
}

window.addEventListener('click', (event: ClickEventWithCategory) => {
  const category = event.target;
  if (category.dataset.id) {
    const categories = category.dataset.id;
    changeProduct(categories);
  }
});
const changeProduct = async (id: string) => {
  let data = await fetchAPI(`${url}/products/categoryName/${id}`);
  // let data1 = await fetchAPI(`${url}/products`);
  // data = data1.filter((product) => id == product.category_id);
  const divProducts = document.getElementById('showcase');
  divProducts.innerHTML = data
    //luu category vao localStorage

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

                      <button class="btn-action"  id="${item.id}" data-id="${
        item.category_id
      }">
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
                      <p class="price">${Intl.NumberFormat('en-DE').format(
                        item.price_sale
                      )}</p>
                      <del>${Intl.NumberFormat('en-DE').format(
                        item.price
                      )}</del>
                    </div>
                  </div>
                </div>
       `;
    })
    .join('');
};
const productData = localStorage.getItem('cart');
const cart = productData ? JSON.parse(productData) : [];
const count = document.getElementById('count');
if (count) {
  count.textContent = cart.length.toString();
}

// chi tiet san pham

window.addEventListener('click', (event) => {
  const target = <HTMLElement>event.target;

  if (target.getAttribute('id')) {
    const category_id = target.getAttribute('id');
    productDetail(category_id);
  }
});
// Lấy thông tin sản phẩm
const productDetail = async (category_id: string) => {
  try {
    const productData = await fetchAPI(`${url}products/${category_id}`);
    // Lưu trữ thông tin sản phẩm vào localStorage
    localStorage.setItem('productData', JSON.stringify(productData));
    // Điều hướng đến trang chi tiết sản phẩm
    window.location.href = 'detail.html';
  } catch (error) {
    console.error('Error fetching product data:', error);
  }
};

window.addEventListener('keyup', (event) => {
  const target = event.target as HTMLInputElement;
  if (target.id === 'form1') {
    let searchProducts = target.closest('input');
    const search = searchProducts.value;
    console.log(search);
    searchProduct(search);
  }
});

const searchProduct = async (searchProduct: string) => {
  const data = await fetchAPI(`${url}/products`);
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
                      <p class="price">${Intl.NumberFormat('en-DE').format(
                        item.price_sale
                      )}</p>
                      <del>${Intl.NumberFormat('en-DE').format(
                        item.price
                      )}</del>
                    </div>
                  </div>
                </div>
       `;
    })
    .join('');
};
// loc gia theo san pham
const fetchAndDisplayProductsByPrice = async (
  priceRangeOption: string
): Promise<void> => {
  let response;
  try {
    // If the default "Chọn mức giá" option is selected, fetch all products
    if (priceRangeOption == '0') {
      response = await fetch(`${url}/products`);
    } else {
      // Otherwise, fetch products based on the selected price range
      response = await fetch(`${url}/products/price/${priceRangeOption}`);
    }
    if (!response.ok) throw new Error('Network response was not ok');
    const products = await response.json();
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

                        <button class="btn-action" id="${item.id}" data-id="${
          item.category_id
        }">
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
                        <p class="price">${Intl.NumberFormat('en-DE').format(
                          item.price_sale
                        )}</p>
                        <del>${Intl.NumberFormat('en-DE').format(
                          item.price
                        )}</del>
                      </div>
                    </div>
                  </div>
        `;
      })
      .join('');

    console.log(products); // Replace with actual UI update logic
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

// Add event listener to the select element
const filterPriceSelect = document.getElementById(
  'filterPrice'
) as HTMLSelectElement;

filterPriceSelect.addEventListener('change', () => {
  const selectedOption = filterPriceSelect.value;

  // Map the select value to an API endpoint option
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

  // Fetch and display products based on the selected price range
  fetchAndDisplayProductsByPrice(priceRangeOption);
});
// them vao gio hang
window.addEventListener('click', (event) => {
  const target = <HTMLElement>event.target;
  const data = target.closest('button');
  if (data) {
    const id = data.getAttribute('id');
    // const category_id = data.getAttribute('data-id');
    addCart(+id);
  }
});

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}
// add localCart
const addCart = async (id: number) => {
  let data = await fetchAPI(`${url}/products/${id}`);
  let cart: Product[] = JSON.parse(localStorage.getItem('cart') || '[]');
  const existingProduct = cart.find((product) => product.id === data.id);
  if (existingProduct) {
    // If the product already exists in the cart, increment its quantity
    existingProduct.quantity += 1;
  } else {
    // If the product does not exist in the cart, add it
    const product: Product = {
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

  // Save the updated cart back to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Thêm vào giỏ hàng thành công');
  const userConfirmed = confirm(
    'Thêm vào giỏ hàng thành công. Bạn có muốn chuyển đến giỏ hàng không?'
  );
  if (userConfirmed) {
    window.location.href = 'cart.html';
  }
};
//
