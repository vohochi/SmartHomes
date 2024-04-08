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
class CategoryModel {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield fetchAPI(`${url}products/billCheckout`);
            return data;
        });
    }
    confirmBIll(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetchAPI(`${url}products/confirmCheckout/${id}`, {
                method: 'PATCH',
            });
            if (response) {
                window.location.reload();
            }
        });
    }
    update(id, formData) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetchAPI(`${url}categories/update/${id}`, {
                method: 'PUT',
                body: formData,
            });
            if (response) {
                window.location.reload();
            }
            else {
                const errorData = yield response.json();
            }
        });
    }
}
const billCheckout = document.getElementById('billCheckout');
const showAll = new CategoryModel();
showAll.getAll().then((data) => {
    data.map((bill) => {
        billCheckout.innerHTML += `<tr>
                  <td class="table-column-pr-0">
                    <div class="custom-control custom-checkbox">
                      <input type="checkbox" class="custom-control-input" id="ordersCheck1">
                      <label class="custom-control-label" for="ordersCheck1"></label>
                    </div>
                  </td>
                  <td class="table-column-pl-0">
                    <a href="ecommerce-order-details.html">#${bill._id}</a>
                  </td>
                  <td>${bill.createdAt} (ET)</td>
                  <td>
<a class="text-body" href="ecommerce-customer-details.html" title="${bill.email}">${bill.email}</a>                  </td>
                
                  <td>
                    <span class="badge badge-soft-info">
                      <span class="legend-indicator bg-info"></span>${bill.paymentStatus}
                    </span>
                  </td>
                  <td>
                    <div class="d-flex align-items-center">
                      <img class="avatar avatar-xss avatar-4by3 mr-2" src="./assets/svg/brands/mastercard.svg" alt="Image Description">
                      <span class="text-dark">&bull;&bull;&bull;&bull; 4242</span>
                    </div>
                  </td>
                  <td>${bill.totalPrice}</td>
                  <td>
                    <div class="btn-group" role="group">
                      <a class="btn btn-sm btn-success" id="${bill._id}" >
                        <i class="tio-visible-outlined"></i> Xác nhận
                      </a>
                         <a class="btn btn-sm btn-white" >
                        <i class="tio-visible-outlined"></i> view
                      </a>
                      
                      <!-- Unfold -->
                      <div class="hs-unfold btn-group">
                        <a class="js-hs-unfold-invoker btn btn-icon btn-sm btn-white dropdown-toggle dropdown-toggle-empty" href="javascript:;" data-hs-unfold-options='{
                             "target": "#ordersExportDropdown1",
                             "type": "css-animation",
                             "smartPositionOffEl": "#datatable"
                           }'></a>

                        <div id="ordersExportDropdown1" class="hs-unfold-content dropdown-unfold dropdown-menu dropdown-menu-right mt-1">
                          <span class="dropdown-header">Options</span>
                          <a class="js-export-copy dropdown-item" href="javascript:;">
                            <img class="avatar avatar-xss avatar-4by3 mr-2" src="assets\svg\illustrations\copy.svg" alt="Image Description">
                            Copy
                          </a>
                          <a class="js-export-print dropdown-item" href="javascript:;">
                            <img class="avatar avatar-xss avatar-4by3 mr-2" src="assets\svg\illustrations\print.svg" alt="Image Description">
                            Print
                          </a>
                          <div class="dropdown-divider"></div>
                          <span class="dropdown-header">Download options</span>
                          <a class="js-export-excel dropdown-item" href="javascript:;">
                            <img class="avatar avatar-xss avatar-4by3 mr-2" src="assets\svg\brands\excel.svg" alt="Image Description">
                            Excel
                          </a>
                          <a class="js-export-csv dropdown-item" href="javascript:;">
                            <img class="avatar avatar-xss avatar-4by3 mr-2" src="assets\svg\components\placeholder-csv-format.svg" alt="Image Description">
                            .CSV
                          </a>
                          <a class="js-export-pdf dropdown-item" href="javascript:;">
                            <img class="avatar avatar-xss avatar-4by3 mr-2" src="assets\svg\brands\pdf.svg" alt="Image Description">
                            PDF
                          </a>
                          <div class="dropdown-divider"></div>
                          <a class="dropdown-item" href="javascript:;">
                            <i class="tio-delete-outlined dropdown-item-icon"></i> Delete
                          </a>
                        </div>
                      </div>
                      <!-- End Unfold -->
                    </div>
                  </td>
                </tr>
`;
        const btnSuccess = document.querySelectorAll('.btn-success');
        btnSuccess.forEach((el) => {
            if (bill.paymentStatus == 'fulfilled') {
                console.log(el);
                el.className = 'btn btn-sm btn-light';
                el.textContent = 'Đã Thanh toán';
            }
        });
    });
});
const confirmBIll = new CategoryModel();
window.addEventListener('click', (e) => {
    const target = event.target;
    const btnSuccess = target.getAttribute('class');
    const id = target.getAttribute('id');
    if (btnSuccess == 'btn btn-sm btn-success') {
        confirmBIll.confirmBIll(id);
    }
});
