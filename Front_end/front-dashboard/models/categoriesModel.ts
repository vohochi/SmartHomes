export class Category {
  id: string;
  name: string;
  description: string;
  image: string;

  constructor(name: string, description: string, image: string) {
    this.name = name;
    this.description = description;
    this.image = image;
  }
}
export interface ICategoryInterface {
  getAll(): Promise<Category[]>;
  getById(id: string): Promise<Category>;
  create(data: Category): Promise<void>;
  update(id: string, data: Category): Promise<void>;
  delete(id: string): Promise<void>;
}
