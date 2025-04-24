// URL to get the products
const API_URL = 'https://fakestoreapi.com/products';

// Get HTML elements
const productContainer = document.getElementById('productContainer');
const statusDiv = document.getElementById('status');
const categoryFilter = document.getElementById('categoryFilter');

// This will store all the products we get from the API
let allProducts = [];

// Show loading message
function showLoading() {
  statusDiv.textContent = 'Loading products...';
  productContainer.innerHTML = '';
}

// Show error message
function showError(message) {
  statusDiv.textContent = '❌ ' + message;
  productContainer.innerHTML = '';
}

// Show products on the page
function showProducts(products) {
  statusDiv.textContent = '';
  productContainer.innerHTML = '';

  // If there are no products, show message
  if (products.length === 0) {
    statusDiv.textContent = 'No products found.';
    return;
  }

  // Loop through products and add each to the page
  products.forEach(product => {
    const div = document.createElement('div');
    div.className = 'product';

    // Add HTML for product
    div.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p><strong>$${product.price}</strong></p>
      <p>${product.category}</p>
    `;

    productContainer.appendChild(div);
  });
}

// Add category filter options
function setupCategories(products) {
  // Get unique categories and add "all" option
  const categories = ['all', ...new Set(products.map(p => p.category))];

  // Add each category to the dropdown
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    categoryFilter.appendChild(option);
  });
}

// Show products by category
function filterByCategory(category) {
  if (category === 'all') {
    showProducts(allProducts);
  } else {
    const filtered = allProducts.filter(product => product.category === category);
    showProducts(filtered);
  }
}

// Get products from the API
function getProducts() {
  showLoading();

  fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      allProducts = data;
      showProducts(data);
      setupCategories(data);
    })
    .catch(error => {
      console.error(error);
      showError('Failed to load products. Please try again.');
    });
}

// When the user changes the category, filter products
categoryFilter.addEventListener('change', function(event) {
  filterByCategory(event.target.value);
});

// Start by getting products
getProducts();
