/**
 * js/products.js
 *
 * This file handles product-related data and logic for the e-commerce application.
 * It fetches product information, manages product display, and provides
 * functions for interacting with individual products.
 */

// Define a namespace to avoid polluting the global scope
const Products = {

  /**
   * Fetches product data from a JSON file or API endpoint.
   * @returns {Promise<Array>} A promise that resolves to an array of product objects.
   */
  fetchProducts: async function() {
    try {
      const response = await fetch('data/products.json'); // Assuming products.json is in the data folder
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      return []; // Return an empty array to avoid breaking the application
    }
  },

  /**
   * Displays the product list on the page.
   * @param {Array} products An array of product objects to display.
   */
  displayProducts: function(products) {
    const productListContainer = document.getElementById('product-list'); // Assuming an element with id 'product-list' exists
    if (!productListContainer) {
      console.error("Product list container not found!");
      return;
    }

    productListContainer.innerHTML = ''; // Clear existing content

    products.forEach(product => {
      const productCard = this.createProductCard(product);
      productListContainer.appendChild(productCard);
    });
  },

  /**
   * Creates a single product card element.
   * @param {Object} product The product object to create a card for.
   * @returns {HTMLElement} A div element representing the product card.
   */
  createProductCard: function(product) {
    const card = document.createElement('div');
    card.classList.add('product-card'); // Add a CSS class for styling

    const image = document.createElement('img');
    image.src = product.image; // Assuming product object has an 'image' property
    image.alt = product.name; // Assuming product object has a 'name' property
    card.appendChild(image);

    const name = document.createElement('h3');
    name.textContent = product.name;
    card.appendChild(name);

    const price = document.createElement('p');
    price.textContent = `$${product.price.toFixed(2)}`; // Assuming product object has a 'price' property
    card.appendChild(price);

    const description = document.createElement('p');
    description.textContent = product.description; // Assuming product object has a 'description' property
    card.appendChild(description);

    const addToCartButton = document.createElement('button');
    addToCartButton.textContent = 'Add to Cart';
    addToCartButton.addEventListener('click', () => {
      // Call a function to add the product to the cart (defined in cart.js)
      Cart.addToCart(product); // Assuming Cart object is available globally (defined in cart.js)
    });
    card.appendChild(addToCartButton);

    return card;
  },

  /**
   * Initializes the product functionality.  Fetches and displays products on page load.
   */
  init: async function() {
    const products = await this.fetchProducts();
    this.displayProducts(products);
  }
};

// Initialize the product functionality when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  Products.init();
});