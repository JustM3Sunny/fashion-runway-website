// js/home.js

// This file handles the primary JavaScript functionality for the home page.
// It's responsible for dynamic content loading, user interaction, and
// potentially, managing the display of different sections like featured products.

// Document Ready Function - Ensures the DOM is fully loaded before executing JavaScript
document.addEventListener('DOMContentLoaded', function() {

  // Function to fetch and display featured products.  This assumes an API endpoint
  // or a data source that provides product information.
  function loadFeaturedProducts() {
    // Placeholder for API endpoint or data source.  Replace with actual URL.
    const apiUrl = '/api/featured-products';

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(products => {
        // Render the products to the DOM.  Assumes a container with id "featured-products-container".
        const container = document.getElementById('featured-products-container');
        if (container) {
          container.innerHTML = ''; // Clear existing content

          products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product-card', 'p-4', 'border', 'rounded-lg', 'shadow-md'); // Tailwind classes for styling

            // Construct the product HTML.  Customize based on your product data structure.
            productElement.innerHTML = `
              <img src="${product.imageUrl}" alt="${product.name}" class="w-full h-48 object-cover rounded-md mb-2">
              <h3 class="text-lg font-semibold">${product.name}</h3>
              <p class="text-gray-600">${product.description.substring(0, 50)}...</p>
              <p class="text-blue-500 font-bold">$${product.price}</p>
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">Add to Cart</button>
            `;

            container.appendChild(productElement);
          });
        } else {
          console.warn('Featured products container not found.');
        }
      })
      .catch(error => {
        console.error('Error fetching featured products:', error);
        // Display an error message to the user (e.g., in the container).
        if (document.getElementById('featured-products-container')) {
          document.getElementById('featured-products-container').innerHTML = '<p class="text-red-500">Failed to load featured products.</p>';
        }
      });
  }

  // Function to handle navigation based on URL hash.  This allows for simple
  // single-page application-like behavior.
  function handleNavigation() {
    const hash = window.location.hash;

    // Hide all sections by default.  Assumes sections have a class "page-section".
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(section => {
      section.classList.add('hidden');
    });

    // Show the section corresponding to the hash.
    if (hash) {
      const targetSection = document.querySelector(hash);
      if (targetSection) {
        targetSection.classList.remove('hidden');
      } else {
        // Handle invalid hash (e.g., show a 404 page or redirect to home).
        console.warn('Invalid hash:', hash);
        document.getElementById('home').classList.remove('hidden'); // Default to home
      }
    } else {
      // If no hash, show the home page.
      document.getElementById('home').classList.remove('hidden');
    }
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
    contactButton.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent default link behavior
      window.location.hash = '#contact'; // Navigate to the contact section
    });
  }

  // Add any other home page specific JavaScript functionality here.
});