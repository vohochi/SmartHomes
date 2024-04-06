import { updateProduct } from './products.js';
// import { Product } from '../models/productsModel.js';
// Thêm sự kiện click cho nút cập nhật sản phẩm
const upPro = document.getElementById('updateProduct');
upPro.addEventListener('click', () => {
  // Assuming you are on the page with the URL containing the query parameter
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('editPro'); // This should give you the string '66'

  if (id !== null) {
    // Now you have the ID as a string, you can use it as needed
    console.log(id); // Outputs: 66
    // If you need it as a number, you can convert it
    const idNumber = parseInt(id, 10);
  }
  const name = (<HTMLInputElement>document.getElementById('name')).value;
  const description = document
    .getElementById('description')
    .querySelector('p').textContent;
  console.log(description);
  const imageInput = document.getElementById('image') as HTMLInputElement;
  const image = imageInput.files ? imageInput.files[0] : null;
  console.log(image);
  const price = Number(
    (<HTMLInputElement>document.getElementById('price')).value
  );
  const quantity = Number(
    (<HTMLInputElement>document.getElementById('quantity')).value
  );
  const category = (<HTMLInputElement>document.getElementById('category'))
    .value;
  let size1 = <HTMLElement>document.getElementById('size');
  // const image = img.split('/').pop(); // Lấy phần cuối cùng của URL
  size1 = size1.querySelector('span > span > span > span');
  const size = size1.getAttribute('title');
  // const image = img.split('/').pop(); // Lấy phần cuối cùng của URL
  const formData = new FormData();

  formData.append('name', name);
  formData.append('description', description);
  if (image) {
    formData.append('image', image);
  }
  formData.append('price', price.toString());
  formData.append('quantity', quantity.toString());
  formData.append('category', category);
  if (size) {
    formData.append('size', size);
  }
  console.log(image);
  updateProduct
    .update(id, formData)
    .then((data) => {
      window.location.href = '../front-dashboard/ecommerce-products.html';
    })
    .catch((error) => {
      console.error('Lỗi:', error); // In ra lỗi cụ thể
    });
});
