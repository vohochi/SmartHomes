import { Product, IProductInterface } from '../models/productsModel.js';
import { url, fetchAPI } from '../src/config/app.js';
interface ApiResponse {
  data: Product[];
}
class ProductModel implements IProductInterface {
  async getAll(): Promise<Product[]> {
    const data = await fetchAPI(`${url}products/paginations`);
    return data.data as Product[];
  }
  async getById(id: string): Promise<Product> {
    const data = await fetchAPI(`${url}products/${id}`);
    if (!data) {
      throw new Error('Không tìm thấy danh mục');
    }
    return data as Product;
  }

  async create(data: Product): Promise<void> {
    const data1 = await fetchAPI(`${url}products`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });
    if (!data1) {
      throw new Error('Lỗi tạo danh mục');
    }
  }

  async update(id: string, data: Product): Promise<void> {
    const data1 = await fetchAPI(`${url}products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
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
// phan trang san pham
export const paginationProduct = new ProductModel();

// hien thi san pham
const showProduct = new ProductModel();
showProduct
  .getAll()
  .then((data) => {
    const tr = document.getElementById('tr');
    tr.innerHTML = '';
    console.log(data);
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
                        href="ecommerce-product-details.html"
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
  .catch((error) => {
    console.error('Lỗi:', error); // In ra lỗi cụ thể
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
      console.log('123x');
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
                        href="ecommerce-product-details.html"
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
    .catch((error) => {
      console.error('Lỗi:', error); // In ra lỗi cụ thể
    });
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
                        href="ecommerce-product-details.html"
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
    .catch((error) => {
      console.error('Lỗi:', error); // In ra lỗi cụ thể
    });
});