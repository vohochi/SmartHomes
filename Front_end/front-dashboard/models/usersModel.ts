export class User {
  id: string;
  username: string;
  email: string;
  password: string; // Lưu ý: Mật khẩu cần được mã hóa trước khi lưu trữ
  displayName: string;
  img: string;
  // Thêm bất kỳ thuộc tính nào khác bạn cần cho User

  constructor(
    username: string,
    email: string,
    password: string,
    displayName: string,
    img: string
  ) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.displayName = displayName;
    this.img = img;
  }

  // Thêm bất kỳ phương thức nào bạn muốn sử dụng cho thực thể User
}

export interface IUserInterface {
  getAll(): Promise<User[]>;
  getById(id: string): Promise<User>;
  getByEmail(email: string): Promise<User>;
  create(data: User): Promise<void>;
  update(id: string, data: User): Promise<void>;
  delete(id: string): Promise<void>;
  lock(id: string): Promise<User>;
  // Thêm bất kỳ phương thức nào khác cần thiết cho interface User
}
