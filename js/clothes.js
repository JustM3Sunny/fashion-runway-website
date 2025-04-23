// js/clothes.js

/**
 * This file handles the display and interaction logic for the clothes section of the website.
 * It fetches clothes data, renders the UI, and manages user interactions like filtering and sorting.
 */

// Mock data for clothes (replace with API calls later)
const clothesData = [
  { id: 1, name: "Classic Tee", price: 25, image: "img/clothes/tee.jpg", category: "Tops", sizes: ["S", "M", "L", "XL"], colors: ["white", "black", "gray"] },
  { id: 2, name: "Denim Jeans", price: 60, image: "img/clothes/jeans.jpg", category: "Bottoms", sizes: ["28", "30", "32", "34", "36"], colors: ["blue", "black"] },
  { id: 3, name: "Hoodie", price: 45, image: "img/clothes/hoodie.jpg", category: "Outerwear", sizes: ["S", "M", "L", "XL"], colors: ["red", "blue", "gray"] },
  { id: 4, name: "Summer Dress", price: 50, image: "img/clothes/dress.jpg", category: "Dresses", sizes: ["XS", "S", "M", "L"], colors: ["floral", "yellow", "pink"] },
  { id: 5, name: "Leather Jacket", price: 120, image: "img/clothes/jacket.jpg", category: "Outerwear", sizes: ["S", "M", "L", "XL"], colors: ["black", "brown"] },
  { id: 6, name: "Chino Pants", price: 55, image: "img/clothes/chino.jpg", category: "Bottoms", sizes: ["28", "30", "32", "34", "36"], colors: ["beige", "navy"] },
  { id: 7, name: "Button-Down Shirt", price: 40, image: "img/clothes/shirt.jpg", category: "Tops", sizes: ["S", "M", "L", "XL"], colors: ["white", "blue", "striped"] },
  { id: 8, name: "Sweater", price: 50, image: "img/clothes/sweater.jpg", category: "Tops", sizes: ["S", "M", "L", "XL"], colors: ["gray", "navy", "green"] },
];

// Function to render clothes items to the UI
function renderClothes(clothes) {
  const clothesContainer = document.getElementById("clothes-container"); // Assuming a container with this ID exists in the HTML
  if (!clothesContainer) {
    console.error("Clothes container not found in the HTML.");
    return;
  }

  clothesContainer.innerHTML = ""; // Clear existing content

  clothes.forEach(item => {
    const itemElement = document.createElement("div");
    itemElement.classList.add("clothes-item", "p-4", "border", "rounded", "shadow-md", "hover:shadow-lg", "transition-shadow", "duration-300"); // Tailwind classes

    itemElement.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="w-full h-48 object-cover rounded-md mb-2">
      <h3 class="text-lg font-semibold">${item.name}</h3>
      <p class="text-gray-600">$${item.price}</p>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">Add to Cart</button>
    `;

    clothesContainer.appendChild(itemElement);
  });
}

// Function to filter clothes by category
function filterClothes(category) {
  if (category === "All") {
    renderClothes(clothesData);
  } else {
    const filteredClothes = clothesData.filter(item => item.category === category);
    renderClothes(filteredClothes);
  }
}

// Function to sort clothes by price (ascending or descending)
function sortClothes(sortBy) {
  let sortedClothes = [...clothesData]; // Create a copy to avoid modifying the original data

  if (sortBy === "price-asc") {
    sortedClothes.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-desc") {
    sortedClothes.sort((a, b) => b.price - a.price);
  }

  renderClothes(sortedClothes);
}

// Event listeners for filtering and sorting (example)
document.addEventListener("DOMContentLoaded", () => {
  // Initial render
  renderClothes(clothesData);

  // Example filter button (assuming you have buttons with these IDs)
  const allButton = document.getElementById("filter-all");
  const topsButton = document.getElementById("filter-tops");
  const bottomsButton = document.getElementById("filter-bottoms");

    if (allButton) {
        allButton.addEventListener("click", () => filterClothes("All"));
    }
    if (topsButton) {
        topsButton.addEventListener("click", () => filterClothes("Tops"));
    }
    if (bottomsButton) {
        bottomsButton.addEventListener("click", () => filterClothes("Bottoms"));
    }

  // Example sort dropdown (assuming you have a select element with this ID)
  const sortSelect = document.getElementById("sort-select");
  if (sortSelect) {
    sortSelect.addEventListener("change", (event) => {
      sortClothes(event.target.value);
    });
  }
});

// Export functions if needed for other modules
export { renderClothes, filterClothes, sortClothes };