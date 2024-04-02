var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const url = 'http://localhost:3000/api';
export const fetchAPI = (url, option) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(url, option);
    if (!response.ok) {
        throw new Error('Error');
    }
    return response.json();
});
export class Products {
    constructor(id, category, name, price, _price_sale, image, image_hover, description, quantity, category_id) {
        this.id = id;
        this.category = category;
        this.name = name;
        this.price = price;
        this._price_sale = _price_sale;
        this.image = image;
        this.image_hover = image_hover;
        this.description = description;
        this.quantity = quantity;
        this.category_id = category_id;
    }
    get price_sale() {
        return this._price_sale;
    }
    set price_sale(value) {
        if (value < 0 || value > this.price) {
            throw new Error('Giá giảm giá không hợp lệ!');
        }
        this._price_sale = value;
    }
    showProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield fetchAPI(`${url}/products`);
            return data;
        });
    }
}
