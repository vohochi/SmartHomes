document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');
  const form = document.getElementById(
    'resetPasswordForm'
  ) as HTMLFormElement | null;

  if (token && form) {
    // Đặt action cho form để chỉ đến backend endpoint với token
    form.action = `http://localhost:3000/api/reset-password/${token}`;

    // Gắn event listener cho sự kiện submit của form
    form.addEventListener('submit', (event) => {
      form.submit();
    });

    // Đặt giá trị của trường hidden input với token
    const tokenField = document.getElementById(
      'tokenField'
    ) as HTMLInputElement | null;
    if (tokenField) {
      tokenField.value = token;
    }
  } else {
    console.error(
      'Mã thông báo bị thiếu trong các phần tử URL hoặc Mẫu không được tìm thấy'
    );
  }
});
