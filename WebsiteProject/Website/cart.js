console.log("cart.js loaded");

const CART_KEY = "cart";

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const el = document.getElementById("cart-count");
  if (!el) return;

  const cart = getCart();
  el.textContent = cart.reduce((sum, i) => sum + i.quantity, 0);
}

function addToCart(product) {
  const cart = getCart();
  const existing = cart.find(i => i.id === product.id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart(cart);
  alert(`${product.name} added to cart`);
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();

  document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", () => {
      addToCart({
        id: btn.dataset.id,
        name: btn.dataset.name,
        price: parseFloat(btn.dataset.price)
      });
    });
  });
});
