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
        searchInput.addEventListener('input', debounce((event) => {
            const searchTerm = event.target.value.toLowerCase();
            filterProducts(searchTerm);
        }, 250));
    } else {
        console.warn('Search input field not found. Ensure an element with id "search-input" exists in the HTML.');
    }

    function filterProducts(searchTerm) {
        const productItems = document.querySelectorAll('.product-item');
        productItems.forEach(item => {
            const productNameElement = item.querySelector('h3');
            if (!productNameElement) {
                console.warn('Product item missing h3 element.');
                return;
            }
            const productName = productNameElement.textContent.toLowerCase();
            const shouldDisplay = productName.includes(searchTerm);
            item.style.display = shouldDisplay ? 'block' : 'none';
        });
    }

    function debounce(func, delay) {
        let timeout;
        return function(...args) {
            const context = this; // Store the context
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                func.apply(context, args); // Use the stored context
            }, delay);
        };
    }

    // --- Product Page Functionality ---
    async function initProductsPage() {
        try {
            const products = await loadProducts();
            displayProducts(products);
        } catch (error) {
            console.error('Error initializing products page:', error);
            displayErrorMessage('product-container', 'Failed to load products. Please try again later.');
        }
    }

    async function loadProducts() {
        console.log('Loading product data for the fashion clothing website...');
        try {
            const products = await getProducts(); // Assuming getProducts is defined in products.js
            return products;
        } catch (error) {
            console.error('Error loading products:', error);
            displayErrorMessage('product-container', 'Failed to load products. Please try again later.');
            throw error;
        }
    }

    function displayProducts(products) {
        const productContainer = document.getElementById('product-container');
        if (!productContainer) {
            console.warn('Product container not found. Ensure an element with id "product-container" exists in the HTML.');
            return;
        }

        productContainer.innerHTML = '';

        if (products.length === 0) {
            displayErrorMessage('product-container', 'No products found.');
            return;
        }

        const fragment = document.createDocumentFragment();

        products.forEach(product => {
            const productDiv = createProductElement(product);
            fragment.appendChild(productDiv);
        });

        productContainer.appendChild(fragment);
    }

    function createProductElement(product) {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product-item', 'p-4', 'border', 'rounded', 'shadow-md', 'bg-white');

        const productImage = document.createElement('img');
        productImage.src = product.image;
        productImage.alt = `Image of ${product.name}`; // Improved alt text
        productImage.classList.add('w-full', 'h-48', 'object-cover', 'mb-2');
        productImage.onerror = () => {
            productImage.src = 'placeholder.jpg';
            console.warn(`Failed to load image for product: ${product.name}`);
        };

        const productName = document.createElement('h3');
        productName.textContent = product.name;
        productName.classList.add('text-xl', 'font-semibold', 'mb-1');

        const productPrice = document.createElement('p');
        productPrice.textContent = `$${product.price.toFixed(2)}`;
        productPrice.classList.add('text-gray-700', 'mb-2');

        const addToCartButton = document.createElement('button');
        addToCartButton.textContent = 'Add to Cart';
        addToCartButton.classList.add('bg-blue-500', 'hover:bg-blue-700', 'text-white', 'font-bold', 'py-2', 'px-4', 'rounded');
        addToCartButton.addEventListener('click', () => {
            addToCart(product); // Assuming addToCart is defined in cart.js
        });

        productDiv.appendChild(productImage);
        productDiv.appendChild(productName);
        productDiv.appendChild(productPrice);
        productDiv.appendChild(addToCartButton);

        return productDiv;
    }

    // --- Cart Page Functionality ---
    async function initCartPage() {
        try {
            const cartItems = await loadCart();
            displayCartItems(cartItems);
        } catch (error) {
            console.error('Error initializing cart page:', error);
            displayErrorMessage('cart-container', 'Failed to load cart. Please try again later.');
        }
    }

    async function loadCart() {
        try {
            const cartItems = await getCartItems(); // Assuming getCartItems is defined in cart.js
            return cartItems;
        } catch (error) {
            console.error('Error loading cart:', error);
            displayErrorMessage('cart-container', 'Failed to load cart. Please try again later.');
            throw error;
        }
    }

    function displayCartItems(cartItems) {
        const cartContainer = document.getElementById('cart-container');
        if (!cartContainer) {
            console.warn('Cart container not found. Ensure an element with id "cart-container" exists in the HTML.');
            return;
        }

        cartContainer.innerHTML = '';

        if (cartItems.length === 0) {
            displayErrorMessage('cart-container', 'Your cart is empty.', 'text-center', 'py-4');
            return;
        }

        const fragment = document.createDocumentFragment();

        cartItems.forEach(item => {
            const cartItemDiv = createCartItemElement(item);
            fragment.appendChild(cartItemDiv);
        });

        cartContainer.appendChild(fragment);
    }

    function createCartItemElement(item) {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item', 'flex', 'items-center', 'justify-between', 'py-2', 'border-b');

        const itemName = document.createElement('h4');
        itemName.textContent = item.name;
        itemName.classList.add('text-lg', 'font-medium');

        const itemPrice = document.createElement('p');
        itemPrice.textContent = `$${item.price.toFixed(2)}`;
        itemPrice.classList.add('text-gray-700');

        cartItemDiv.appendChild(itemName);
        cartItemDiv.appendChild(itemPrice);

        return cartItemDiv;
    }

    function displayErrorMessage(containerId, message, ...classes) {
        const container = document.getElementById(containerId);
        if (container) {
            container.textContent = message;
            container.className = '';
            classes.forEach(cls => container.classList.add(cls));
        } else {
            console.warn(`Container with id "${containerId}" not found.`);
        }
    }

    // Centralized page initialization
    function initPage() {
        const pathname = window.location.pathname;

        let pageInitialized = false;

        if (pathname.includes('products.html')) {
            initProductsPage();
            pageInitialized = true;
        } else if (pathname.includes('cart.html')) {
            initCartPage();
            pageInitialized = true;
        }

        if (!pageInitialized) {
            console.log('No specific page initialization required.');
        }
    }

    initPage(); // Call the centralized initialization function

    console.log('Fashion clothing website script loaded.');
});