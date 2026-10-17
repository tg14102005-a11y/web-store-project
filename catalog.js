const productsContainer = document.getElementById("products");
const shopTitle = document.getElementById("shop-title");

function hoverImage(product) {
  return product.hoverImage || product.image.replace(/(\.\w+)$/, "-model$1");
}

function renderProducts(list) {
  productsContainer.innerHTML = list.map(product => `
    <article class="card" data-id="${product.id}">
      <div class="card-image">
        <img class="img-main" src="${product.image}" alt="${product.name}"
             onerror="this.parentElement.classList.add('no-image'); this.remove();">
        <img class="img-hover" src="${hoverImage(product)}" alt="${product.name} על דוגמנית"
             onerror="this.remove();">
      </div>
      <div class="card-body">
        <span class="category">${product.category}</span>
        <h2>${product.name}</h2>
        <p class="description">${product.description}</p>
        <p class="meta">מספר סידורי: ${product.serial || product.id} · במלאי: ${product.stock}</p>
        <div class="card-footer">
          <span class="price">₪${product.price}</span>
          <button class="add-btn" data-id="${product.id}">הוספה לסל</button>
        </div>
      </div>
    </article>
  `).join("");
  
  productsContainer.classList.toggle("mosaic", list.length === products.length);
}

productsContainer.addEventListener("click", event => {
  const button = event.target.closest(".add-btn");
  if (!button) return;
  const id = Number(button.dataset.id);
  addToCart(id);
});

let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartCount = document.getElementById("cart-count");

function updateCartBadge() {
  if (cartCount) {
    const totalCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    cartCount.textContent = totalCount;
  }
}
updateCartBadge();

function addToCart(productId) {
  const product = products.find(p => p.id === productId);

  if (!product) {
    return;
  }
  if (product.stock <= 0) {
    alert("המוצר אזל מהמלאי");
    return;
  }

  const existingItem = cart.find(item => item.productId === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1
    });
  }

  product.stock--;
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartBadge();
}

renderProducts(products);

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduceMotion) {
  const heroText = document.querySelector(".hero-text");
  const hero = document.querySelector(".hero");

  if (hero && heroText) {
    window.addEventListener("scroll", () => {
      const progress = Math.min(window.scrollY / (hero.offsetHeight * 0.7), 1);
      heroText.style.opacity = 1 - progress;
      heroText.style.transform = `translateY(${-progress * 40}px)`;
    }, { passive: true });
  }
}