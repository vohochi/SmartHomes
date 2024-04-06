//https://api.vietqr.io/v2/banks

const showCheckout = () => {
  // get local storage
  const dataCheckout = JSON.parse(localStorage.getItem('checkout'));
  const totalPrice = JSON.parse(localStorage.getItem('total'));

  // show checkout page
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
const bank = document.getElementById('bank') as HTMLInputElement;

const showBank = async () => {
  try {
    const res = await fetch('https://api.vietqr.io/v2/banks');
    const { data } = await res.json();
    // console.log(data);
    return data;
  } catch (error) {
    throw new alert(error);
  }
};
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
    // console.log(bank);
    option.textContent = e.name;
    option.addEventListener('click', () => {
      input_name.value = option.textContent;
      bank.style.display = 'none';
    });
  });
});
const userData = JSON.parse(localStorage.getItem('user'));
const emails = document.getElementById('email') as HTMLInputElement;
emails.value = userData.email;

// checkout.ts
window.addEventListener('DOMContentLoaded', (event) => {
  const form = document.getElementById('form') as HTMLFormElement;
  form.onsubmit = (e: SubmitEvent) => {
    e.preventDefault();
    const emails = document.getElementById('email') as HTMLInputElement;
    const name = document.getElementById('fullName') as HTMLInputElement;
    const phone = document.getElementById('phoneNumber') as HTMLInputElement;
    const address = document.getElementById('address') as HTMLInputElement;
    const village = document.getElementById('village') as HTMLInputElement;
    const city = document.getElementById('city') as HTMLElement;
    let banks = document.getElementById('bank') as HTMLInputElement;
    let note1 = document.getElementById('note') as HTMLInputElement;
    const note = note1.value;
    let bank = banks.parentElement.querySelector('input');

    const district = document.getElementById('district') as HTMLInputElement;
    const zip = document.getElementById('zip') as HTMLInputElement;
    // Bạn có thể thêm xử lý cho các trường khác tương tự

    // Giả sử bạn cần kiểm tra xem tên có rỗng không
    let isValid = true;
    // Validation functions
    function showError(input, message) {
      input.className = 'form-control error';
      let div = input.parentElement.classList.add('error');

      isValid = false; // Set form as invalid
    }

    function showSuccess(input) {
      input.className = 'form-control success';
      let div = input.parentElement.classList.remove('error');
    }

    // function checkEmail(input) {
    //   const re =
    //     /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //   if (re.test(input.value.trim().toLowerCase())) {
    //     showSuccess(input);
    //   } else {
    //     showError(input, 'Email is not valid');
    //   }
    // }

    function checkRequired(inputs) {
      inputs.forEach(function (input) {
        if (input.value.trim() == '') {
          showError(input, `${getFieldName(input)} is required`);
        } else {
          showSuccess(input);
        }
      });
    }

    // function checkLength(input, min, max) {
    //   if (input.value.length < min) {
    //     showError(
    //       input,
    //       `${getFieldName(input)} must be at least ${min} characters`
    //     );
    //   } else if (input.value.length > max) {
    //     showError(
    //       input,
    //       `${getFieldName(input)} must be less than ${max} characters`
    //     );
    //   } else {
    //     showSuccess(input);
    //   }
    // }
    function getFieldName(input) {
      return input.id.charAt(0).toUpperCase() + input.id.slice(1);
    }
    document
      .querySelectorAll("input[name='flexRadioDefault']")
      .forEach((radio) => {
        radio.addEventListener('change', function () {
          if (this.checked) {
            // Label tương ứng với radio button được chọn
            const label = this.nextElementSibling;
            if (label) {
              // Chỉ lấy nội dung văn bản của label, không bao gồm thẻ <small>
              selectedDeliveryOption = label.cloneNode(true).textContent.trim();
              console.log(selectedDeliveryOption); // In ra console hoặc sử dụng biến này như bạn muốn
            }
          }
        });
      });
    const total = localStorage.getItem('total');
    console.log(total);
    checkRequired([name, emails, district, phone, address, village, zip, bank]);
    const dataCheckout = JSON.parse(localStorage.getItem('checkout'));
    // Tạo đối tượng data để gửi

    if (isValid) {
      const checkoutData = {
        email: emails.value,
        name: name.value,
        phone: phone.value,
        district: district.value,
        address: address.value,
        village: village.value,
        city: city.textContent,
        bank: bank.value,
        zip: zip.value,
        data: dataCheckout,
        note: note,
        ship: selectedDeliveryOption,
        totalPrice: total,
      };
      postCheckoutData(JSON.stringify(checkoutData));
    }
  };
});
// post
async function postCheckoutData(checkoutData) {
  // Lấy giá trị từ form
  checkoutData = JSON.parse(checkoutData);

  try {
    // Gửi yêu cầu POST đến server
    const response = await fetch(
      'http://localhost:3000/api/products/billCheckout',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(checkoutData),
      }
    );

    // Xử lý phản hồi từ server
    if (response.ok) {
      const jsonResponse = await response.json();
      console.log(jsonResponse.message);
      window.location.href = 'invoice.html';
    } else {
      throw new Error('Có gì đó đã sai');
    }
  } catch (error) {
    console.error('Error during fetch:', error);
  }
}

// profile
document.addEventListener('DOMContentLoaded', function () {
  const userActionButton = document.getElementById('user-action-btn');
  const userData = JSON.parse(localStorage.getItem('user'));
  const logoutButton = document.getElementById('logout-btn');

  if (userData && userData.img) {
    // Nếu người dùng đã đăng nhập, thay đổi nội dung của nút để hiển thị ảnh
    userActionButton.innerHTML = `<img src="../../public/images/${userData.img}" id="userProfile" alt="User Image">`;
    logoutButton.innerHTML = `<img src="assets/images/shutdown.png" alt="">`;
  } else {
    // Nếu người dùng chưa đăng nhập, để nguyên nút đăng nhập
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
    // Xóa token và thông tin người dùng khỏi localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Chuyển hướng người dùng về trang đăng nhập hoặc trang chủ
    window.location.href = 'login.html'; // Thay 'login.html' bằng trang đăng nhập của bạn
  });
});
// Khai báo biến để lưu trữ nội dung văn bản
let selectedDeliveryOption = '';
