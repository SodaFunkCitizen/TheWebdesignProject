console.log("cart.js loaded");//Little tester make sure cart was loading(It wasn't orginally)

const CART_KEY = "cart";
function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const countEl = document.getElementById("cart-count");
  if (!countEl) return;

  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  countEl.textContent = count;
}

function addToCart(product) {
  const cart = getCart();
  const existing = cart.find(i => i.id === product.id);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  saveCart(cart);
}

function removeFromCart(id) {
  const cart = getCart().filter(i => i.id !== id);
  saveCart(cart);
  renderCart();
}

function renderCart() {
  const tbody = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  if (!tbody || !totalEl) return;

  const cart = getCart();
  tbody.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;

    tbody.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td>${item.qty}</td>
        <td>$${(item.price * item.qty).toFixed(2)}</td>
        <td>
          <button class="btn btn-danger btn-sm"
            onclick="removeFromCart(${item.id})">
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
      alert("Added to cart");
    });
  });
});
