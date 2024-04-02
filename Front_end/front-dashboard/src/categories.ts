import { Category, ICategoryInterface } from '../models/categoriesModel';
import { url, fetchAPI } from '../src/config/app.js';
class CategoryModel implements ICategoryInterface {
  async getAll(): Promise<Category[]> {
    const response = await fetchAPI(`${url}/categories`);
    const data = await response.json();
    return data as Category[];
  }
  async getById(id: string): Promise<Category> {
    const response = await fetchAPI(`${url}/categories/${id}`);
    if (!response.ok) {
      throw new Error('Không tìm thấy danh mục');
    }
    const data = await response.json();
    return data as Category;
  }

  async create(data: Category): Promise<void> {
    const response = await fetchAPI(`${url}/categories`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
      throw new Error('Lỗi tạo danh mục');
    }
  }

  async update(id: string, data: Category): Promise<void> {
    const response = await fetchAPI(`${url}/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
      throw new Error('Lỗi cập nhật danh mục');
    }
  }

  async delete(id: string): Promise<void> {
    const response = await fetchAPI(`${url}/categories/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Lỗi xóa danh mục');
    }
  }
}
