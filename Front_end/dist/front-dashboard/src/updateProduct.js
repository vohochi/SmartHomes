import { updateProduct } from './products.js';
import { Product } from '../models/productsModel.js';
document.getElementById('updateProduct').addEventListener('click', () => {
    const id = document.getElementById('id').value;
    const name = document.getElementById('name').value;
    const description = document.getElementById('description')
        .textContent;
    const image = document.getElementById('image').files[0]
        .name;
    const price = Number(document.getElementById('price').value);
    const quantity = Number(document.getElementById('quantity').value);
    const category = document.getElementById('category')
        .value;
    updateProduct
        .update(id, new Product(name, description, image, price, quantity, category))
        .then((data) => {
        window.location.reload();
    })
        .catch((error) => {
        console.error('Lỗi:', error);
    });
});
