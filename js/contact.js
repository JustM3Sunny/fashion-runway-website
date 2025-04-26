// js/contact.js

// This file handles the contact form submission and UI interactions.
// It uses Tailwind CSS classes for styling.

document.addEventListener('DOMContentLoaded', () => {
  // Select the contact form and relevant elements
  const contactForm = document.getElementById('contactForm');

  if (!contactForm) {
    console.error('Contact form element not found.');
    return; // Exit if the form is not found
  }

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const submitButton = document.getElementById('submitButton');
  const successMessage = document.getElementById('successMessage');
  const errorMessage = document.getElementById('errorMessage');

  // Check if elements exist before proceeding
  if (!nameInput || !emailInput || !messageInput || !submitButton || !successMessage || !errorMessage) {
    console.error('One or more form elements are missing.');
    return;
  }


  // Function to validate the form inputs
  function validateForm() {
    let isValid = true;

    // Helper function to add/remove error class
    const setError = (element, hasError) => {
      element.classList.toggle('border-red-500', hasError);
    };

    const nameValue = nameInput.value.trim();
    const emailValue = emailInput.value.trim();
    const messageValue = messageInput.value.trim();

    const nameValid = nameValue !== '';
    const emailValid = nameValue !== '' && isValidEmail(emailValue);
    const messageValid = messageValue !== '';

    setError(nameInput, !nameValid);
    setError(emailInput, !emailValid);
    setError(messageInput, !messageValid);

    isValid = nameValid && emailValid && messageValid;

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


    try {
      const formData = {
        name: nameInput.value,
        email: emailInput.value,
        message: messageInput.value,
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch (jsonError) {
          console.error('Error parsing JSON error response:', jsonError);
          errorData = { message: 'Failed to parse server error.' };
        }
        const errorMessageText = errorData.message || 'Failed to submit form';
        throw new Error(errorMessageText); // Include server error message
      }

      // Handle successful submission
      successMessage.classList.remove('hidden');
      errorMessage.classList.add('hidden');

      // Reset the form
      contactForm.reset();

    } catch (error) {
      console.error('Error submitting form:', error);
      errorMessage.textContent = error.message; // Display the error message
      errorMessage.classList.remove('hidden');
      successMessage.classList.add('hidden');

    } finally {
      // Re-enable the submit button in either success or failure
      submitButton.disabled = false;
      submitButton.classList.remove('opacity-50', 'cursor-not-allowed');
    }
  }

  // Attach event listener to the form
  contactForm.addEventListener('submit', handleSubmit);
});