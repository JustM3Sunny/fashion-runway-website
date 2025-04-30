// js/home.js

// This file handles the primary JavaScript functionality for the home page.
// It's responsible for dynamic content loading, user interaction, and
// potentially, managing the display of different sections like featured products.

import DOMPurify from 'dompurify'; // Assuming DOMPurify is installed via npm

// Constants for configuration
const FEATURED_PRODUCTS_API_URL = '/api/featured-products';
const FEATURED_PRODUCTS_CONTAINER_ID = 'featured-products-container';
const PAGE_SECTION_CLASS = 'page-section';
const HOME_ID = 'home';
const PRODUCT_DESCRIPTION_LENGTH = 50; // Max length of product description

// Document Ready Function - Ensures the DOM is fully loaded before executing JavaScript
document.addEventListener('DOMContentLoaded', () => {

  // Function to fetch and display featured products.  This assumes an API endpoint
  // or a data source that provides product information.
  async function loadFeaturedProducts() {
    try {
      const response = await fetch(FEATURED_PRODUCTS_API_URL);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const products = await response.json();

      renderProducts(products, FEATURED_PRODUCTS_CONTAINER_ID);

    } catch (error) {
      console.error('Error fetching featured products:', error);
      displayErrorMessage(FEATURED_PRODUCTS_CONTAINER_ID, 'Failed to load featured products.');
    }
  }

  function renderProducts(products, containerId) {
    const container = document.getElementById(containerId);

    if (!container) {
      console.warn('Featured products container not found.');
      return;
    }

    container.innerHTML = ''; // Clear existing content

    const fragment = document.createDocumentFragment(); // Use a fragment for better performance

    products.forEach(product => {
      const productElement = createProductElement(product);
      fragment.appendChild(productElement);
    });

    container.appendChild(fragment); // Append the entire fragment at once
  }

  function createProductElement(product) {
    const productElement = document.createElement('div');
    productElement.classList.add('product-card', 'p-4', 'border', 'rounded-lg', 'shadow-md'); // Tailwind classes for styling

    // Sanitize data to prevent XSS
    const productName = DOMPurify.sanitize(product.name);
    const productDescription = DOMPurify.sanitize(product.description);
    const productImageUrl = DOMPurify.sanitize(product.imageUrl);
    const productPrice = DOMPurify.sanitize(String(product.price)); // Ensure price is a string for sanitization

    // Construct the product HTML.  Customize based on your product data structure.
    // Use template literals for better readability and maintainability
    productElement.innerHTML = `
      <img src="${productImageUrl}" alt="${productName}" class="w-full h-48 object-cover rounded-md mb-2">
      <h3 class="text-lg font-semibold">${productName}</h3>
      <p class="text-gray-600">${productDescription ? truncateString(productDescription, PRODUCT_DESCRIPTION_LENGTH) : ''}</p>
      <p class="text-blue-500 font-bold">$${productPrice}</p>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 add-to-cart-button" data-product-id="${product.id}">Add to Cart</button>
    `;

    // Add event listener directly to the button for improved performance and clarity
    const addToCartButton = productElement.querySelector('.add-to-cart-button');
    if (addToCartButton) {
      addToCartButton.addEventListener('click', () => {
        handleAddToCart(product.id);
      });
    }

    return productElement;
  }

  function displayErrorMessage(containerId, message) {
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = `<p class="text-red-500">${message}</p>`;
    }
  }

  // Function to handle navigation based on URL hash.  This allows for simple
  // single-page application-like behavior.
  function handleNavigation() {
    const hash = window.location.hash;

    // Hide all sections by default.  Assumes sections have a class "page-section".
    const sections = document.querySelectorAll(`.${PAGE_SECTION_CLASS}`);
    sections.forEach(section => {
      section.classList.add('hidden');
    });

    // Show the section corresponding to the hash.
    const targetSection = document.querySelector(hash);
    if (targetSection) {
      targetSection.classList.remove('hidden');
    } else if (hash) {
      // Handle invalid hash (e.g., show a 404 page or redirect to home).
      console.warn('Invalid hash:', hash);
      navigateToHome();
    } else {
      // If no hash, show the home page.
      navigateToHome();
    }
  }

  function navigateToHome() {
    navigateToSection(`#${HOME_ID}`); // Use navigateToSection for consistency
  }

  // Function to navigate to a specific section
  function navigateToSection(sectionId) {
    window.location.hash = sectionId;
  }

  // Event listener for hash changes (navigation).
  window.addEventListener('hashchange', handleNavigation);

  // Initial navigation setup on page load.
  handleNavigation();

  // Call the function to load featured products.
  loadFeaturedProducts();

  // Example: Add an event listener to a specific button on the home page.
  const contactButton = document.getElementById('contact-button');
  if (contactButton) {
    contactButton.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent default link behavior
      navigateToSection('#contact'); // Navigate to the contact section
    });
  }

  function handleAddToCart(productId) {
    // Implement your add to cart logic here.
    console.log(`Adding product with ID ${productId} to cart.`);
    // You might want to make an API call to add the product to the cart.
    // Example:
    // addToCartAPI(productId)
    //   .then(response => {
    //     // Handle success
    //   })
    //   .catch(error => {
    //     // Handle error
    //   });
  }

  // Helper function to truncate a string
  function truncateString(str, maxLength) {
    if (!str) return '';
    if (str.length <= maxLength) return str;
    return DOMPurify.sanitize(str.substring(0, maxLength) + '...');
  }
});