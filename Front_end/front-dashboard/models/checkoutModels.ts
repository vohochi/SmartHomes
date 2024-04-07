export class Bill {
  _id: string;
  paymentStatus: string;
  createdAt: string;
  email: string;
  bank: string;
  totalPrice: string;

  constructor(
    paymentStatus: string,
    createdAt: string,
    email: string,
    bank: string,
    totalPrice: string
  ) {
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
  getById(id: string): Promise<Bill>;
  update(id: string, data: FormData): Promise<void>;
}
