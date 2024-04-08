export class Bill {
  _id: string;
  paymentStatus: string;
  createdAt: string;
  email: string;
  bank: string;
  totalPrice: string;

  constructor(
    _id: string,
    paymentStatus: string,
    createdAt: string,
    email: string,
    bank: string,
    totalPrice: string
  ) {
    this._id = _id;
    this.paymentStatus = paymentStatus;
    this.createdAt = createdAt;
    this.createdAt = createdAt;
    this.email = email;
    this.bank = bank;
    this.totalPrice = totalPrice;
  }
}
export interface IProductInterface {
  getAll(): Promise<Bill[]>;
  confirmBIll(id: string): Promise<void>;
  update(id: string, data: FormData): Promise<void>;
}
