// js/contact.js

// This file handles the contact form submission and UI interactions.
// It uses Tailwind CSS classes for styling.

document.addEventListener('DOMContentLoaded', () => {
  // Select the contact form and relevant elements
  const contactForm = document.getElementById('contactForm');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const submitButton = document.getElementById('submitButton');
  const successMessage = document.getElementById('successMessage');
  const errorMessage = document.getElementById('errorMessage');

  // Function to validate the form inputs
  function validateForm() {
    let isValid = true;

    if (!nameInput.value.trim()) {
      nameInput.classList.add('border-red-500');
      isValid = false;
    } else {
      nameInput.classList.remove('border-red-500');
    }

    if (!emailInput.value.trim() || !isValidEmail(emailInput.value.trim())) {
      emailInput.classList.add('border-red-500');
      isValid = false;
    } else {
      emailInput.classList.remove('border-red-500');
    }

    if (!messageInput.value.trim()) {
      messageInput.classList.add('border-red-500');
      isValid = false;
    } else {
      messageInput.classList.remove('border-red-500');
    }

    return isValid;
  }

  // Helper function to validate email format
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Function to handle form submission
  async function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission

    if (!validateForm()) {
      return; // Stop submission if the form is invalid
    }

    // Disable the submit button to prevent multiple submissions
    submitButton.disabled = true;
    submitButton.classList.add('opacity-50', 'cursor-not-allowed');

    // Simulate sending data to a server (replace with actual API call)
    try {
      // In a real application, you would send the form data to a server here
      // using fetch or XMLHttpRequest.
      // Example:
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     name: nameInput.value,
      //     email: emailInput.value,
      //     message: messageInput.value,
      //   }),
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });

      // if (!response.ok) {
      //   throw new Error('Failed to submit form');
      // }

      // Simulate a successful submission after 2 seconds
      setTimeout(() => {
        successMessage.classList.remove('hidden');
        errorMessage.classList.add('hidden');

        // Reset the form
        contactForm.reset();

        // Re-enable the submit button
        submitButton.disabled = false;
        submitButton.classList.remove('opacity-50', 'cursor-not-allowed');
      }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
      errorMessage.classList.remove('hidden');
      successMessage.classList.add('hidden');

      // Re-enable the submit button
      submitButton.disabled = false;
      submitButton.classList.remove('opacity-50', 'cursor-not-allowed');
    }
  }

  // Attach event listener to the form
  if (contactForm) {
    contactForm.addEventListener('submit', handleSubmit);
  } else {
    console.error('Contact form element not found.');
  }
});