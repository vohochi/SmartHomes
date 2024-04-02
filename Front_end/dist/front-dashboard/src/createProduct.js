import { addProduct } from './products.js';
import { Product } from '../models/productsModel.js';
document.getElementById('addProduct').addEventListener('click', () => {
    const name = document.getElementById('name').value;
    const description = document.getElementById('description')
        .textContent;
    const image = document.getElementById('image').src;
    const price = Number(document.getElementById('price').value);
    const quantity = Number(document.getElementById('quantity').value);
    const category = document.getElementById('category')
        .value;
    addProduct
        .create(new Product(name, description, image, price, quantity, category))
        .then((data) => {
        window.location.reload();
    })
        .catch((error) => {
        console.error('Lỗi:', error);
    });
});
