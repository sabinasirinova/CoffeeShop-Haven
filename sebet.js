function renderCart() {
    const stored = JSON.parse(localStorage.getItem("cart")) || [];
    const container = document.getElementById("cart-items");
    const totalEl = document.getElementById("total-price");
    container.innerHTML = "";
    if (stored.length === 0) {
        totalEl.textContent = "";
        container.innerHTML = "<p class='empty'>Səbət boşdur.</p>";
        return;
    }
    const summary = {};
    stored.forEach(entry => {
        const name = entry.name;
        const price = parseFloat(entry.price);
        const qty = entry.quantity || 1;
        if (!summary[name]) summary[name] = { name, price, quantity: qty };
        else summary[name].quantity += qty;
    });
    let total = 0;
    Object.values(summary).forEach(item => {
        const subtotal = item.price * item.quantity;
        total += subtotal;
        const div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `
  <h3>${item.name}</h3>
  <div class="qty-control">
    <button class="decrease" data-name="${item.name}">–</button>
    <span class="qty">${item.quantity}</span>
    <button class="increase" data-name="${item.name}">＋</button>
  </div>
  <p>Bir ədəd: ${item.price.toFixed(2)} AZN</p>
  <p>Ümumi: ${subtotal.toFixed(2)} AZN</p>
`;
        container.appendChild(div);
    });
    totalEl.textContent = `Ümumi məbləğ: ${total.toFixed(2)} AZN`;
    container.querySelectorAll(".increase").forEach(btn =>
        btn.addEventListener("click", () => updateQuantity(btn.dataset.name, 1))
    );
    container.querySelectorAll(".decrease").forEach(btn =>
        btn.addEventListener("click", () => updateQuantity(btn.dataset.name, -1))
    );
}

function updateQuantity(name, delta) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const newCart = [];
    cart.forEach(entry => {
        if (entry.name === name) {
            entry.quantity = (entry.quantity || 1) + delta;
            if (entry.quantity > 0) newCart.push(entry);
        } else {
            newCart.push(entry);
        }
    });
    localStorage.setItem("cart", JSON.stringify(newCart));
    renderCart();
}

function clearCart() {
    localStorage.removeItem("cart");
    renderCart();
}

document.addEventListener("DOMContentLoaded", renderCart);