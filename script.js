const API_URL = 'https://fakestoreapi.com/products';
const productContainer = document.getElementById('productContainer');
const statusDiv = document.getElementById('status');
const categoryFilter = document.getElementById('categoryFilter');
let allProducts = [];

// Show loading state
function setLoading() {
  statusDiv.textContent = 'Loading products...';
  productContainer.innerHTML = '';
}

// Show error state
function setError(message) {
  statusDiv.textContent = `❌ ${message}`;
  productContainer.innerHTML = '';
}

// Render products
function renderProducts(products) {
  statusDiv.textContent = '';
  productContainer.innerHTML = '';

  if (products.length === 0) {
    statusDiv.textContent = 'No products found.';
    return;
  }

  products.forEach(product => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p><strong>$${product.price}</strong></p>
      <p>${product.category}</p>
    `;
    productContainer.appendChild(div);
  });
}

// Populate filter options
function setCategoryOptions(products) {
  const categories = ['all', ...new Set(products.map(p => p.category))];
  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
    categoryFilter.appendChild(option);
  });
}

// Filter products
function filterProducts(category) {
  if (category === 'all') {
    renderProducts(allProducts);
  } else {
    const filtered = allProducts.filter(p => p.category === category);
    renderProducts(filtered);
  }
}

// Main fetch function
function fetchProducts() {
  setLoading();
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      allProducts = data;
      renderProducts(data);
      setCategoryOptions(data);
    })
    .catch(err => {
      console.error(err);
      setError('Failed to load products. Please try again.');
    });
}

// Handle filter change
categoryFilter.addEventListener('change', (e) => {
  filterProducts(e.target.value);
});

// Start fetching products
fetchProducts();
