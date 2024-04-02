import { updateProduct } from './products.js';
import { Product } from '../models/productsModel.js';

// Thêm sự kiện click cho nút cập nhật sản phẩm
document.getElementById('updateProduct').addEventListener('click', () => {
  const id = (<HTMLInputElement>document.getElementById('id')).value;
  const name = (<HTMLInputElement>document.getElementById('name')).value;
  const description = (<HTMLInputElement>document.getElementById('description'))
    .textContent;
  const image = (<HTMLInputElement>document.getElementById('image')).files[0]
    .name;
  const price = Number(
    (<HTMLInputElement>document.getElementById('price')).value
  );
  const quantity = Number(
    (<HTMLInputElement>document.getElementById('quantity')).value
  );
  const category = (<HTMLInputElement>document.getElementById('category'))
    .value;
  // const image = img.split('/').pop(); // Lấy phần cuối cùng của URL

  updateProduct
    .update(
      id,
      new Product(name, description, image, price, quantity, category)
    )
    .then((data) => {
      window.location.reload();
    })
    .catch((error) => {
      console.error('Lỗi:', error); // In ra lỗi cụ thể
    });
});
