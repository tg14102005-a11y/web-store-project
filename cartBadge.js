function updateCartBadge() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const totalCount = cart.reduce(
    (sum, item) => sum + (Number(item.quantity) || 0),
    0
  );

  const cartCount = document.getElementById("cart-count");

  if (cartCount) {
    cartCount.textContent = totalCount;
  }
}

updateCartBadge();