var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { url, fetchAPI } from '../src/config/app.js';
class ProductModel {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield fetchAPI(`${url}products`);
            return data;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield fetchAPI(`${url}products/${id}`);
            if (!data) {
                throw new Error('Không tìm thấy danh mục');
            }
            return data;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const data1 = yield fetchAPI(`${url}products`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
            });
            if (!data1) {
                throw new Error('Lỗi tạo danh mục');
            }
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const data1 = yield fetchAPI(`${url}products/${id}`, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
            });
            if (!data1) {
                throw new Error('Lỗi cập nhật danh mục');
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield fetchAPI(`${url}products/${id}`, {
                method: 'DELETE',
            });
            if (!data) {
                throw new Error('Lỗi xóa danh mục');
            }
            else {
                alert('Xóa thành công');
                window.location.reload();
            }
        });
    }
    searchValue(value) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield fetchAPI(`${url}products?q=${value}`);
            return data;
        });
    }
    sortValue(value) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield fetchAPI(`${url}products?_sort=${value}`);
            return data;
        });
    }
}
export const addProduct = new ProductModel();
export const updateProduct = new ProductModel();
const deleteProduct = new ProductModel();
const searchProduct = new ProductModel();
const sortProduct = new ProductModel();
export const filterProduct = new ProductModel();
export const paginationProduct = new ProductModel();
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
                  <td>${new Intl.NumberFormat('de-DE').format(product.price)}</td>
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
    console.error('Lỗi:', error);
});
window.addEventListener('click', () => {
    const target = event.target;
    const id = target.parentElement.dataset.id;
    if (!id) {
        return;
    }
    deleteProduct.delete(id);
});
window.addEventListener('keyup', () => {
    const target = event.target;
    const search = document.getElementById('datatableSearch');
    if (!search)
        return;
    searchProduct
        .searchValue(search.value)
        .then((data, page = 1) => {
        const PAGE_SIZE = 16;
        const current_page = page;
        const startIndex = (current_page - 1) * PAGE_SIZE;
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
                  <td>${new Intl.NumberFormat('de-DE').format(product.price)}</td>
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
        console.error('Lỗi:', error);
    });
});
window.addEventListener('change', () => {
    const target = event.target;
    const sort = document.getElementById('sort');
    if (!sort)
        return;
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
                  <td>${new Intl.NumberFormat('de-DE').format(product.price)}</td>
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
        console.error('Lỗi:', error);
    });
});
