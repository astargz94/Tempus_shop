import { createProductCard } from './utils.js';

fetch('products.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('product-list');
    data.forEach(product => {
      const card = createProductCard(product);
      container.appendChild(card);
    });

    
    loadCategory(data, 'recommended-products', 'isRecommended');
    loadCategory(data, 'promo-products', 'isPromo');
    loadCategory(data, 'sale-products', 'isSaleOfDay');
  });

function loadCategory(products, containerId, property) {
  const container = document.getElementById(containerId);
  products.filter(p => p[property]).forEach(p => {
    container.appendChild(createProductCard(p));
  });
}