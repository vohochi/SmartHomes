var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { url, fetchAPI } from '../src/config/app.js';
class CategoryModel {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetchAPI(`${url}/categories`);
            const data = yield response.json();
            return data;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetchAPI(`${url}/categories/${id}`);
            if (!response.ok) {
                throw new Error('Không tìm thấy danh mục');
            }
            const data = yield response.json();
            return data;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetchAPI(`${url}/categories`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) {
                throw new Error('Lỗi tạo danh mục');
            }
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetchAPI(`${url}/categories/${id}`, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) {
                throw new Error('Lỗi cập nhật danh mục');
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetchAPI(`${url}/categories/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Lỗi xóa danh mục');
            }
        });
    }
}
