import { Product, IProductInterface } from '../models/productsModel.js';
import { url, fetchAPI } from '../src/config/app.js';
interface ApiResponse {
  data: Product[];
}
class ProductModel implements IProductInterface {
  async getAll(queryParams?: number): Promise<Product[]> {
    const response = await fetch(
      `${url}/products/paginations?page=${queryParams}`
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Error fetching products');
    }
    return data.data as Product[];
  }
  async getById(id: string): Promise<Product> {
    const data = await fetchAPI(`${url}products/${id}`);
    if (!data) {
      throw new Error('Không tìm thấy danh mục');
    }
    return data as Product;
  }

  async create(data: FormData): Promise<void> {
    const data1 = await fetchAPI(`${url}products/add`, {
      method: 'POST',
      body: data,
    });
    if (!data1) {
      throw new Error('Lỗi tạo danh mục');
    }
    window.location.href = '../ecommerce-products.html';
  }

  async update(id: string, data: FormData): Promise<void> {
    const data1 = await fetchAPI(`${url}products/update/${id}`, {
      method: 'PUT',
      body: data,
    });
    if (!data1) {
      throw new Error('Lỗi cập nhật danh mục');
    }
  }

  async delete(id: string): Promise<void> {
    const data = await fetchAPI(`${url}products/${id}`, {
      method: 'DELETE',
    });

    if (!data) {
      throw new Error('Lỗi xóa danh mục');
    } else {
      alert('Xóa thành công');
      window.location.reload();
    }
  }
  async searchValue(value: string): Promise<Product[]> {
    const data = await fetchAPI(`${url}products/search/${value}`);
    return data as Product[];
  }
  async sortValue(value: string): Promise<Product[]> {
    const data = await fetchAPI(`${url}products?_sort=${value}`);
    return data as Product[];
  }
}

// them san pham
export const addProduct = new ProductModel();
// sua san pham
export const updateProduct = new ProductModel();
// xoa san pham
const deleteProduct = new ProductModel();
// tim kiem san pham
const searchProduct = new ProductModel();
// sap xep san pham
const sortProduct = new ProductModel();
// loc san pham
export const filterProduct = new ProductModel();

// hien thi san pham
const showProduct = new ProductModel();
showProduct
  .getAll()
  .then((data) => {
    const tr = document.getElementById('tr');
    tr.innerHTML = '';
    data.map((product) => {
      tr.innerHTML += `
         <tr>
                  <td class="table-column-pr-0">
                    <div class="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        class="custom-control-input"
                        id="productsCheck1"
                      />
                      <label
                        class="custom-control-label"
                        for="productsCheck1"
                      ></label>
                    </div>
                  </td>
                  <td class="table-column-pl-0">
                    <a
                      class="media align-items-center"
                    >
                      <img
                        class="avatar avatar-lg mr-3"
                        src="./public/images/products/${product.image}"
                        alt="Image Description"
                      />
                      <div class="media-body">
                        <h5 class="text-hover-primary mb-0">
${product.name}                        </h5>
                      </div>
                    </a>
                  </td>
                  <td>${product.category}</td>
                  
                  <td style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis; max-width: 200px;"
                  >${product.description}</td>
                  <td>
                    <label
                      class="toggle-switch toggle-switch-sm"
                      for="stocksCheckbox1"
                    >
                      <input
                        type="checkbox"
                        class="toggle-switch-input"
                        id="stocksCheckbox1"
                        checked=""
                      />
                      <span class="toggle-switch-label">
                        <span class="toggle-switch-indicator"></span>
                      </span>
                    </label>
                  </td>
                  <td>${product.quantity}</td>
                  <td>${new Intl.NumberFormat('de-DE').format(
                    product.price
                  )}</td>
                  <td>
                    <div class="btn-group" role="group">
                      <a 
                        class="btn btn-sm btn-white"
                            href="ecommerce-product-details.html?editPro=${
                              product.id
                            }"
                      >
                        <i class="tio-edit"></i> Edit
                      </a>

                      <!-- Unfold -->
                      <div class="hs-unfold btn-group" data-id="${product.id}">
                       <a
                        class="btn btn-sm btn-white"
                      >
                        <i class="tio-delete"></i> Delete
                      </a>

                        <div
                          id="productsEditDropdown1"
                          class="hs-unfold-content dropdown-unfold dropdown-menu dropdown-menu-right mt-1"
                        >
                          <a class="dropdown-item" href="#">
                            <i
                              class="tio-delete-outlined dropdown-item-icon"
                            ></i>
                            Delete
                          </a>
                          <a class="dropdown-item" href="#">
                            <i class="tio-archive dropdown-item-icon"></i>
                            Archive
                          </a>
                          <a class="dropdown-item" href="#">
                            <i class="tio-publish dropdown-item-icon"></i>
                            Publish
                          </a>
                          <a class="dropdown-item" href="#">
                            <i class="tio-clear dropdown-item-icon"></i>
                            Unpublish
                          </a>
                        </div>
                      </div>
                      <!-- End Unfold -->
                    </div>
                  </td>
                </tr>
  `;
    });
  })
  .catch((error) => {});
