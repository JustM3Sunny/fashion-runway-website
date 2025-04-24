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

  let shoes = []; // Declare shoes outside the try block for wider scope

  try {
    shoes = getShoes(); // Fetch the shoe data
  } catch (error) {
    console.error("Error fetching shoe data:", error);
    shoesContainer.innerHTML = '<p class="text-red-500">Failed to load shoes. Please try again later.</p>';
    return;
  }


  if (!shoes || shoes.length === 0) {
    shoesContainer.innerHTML = '<p class="text-gray-500">No shoes available at the moment.</p>';
    return; // Exit if there are no shoes to display
  }

  // Function to render a single shoe item
  function renderShoe(shoe) {
    const shoeElement = document.createElement('div');
    shoeElement.classList.add('shoe-item', 'p-4', 'border', 'border-gray-200', 'rounded-lg', 'shadow-md', 'hover:shadow-lg', 'transition-shadow', 'duration-300');

    const imageElement = document.createElement('img');
    imageElement.src = shoe.image;
    imageElement.alt = shoe.name;
    imageElement.classList.add('w-full', 'h-48', 'object-cover', 'rounded-md', 'mb-2');
    imageElement.onerror = () => {
        imageElement.src = 'path/to/default/image.jpg'; // Replace with a default image path
        console.warn(`Failed to load image for shoe: ${shoe.name}. Using default image.`);
    };

    const nameElement = document.createElement('h3');
    nameElement.classList.add('text-lg', 'font-semibold', 'text-gray-800');
    nameElement.textContent = shoe.name;

    const descriptionElement = document.createElement('p');
    descriptionElement.classList.add('text-gray-600');
    descriptionElement.textContent = shoe.description;

    const priceElement = document.createElement('p');
    priceElement.classList.add('text-green-600', 'font-bold');
    priceElement.textContent = `$${shoe.price.toFixed(2)}`;

    const buttonElement = document.createElement('button');
    buttonElement.classList.add('add-to-cart-btn', 'bg-blue-500', 'hover:bg-blue-700', 'text-white', 'font-bold', 'py-2', 'px-4', 'rounded', 'focus:outline-none', 'focus:shadow-outline');
    buttonElement.dataset.shoeId = shoe.id;
    buttonElement.textContent = 'Add to Cart';

    shoeElement.appendChild(imageElement);
    shoeElement.appendChild(nameElement);
    shoeElement.appendChild(descriptionElement);
    shoeElement.appendChild(priceElement);
    shoeElement.appendChild(buttonElement);

    return shoeElement;
  }

  // Render all shoes
  const fragment = document.createDocumentFragment(); // Use a fragment for better performance
  shoes.forEach(shoe => {
    const shoeElement = renderShoe(shoe);
    fragment.appendChild(shoeElement);
  });
  shoesContainer.appendChild(fragment);

  // Event listener for "Add to Cart" buttons (using event delegation)
  shoesContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('add-to-cart-btn')) {
      const shoeId = event.target.dataset.shoeId;
      const selectedShoe = shoes.find(shoe => shoe.id === shoeId);

      if (selectedShoe) {
        addToCart(selectedShoe); // Add the selected shoe to the cart
        showNotification(`${selectedShoe.name} added to cart!`);
      } else {
        console.error(`Shoe with ID ${shoeId} not found.`);
      }
    }
  });

  let notificationTimeout; // Store the timeout ID

  function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.classList.add('notification'); // Add a class for styling

    // Basic styling (can be improved with CSS)
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    notification.style.color = 'white';
    notification.style.padding = '10px';
    notification.style.borderRadius = '5px';
    notification.style.zIndex = '1000'; // Ensure it's on top

    document.body.appendChild(notification);

    // Clear any existing timeout
    if (notificationTimeout) {
      clearTimeout(notificationTimeout);
    }

    // Remove the notification after a few seconds
    notificationTimeout = setTimeout(() => {
      document.body.removeChild(notification);
    }, 3000); // 3 seconds
  }
});