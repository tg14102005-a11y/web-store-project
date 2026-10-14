const productsContainer = document.getElementById("products");
const categoryContainer = document.getElementById("category-list");
const shopTitle = document.getElementById("shop-title");

// תמונת הדוגמנית: אם אין שדה hoverImage במוצר, מחפשים קובץ באותו שם עם "-model".
// למשל images/lipstick.jpg  ->  images/lipstick-model.jpg
// אם הקובץ לא קיים, פשוט נשארת התמונה הרגילה.
function hoverImage(product) {
  return product.hoverImage || product.image.replace(/(\.\w+)$/, "-model$1");
}

// ---------- כרטיסי מוצרים ----------
// map עוברת על כל מוצר ומחזירה לכל אחד את ה-HTML של הכרטיס
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
  // פסיפס רק כשמוצגים כל המוצרים; בסינון לפי קטגוריה נשארת הפריסה הרגילה
  productsContainer.classList.toggle("mosaic", list.length === products.length);
}

// ---------- קטגוריות ----------
// Set שומר כל ערך פעם אחת, אז מקבלים רשימת קטגוריות בלי כפילויות
const categoryNames = [...new Set(products.map(p => p.category))];

function renderCategories() {
  const all = { name: "הכל", count: products.length, value: "all" };
  const items = [all, ...categoryNames.map(name => ({
    name,
    count: products.filter(p => p.category === name).length,
    value: name
  }))];

  categoryContainer.innerHTML = items.map(item => `
    <button class="category-tile" data-category="${item.value}">
      <span class="tile-name">${item.name}</span>
      <span class="tile-count">${item.count} מוצרים</span>
    </button>
  `).join("");
}

// לחיצה על קטגוריה: מסננים את המוצרים וגוללים אליהם
categoryContainer.addEventListener("click", event => {
  const tile = event.target.closest(".category-tile");
  if (!tile) return;
  const value = tile.dataset.category;

  const filtered = value === "all" ? products : products.filter(p => p.category === value);
  renderProducts(filtered);
  shopTitle.textContent = value === "all" ? "כל המוצרים" : value;

  document.querySelectorAll(".category-tile").forEach(t => t.classList.remove("active"));
  tile.classList.add("active");
  document.getElementById("shop").scrollIntoView({ behavior: "smooth" });
});

// ---------- הוספה לסל ----------
// הפונקציה addToCart היא של מור – עד שהיא קיימת זה רק כותב ל-console
productsContainer.addEventListener("click", event => {
  const button = event.target.closest(".add-btn");
  if (!button) return;
  const id = Number(button.dataset.id);

  if (typeof addToCart === "function") {
    addToCart(id);
  } else {
    console.log("addToCart עדיין לא קיימת, מוצר:", id);
  }
});

renderCategories();
renderProducts(products);

// ---------- תנועה ----------
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduceMotion) {
  // מסך הפתיחה: הטקסט דוהה ועולה קצת כשגוללים למטה
  const heroText = document.querySelector(".hero-text");
  const hero = document.querySelector(".hero");

  window.addEventListener("scroll", () => {
    const progress = Math.min(window.scrollY / (hero.offsetHeight * 0.7), 1);
    heroText.style.opacity = 1 - progress;
    heroText.style.transform = `translateY(${-progress * 40}px)`;
  }, { passive: true });

  // אריחי הקטגוריות: נכנסים בהדרגה כשמגיעים אליהם
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll(".category-tile").forEach((tile, i) => {
    tile.classList.add("reveal");
    tile.style.transitionDelay = `${i * 80}ms`;
    observer.observe(tile);
  });
}

localStorage.removeItem("cart");
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartCount = document.getElementById("cart-count");
cartCount.textContent = cart.length;
function addToCart(productId) {
    const product = products.find(p => p.id === productId);

    if (!product) {
        return;
        
    }
    if (product.stock <= 0){
        alert("המוצר אזל מהמלאי");
        return;
    }
    cart.push(product);
    product.stock--;
    localStorage.setItem("cart",JSON.stringify(cart));
    cartCount.textContent = cart.length;
    
}