// btn phan trang
function populatePaginationSelect(totalPages: number): void {
  const selectElement = document.getElementById(
    'datatableEntrie'
  ) as HTMLSelectElement;
  selectElement.innerHTML = ''; // Clear existing options

  // Create and append options for each page
  for (let i = 1; i <= totalPages; i++) {
    const option = document.createElement('option');
    option.value = i.toString();
    option.textContent = `Page ${i}`;
    selectElement.appendChild(option);
  }
}

// Trình nghe sự kiện khi lựa chọn trang thay đổi
document.addEventListener('DOMContentLoaded', () => {
  const selectElement = document.getElementById(
    'datatableEntrie'
  ) as HTMLSelectElement;
  selectElement.addEventListener('change', () => {
    const selectedPage = parseInt(selectElement.value, 10);
    showProduct.getAll(selectedPage).then((data) => {
      const tr = document.getElementById('tr');
      tr.innerHTML = '';
      data.map((product) => {
        tr.innerHTML += `
             <tr>
                      <td class="table-column-pr-0">
                        <div class="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            class="custom-control-input"
                            id="productsCheck1"
                          />
                          <label
                            class="custom-control-label"
                            for="productsCheck1"
                          ></label>
                        </div>
                      </td>
                      <td class="table-column-pl-0">
                        <a
                          class="media align-items-center"
                        >
                          <img
                            class="avatar avatar-lg mr-3"
                            src="./public/images/products/${product.image}"
                            alt="Image Description"
                          />
                          <div class="media-body">
                            <h5 class="text-hover-primary mb-0">
    ${product.name}                        </h5>
                          </div>
                        </a>
                      </td>
                      <td>${product.category}</td>

                      <td style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis; max-width: 200px;"
                      >${product.description}</td>
                      <td>
                        <label
                          class="toggle-switch toggle-switch-sm"
                          for="stocksCheckbox1"
                        >
                          <input
                            type="checkbox"
                            class="toggle-switch-input"
                            id="stocksCheckbox1"
                            checked=""
                          />
                          <span class="toggle-switch-label">
                            <span class="toggle-switch-indicator"></span>
                          </span>
                        </label>
                      </td>
                      <td>${product.quantity}</td>
                      <td>${new Intl.NumberFormat('de-DE').format(
                        product.price
                      )}</td>
                      <td>
                        <div class="btn-group" role="group">
                          <a id="editPro"
                            class="btn btn-sm btn-white"
                            href="ecommerce-product-details.html?editPro=${
                              product.id
                            }"
                          >
                            <i class="tio-edit"></i> Edit
                          </a>

                          <!-- Unfold -->
                          <div class="hs-unfold btn-group" data-id="${
                            product.id
                          }">
                           <a
                            class="btn btn-sm btn-white"
                          >
                            <i class="tio-delete"></i> Delete
                          </a>

                            <div
                              id="productsEditDropdown1"
                              class="hs-unfold-content dropdown-unfold dropdown-menu dropdown-menu-right mt-1"
                            >
                              <a class="dropdown-item" href="#">
                                <i
                                  class="tio-delete-outlined dropdown-item-icon"
                                ></i>
                                Delete
                              </a>
                              <a class="dropdown-item" href="#">
                                <i class="tio-archive dropdown-item-icon"></i>
                                Archive
                              </a>
                              <a class="dropdown-item" href="#">
                                <i class="tio-publish dropdown-item-icon"></i>
                                Publish
                              </a>
                              <a class="dropdown-item" href="#">
                                <i class="tio-clear dropdown-item-icon"></i>
                                Unpublish
                              </a>
                            </div>
                          </div>
                          <!-- End Unfold -->
                        </div>
                      </td>
                    </tr>
      `;
      });
    });
  });

  // Initial fetch to populate the dropdown with the correct number of pages
  fetch(`${url}products/paginations`)
    .then((response) => response.json())
    .then((data) => {
      populatePaginationSelect(data.pagination.totalPages);
    });
});

