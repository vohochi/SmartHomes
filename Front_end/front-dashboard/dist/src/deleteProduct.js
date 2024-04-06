import { deleteProduct } from './products.js';
import { Product } from '../models/productsModel.js';
document.getElementById('updateProduct').addEventListener('click', () => {
    const id = document.getElementById('id').value;
    const name = document.getElementById('name').value;
    const description = document.getElementById('description')
        .textContent;
    const image = document.getElementById('image').alt;
    const price = Number(document.getElementById('price').value);
    const quantity = Number(document.getElementById('quantity').value);
    const category = document.getElementById('category')
        .value;
    let size1 = document.getElementById('size');
    size1 = size1.querySelector('span > span > span > span');
    const size = size1.getAttribute('title');
    deleteProduct
        .delete(id, new Product(name, description, image, price, quantity, category, size))
        .then((data) => {
        window.location.reload();
    })
        .catch((error) => {
        console.error('Lỗi:', error);
    });
});
