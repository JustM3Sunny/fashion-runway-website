document.addEventListener('DOMContentLoaded', () => {
    // GSAP animations for a fashion clothing website

    // Animate the header title with a more stylish effect
    gsap.from('header h1', {
        opacity: 0,
        y: -80,
        duration: 1.2,
        ease: 'power4.out',
        delay: 0.3
    });

    // Animate the navigation links
    gsap.from('nav ul li', {
        opacity: 0,
        y: -30,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.5
    });

    // Functionality for product search (clothes)
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (event) => {
            const searchTerm = event.target.value.toLowerCase();
            filterProducts(searchTerm);
        });
    } else {
        console.warn('Search input field not found. Ensure an element with id "search-input" exists in the HTML.');
    }

    // Function to simulate filtering products based on search term
    function filterProducts(searchTerm) {
        const productItems = document.querySelectorAll('.product-item');
        productItems.forEach(item => {
            const productNameElement = item.querySelector('h3');
            if (!productNameElement) {
                console.warn('Product item missing h3 element.');
                return; // Skip this item if h3 is missing
            }
            const productName = productNameElement.textContent.toLowerCase();
            const shouldDisplay = productName.includes(searchTerm);
            item.style.display = shouldDisplay ? 'block' : 'none';
        });
    }


    // Product page functionality
    if (window.location.pathname.includes('products.html')) {
        loadProducts();
    }

    // Function to load and display product data
    async function loadProducts() {
        console.log('Loading product data for the fashion clothing website...');

        try {
            // Simulate fetching product data (replace with actual API call)
            // const response = await fetch('/api/products'); // Example API endpoint
            // const products = await response.json();

            // Mock product data - Moved to a separate file (products.js)
            const products = await getProducts();

            displayProducts(products);

        } catch (error) {
            console.error('Error loading products:', error);
            // Display an error message to the user
            const productContainer = document.getElementById('product-container');
            if (productContainer) {
                productContainer.textContent = 'Failed to load products. Please try again later.';
            }
        }
    }

    // Function to dynamically create and display product elements
    function displayProducts(products) {
        const productContainer = document.getElementById('product-container');
        if (productContainer) {
            productContainer.innerHTML = ''; // Clear existing products before adding new ones

            const fragment = document.createDocumentFragment(); // Use a document fragment for performance

            products.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.classList.add('product-item', 'p-4', 'border', 'rounded', 'shadow-md', 'bg-white'); // Added Tailwind classes

                const productImage = document.createElement('img');
                productImage.src = product.image;
                productImage.alt = product.name;
                productImage.classList.add('w-full', 'h-48', 'object-cover', 'mb-2'); // Added Tailwind classes
                productImage.onerror = () => { // Handle image loading errors
                    productImage.src = 'placeholder.jpg'; // Use a placeholder image
                    console.warn(`Failed to load image for product: ${product.name}`);
                };

                const productName = document.createElement('h3');
                productName.textContent = product.name;
                productName.classList.add('text-xl', 'font-semibold', 'mb-1'); // Added Tailwind classes

                const productPrice = document.createElement('p');
                productPrice.textContent = `$${product.price.toFixed(2)}`;
                productPrice.classList.add('text-gray-700', 'mb-2'); // Added Tailwind classes

                const addToCartButton = document.createElement('button');
                addToCartButton.textContent = 'Add to Cart';
                addToCartButton.classList.add('bg-blue-500', 'hover:bg-blue-700', 'text-white', 'font-bold', 'py-2', 'px-4', 'rounded'); // Added Tailwind classes
                addToCartButton.addEventListener('click', () => {
                    addToCart(product); // Use the addToCart function from cart.js
                });

                productDiv.appendChild(productImage);
                productDiv.appendChild(productName);
                productDiv.appendChild(productPrice);
                productDiv.appendChild(addToCartButton);

                fragment.appendChild(productDiv); // Append to the fragment
            });

            productContainer.appendChild(fragment); // Append the fragment to the container
        } else {
            console.warn('Product container not found. Ensure an element with id "product-container" exists in the HTML.');
        }
    }

    // Cart page functionality
    if (window.location.pathname.includes('cart.html')) {
        loadCart();
    }

    async function loadCart() {
        // Load cart items from local storage and display them
        const cartItems = getCartItems(); // Use the getCartItems function from cart.js
        displayCartItems(cartItems);
    }

    function displayCartItems(cartItems) {
        const cartContainer = document.getElementById('cart-container');
        if (cartContainer) {
            cartContainer.innerHTML = ''; // Clear existing cart items

            if (cartItems.length === 0) {
                cartContainer.textContent = 'Your cart is empty.';
                cartContainer.classList.add('text-center', 'py-4'); // Added Tailwind classes
                return;
            }

            const fragment = document.createDocumentFragment();

            cartItems.forEach(item => {
                const cartItemDiv = document.createElement('div');
                cartItemDiv.classList.add('cart-item', 'flex', 'items-center', 'justify-between', 'py-2', 'border-b'); // Added Tailwind classes

                const itemName = document.createElement('h4');
                itemName.textContent = item.name;
                itemName.classList.add('text-lg', 'font-medium'); // Added Tailwind classes

                const itemPrice = document.createElement('p');
                itemPrice.textContent = `$${item.price.toFixed(2)}`;
                itemPrice.classList.add('text-gray-700'); // Added Tailwind classes

                cartItemDiv.appendChild(itemName);
                cartItemDiv.appendChild(itemPrice);

                fragment.appendChild(cartItemDiv);
            });

            cartContainer.appendChild(fragment);
        } else {
            console.warn('Cart container not found. Ensure an element with id "cart-container" exists in the HTML.');
        }
    }

    // Add a simple message to the console to indicate the script is running
    console.log('Fashion clothing website script loaded.');
});

// Moved product data and cart functionality to separate files for better organization
// products.js: Contains product data and related functions (getProducts)
// cart.js: Contains cart related functions (addToCart, getCartItems)