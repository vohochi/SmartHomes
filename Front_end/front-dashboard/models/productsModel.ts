export class Product {
  id: string;
  name: string;
  description: string;
  image: any;
  price: number;
  quantity: number;
  category: string; // Tham chiếu đến Category
  size: string;

  constructor(
    name: string,
    description: string,
    image: any,
    price: number,
    quantity: number,
    category: string,
    size: string
  ) {
    this.name = name;
    this.description = description;
    this.image = image;
    this.price = price;
    this.quantity = quantity;
    this.category = category;
    this.size = size;
  }
}
export interface IProductInterface {
  getAll(): Promise<Product[]>;
  getById(id: string): Promise<Product>;
  create(data: FormData): Promise<void>;
  update(id: string, data: FormData): Promise<void>;
  delete(id: string): Promise<void>;
}
