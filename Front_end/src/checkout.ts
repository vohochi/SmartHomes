const showCheckout = () => {
  // get local storage
  const dataCheckout = JSON.parse(localStorage.getItem('checkout'));
  const totalPrice = JSON.stringify(localStorage.getItem('total'));

  // show checkout page
  const checkoutPage = document.getElementById('checkout-page');
  const total = document.getElementById('total');
  total.textContent = totalPrice.replace(/"/g, '');

  dataCheckout.map((item, index) => {
    const html = `<div class="d-flex align-items-center mb-4">
                    <div class="me-3 position-relative">
                      <span
                        class="position-absolute top-0 start-100 translate-middle badge rounded-pill badge-secondary"
                      >
                        1
                      </span>
                      <img
                        src="./assets/images/products/${item.image}"
                        style="height: 96px; width: 96x"
                        class="img-sm rounded border"
                      />
                    </div>
                    <div class="">
                      <a href="#" class="nav-link">
                       ${item.name} <br />
     $${item.price} x ${item.quantity}
                       </a>
                      <div class="price text-muted">Total: </div>
                    </div>
                  </div>`;
    checkoutPage.insertAdjacentHTML('afterbegin', html);
  });
};
showCheckout();
