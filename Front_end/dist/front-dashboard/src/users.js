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
class UserModel {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield fetchAPI(`${url}users`);
            return data;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield fetchAPI(`${url}users/${id}`);
            if (!data) {
                throw new Error('Không tìm thấy danh mục');
            }
            return data;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const data1 = yield fetchAPI(`${url}users/add`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
            });
            if (!data1) {
                throw new Error('Lỗi tạo danh mục');
            }
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const data1 = yield fetchAPI(`${url}users/${id}`, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
            });
            if (!data1) {
                throw new Error('Lỗi cập nhật danh mục');
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield fetchAPI(`${url}users/${id}`, {
                method: 'DELETE',
            });
            if (!data) {
                throw new Error('Lỗi xóa danh mục');
            }
            else {
                alert('Xóa thành công');
                window.location.reload();
            }
        });
    }
    getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield fetchAPI(`${url}users/${email}`);
            if (!data) {
                throw new Error('Không tìm thấy Email');
            }
            return data;
        });
    }
    lock(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield fetchAPI(`${url}users/lock/${id}`);
            if (!data) {
                throw new Error('Không tìm thấy Email');
            }
            alert(`Đã khóa user có email là: ${data.email}`);
            return data;
        });
    }
    unlock(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield fetchAPI(`${url}users/unlock/${id}`);
            if (!data) {
                throw new Error('Không tìm thấy Email');
            }
            alert(`Đã khóa user có email là: ${data.email}`);
            return data;
        });
    }
    searchValue(value) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield fetchAPI(`${url}users/search/${value}`);
            return data;
        });
    }
    sortValue(value) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield fetchAPI(`${url}users?_sort=${value}`);
            return data;
        });
    }
}
const showUsers = new UserModel();
const getUser = new UserModel();
const lockUser = new UserModel();
const unlockUser = new UserModel();
const searchUser = new UserModel();
const updateUser = new UserModel();
const createUser = new UserModel();
const deleteUser = new UserModel();
window.addEventListener('DOMContentLoaded', (e) => {
    showUsers.getAll().then((data) => {
        const users = document.getElementById('users');
        users.innerHTML = '';
        data
            .map((user) => {
            users.innerHTML += ` <tr>
                  <td class="table-column-pr-0">
                    <div class="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        class="custom-control-input"
                        id="usersDataCheck1"
                      />
                      <label
                        class="custom-control-label"
                        for="usersDataCheck1"
                      ></label>
                    </div>
                  </td>
                  <td class="table-column-pl-0">
                    <a
                      class="d-flex align-items-center"
                      href="user-profile.html"
                    >
                      <div class="avatar avatar-circle">
                        <img
                          class="avatar-img"
                          src="../../public/images/${user.img}"
                          alt="Image Description"
                        />
                      </div>
                      <div class="ml-3">
                        <span class="d-block h5 text-hover-primary mb-0"
                          >Amanda Harvey
                          <i
                            class="tio-verified text-primary"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Top endorsed"
                          ></i
                        ></span>
                        <span class="d-block font-size-sm text-body"
                          >${user.email}</span
                        >
                      </div>
                    </a>
                  </td>
                  <td>
                    <span class="d-block h5 mb-0">${user.username}</span>
                  </td>
                  <td>
${user.password}                  </td>
                  <td>
                    <span class="legend-indicator bg-success"></span>Active
                  </td>
                  <td>
                    <div class="d-flex align-items-center">
                      <span class="font-size-sm mr-2">72%</span>
                      <div class="progress table-progress">
                        <div
                          class="progress-bar"
                          role="progressbar"
                          style="width: 72%"
                          aria-valuenow="72"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td>User</td>
                  <td>
                    <div
                      id="editUserPopover"
                      data-toggle="popover-dark"
                      data-placement="left"
                      title="<div class='d-flex align-items-center'>Edit user <a href='#!' class='close close-light ml-auto'><i id='closeEditUserPopover' class='tio-clear'></i></a></div>"
                      data-content="Check out this Edit user modal example."
                      data-html="true"
                    >
                      <a
                        class="btn btn-sm btn-white"
                        href="javascript:;"
                        data-toggle="modal"
                        data-target="#editUserModal"
                      >
                        <i class="tio-edit"></i> Edit
                      </a> <a
                        class="btn btn-sm btn-white"
                        href="javascript:;"
                        data-toggle="modal"
                        data-target="#lockUser" id=${user.id}
                      >
                        <i class="tio-lock"></i> Lock
                      </a>
                    </div>
                  </td>
                </tr>`;
        })
            .join('');
        const human = document.getElementById('users');
        const rows = human.querySelectorAll('tr');
        rows.forEach((row) => {
            const htmlElement = row;
            console.log(htmlElement);
            if (htmlElement.classList.contains('lock')) {
                console.log('ok');
                htmlElement.style.opacity = '0.5';
            }
        });
    });
    window.addEventListener('click', (e) => {
        const target = e.target;
        const data_target = target.getAttribute('data-target');
        const tr = target.closest('tr');
        const id = target.getAttribute('id');
        if (target.closest('i')) {
            if (target.classList.contains('tio-lock')) {
                target.classList.replace('tio-lock', 'tio-unlock');
            }
            else {
                target.classList.replace('tio-unlock', 'tio-lock');
            }
        }
        if (data_target == '#lockUser') {
            if (tr.classList.contains('lock')) {
                tr.classList.remove('lock');
                tr.style.opacity = '1';
                unlockUser.unlock(id);
                alert('Bạn đã mở khóa tài khoản của user');
            }
            else {
                tr.classList.add('lock');
                tr.style.opacity = '0.1';
                lockUser.lock(id);
                alert('Bạn đã khóa tài khoản của user');
            }
        }
    });
});
