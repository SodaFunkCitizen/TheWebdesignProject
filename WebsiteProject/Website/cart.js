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
  el.textContent = getCart().reduce((sum, i) => sum + i.qty, 0);
}

function addToCart(product) {
  const cart = getCart();
  const item = cart.find(i => i.id === product.id);

  if (item) item.qty++;
  else cart.push({ ...product, qty: 1 });

  saveCart(cart);
}

function removeFromCart(id) {
  let cart = getCart();
  cart = cart.filter(i => i.id !== id);
  saveCart(cart);
  renderCart();
}

function renderCart() {
  const body = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  if (!body) return;

  const cart = getCart();
  body.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;

    body.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td>${item.qty}</td>
        <td>$${(item.price * item.qty).toFixed(2)}</td>
        <td>
          <button class="btn btn-sm btn-danger" onclick="removeFromCart(${item.id})">
            Remove
          </button>
        </td>
      </tr>
    `;
  });

  totalEl.textContent = total.toFixed(2);
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderCart();

  document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", () => {
      addToCart({
        id: Number(btn.dataset.id),
        name: btn.dataset.name,
        price: Number(btn.dataset.price)
      });
      alert("Added to cart!");
    });
  });
});
