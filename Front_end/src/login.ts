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

fetch('http://localhost:3000/api/users')
  .then((res) => res.json())
  .then((users: User[]) => {
    // Type 'users' as an array of User objects
    console.log(users);

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

    // Check required fields
    function checkRequired(inputArr: FormField[]) {
      inputArr.forEach(function (input) {
        if (input.value.trim() == '') {
          showError(input, `${getFieldName(input)} is yêu cầu`);
        } else {
          showSuccess(input);
        }
      });
    }

    // Get fieldname
    function getFieldName(input: FormField) {
      return input.id.charAt(0).toUpperCase() + input.id.slice(1);
    }

    const matchedUser = () => {
      // Use an arrow function for conciseness
      const foundUser = users.find(
        (u) => u.username == user.value && u.password == pass.value
      );

      if (foundUser) {
        form.submit();
        location.href = 'index.html';
      }
    };

    // Event listeners
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      checkRequired([user, pass]);
      matchedUser();
    });
  });
