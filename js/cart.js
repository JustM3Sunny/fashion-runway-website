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

// Create a custom event target for cart updates
const cartEventTarget = new EventTarget();

// Helper function to parse JSON safely
const parseJSON = (jsonString) => {
  try {
    return jsonString ? JSON.parse(jsonString) : null;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return null;
  }
};

// Function to get the cart from local storage
function getCart() {
  const cartData = localStorage.getItem(CART_STORAGE_KEY);
  return parseJSON(cartData) || [];
}

// Function to save the cart to local storage
function saveCart(cart) {
  try {
    const cartString = JSON.stringify(cart);
    localStorage.setItem(CART_STORAGE_KEY, cartString);
    // Dispatch a custom event to notify other parts of the application
    // that the cart has been updated.
    cartEventTarget.dispatchEvent(new CustomEvent(CART_UPDATED_EVENT, { detail: { cart: structuredClone(cart) } })); // Include cart data in the event
  } catch (error) {
    console.error("Error saving cart to local storage:", error);
  }
}

// Function to add an item to the cart
function addToCart(productId, quantity = 1, name, price, imageUrl) {
  if (!productId || !name || !price || quantity <= 0) {
    console.warn("Invalid product data provided. Product ID, name, and price are required, and quantity must be positive.");
    return; // Prevent adding invalid items
  }

  const cart = getCart();
  const existingItemIndex = cart.findIndex(item => item.productId === productId);

  const newItem = {
    productId,
    quantity,
    name,
    price: Number(price), // Ensure price is a number
    imageUrl,
  };

  if (existingItemIndex !== -1) {
    cart[existingItemIndex].quantity += quantity;
  } else {
    cart.push(newItem);
  }

  saveCart(cart);
}

// Function to remove an item from the cart
function removeFromCart(productId) {
  if (!productId) {
    console.warn("Product ID is required to remove an item from the cart.");
    return;
  }

  let cart = getCart();
  const initialLength = cart.length;
  cart = cart.filter(item => item.productId !== productId);

  if (cart.length !== initialLength) {
    saveCart(cart);
  }
}

// Function to update the quantity of an item in the cart
function updateCartItemQuantity(productId, quantity) {
  if (!productId) {
    console.warn("Product ID is required to update item quantity.");
    return;
  }

  if (quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  const cart = getCart();
  let updated = false;

  const updatedCart = cart.map(item => {
    if (item.productId === productId) {
      updated = true;
      return { ...item, quantity: quantity };
    }
    return item;
  });

  if (updated) {
    saveCart(updatedCart);
  }
}

// Function to clear the entire cart
function clearCart() {
  localStorage.removeItem(CART_STORAGE_KEY);
  cartEventTarget.dispatchEvent(new CustomEvent(CART_UPDATED_EVENT, { detail: { cart: [] } })); // Dispatch event with empty cart data
}

// Function to calculate the total price of the cart
function calculateCartTotal() {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
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
  CART_UPDATED_EVENT, // Export the event name so other modules can listen for it.
  cartEventTarget, // Export the event target
};