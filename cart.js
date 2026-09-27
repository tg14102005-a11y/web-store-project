const cartContainer = document.getElementById('cart-items');
  


const increaseQuantity = (productID) => {
  let stock = findIdInProducts(productID).stock;
  if (stock > 0) {
    findIdInCart(productID).quantity++;
    findIdInProducts(productID).stock--;
    renderCart();
  } else {
    alert("המוצר אזל מהמלאי");
  }
}

const decreaseQuantity = (productID) => {
  const cartItem = findIdInCart(productID);

  if (cartItem.quantity === 1) {
    removeFromCart(productID);
  } else {
    cartItem.quantity--;
    findIdInProducts(productID).stock++;
    renderCart();
  }
}

const removeFromCart = (productId) => {
  const cartItem = findIdInCart(productId);
  const product = findIdInProducts(productId);

  product.stock += cartItem.quantity;

  const index = cart.findIndex(item => item.productId === productId);
  cart.splice(index, 1);

  renderCart();
}

const createProductCard = (product) => {
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
          <span class="qty-value">${findIdInCart(product.id).quantity}</span>
          <button type="button" class="qty-button" data-action="increase" data-id="${product.id}" onclick="increaseQuantity(${product.id})">+</button>
        </div>
      </td>
      <td class="total-cell">${product.price * findIdInCart(product.id).quantity} ₪</td>
      <td><button type="button" class="remove-item" data-id="${product.id}" onclick="removeFromCart(${product.id})">×</button></td>
    </tr>
  `;
};

const findIdInProducts = (productId) => {
  return products.find(product => product.id === productId);
}

const findIdInCart = (productId) => {
  return cart.find(item => item.productId === productId);
}

const renderCart = () => {
  cartContainer.innerHTML = "";

  cart.forEach((cartItem) => {
    const product = findIdInProducts(cartItem.productId);

    cartContainer.innerHTML += createProductCard(product);
  });
};

renderCart();
