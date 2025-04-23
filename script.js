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
        searchInput.addEventListener('input', (event) => { // Changed keyup to input for better UX
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
            item.style.display = productName.includes(searchTerm) ? 'block' : 'none';
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

            // Mock product data
            const products = [
                { id: 1, name: 'Elegant Dress', price: 79.99, image: 'dress1.jpg' },
                { id: 2, name: 'Casual Jeans', price: 49.99, image: 'jeans1.jpg' },
                { id: 3, name: 'Stylish Top', price: 39.99, image: 'top1.jpg' },
                { id: 4, name: 'Comfortable Sweater', price: 59.99, image: 'sweater1.jpg' }
            ];

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

            products.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.classList.add('product-item');

                const productImage = document.createElement('img');
                productImage.src = product.image;
                productImage.alt = product.name;
                productImage.onerror = () => { // Handle image loading errors
                    productImage.src = 'placeholder.jpg'; // Use a placeholder image
                    console.warn(`Failed to load image for product: ${product.name}`);
                };

                const productName = document.createElement('h3');
                productName.textContent = product.name;

                const productPrice = document.createElement('p');
                productPrice.textContent = `$${product.price.toFixed(2)}`;

                const addToCartButton = document.createElement('button');
                addToCartButton.textContent = 'Add to Cart';
                addToCartButton.addEventListener('click', () => {
                    // Implement add to cart functionality here
                    console.log(`Added ${product.name} to cart`);
                    // Store product ID in local storage (example)
                    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
                    cart.push(product.id);
                    localStorage.setItem('cart', JSON.stringify(cart));
                });

                productDiv.appendChild(productImage);
                productDiv.appendChild(productName);
                productDiv.appendChild(productPrice);
                productDiv.appendChild(addToCartButton);

                productContainer.appendChild(productDiv);
            });
        } else {
            console.warn('Product container not found. Ensure an element with id "product-container" exists in the HTML.');
        }
    }
});