import { Product } from './../front-dashboard/models/productsModel';
export const url = 'http://localhost:3000/api';

//   viết hàm fetch
export const fetchAPI = async (url: string, option?: any) => {
  const response = await fetch(url, option);
  if (!response.ok) {
    throw new Error('Error');
  }
  return response.json();
};

interface IProduct {
  id: number;
  category: string;
  name: string;
  price: number;
  get price_sale(): number;
  set price_sale(value: number);
  image: string;
  image_hover: string;
  description: string;
  quantity: number;
  category_id: number;
}
export class Products implements IProduct {
  constructor(
    public id: number,
    public category: string,
    public name: string,
    public price: number,
    private _price_sale: number,
    public image: string,
    public image_hover: string,
    public description: string,
    public quantity: number,
    public category_id: number
  ) {}
  get price_sale(): number {
    return this._price_sale;
  }

  set price_sale(value: number) {
    if (value < 0 || value > this.price) {
      throw new Error('Giá giảm giá không hợp lệ!');
    }
    this._price_sale = value;
  }
  async showProducts(): Promise<Product[]> {
    let data = await fetchAPI(`${url}/products`);
    return data;
  }
}
