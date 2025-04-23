// js/accessories.js

// This file handles the dynamic functionality for the accessories page.
// It fetches accessory data, renders the accessory list, and handles user interactions.

import { accessories } from './data/accessoriesData.js'; // Import the accessory data
import { updateCartCount } from './utils/cartUtils.js'; // Import utility function to update cart count

document.addEventListener('DOMContentLoaded', () => {
  // DOM is fully loaded, proceed with initializing the accessories page.

  const accessoriesContainer = document.getElementById('accessories-container'); // Get the container element

  if (!accessoriesContainer) {
    console.error("Accessories container element not found!");
    return; // Exit if the container is missing.
  }

  // Function to render the accessory list
  function renderAccessories(accessoriesList) {
    accessoriesContainer.innerHTML = ''; // Clear existing content

    if (!accessoriesList || accessoriesList.length === 0) {
      accessoriesContainer.innerHTML = '<p>No accessories found.</p>';
      return;
    }

    const fragment = document.createDocumentFragment(); // Use a document fragment for performance

    accessoriesList.forEach(accessory => {
      const accessoryCard = document.createElement('div');
      accessoryCard.classList.add('accessory-card', 'bg-white', 'shadow-md', 'rounded-lg', 'p-4', 'mb-4', 'flex', 'flex-col', 'items-center'); // Tailwind classes for styling

      const image = document.createElement('img');
      image.src = accessory.imageUrl;
      image.alt = accessory.name;
      image.classList.add('accessory-image', 'w-32', 'h-32', 'object-cover', 'rounded-md', 'mb-2'); // Tailwind classes for styling

      const name = document.createElement('h3');
      name.textContent = accessory.name;
      name.classList.add('accessory-name', 'text-lg', 'font-semibold', 'mb-1'); // Tailwind classes for styling

      const price = document.createElement('p');
      price.textContent = `$${accessory.price.toFixed(2)}`;
      price.classList.add('accessory-price', 'text-gray-600', 'mb-2'); // Tailwind classes for styling

      const addToCartButton = document.createElement('button');
      addToCartButton.textContent = 'Add to Cart';
      addToCartButton.classList.add('add-to-cart-button', 'bg-blue-500', 'hover:bg-blue-700', 'text-white', 'font-bold', 'py-2', 'px-4', 'rounded'); // Tailwind classes for styling
      addToCartButton.addEventListener('click', () => {
        // Handle adding the accessory to the cart.
        // This could involve updating a cart array in local storage or sending a request to a server.
        console.log(`Added ${accessory.name} to cart`);
        addToCart(accessory); // Call the addToCart function
        updateCartCount(); // Update the cart count in the header
      });

      accessoryCard.appendChild(image);
      accessoryCard.appendChild(name);
      accessoryCard.appendChild(price);
      accessoryCard.appendChild(addToCartButton);

      fragment.appendChild(accessoryCard); // Append to the fragment
    });

    accessoriesContainer.appendChild(fragment); // Append the fragment to the container once
  }

  // Function to add an item to the cart (example implementation using local storage)
  function addToCart(accessory) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    // Check if the item already exists in the cart
    const existingItemIndex = cart.findIndex(item => item.name === accessory.name);
    if (existingItemIndex > -1) {
        // If the item exists, update the quantity (assuming you have a quantity property)
        // cart[existingItemIndex].quantity = (cart[existingItemIndex].quantity || 1) + 1;
        console.log("Item already in cart. Consider updating quantity."); // Or implement quantity update
    } else {
        // If the item doesn't exist, add it to the cart
        cart.push(accessory);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
  }


  // Initial rendering of the accessories
  renderAccessories(accessories);

  // Example of filtering accessories (can be triggered by user input)
  const filterButton = document.getElementById('filter-button');
  if (filterButton) {
    filterButton.addEventListener('click', () => {
      const filteredAccessories = accessories.filter(accessory => accessory.category === 'new'); // Example filter
      renderAccessories(filteredAccessories);
    });
  }

  // Example of sorting accessories (can be triggered by user input)
  const sortButton = document.getElementById('sort-button');
  if (sortButton) {
    sortButton.addEventListener('click', () => {
      const sortedAccessories = [...accessories].sort((a, b) => a.price - b.price); // Example sort by price
      renderAccessories(sortedAccessories);
    });
  }
});