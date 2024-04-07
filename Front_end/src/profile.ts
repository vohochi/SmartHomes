import { url, fetchAPI } from './app.js';
const token = localStorage.getItem('token');
window.addEventListener('DOMContentLoaded', (event) => {
  // Viết mã JavaScript của bạn ở đây.
  async function Data(): Promise<any> {
    try {
      const response = await fetch(`${url}/users/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }
  Data().then((data) => {
    const profile = document.getElementById('profile');
    profile.innerHTML = `  <div class="main-body">
        <div class="row">
          <div class="col-lg-4">
            <div class="card">
              <div class="card-body">
                <div
                  class="d-flex flex-column align-items-center text-center"
                  id=""
                >
                  <img
                    src="../public/images/${data.img}"
                    alt="Admin"
                    class="rounded-circle p-1 bg-primary"
                    width="110"
                  />
                  <div class="mt-3">
                    <h4>${data.username}</h4>
                    <p class="text-secondary mb-1">Full Stack Developer</p>
                    <p class="text-muted font-size-sm">
                     Email: ${data.email}
                    </p>
                    <button class="btn btn-primary">Follow</button>
                    <button class="btn btn-outline-primary">Message</button>
                  </div>
                </div>
                <hr class="my-4" />
                <ul class="list-group list-group-flush">
                  <li
                    class="list-group-item d-flex justify-content-between align-items-center flex-wrap"
                  >
                    <h6 class="mb-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-globe me-2 icon-inline"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="2" y1="12" x2="22" y2="12"></line>
                        <path
                          d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
                        ></path></svg
                      >Website
                    </h6>
                    <span class="text-secondary">https://bootdey.com</span>
                  </li>
                  <li
                    class="list-group-item d-flex justify-content-between align-items-center flex-wrap"
                  >
                    <h6 class="mb-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-github me-2 icon-inline"
                      >
                        <path
                          d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
                        ></path></svg
                      >Github
                    </h6>
                    <span class="text-secondary">bootdey</span>
                  </li>
                  <li
                    class="list-group-item d-flex justify-content-between align-items-center flex-wrap"
                  >
                    <h6 class="mb-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-twitter me-2 icon-inline text-info"
                      >
                        <path
                          d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"
                        ></path></svg
                      >Twitter
                    </h6>
                    <span class="text-secondary">@bootdey</span>
                  </li>
                  <li
                    class="list-group-item d-flex justify-content-between align-items-center flex-wrap"
                  >
                    <h6 class="mb-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-instagram me-2 icon-inline text-danger"
                      >
                        <rect
                          x="2"
                          y="2"
                          width="20"
                          height="20"
                          rx="5"
                          ry="5"
                        ></rect>
                        <path
                          d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
                        ></path>
                        <line
                          x1="17.5"
                          y1="6.5"
                          x2="17.51"
                          y2="6.5"
                        ></line></svg
                      >Instagram
                    </h6>
                    <span class="text-secondary">bootdey</span>
                  </li>
                  <li
                    class="list-group-item d-flex justify-content-between align-items-center flex-wrap"
                  >
                    <h6 class="mb-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-facebook me-2 icon-inline text-primary"
                      >
                        <path
                          d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
                        ></path></svg
                      >Facebook
                    </h6>
                    <span class="text-secondary">bootdey</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-lg-8">
            <div class="card">
             <form id="form" method="POST">
              <div class="card-body">
                <div class="row mb-3">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Họ & tên</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    <input type="text" class="form-control" placeholder="text here" id="fullName" />
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Email</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    <input
                      type="text"
                      class="form-control" id="email"
                      value="${data.email}"
                      readonly
                    />
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Điện thoại</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    <input
                      type="text"
                      class="form-control"
    placeholder="(+84) 357 473 205"
                      id="phone"
                    />
                  </div>
                </div>
         
                <div class="row mb-3">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Ngày sinh</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    <input
                      type="date"
                      class="form-control"
                      id="date"
                    />
                  </div>
                </div>
                    <div class="row mb-3">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Địa chỉ</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="BMT, ..."
                      id="address"
                    />
                  </div>
                </div>
                    <div class="row mb-3">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Liên kết & ngân hàng</h6>
                  </div>
                  <div class="col-sm-9 text-secondary form-outline">
                 <input
                              type="text"
                              placeholder="TP.Bank"
                              class="form-control"
                            />
                            <div id="bank"></div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-3"></div>
                  <div class="col-sm-9 text-secondary">
                    <input
                      id="submit"
                      class="btn btn-primary px-4"
                      value="Save Changes"
                    />
                  </div>
                </div>
              </div> </form>
            </div>
         
          </div>
        </div>
      </div>`;

    // lay phan tu
    const form = document.getElementById('form') as HTMLFormElement;
    const submit = document.getElementById('submit') as HTMLFormElement;
    submit.addEventListener('click', (e) => {
      console.log('ok');
      e.preventDefault();
      const email = document.getElementById('email') as HTMLInputElement;
      const fullName = document.getElementById('fullName') as HTMLInputElement;
      const phone = document.getElementById('phone') as HTMLInputElement;
      const address = document.getElementById('address') as HTMLInputElement;
      let banks = document.getElementById('bank') as HTMLInputElement;
      let date = document.getElementById('date') as HTMLInputElement;
      let bank = banks.parentElement.querySelector('input');

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

      function getFieldName(input) {
        return input.id.charAt(0).toUpperCase() + input.id.slice(1);
      }

      checkRequired([fullName, email, phone, address, bank, date]);
      if (isValid) {
        const checkoutData = {
          email: email.value,
          fullName: fullName.value,
          phone: phone.value,
          address: address.value,
          bank: bank.value,
          date: date.value,
        };
        console.log(checkoutData);
        postCheckoutData(JSON.stringify(checkoutData));
      }
      // post
      async function postCheckoutData(checkoutData) {
        // Lấy giá trị từ form
        checkoutData = JSON.parse(checkoutData);

        try {
          // Gửi yêu cầu POST đến server
          const response = await fetch(`${url}/users/profile`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(checkoutData),
          });

          // Xử lý phản hồi từ server
          if (response.ok) {
            const jsonResponse = await response.json();
            console.log(jsonResponse.message);
            alert('Đã cập nhật thông tin người dùng thành công');
            window.location.href = 'index.html';
          } else {
            throw new Error('Có gì đó đã sai');
          }
        } catch (error) {
          console.error('Error during fetch:', error);
        }
      }
    });

    const bank = document.getElementById('bank') as HTMLInputElement;

    const showBank = async () => {
      try {
        const res = await fetch('https://api.vietqr.io/v2/banks');
        const { data } = await res.json();
        return data;
      } catch (error) {
        throw new alert(error);
      }
    };

    showBank().then((data) => {
      const input_name = bank.closest('.form-outline').querySelector('input');
      console.log(input_name);
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
  });
});
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
