const form1 = document.getElementById('form');
const user = document.getElementById('username');
const pass = document.getElementById('password');
let state;
fetch('http://localhost:3000/api/users')
    .then((res) => res.json())
    .then((users) => {
    console.log(users);
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
    function checkRequired(inputArr) {
        inputArr.forEach(function (input) {
            if (input.value.trim() == '') {
                showError(input, `${getFieldName(input)} is yêu cầu`);
            }
            else {
                showSuccess(input);
            }
        });
    }
    function getFieldName(input) {
        return input.id.charAt(0).toUpperCase() + input.id.slice(1);
    }
    const matchedUser = () => {
        const foundUser = users.find((u) => u.username == user.value && u.password == pass.value);
        if (foundUser) {
            form.submit();
            location.href = 'index.html';
        }
    };
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        checkRequired([user, pass]);
        matchedUser();
    });
});
