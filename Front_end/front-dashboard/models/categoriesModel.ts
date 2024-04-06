export class Category {
  id: string;
  name: string;
  quantity: number;
  image: any;
  category: string;

  constructor(name: string, quantity: number, image: any, category: string) {
    this.name = name;
    this.quantity = quantity;
    this.image = image;
    this.category = category;
  }
}
export interface ICategoryInterface {
  getAll(): Promise<Category[]>;
  getById(id: string): Promise<Category>;
  create(data: FormData): Promise<void>;
  update(id: string, data: FormData): Promise<void>;
  delete(id: string): Promise<void>;
}
