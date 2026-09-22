document.addEventListener('DOMContentLoaded', () => {
  const username = localStorage.getItem('username') || 'אורח';
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  let total = localStorage.getItem('cartTotal');
  if (!total && cart.length > 0) {
    total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }
  total = total || 0;

  document.getElementById('customerName').textContent = username;
  document.getElementById('totalAmount').textContent = total;

  const form = document.getElementById('paymentForm');
  const successModal = new bootstrap.Modal(document.getElementById('successModal'));

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      e.stopPropagation();
      form.classList.add('was-validated');
      return;
    }

    if (parseFloat(total) <= 0) {
      alert('עגלת הקניות שלך ריקה!');
      return;
    }

    document.getElementById('modalMessage').textContent = 
      `תודה ${username}, התשלום על סך ${total} ₪ עבר בהצלחה. ההזמנה שלך בדרך!`;

    localStorage.removeItem('cart');
    localStorage.removeItem('cartTotal');

    successModal.show();
  });

  document.getElementById('homeBtn').addEventListener('click', () => {
    window.location.href = 'index.html';
  });
});