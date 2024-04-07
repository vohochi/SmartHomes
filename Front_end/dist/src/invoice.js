var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetchAPI, url } from './app.js';
const address1 = document.getElementById('addressPayment');
const pay = document.getElementById('paymentMethod');
const bill = document.getElementById('billOrder');
const showAddress = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = fetchAPI(`${url}/products/billCheckout`);
    const user = JSON.parse(localStorage.getItem('user'));
    res.then((data) => {
        const bills = data.filter((bill) => {
            return bill.email == user.email;
        });
        const addressItem = bills[0];
        console.log(addressItem);
        address1.innerHTML = `              <div class="row">
                <div class="col-sm-6 mb-4 mb-sm-7">
                  <!-- Radio Checkbox -->
                  <div
                    class="custom-control custom-radio custom-control-inline w-100 h-100"
                  >
                    <label class="custom-control-label" for="billingRadio1">
                      <span class="h4 d-block">Billing address </span>
                      <p>#${addressItem._id}</p>

                      <span class="d-block mb-2">
                        ${addressItem.address}<br />
                        ${addressItem.village}<br />
                        ${addressItem.district}<br />
                        ${addressItem.city}
                      </span>

                      <a
                        class="btn btn-sm btn-white"
                        href="account-settings.html#accountType"
                      >
                        <i class="tio-edit mr-1"></i> Edit address
                      </a>
                    </label>
                  </div>
                  <!-- End Radio Checkbox -->
                </div>

                <div class="col-sm-6 mb-4 mb-sm-7">
                  <!-- Radio Checkbox -->
                  <div
                    class="custom-control custom-radio custom-control-inline w-100 h-100"
                  >
                    <input
                      type="radio"
                      id="billingRadio2"
                      name="billingRadio"
                      class="custom-control-input"
                    />
                    <label class="custom-control-label" for="billingRadio2">
             

                      <span class="d-block mb-2">
                        ${addressItem.email}<br />
                        ${addressItem.phone}<br />
                       ${addressItem.ship}<br />
<hr>                        
<h3>Note</h3>
<p>                       ${addressItem.note}
</p>
                      </span>

                   
                    </label>
                  </div>
                  <!-- End Radio Checkbox -->
                </div>

                <div class="col-sm-6 mb-4 mb-sm-7">
                  <!-- Card -->
                  <a
                    class="card card-dashed h-100"
                    href="javascript:;"
                    data-toggle="modal"
                    data-target="#addAddressModal"
                  >
                    <div class="card-body card-body-centered card-dashed-body">
                      <span class="text-primary text-hover-primary">
                        <i class="tio-add"></i> Add a new address
                      </span>
                    </div>
                  </a>
                  <!-- End Card -->
                </div>
              </div>`;
    });
});
showAddress();
const showPayment = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = fetchAPI(`${url}/products/billCheckout`);
    const user = JSON.parse(localStorage.getItem('user'));
    res.then((data) => {
        const bills = data.filter((bill) => {
            return bill.email == user.email;
        });
        const addressItem = bills[0];
        console.log(addressItem);
        pay.innerHTML = `<ul class="list-group mb-3">
                <!-- List Item -->
                <li class="list-group-item">
                  <h4>
                    ${addressItem.name}
                    <span
                      class="badge badge-primary badge-pill text-uppercase ml-1"
                      >Primary</span
                    >
                  </h4>

                  <div class="media">
                    <img
                      class="avatar avatar-sm avatar-4by3 mr-3"
                      src="assets\svg\brands\mastercard.svg"
                      alt="Image Description"
                    />

                    <div class="media-body">
                      <div class="row">
                        <div class="col-sm mb-2 mb-sm-0">
                          <span class="d-block text-dark"
                            >${addressItem.bank} •••• 4242</span
                          >
                          <small class="d-block text-muted"
                            >Kiểm tra - Hết hạn ${addressItem.createdAt}</small
                          >
                        </div>

                        <div class="col-sm-auto">
                          <div class="d-flex justify-content-sm-end">
                            <a
                              class="btn btn-xs btn-white mr-2"
                              href="javascript:;"
                              data-toggle="modal"
                              data-target="#editCardModal"
                            >
                              <i class="tio-edit mr-1"></i> Edit
                            </a>

                            <button type="button" class="btn btn-xs btn-white">
                              <i class="tio-delete-outlined mr-1"></i> Delete
                            </button>
                          </div>
                        </div>
                      </div>
                      <!-- End Row -->
                    </div>
                  </div>
                </li>
                <!-- End List Item -->

                <!-- List Item -->

                <!-- End List Item -->
              </ul>`;
    });
});
showPayment();
const showBill = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = fetchAPI(`${url}/products/billCheckout`);
    const user = JSON.parse(localStorage.getItem('user'));
    res.then((data) => {
        const bills = data.filter((bill) => {
            return bill.email == user.email;
        });
        bills.map((b) => {
            bill.innerHTML += `    <tr>
                    <td><a href="#">#${b._id}</a></td>
                    <td>${b.totalPrice}</td>
                    <td>Chuyển khoản</td>
                    <td><a href="#">${b.createdAt}</a></td>
                    <td>
                      <a class="btn btn-sm btn-white" href="#">
<button class="btn btn-secondary"> ${b.orderStatus}</button>                      </a>
                    </td>
                    <td>
                      <a
                        class="btn btn-sm btn-white"
                        href="javascript:;"
                        data-toggle="modal"
                        data-target="#invoiceReceiptModal"
                      >
                        <i class="tio-visible-outlined mr-1"></i> Quick view
                      </a>
                    </td>
                  </tr>`;
        });
    });
});
showBill();
document.addEventListener('DOMContentLoaded', function () {
    const userActionButton = document.getElementById('user-action-btn');
    const userData = JSON.parse(localStorage.getItem('user'));
    const logoutButton = document.getElementById('logout-btn');
    if (userData && userData.img) {
        userActionButton.innerHTML = `<img src="../../public/images/${userData.img}" id="userProfile" alt="User Image">`;
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
