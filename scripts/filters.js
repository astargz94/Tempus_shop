function getBrandFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('brand');
}

fetch('products.json')
  .then(response => response.json())
  .then(products => {
    const selectedBrand = getBrandFromUrl();

    
    const titleElement = document.getElementById('brand-title');
    if (selectedBrand) {
      titleElement.textContent = `Усі товари: ${selectedBrand}`;
    } else {
      titleElement.textContent = 'Усі товари';
    }

    const filtered = selectedBrand
      ? products.filter(product => product.brand === selectedBrand)
      : products;

    displayProducts(filtered);
  });

function displayProducts(products) {
  const container = document.getElementById('products-container');
  container.innerHTML = '';

  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.price} грн</p>
      <button class="add-to-cart">Додати в кошик</button>
    `;
    card.querySelector(".add-to-cart").addEventListener("click", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Товар додано до кошика");
    });
    
    container.appendChild(card);
  });
  return card;
}