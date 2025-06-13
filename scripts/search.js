import { createProductCard } from './utils.js';

function getQuery() {
  const params = new URLSearchParams(window.location.search);
  return params.get('query')?.toLowerCase() || '';
}
document.querySelector(".searchTerm").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    document.querySelector(".searchButton").click();
  }
});
fetch('products.json')
  .then(res => res.json())
  .then(products => {
    const query = getQuery();
    const results = products.filter(product =>
      product.name.toLowerCase().includes(query) ||
      product.brand.toLowerCase().includes(query)
    );

    const title = document.getElementById("search-title");
    title.innerText = `Результати пошуку: "${query}"`;

    const container = document.getElementById("search-results");
    container.innerHTML = "";

    if (results.length === 0) {
      container.innerHTML = "<p>Нічого не знайдено</p>";
    } else {
      results.forEach(product => {
        const card = createProductCard(product);
        container.appendChild(card);
      });
    }
  });