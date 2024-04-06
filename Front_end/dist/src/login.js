const form1 = document.getElementById('form');
const user = document.getElementById('username');
const pass = document.getElementById('password');
let state;
function showError(input, message) {
    const small = input.parentElement.querySelector('small');
    input.className = 'form-control error';
    small.innerText = message;
    small.style.visibility = 'visible';
    state = false;
}
function showSuccess(input) {
    const small = input.parentElement.querySelector('small');
    input.className = 'form-control success';
    small.innerText = '';
    state = true;
}
function getFieldNames(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
function checkRequired(inputArr) {
    inputArr.forEach(function (input) {
        if (input.value.trim() == '') {
            showError(input, getFieldNames(input));
        }
        else {
            showSuccess(input);
        }
    });
}
form1.addEventListener('submit', function (e) {
    e.preventDefault();
    checkRequired([user, pass]);
    if (state) {
        const userData = {
            username: user.value,
            password: pass.value,
        };
        fetch('http://localhost:3000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
            .then(function (response) {
            return response.json();
        })
            .then(function (data) {
            if (data.success) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                window.location.href = 'index.html';
            }
            else {
                alert('Username hoặc mật khẩu không hợp lệ');
            }
        })
            .catch(function (error) {
            console.error('Error:', error);
        });
    }
});
