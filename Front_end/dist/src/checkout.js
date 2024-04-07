var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const showCheckout = () => {
    const dataCheckout = JSON.parse(localStorage.getItem('checkout'));
    const totalPrice = JSON.parse(localStorage.getItem('total'));
    const checkoutPage = document.getElementById('checkout-page');
    const total = document.getElementById('total');
    total.textContent = ` ${Intl.NumberFormat('en-DE').format(totalPrice)} VNĐ`;
    console.log(dataCheckout);
    dataCheckout.map((item, index) => {
        const html = `<div class="d-flex align-items-center mb-4">
                    <div class="me-3 position-relative">
                      <span
                        class="position-absolute top-0 start-100 translate-middle badge rounded-pill badge-secondary"
                      >
                        1
                      </span>
                      <img
                        src="./assets/images/products/${item.image}"
                        style="height: 96px; width: 96x"
                        class="img-sm rounded border"
                      />
                    </div>
                    <div class="">
                      <a href="#" class="nav-link">
                       ${item.name} <br />
     $${item.price} x ${item.quantity}
                       </a>
                      <div class="price text-muted">Total: </div>
                    </div>
                  </div>`;
        checkoutPage.insertAdjacentHTML('afterbegin', html);
    });
};
showCheckout();
const bank = document.getElementById('bank');
const showBank = () => __awaiter(this, void 0, void 0, function* () {
    try {
        const res = yield fetch('https://api.vietqr.io/v2/banks');
        const { data } = yield res.json();
        return data;
    }
    catch (error) {
        throw new alert(error);
    }
});
showBank().then((data) => {
    const input_name = bank.closest('.form-outline').querySelector('input');
    input_name.addEventListener('click', () => {
        bank.style.display = 'block';
    });
    data.forEach((e) => {
        const option = document.createElement('option');
        const img = document.createElement('img');
        const bankSelect = document.createElement('div');
        bankSelect.setAttribute('id', 'bankSelect');
        img.setAttribute('src', e.logo);
        bankSelect.appendChild(img);
        bankSelect.appendChild(option);
        bank.appendChild(bankSelect);
        option.textContent = e.name;
        option.addEventListener('click', () => {
            input_name.value = option.textContent;
            bank.style.display = 'none';
        });
    });
});
const userData = JSON.parse(localStorage.getItem('user'));
const emails = document.getElementById('email');
emails.value = userData.email;
window.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById('form');
    form.onsubmit = (e) => {
        e.preventDefault();
        const emails = document.getElementById('email');
        const name = document.getElementById('fullName');
        const phone = document.getElementById('phoneNumber');
        const address = document.getElementById('address');
        const village = document.getElementById('village');
        const city = document.getElementById('city');
        let banks = document.getElementById('bank');
        let note1 = document.getElementById('note');
        const note = note1.value;
        let bank = banks.parentElement.querySelector('input');
        const district = document.getElementById('district');
        const zip = document.getElementById('zip');
        let isValid = true;
        function showError(input, message) {
            input.className = 'form-control error';
            let div = input.parentElement.classList.add('error');
            isValid = false;
        }
        function showSuccess(input) {
            input.className = 'form-control success';
            let div = input.parentElement.classList.remove('error');
        }
        function checkRequired(inputs) {
            inputs.forEach(function (input) {
                if (input.value.trim() == '') {
                    showError(input, `${getFieldName(input)} is required`);
                }
                else {
                    showSuccess(input);
                }
            });
        }
        function getFieldName(input) {
            return input.id.charAt(0).toUpperCase() + input.id.slice(1);
        }
        let selectedDeliveryOption = '';
        document
            .querySelectorAll("input[name='flexRadioDefault']")
            .forEach((radio) => {
            radio.addEventListener('change', function () {
                if (this.checked) {
                    const label = this.nextElementSibling;
                    if (label) {
                        selectedDeliveryOption = label.cloneNode(true).textContent.trim();
                        console.log(selectedDeliveryOption);
                    }
                }
            });
        });
        checkRequired([
            name,
            emails,
            city,
            district,
            phone,
            address,
            village,
            zip,
            bank,
        ]);
        const dataCheckout = JSON.parse(localStorage.getItem('checkout'));
        if (isValid) {
            const totalPrice = JSON.parse(localStorage.getItem('total'));
            const checkoutData = {
                email: emails.value,
                name: name.value,
                phone: phone.value,
                district: district.value,
                address: address.value,
                village: village.value,
                city: city.value,
                bank: bank.value,
                zip: zip.value,
                data: dataCheckout,
                note: note,
                ship: selectedDeliveryOption,
                totalPrice: Intl.NumberFormat('en-DE').format(totalPrice),
            };
            postCheckoutData(JSON.stringify(checkoutData));
        }
    };
});
function postCheckoutData(checkoutData) {
    return __awaiter(this, void 0, void 0, function* () {
        checkoutData = JSON.parse(checkoutData);
        try {
            const response = yield fetch('http://localhost:3000/api/products/billCheckout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(checkoutData),
            });
            if (response.ok) {
                const jsonResponse = yield response.json();
                console.log(jsonResponse.message);
                window.location.href = 'invoice.html';
            }
            else {
                throw new Error('Có gì đó đã sai');
            }
        }
        catch (error) {
            console.error('Error during fetch:', error);
        }
    });
}
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
