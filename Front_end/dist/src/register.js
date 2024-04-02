const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
form.addEventListener('submit', function (e) {
    e.preventDefault();
    let isValid = true;
    function showError(input, message) {
        const formControl = input;
        formControl.className = 'form-control error';
        const small = formControl.parentElement.querySelector('small');
        small.innerText = message;
        isValid = false;
    }
    function showSuccess(input) {
        const formControl = input;
        console.log(input);
        formControl.className = 'form-control success';
        const small = formControl.parentElement.querySelector('small');
        small.innerText = '';
    }
    function checkEmail(input) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(input.value.trim().toLowerCase())) {
            showSuccess(input);
        }
        else {
            showError(input, 'Email is not valid');
        }
    }
    function checkRequired(inputs) {
        inputs.forEach(function (input) {
            if (input.value.trim() === '') {
                showError(input, `${getFieldName(input)} is required`);
            }
            else {
                showSuccess(input);
            }
        });
    }
    function checkLength(input, min, max) {
        if (input.value.length < min) {
            showError(input, `${getFieldName(input)} must be at least ${min} characters`);
        }
        else if (input.value.length > max) {
            showError(input, `${getFieldName(input)} must be less than ${max} characters`);
        }
        else {
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
    checkRequired([username, email, password, password2]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPasswordsMatch(password, password2);
    if (isValid) {
        form.submit();
        window.location.href = 'login.html';
    }
});
