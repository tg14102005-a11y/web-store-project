document.addEventListener('DOMContentLoaded', () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  let total = localStorage.getItem('cartTotal');

  if (!total && cart.length > 0) {
    total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }
  total = total || 0;

  document.getElementById('totalAmount').textContent = total;

  const expiryInput = document.getElementById('expiry');
  expiryInput.addEventListener('input', (e) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length >= 2) {
      val = val.substring(0, 2) + '/' + val.substring(2, 4);
    }
    e.target.value = val;
  });

  const form = document.getElementById('paymentForm');
  const successModal = new bootstrap.Modal(document.getElementById('successModal'));

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      e.stopPropagation();
      form.classList.add('was-validated');
      return;
    }

    const fullName = document.getElementById('fullName').value;

    document.getElementById('modalMessage').textContent = 
      `תודה ${fullName}, התשלום על סך ${total} ₪ נקלט בהצלחה במערכת!`;

    localStorage.removeItem('cart');
    localStorage.removeItem('cartTotal');

    successModal.show();
  });

  document.getElementById('homeBtn').addEventListener('click', () => {
    window.location.href = 'index.html';
  });
});