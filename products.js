let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartCount = document.getElementById("cart-count");
if (cartCount) cartCount.textContent = cart.length;

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    if (product.stock <= 0) {
        alert("המוצר אזל מהמלאי");
        return;
    }
    cart.push(product);
    product.stock--;
    localStorage.setItem("cart", JSON.stringify(cart));
    if (cartCount) cartCount.textContent = cart.length;
}