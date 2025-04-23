// js/collection.js

/**
 * This file handles the dynamic behavior of the collection page.
 * It primarily focuses on filtering, sorting, and displaying product data.
 * It assumes that product data is fetched and available in a global scope
 * or via a dedicated data fetching function.
 */

// Example product data (replace with actual data fetching)
// Assuming product data is an array of objects, each with properties like:
// - id: unique product identifier
// - name: product name
// - category: product category (e.g., "clothes", "shoes", "accessories")
// - price: product price
// - imageUrl: URL of the product image
// - description: short product description

// const productData = [
//   { id: 1, name: "T-Shirt", category: "clothes", price: 25, imageUrl: "tshirt.jpg", description: "A comfortable cotton t-shirt." },
//   { id: 2, name: "Sneakers", category: "shoes", price: 80, imageUrl: "sneakers.jpg", description: "Stylish and durable sneakers." },
//   { id: 3, name: "Necklace", category: "accessories", price: 40, imageUrl: "necklace.jpg", description: "Elegant silver necklace." },
//   { id: 4, name: "Jeans", category: "clothes", price: 60, imageUrl: "jeans.jpg", description: "Classic denim jeans." },
//   { id: 5, name: "Boots", category: "shoes", price: 120, imageUrl: "boots.jpg", description: "Rugged leather boots." },
//   { id: 6, name: "Bracelet", category: "accessories", price: 30, imageUrl: "bracelet.jpg", description: "Handcrafted beaded bracelet." },
// ];

// Function to fetch product data (replace with your actual data fetching logic)
async function fetchProductData() {
  // Simulate fetching data from an API
  // Replace this with your actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const productData = [
        { id: 1, name: "T-Shirt", category: "clothes", price: 25, imageUrl: "tshirt.jpg", description: "A comfortable cotton t-shirt." },
        { id: 2, name: "Sneakers", category: "shoes", price: 80, imageUrl: "sneakers.jpg", description: "Stylish and durable sneakers." },
        { id: 3, name: "Necklace", category: "accessories", price: 40, imageUrl: "necklace.jpg", description: "Elegant silver necklace." },
        { id: 4, name: "Jeans", category: "clothes", price: 60, imageUrl: "classic denim jeans." },
        { id: 5, name: "Boots", category: "shoes", price: 120, imageUrl: "boots.jpg", description: "Rugged leather boots." },
        { id: 6, name: "Bracelet", category: "accessories", price: 30, imageUrl: "beaded bracelet." },
      ];
      resolve(productData);
    }, 500); // Simulate a 500ms delay
  });
}


// Function to display products based on filter and sort criteria
async function displayProducts(filterCategory = "all", sortOption = "price-low-to-high") {
  const productData = await fetchProductData(); // Fetch the product data
  let filteredProducts = [...productData]; // Create a copy to avoid modifying the original

  // Filter products by category
  if (filterCategory !== "all") {
    filteredProducts = filteredProducts.filter(product => product.category === filterCategory);
  }

  // Sort products based on the selected option
  switch (sortOption) {
    case "price-low-to-high":
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case "price-high-to-low":
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case "name-a-to-z":
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "name-z-to-a":
      filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
      break;
    default:
      // Default sorting (e.g., by ID)
      filteredProducts.sort((a, b) => a.id - b.id);
  }

  // Get the product container element
  const productContainer = document.getElementById("product-container");

  // Clear the existing product list
  productContainer.innerHTML = "";

  // Create and append product elements to the container
  filteredProducts.forEach(product => {
    const productElement = document.createElement("div");
    productElement.classList.add("product", "p-4", "border", "rounded", "shadow-md", "hover:shadow-lg", "transition-shadow", "duration-300");

    // Product image
    const imageElement = document.createElement("img");
    imageElement.src = product.imageUrl;
    imageElement.alt = product.name;
    imageElement.classList.add("w-full", "h-48", "object-cover", "rounded-t");
    productElement.appendChild(imageElement);

    // Product name
    const nameElement = document.createElement("h3");
    nameElement.textContent = product.name;
    nameElement.classList.add("text-lg", "font-semibold", "mt-2");
    productElement.appendChild(nameElement);

    // Product price
    const priceElement = document.createElement("p");
    priceElement.textContent = `$${product.price.toFixed(2)}`;
    priceElement.classList.add("text-gray-600", "mt-1");
    productElement.appendChild(priceElement);

    // Product description
    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = product.description;
    descriptionElement.classList.add("text-sm", "text-gray-700", "mt-1");
    productElement.appendChild(descriptionElement);

    // Add to cart button (example)
    const addToCartButton = document.createElement("button");
    addToCartButton.textContent = "Add to Cart";
    addToCartButton.classList.add("bg-blue-500", "hover:bg-blue-700", "text-white", "font-bold", "py-2", "px-4", "rounded", "mt-4");
    addToCartButton.addEventListener("click", () => {
      // Implement add to cart functionality here
      console.log(`Added ${product.name} to cart`);
    });
    productElement.appendChild(addToCartButton);

    productContainer.appendChild(productElement);
  });
}

// Function to handle category filtering
function handleCategoryFilter() {
  const categorySelect = document.getElementById("category-filter");
  const selectedCategory = categorySelect.value;
  displayProducts(selectedCategory);
}

// Function to handle sorting
function handleSort() {
  const sortSelect = document.getElementById("sort-by");
  const selectedSortOption = sortSelect.value;
  displayProducts(document.getElementById("category-filter").value, selectedSortOption);
}


// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  // Initial display of products (all categories, default sorting)
  displayProducts();

  // Category filter change listener
  const categoryFilter = document.getElementById("category-filter");
  if (categoryFilter) {
    categoryFilter.addEventListener("change", handleCategoryFilter);
  }

  // Sort change listener
  const sortBy = document.getElementById("sort-by");
  if (sortBy) {
    sortBy.addEventListener("change", handleSort);
  }
});