document.querySelector(".searchButton").addEventListener("click", () => {
  const query = document.querySelector(".searchTerm").value.trim();
  if (query) {
    window.location.href = `search.html?query=${encodeURIComponent(query)}`;
  }
});