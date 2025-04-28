// js/collection.js

/**
 * This file handles the dynamic behavior of the collection page.
 * It primarily focuses on filtering, sorting, and displaying product data.
 */

// Configuration object for product display.  Allows easy modification of image sizes, etc.
const productDisplayConfig = {
    imageWidth: '100%',
    imageHeight: '200px', // Increased height for better visuals
    imageObjectFit: 'cover',
    productContainerId: 'product-container',
    productClass: 'product p-4 border rounded shadow-md hover:shadow-lg transition-shadow duration-300',
    imageClass: 'w-full h-48 object-cover rounded-t',
    nameClass: 'text-lg font-semibold mt-2',
    priceClass: 'text-gray-600 mt-1',
    descriptionClass: 'text-sm text-gray-700 mt-1',
    addToCartButtonClass: 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 block w-full text-center' // Added block and width for better button styling
};

// Function to fetch product data (replace with your actual data fetching logic)
async function fetchProductData() {
    // Simulate fetching data from an API
    return new Promise((resolve) => {
        setTimeout(() => {
            const productData = [
                { id: 1, name: "T-Shirt", category: "clothes", price: 25, imageUrl: "tshirt.jpg", description: "A comfortable cotton t-shirt." },
                { id: 2, name: "Sneakers", category: "shoes", price: 80, imageUrl: "sneakers.jpg", description: "Stylish and durable sneakers." },
                { id: 3, name: "Necklace", category: "accessories", price: 40, imageUrl: "necklace.jpg", description: "Elegant silver necklace." },
                { id: 4, name: "Jeans", category: "clothes", price: 60, imageUrl: "jeans.jpg", description: "Classic denim jeans." },
                { id: 5, name: "Boots", category: "shoes", price: 120, imageUrl: "boots.jpg", description: "Rugged leather boots." },
                { id: 6, name: "Bracelet", category: "accessories", price: 30, imageUrl: "bracelet.jpg", description: "Handcrafted beaded bracelet." },
            ];
            resolve(productData);
        }, 500); // Simulate a 500ms delay
    });
}

// Function to display products based on filter and sort criteria
async function displayProducts(filterCategory = "all", sortOption = "price-low-to-high") {
    try {
        const productData = await fetchProductData(); // Fetch the product data
        const filteredProducts = filterProducts(productData, filterCategory);
        const sortedProducts = sortProducts(filteredProducts, sortOption);

        // Get the product container element
        const productContainer = document.getElementById(productDisplayConfig.productContainerId);

        if (!productContainer) {
            console.error(`Product container with ID "${productDisplayConfig.productContainerId}" not found.`);
            return; // Exit if container is not found
        }

        // Clear the existing product list
        productContainer.innerHTML = "";

        // Create and append product elements to the container
        const fragment = document.createDocumentFragment(); // Use a document fragment for performance
        sortedProducts.forEach(product => {
            const productElement = createProductElement(product);
            fragment.appendChild(productElement);
        });
        productContainer.appendChild(fragment); // Append the fragment once
    } catch (error) {
        console.error("Error displaying products:", error);
        // Optionally display an error message to the user.
        productContainer.innerHTML = "<p>Error loading products. Please try again later.</p>"; // Display error to user
    }
}

// Function to filter products by category
function filterProducts(products, filterCategory) {
    if (filterCategory === "all") {
        return products;
    }
    return products.filter(product => product.category === filterCategory);
}

// Function to sort products based on the selected option
function sortProducts(products, sortOption) {
    const productsCopy = [...products]; // Create a copy to avoid modifying the original data
    switch (sortOption) {
        case "price-low-to-high":
            productsCopy.sort((a, b) => a.price - b.price);
            break;
        case "price-high-to-low":
            productsCopy.sort((a, b) => b.price - a.price);
            break;
        case "name-a-to-z":
            productsCopy.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case "name-z-to-a":
            productsCopy.sort((a, b) => b.name.localeCompare(a.name));
            break;
        default:
            console.warn(`Unknown sort option: ${sortOption}.  Sorting by ID.`);
            productsCopy.sort((a, b) => a.id - b.id);
    }
    return productsCopy;
}

// Function to create a product element
function createProductElement(product) {
    const productElement = document.createElement("div");
    productElement.className = productDisplayConfig.productClass;

    // Product image
    const imageElement = document.createElement("img");
    imageElement.src = product.imageUrl;
    imageElement.alt = product.name;
    imageElement.className = productDisplayConfig.imageClass;
    imageElement.style.width = productDisplayConfig.imageWidth;
    imageElement.style.height = productDisplayConfig.imageHeight;
    imageElement.style.objectFit = productDisplayConfig.imageObjectFit;
    imageElement.loading = 'lazy'; // Add lazy loading
    imageElement.onerror = () => {
        imageElement.src = 'placeholder.jpg'; // Use a placeholder image on error
    };
    productElement.appendChild(imageElement);

    // Product name
    const nameElement = document.createElement("h3");
    nameElement.textContent = product.name;
    nameElement.className = productDisplayConfig.nameClass;
    productElement.appendChild(nameElement);

    // Product price
    const priceElement = document.createElement("p");
    priceElement.textContent = `$${product.price.toFixed(2)}`;
    priceElement.className = productDisplayConfig.priceClass;
    productElement.appendChild(priceElement);

    // Product description
    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = product.description;
    descriptionElement.className = productDisplayConfig.descriptionClass;
    productElement.appendChild(descriptionElement);

    // Add to cart button (example)
    const addToCartButton = document.createElement("button");
    addToCartButton.textContent = "Add to Cart";
    addToCartButton.className = productDisplayConfig.addToCartButtonClass;
    addToCartButton.addEventListener("click", () => {
        // Implement add to cart functionality here
        console.log(`Added ${product.name} to cart`);
        // Dispatch a custom event for add to cart
        const addToCartEvent = new CustomEvent('addToCart', {
            detail: { productId: product.id, productName: product.name }
        });
        document.dispatchEvent(addToCartEvent);
    });
    productElement.appendChild(addToCartButton);

    return productElement;
}

// Function to handle category filtering
function handleCategoryFilter() {
    const categorySelect = document.getElementById("category-filter");
    if (!categorySelect) {
        console.error("Category filter element not found.");
        return;
    }
    displayProducts(categorySelect.value);
}

// Function to handle sorting
function handleSort() {
    const sortSelect = document.getElementById("sort-by");
    if (!sortSelect) {
        console.error("Sort by element not found.");
        return;
    }
    const categorySelect = document.getElementById("category-filter");
    const selectedCategory = categorySelect ? categorySelect.value : 'all'; // Default to 'all' if category filter is missing
    displayProducts(selectedCategory, sortSelect.value);
}

// Function to initialize the page
function initializePage() {
    // Initial display of products (all categories, default sorting)
    displayProducts();

    // Category filter change listener
    const categoryFilter = document.getElementById("category-filter");
    if (categoryFilter) {
        categoryFilter.addEventListener("change", handleCategoryFilter);
    } else {
        console.warn("Category filter element not found.  Filtering will not work.");
    }


    // Sort change listener
    const sortBy = document.getElementById("sort-by");
    if (sortBy) {
        sortBy.addEventListener("change", handleSort);
    } else {
        console.warn("Sort by element not found.  Sorting will not work.");
    }
}

// Event listeners
document.addEventListener("DOMContentLoaded", initializePage);