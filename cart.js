let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartContainer = document.getElementById('cart-items');

const findIdInProducts = (productId) => {
  return products.find(product => product.id === productId);
};

const findIdInCart = (productId) => {
  return cart.find(item => item.productId === productId);
};

const calculateTotalPrice = () => {
  return cart.reduce((total, cartItem) => {
    const product = findIdInProducts(cartItem.productId);
    return product ? total + (product.price * cartItem.quantity) : total;
  }, 0);
};

const saveCart = () => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

const increaseQuantity = (productID) => {
  const product = findIdInProducts(productID);
  const cartItem = findIdInCart(productID);

  if (product && cartItem) {
    if (product.stock > 0) {
      cartItem.quantity++;
      product.stock--;
      saveCart();
      renderCart();
    } else {
      alert("המוצר אזל מהמלאי");
    }
  }
};

const decreaseQuantity = (productID) => {
  const cartItem = findIdInCart(productID);
  const product = findIdInProducts(productID);

  if (!cartItem) return;

  if (cartItem.quantity === 1) {
    removeFromCart(productID);
  } else {
    cartItem.quantity--;
    if (product) product.stock++;
    saveCart();
    renderCart();
  }
};

const removeFromCart = (productId) => {
  const cartItem = findIdInCart(productId);
  const product = findIdInProducts(productId);

  if (cartItem && product) {
    product.stock += cartItem.quantity;
  }

  cart = cart.filter(item => item.productId !== productId);
  saveCart();
  renderCart();
};

const createProductCard = (product, quantity) => {
  const itemTotal = product.price * quantity;

  return `
    <tr class="cart-row">
      <td>
        <div class="product-cell">
          <div class="product-image-wrap">
            <img src="${product.image}" alt="${product.name}" />
          </div>
          <span class="product-name">${product.name}</span>
        </div>
      </td>
      <td class="price-cell">${product.price} ₪</td>
      <td>
        <div class="qty-cell">
          <button type="button" class="qty-button" data-action="decrease" data-id="${product.id}" onclick="decreaseQuantity(${product.id})">−</button>
          <span class="qty-value">${quantity}</span>
          <button type="button" class="qty-button" data-action="increase" data-id="${product.id}" onclick="increaseQuantity(${product.id})">+</button>
        </div>
      </td>
      <td class="total-cell">${itemTotal} ₪</td>
      <td><button type="button" class="remove-item" data-id="${product.id}" onclick="removeFromCart(${product.id})">×</button></td>
    </tr>
  `;
};

const renderCart = () => {
  if (!cartContainer) return;
  cartContainer.innerHTML = "";

  cart.forEach((cartItem) => {
    const product = findIdInProducts(cartItem.productId);
    if (product) {
      cartContainer.innerHTML += createProductCard(product, cartItem.quantity);
    }
  });

  const totalPriceEl = document.getElementById('total-price');
  if (totalPriceEl) {
    totalPriceEl.textContent = calculateTotalPrice() + " ₪";
  }
};

const goToCheckout = () => {
  if (cart.length !== 0) {
    localStorage.setItem('cartTotal', calculateTotalPrice());
    window.location.href = "checkout.html";
  }
};

document.querySelector('.pay-button button')?.addEventListener('click', goToCheckout);

renderCart();