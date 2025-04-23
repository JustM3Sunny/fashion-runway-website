// js/shoes.js

// This file handles the display and interaction logic for the shoes section of the website.
// It fetches shoe data, renders the shoe list, and handles user interactions like adding to cart.

import { getShoes } from './data/shoesData.js'; // Assuming shoe data is in a separate file
import { addToCart } from './cart.js'; // Assuming cart functionality is in cart.js

document.addEventListener('DOMContentLoaded', () => {
  const shoesContainer = document.getElementById('shoes-container'); // Get the container element from the HTML

  if (!shoesContainer) {
    console.error("Shoes container element not found. Check your HTML.");
    return; // Exit if the container doesn't exist
  }

  const shoes = getShoes(); // Fetch the shoe data

  if (!shoes || shoes.length === 0) {
    shoesContainer.innerHTML = '<p class="text-gray-500">No shoes available at the moment.</p>';
    return; // Exit if there are no shoes to display
  }

  // Function to render a single shoe item
  function renderShoe(shoe) {
    const shoeElement = document.createElement('div');
    shoeElement.classList.add('shoe-item', 'p-4', 'border', 'border-gray-200', 'rounded-lg', 'shadow-md', 'hover:shadow-lg', 'transition-shadow', 'duration-300');

    shoeElement.innerHTML = `
      <img src="${shoe.image}" alt="${shoe.name}" class="w-full h-48 object-cover rounded-md mb-2">
      <h3 class="text-lg font-semibold text-gray-800">${shoe.name}</h3>
      <p class="text-gray-600">${shoe.description}</p>
      <p class="text-green-600 font-bold">$${shoe.price.toFixed(2)}</p>
      <button class="add-to-cart-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" data-shoe-id="${shoe.id}">Add to Cart</button>
    `;

    return shoeElement;
  }

  // Render all shoes
  shoes.forEach(shoe => {
    const shoeElement = renderShoe(shoe);
    shoesContainer.appendChild(shoeElement);
  });

  // Event listener for "Add to Cart" buttons
  shoesContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('add-to-cart-btn')) {
      const shoeId = event.target.dataset.shoeId;
      const selectedShoe = shoes.find(shoe => shoe.id === shoeId);

      if (selectedShoe) {
        addToCart(selectedShoe); // Add the selected shoe to the cart
        alert(`${selectedShoe.name} added to cart!`); // Provide user feedback
      } else {
        console.error(`Shoe with ID ${shoeId} not found.`);
      }
    }
  });
});