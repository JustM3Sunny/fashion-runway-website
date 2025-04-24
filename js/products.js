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
   * @param {string} url - The URL to fetch product data from. Defaults to './data/products.json'.
   * @returns {Promise<Array>} A promise that resolves to an array of product objects.
   */
  fetchProducts: async function(url = './data/products.json') {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("Oops, we haven't got JSON!");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      // Consider a more user-friendly error handling strategy, like displaying a message on the page.
      return [];
    }
  },

  /**
   * Displays the product list on the page.
   * @param {Array} products An array of product objects to display.
   */
  displayProducts: function(products) {
    const productListContainer = document.getElementById('product-list');
    if (!productListContainer) {
      console.error("Product list container not found!");
      return;
    }

    // Use a document fragment for better performance
    const fragment = document.createDocumentFragment();

    products.forEach(product => {
      const productCard = this.createProductCard(product);
      fragment.appendChild(productCard);
    });

    // Clear existing content more efficiently
    while (productListContainer.firstChild) {
      productListContainer.removeChild(productListContainer.firstChild);
    }
    productListContainer.appendChild(fragment); // Append the fragment to the container
  },

  /**
   * Creates a single product card element.
   * @param {Object} product The product object to create a card for.
   * @returns {HTMLElement} A div element representing the product card.
   */
  createProductCard: function(product) {
    const card = document.createElement('div');
    card.classList.add('product-card', 'bg-white', 'rounded-lg', 'shadow-md', 'p-4', 'flex', 'flex-col', 'justify-between');

    const image = document.createElement('img');
    image.src = product.image;
    image.alt = product.name;
    image.classList.add('w-full', 'h-48', 'object-cover', 'rounded-md', 'mb-2');
    image.onerror = () => {
      image.src = 'path/to/placeholder-image.png'; // Provide a fallback image
      console.warn(`Failed to load image for product: ${product.name}`);
    };
    card.appendChild(image);

    const name = document.createElement('h3');
    name.textContent = product.name;
    name.classList.add('text-lg', 'font-semibold', 'mb-1');
    card.appendChild(name);

    const price = document.createElement('p');
    price.textContent = `$${product.price.toFixed(2)}`;
    price.classList.add('text-gray-700', 'mb-2');
    card.appendChild(price);

    const description = document.createElement('p');
    description.textContent = product.description;
    description.classList.add('text-gray-600', 'text-sm', 'mb-4');
    card.appendChild(description);

    const addToCartButton = document.createElement('button');
    addToCartButton.textContent = 'Add to Cart';
    addToCartButton.classList.add('bg-blue-500', 'hover:bg-blue-700', 'text-white', 'font-bold', 'py-2', 'px-4', 'rounded', 'focus:outline-none', 'focus:shadow-outline');
    addToCartButton.addEventListener('click', () => {
      this.handleAddToCart(product);
    });
    card.appendChild(addToCartButton);

    return card;
  },

  /**
   * Handles the add to cart functionality.
   * @param {Object} product The product to add to the cart.
   */
  handleAddToCart: function(product) {
    if (typeof Cart !== 'undefined' && Cart && typeof Cart.addToCart === 'function') {
      Cart.addToCart(product);
    } else {
      console.error('Cart object or addToCart function is not defined.');
      // Optionally display an error message to the user.
    }
  },

  /**
   * Initializes the product functionality.  Fetches and displays products on page load.
   */
  init: async function() {
    try {
      const products = await this.fetchProducts();
      this.displayProducts(products);
    } catch (error) {
      console.error("Failed to initialize products:", error);
      // Display a user-friendly error message on the page.
      const productListContainer = document.getElementById('product-list');
      if (productListContainer) {
        productListContainer.innerHTML = '<p class="text-red-500">Failed to load products. Please try again later.</p>';
      }
    }
  }
};

// Initialize the product functionality when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  Products.init();
});