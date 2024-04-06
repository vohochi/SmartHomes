import { addProduct } from './products.js';
document.getElementById('addProduct').addEventListener('click', () => {
    const name = document.getElementById('name').value;
    const description = document
        .getElementById('description')
        .querySelector('p').textContent;
    console.log(description);
    const imageInput = document.getElementById('image');
    const image = imageInput.files ? imageInput.files[0] : null;
    console.log(image);
    const price = Number(document.getElementById('price').value);
    const quantity = Number(document.getElementById('quantity').value);
    const category = document.getElementById('category')
        .value;
    let size1 = document.getElementById('size');
    size1 = size1.querySelector('span > span > span > span');
    const size = size1.getAttribute('title');
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
    addProduct
        .create(formData)
        .then((data) => {
        window.location.href = '../front-dashboard/ecommerce-products.html';
    })
        .catch((error) => {
        console.error('Lỗi:', error);
    });
});
