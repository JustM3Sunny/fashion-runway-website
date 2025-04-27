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

const clothesContainer = document.getElementById("clothes-container");
const DEFAULT_IMAGE = 'placeholder_image.png'; // Define default image

// Function to render clothes items to the UI
function renderClothes(clothes) {
    if (!clothesContainer) {
        console.error("Clothes container not found in the HTML.");
        return;
    }

    clothesContainer.innerHTML = ""; // Clear existing content

    const fragment = document.createDocumentFragment();

    clothes.forEach(item => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("clothes-item", "p-4", "border", "rounded", "shadow-md", "hover:shadow-lg", "transition-shadow", "duration-300");

        const imgElement = document.createElement("img");
        imgElement.src = item.image;
        imgElement.alt = item.name;
        imgElement.classList.add("w-full", "h-48", "object-cover", "rounded-md", "mb-2");
        imgElement.onerror = () => { imgElement.src = DEFAULT_IMAGE; }; // Use defined constant

        const nameElement = document.createElement("h3");
        nameElement.classList.add("text-lg", "font-semibold");
        nameElement.textContent = item.name;

        const priceElement = document.createElement("p");
        priceElement.classList.add("text-gray-600");
        priceElement.textContent = `$${item.price.toFixed(2)}`; // Format price to 2 decimal places

        const buttonElement = document.createElement("button");
        buttonElement.classList.add("bg-blue-500", "hover:bg-blue-700", "text-white", "font-bold", "py-2", "px-4", "rounded", "mt-2");
        buttonElement.textContent = "Add to Cart";
        buttonElement.addEventListener("click", () => { // Example add to cart functionality
            addToCart(item);
        });

        itemElement.appendChild(imgElement);
        itemElement.appendChild(nameElement);
        itemElement.appendChild(priceElement);
        itemElement.appendChild(buttonElement);

        fragment.appendChild(itemElement);
    });

    clothesContainer.appendChild(fragment);
}

// Function to filter clothes by category
function filterClothes(category) {
    const filteredClothes = category === "All" ? clothesData : clothesData.filter(item => item.category === category);
    renderClothes(filteredClothes);
}

// Function to sort clothes by price (ascending or descending)
function sortClothes(sortBy) {
    const sortedClothes = [...clothesData];

    sortedClothes.sort((a, b) => {
        if (sortBy === "price-asc") {
            return a.price - b.price;
        } else if (sortBy === "price-desc") {
            return b.price - a.price;
        }
        return 0;
    });

    renderClothes(sortedClothes);
}

// Function to search clothes by name
function searchClothes(searchTerm) {
    const searchTermLower = searchTerm.toLowerCase();
    const searchedClothes = clothesData.filter(item => item.name.toLowerCase().includes(searchTermLower));
    renderClothes(searchedClothes);
}

// Function to handle adding items to the cart (example)
function addToCart(item) {
    console.log(`Added ${item.name} to cart!`);
    // Implement actual cart logic here (e.g., update local storage, send to server)
}

// Event listeners for filtering and sorting
document.addEventListener("DOMContentLoaded", () => {
    renderClothes(clothesData);

    const filterButtons = {
        "filter-all": "All",
        "filter-tops": "Tops",
        "filter-bottoms": "Bottoms"
    };

    Object.entries(filterButtons).forEach(([buttonId, category]) => {
        const button = document.getElementById(buttonId);
        if (button) {
            button.addEventListener("click", () => filterClothes(category));
        }
    });

    const sortSelect = document.getElementById("sort-select");
    if (sortSelect) {
        sortSelect.addEventListener("change", (event) => {
            sortClothes(event.target.value);
        });
    }

    const searchInput = document.getElementById("search-input");
    if (searchInput) {
        let timeoutId;
        searchInput.addEventListener("input", (event) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                searchClothes(event.target.value);
            }, 200);
        });
    }
});

export { renderClothes, filterClothes, sortClothes, searchClothes };