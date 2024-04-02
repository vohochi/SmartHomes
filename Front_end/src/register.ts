const form = document.getElementById('form') as HTMLFormElement;
const username = document.getElementById('username') as HTMLElement;
const email = document.getElementById('email') as HTMLElement;
const password = document.getElementById('password') as HTMLElement;
const password2 = document.getElementById('password2');

// Get fieldname
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event listeners
form.addEventListener('submit', function (e) {
  e.preventDefault();

  let isValid = true; // Assume form is valid initially

  // Validation functions
  function showError(input, message) {
    const formControl = input;
    formControl.className = 'form-control error';
    const small = formControl.parentElement.querySelector('small');
    small.innerText = message;
    isValid = false; // Set form as invalid
  }

  function showSuccess(input) {
    const formControl = input;
    console.log(input);
    formControl.className = 'form-control success';
    const small = formControl.parentElement.querySelector('small');
    small.innerText = '';
  }

  function checkEmail(input) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim().toLowerCase())) {
      showSuccess(input);
    } else {
      showError(input, 'Email is not valid');
    }
  }

  function checkRequired(inputs) {
    inputs.forEach(function (input) {
      if (input.value.trim() === '') {
        showError(input, `${getFieldName(input)} is required`);
      } else {
        showSuccess(input);
      }
    });
  }

  function checkLength(input, min, max) {
    if (input.value.length < min) {
      showError(
        input,
        `${getFieldName(input)} must be at least ${min} characters`
      );
    } else if (input.value.length > max) {
      showError(
        input,
        `${getFieldName(input)} must be less than ${max} characters`
      );
    } else {
      showSuccess(input);
    }
  }

  function checkPasswordsMatch(input1, input2) {
    if (input1.value !== input2.value) {
      showError(input2, 'Passwords do not match');
    }
  }

  function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
  }

  // Run validations
  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(password, password2);

  if (isValid) {
    form.submit(); // Gửi form nếu dữ liệu hợp lệ
    window.location.href = 'login.html';
  }
});
