import { addProduct } from './products.js';
import { Product } from '../models/productsModel.js';

// Thêm sự kiện click cho nút thêm sản phẩm
document.getElementById('addProduct').addEventListener('click', () => {
  const name = (<HTMLInputElement>document.getElementById('name')).value;
  const description = (<HTMLInputElement>document.getElementById('description'))
    .textContent;
  const image = (<HTMLInputElement>document.getElementById('image')).src;
  const price = Number(
    (<HTMLInputElement>document.getElementById('price')).value
  );
  const quantity = Number(
    (<HTMLInputElement>document.getElementById('quantity')).value
  );
  const category = (<HTMLInputElement>document.getElementById('category'))
    .value;
  let size = (<HTMLInputElement>document.getElementById('size')).value;
  // const image = img.split('/').pop(); // Lấy phần cuối cùng của URL
  console.log(size);
  addProduct
    .create(
      new Product(name, description, image, price, quantity, category, size)
    )
    .then((data) => {
      window.location.reload();
    })
    .catch((error) => {
      console.error('Lỗi:', error); // In ra lỗi cụ thể
    });
});