// Thêm sự kiện click cho nút xóa sản phẩm
window.addEventListener('click', () => {
  const target = event.target as HTMLElement;
  const id = target.parentElement.dataset.id;
  if (!id) {
    return;
  }
  deleteProduct.delete(id);
});
// Thêm sự kiện tìm kiếm sản phẩm inputForm bằng ts
window.addEventListener('keyup', () => {
  const search = document.getElementById('datatableSearch') as HTMLInputElement;
  if (!search) return;
  searchProduct
    .searchValue(search.value)
    .then((data, page = 1) => {
      const PAGE_SIZE = 16;
      const current_page = page;
      // Vị trí bắt đầu = (Trang hiện tại - 1) * Số mục mỗi trang
      const startIndex = (current_page - 1) * PAGE_SIZE;
      // Vị trí kết thúc = Vị trí bắt đầu + Số mục mỗi trang - 1
      const endIndex = startIndex + PAGE_SIZE - 1;
      const paginatedProducts = data.slice(startIndex, endIndex + 1);
      const tr = document.getElementById('tr');
      tr.innerHTML = '';
      paginatedProducts.map((product) => {
        tr.innerHTML += `
         <tr>
                  <td class="table-column-pr-0">
                    <div class="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        class="custom-control-input"
                        id="productsCheck1"
                      />
                      <label
                        class="custom-control-label"
                        for="productsCheck1"
                      ></label>
                    </div>
                  </td>
                  <td class="table-column-pl-0">
                    <a
                      class="media align-items-center"
                      href="ecommerce-product-details.html"
                    >
                      <img
                        class="avatar avatar-lg mr-3"
                        src="./public/images/products/${product.image}"
                        alt="Image Description"
                      />
                      <div class="media-body">
                        <h5 class="text-hover-primary mb-0">
${product.name}                        </h5>
                      </div>
                    </a>
                  </td>
                  <td>${product.category}</td>
                  
                  <td style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis; max-width: 200px;"
                  >${product.description}</td>
                  <td>
                    <label
                      class="toggle-switch toggle-switch-sm"
                      for="stocksCheckbox1"
                    >
                      <input
                        type="checkbox"
                        class="toggle-switch-input"
                        id="stocksCheckbox1"
                        checked=""
                      />
                      <span class="toggle-switch-label">
                        <span class="toggle-switch-indicator"></span>
                      </span>
                    </label>
                  </td>
                  <td>${product.quantity}</td>
                  <td>${new Intl.NumberFormat('de-DE').format(
                    product.price
                  )}</td>
                  <td>
                    <div class="btn-group" role="group">
                      <a 
                        class="btn btn-sm btn-white"
                            href="ecommerce-product-details.html?editPro=${
                              product.id
                            }"
                      >
                        <i class="tio-edit"></i> Edit
                      </a>

                      <!-- Unfold -->
                      <div class="hs-unfold btn-group" data-id="${product.id}">
                       <a
                        class="btn btn-sm btn-white"
                      >
                        <i class="tio-delete"></i> Delete
                      </a>

                        <div
                          id="productsEditDropdown1"
                          class="hs-unfold-content dropdown-unfold dropdown-menu dropdown-menu-right mt-1"
                        >
                          <a class="dropdown-item" href="#">
                            <i
                              class="tio-delete-outlined dropdown-item-icon"
                            ></i>
                            Delete
                          </a>
                          <a class="dropdown-item" href="#">
                            <i class="tio-archive dropdown-item-icon"></i>
                            Archive
                          </a>
                          <a class="dropdown-item" href="#">
                            <i class="tio-publish dropdown-item-icon"></i>
                            Publish
                          </a>
                          <a class="dropdown-item" href="#">
                            <i class="tio-clear dropdown-item-icon"></i>
                            Unpublish
                          </a>
                        </div>
                      </div>
                      <!-- End Unfold -->
                    </div>
                  </td>
                </tr>
  `;
      });
    })
    .catch((error) => {});
});
// Thêm sự kiện sắp xếp sản phẩm
window.addEventListener('change', () => {
  const target = event.target as HTMLElement;
  const sort = document.getElementById('sort') as HTMLSelectElement;
  if (!sort) return;
  sortProduct
    .sortValue(sort.value)
    .then((data) => {
      const tr = document.getElementById('tr');
      tr.innerHTML = '';
      data.map((product) => {
        tr.innerHTML += `
         <tr>
                  <td class="table-column-pr-0">
                    <div class="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        class="custom-control-input"
                        id="productsCheck1"
                      />
                      <label
                        class="custom-control-label"
                        for="productsCheck1"
                      ></label>
                    </div>
                  </td>
                  <td class="table-column-pl-0">
                    <a
                      class="media align-items-center"
                    >
                      <img
                        class="avatar avatar-lg mr-3"
                        src="./public/images/products/${product.image}"
                        alt="Image Description"
                      />
                      <div class="media-body">
                        <h5 class="text-hover-primary mb-0">
${product.name}                        </h5>
                      </div>
                    </a>
                  </td>
                  <td>${product.category}</td>
                  
                  <td style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis; max-width: 200px;"
                  >${product.description}</td>
                  <td>
                    <label
                      class="toggle-switch toggle-switch-sm"
                      for="stocksCheckbox1"
                    >
                      <input
                        type="checkbox"
                        class="toggle-switch-input"
                        id="stocksCheckbox1"
                        checked=""
                      />
                      <span class="toggle-switch-label">
                        <span class="toggle-switch-indicator"></span>
                      </span>
                    </label>
                  </td>
                  <td>${product.quantity}</td>
                  <td>${new Intl.NumberFormat('de-DE').format(
                    product.price
                  )}</td>
                  <td>
                    <div class="btn-group" role="group">
                      <a 
                        class="btn btn-sm btn-white"
                            href="ecommerce-product-details.html?editPro=${
                              product.id
                            }"
                      >
                        <i class="tio-edit"></i> Edit
                      </a>

                      <!-- Unfold -->
                      <div class="hs-unfold btn-group" data-id="${product.id}">
                       <a
                        class="btn btn-sm btn-white"
                      >
                        <i class="tio-delete"></i> Delete
                      </a>

                        <div
                          id="productsEditDropdown1"
                          class="hs-unfold-content dropdown-unfold dropdown-menu dropdown-menu-right mt-1"
                        >
                          <a class="dropdown-item" href="#">
                            <i
                              class="tio-delete-outlined dropdown-item-icon"
                            ></i>
                            Delete
                          </a>
                          <a class="dropdown-item" href="#">
                            <i class="tio-archive dropdown-item-icon"></i>
                            Archive
                          </a>
                          <a class="dropdown-item" href="#">
                            <i class="tio-publish dropdown-item-icon"></i>
                            Publish
                          </a>
                          <a class="dropdown-item" href="#">
                            <i class="tio-clear dropdown-item-icon"></i>
                            Unpublish
                          </a>
                        </div>
                      </div>
                      <!-- End Unfold -->
                    </div>
                  </td>
                </tr>
  `;
      });
    })
    .catch((error) => {});
});
