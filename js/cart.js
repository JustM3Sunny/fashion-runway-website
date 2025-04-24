/**
 * js/cart.js - Handles cart functionality, UI updates, and data management.
 *
 * This file is responsible for managing the shopping cart, including adding,
 * removing, and updating items. It also handles UI updates to reflect the
 * current cart state and interacts with local storage for persistence.
 *
 * The cart data is structured as an array of objects, where each object
 * represents a product in the cart and includes properties like product ID,
 * quantity, name, and price.
 */

// Constants for local storage key and event names
const CART_STORAGE_KEY = 'shoppingCart';
const CART_UPDATED_EVENT = 'cartUpdated';

// Function to get the cart from local storage
function getCart() {
  try {
    const cartData = localStorage.getItem(CART_STORAGE_KEY);
    return cartData ? JSON.parse(cartData) : [];
  } catch (error) {
    console.error("Error retrieving cart from local storage:", error);
    return []; // Return an empty cart in case of an error
  }
}

// Function to save the cart to local storage
function saveCart(cart) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    // Dispatch a custom event to notify other parts of the application
    // that the cart has been updated.
    document.dispatchEvent(new CustomEvent(CART_UPDATED_EVENT));
  } catch (error) {
    console.error("Error saving cart to local storage:", error);
  }
}

// Function to add an item to the cart
function addToCart(productId, quantity = 1, name, price, imageUrl) {
  const cart = getCart();
  const existingItemIndex = cart.findIndex(item => item.productId === productId);

  if (existingItemIndex !== -1) {
    cart[existingItemIndex].quantity += quantity;
  } else {
    cart.push({ productId, quantity, name, price, imageUrl });
  }

  saveCart(cart);
}

// Function to remove an item from the cart
function removeFromCart(productId) {
  let cart = getCart();
  const initialLength = cart.length;
  cart = cart.filter(item => item.productId !== productId);
  if (cart.length !== initialLength) {
    saveCart(cart);
  }
}

// Function to update the quantity of an item in the cart
function updateCartItemQuantity(productId, quantity) {
  const cart = getCart();
  const itemIndex = cart.findIndex(item => item.productId === productId);

  if (itemIndex !== -1) {
    if (quantity <= 0) {
      cart.splice(itemIndex, 1); // Remove the item if quantity is zero or negative
    } else {
      cart[itemIndex].quantity = quantity;
    }
    saveCart(cart);
  }
}

// Function to clear the entire cart
function clearCart() {
  localStorage.removeItem(CART_STORAGE_KEY);
  document.dispatchEvent(new CustomEvent(CART_UPDATED_EVENT));
}

// Function to calculate the total price of the cart
function calculateCartTotal() {
  const cart = getCart();
  return cart.reduce((total, item) => total + (Number(item.price) * item.quantity), 0);
}

// Function to get the number of items in the cart
function getCartItemCount() {
  const cart = getCart();
  return cart.reduce((count, item) => count + item.quantity, 0);
}

// Export the cart functions for use in other modules
export {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
  calculateCartTotal,
  getCartItemCount,
  CART_UPDATED_EVENT // Export the event name so other modules can listen for it.
};

// The following section is commented out as the UI/UX changes and file separation
// are beyond the scope of this single cart.js file.  These changes require creating
// new HTML files and modifying the overall application structure.  This file
// focuses solely on cart data management.  Implementing the full UI/UX changes
// would involve creating separate files for:
// - Home page
// - About page
// - Collection page
// - Showcase page
// - Contact page
// - Products page
// - Clothes page
// - Accessories page
// - Shoes page
// - Profile page
// and potentially others, each with its own HTML structure and Tailwind CSS styling.
// These files would then import and use the functions exported from this cart.js file.

// Example usage (can be removed or modified as needed)
// document.addEventListener('DOMContentLoaded', () => {
//   // Example: Add an item to the cart
//   // addToCart('product123', 2, 'Awesome T-Shirt', 25.00);

//   // Example: Get the cart and log it to the console
//   // const cart = getCart();
//   // console.log('Current Cart:', cart);

//   // Example: Listen for cart updates and update the UI
//   document.addEventListener(CART_UPDATED_EVENT, () => {
//     console.log('Cart updated!');
//     // Update UI elements here (e.g., cart count, cart total, cart items)
//   });
// });