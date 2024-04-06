interface User {
  username: string;
  password: string;
}

interface FormField {
  id: string;
  value: string;
  className?: string;
  parentElement: HTMLElement;
}

const form1: HTMLFormElement = document.getElementById(
  'form'
) as HTMLFormElement;
const user: HTMLInputElement = document.getElementById(
  'username'
) as HTMLInputElement;
const pass: HTMLInputElement = document.getElementById(
  'password'
) as HTMLInputElement;

let state: boolean;

// fetch('http://localhost:3000/api/users')
//   .then((res) => res.json())
//   .then((users: User[]) => {
// Type 'users' as an array of User objects
// console.log(users);

// Show input error message
function showError(input: FormField, message: string) {
  const small: HTMLElement = input.parentElement.querySelector(
    'small'
  ) as HTMLElement;
  input.className = 'form-control error';
  small.innerText = message;
  small.style.visibility = 'visible';
  state = false;
}

// Show success outline
function showSuccess(input: FormField) {
  const small: HTMLElement = input.parentElement.querySelector(
    'small'
  ) as HTMLElement;
  input.className = 'form-control success';
  small.innerText = '';
  state = true;
}
// Get fieldname
function getFieldNames(input: FormField) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
// Check required fields
function checkRequired(inputArr: FormField[]) {
  inputArr.forEach(function (input) {
    if (input.value.trim() == '') {
      showError(input, getFieldNames(input));
    } else {
      showSuccess(input);
    }
  });
}

// const matchedUser = () => {
// Use an arrow function for conciseness
// const foundUser = users.find(
//   (u) => u.username == user.value && u.password == pass.value
// );

// if (foundUser) {
//   form.submit();
//   location.href = 'index.html';
// }
// };

// Event listeners
// ...

// Event listeners
form1.addEventListener('submit', function (e) {
  e.preventDefault();
  checkRequired([user, pass]);

  if (state) {
    // Định dạng dữ liệu người dùng thành chuỗi JSON
    const userData = {
      username: user.value,
      password: pass.value,
    };

    fetch('http://localhost:3000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Thiết lập kiểu nội dung là JSON
      },
      body: JSON.stringify(userData), // Chuyển đối tượng thành chuỗi JSON
    })
      .then(function (response) {
        return response.json(); // Chuyển phản hồi thành JSON
      })
      .then(function (data) {
        if (data.success) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          window.location.href = 'index.html';
        } else {
          // Hiển thị thông báo lỗi nếu có
          alert('Username hoặc mật khẩu không hợp lệ');
        }
      })
      .catch(function (error) {
        // Xử lý lỗi
        console.error('Error:', error);
      });
  }
});
// ...
// });
