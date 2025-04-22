document.addEventListener('DOMContentLoaded', () => {
    // GSAP animations for a fashion clothing website

    // Animate the header title with a more stylish effect
    gsap.from('header h1', {
        opacity: 0,
        y: -80, // Increased distance for a more dramatic entrance
        duration: 1.2, // Slightly longer duration for smoother animation
        ease: 'power4.out', // More sophisticated easing
        delay: 0.3 // Add a small delay for a staggered effect
    });

    // Animate the navigation links
    gsap.from('nav ul li', {
        opacity: 0,
        y: -30,
        duration: 0.8,
        stagger: 0.1, // Stagger the animation of each link
        ease: 'power3.out',
        delay: 0.5
    });

    // Functionality for product search (clothes)
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('keyup', (event) => {
            const searchTerm = event.target.value.toLowerCase();
            // Simulate filtering product data (replace with actual API call/data filtering)
            filterProducts(searchTerm);
        });
    } else {
        console.warn('Search input field not found. Ensure an element with id "search-input" exists in the HTML.');
    }

    // Function to simulate filtering products based on search term
    function filterProducts(searchTerm) {
        // In a real implementation, this would fetch product data,
        // filter it based on the searchTerm, and update the product display.
        // For this example, we'll just log the search term.
        console.log('Filtering products based on:', searchTerm);

        // Example: Update product display (replace with actual DOM manipulation)
        const productItems = document.querySelectorAll('.product-item'); // Assuming product items have a class 'product-item'
        productItems.forEach(item => {
            const productName = item.querySelector('h3').textContent.toLowerCase(); // Assuming product name is in an h3 tag
            if (productName.includes(searchTerm)) {
                item.style.display = 'block'; // Show the product
            } else {
                item.style.display = 'none'; // Hide the product
            }
        });
    }


    // Product page functionality
    if (window.location.pathname.includes('products.html')) {
        loadProducts();
    }

    // Function to load and display product data
    function loadProducts() {
        console.log('Loading product data for the fashion clothing website...');

        // Simulate fetching product data (replace with actual API call)
        const products = [
            { id: 1, name: 'Elegant Dress', price: 79.99, image: 'dress1.jpg' },
            { id: 2, name: 'Casual Jeans', price: 49.99, image: 'jeans1.jpg' },
            { id: 3, name: 'Stylish Top', price: 39.99, image: 'top1.jpg' },
            { id: 4, name: 'Comfortable Sweater', price: 59.99, image: 'sweater1.jpg' }
        ];

        // Display the products
        displayProducts(products);
    }

    // Function to dynamically create and display product elements
    function displayProducts(products) {
        const productContainer = document.getElementById('product-container'); // Assuming a container with id 'product-container' exists
        if (productContainer) {
            products.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.classList.add('product-item'); // Add a class for styling

                const productImage = document.createElement('img');
                productImage.src = product.image;
                productImage.alt = product.name;

                const productName = document.createElement('h3');
                productName.textContent = product.name;

                const productPrice = document.createElement('p');
                productPrice.textContent = `$${product.price.toFixed(2)}`;

                const addToCartButton = document.createElement('button');
                addToCartButton.textContent = 'Add to Cart';
                addToCartButton.addEventListener('click', () => {
                    // Implement add to cart functionality here
                    console.log(`Added ${product.name} to cart`);
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