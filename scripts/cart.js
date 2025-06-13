window.onload = function () {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const container = document.getElementById('cart-container');
  let total = 0;

  if (cart.length === 0) {
    container.innerHTML = "<p>Кошик порожній.</p>";
    document.getElementById('total').innerText = `Загальна сума: 0 грн`;
    return;
  }

  cart.forEach(product => {
    total += product.price * product.quantity;
    const item = document.createElement("div");
    item.className = "cart-item";
    item.innerHTML = `
      <img src="${product.image}" width="100">
      <h3>${product.name}</h3>
      <p>${product.price} грн</p>
      <p>Кількість: ${product.quantity}</p>
      <button onclick="removeFromCart(${product.id})">Видалити</button>
    `;
    container.appendChild(item);
  });

  document.getElementById('total').innerText = `Загальна сума: ${total} грн`;
};

function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem('cart', JSON.stringify(cart));
  location.reload();
}

function checkout() {
  alert("Дякуємо за замовлення!");
  localStorage.removeItem('cart');
  location.reload();
}