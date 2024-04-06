document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const form = document.getElementById('resetPasswordForm');
    if (token && form) {
        form.action = `http://localhost:3000/api/reset-password/${token}`;
        form.addEventListener('submit', (event) => {
            form.submit();
        });
        const tokenField = document.getElementById('tokenField');
        if (tokenField) {
            tokenField.value = token;
        }
    }
    else {
        console.error('Mã thông báo bị thiếu trong các phần tử URL hoặc Mẫu không được tìm thấy');
    }
});
