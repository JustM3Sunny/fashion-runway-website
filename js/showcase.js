// js/showcase.js

// This file handles the dynamic behavior of the showcase section on the homepage.
// It includes functionalities like image carousel, product highlighting, and interactive elements.

// DOMContentLoaded ensures the script runs after the HTML is fully loaded.
document.addEventListener('DOMContentLoaded', function() {

  // --- Image Carousel Functionality ---
  const carouselContainer = document.querySelector('.showcase-carousel');
  const carouselImages = document.querySelectorAll('.showcase-carousel img');
  const prevButton = document.querySelector('.showcase-prev-button');
  const nextButton = document.querySelector('.showcase-next-button');

  let currentIndex = 0;

  function updateCarousel() {
    // Hide all images
    carouselImages.forEach(img => img.classList.add('hidden'));

    // Show the current image
    carouselImages[currentIndex].classList.remove('hidden');
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % carouselImages.length;
    updateCarousel();
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + carouselImages.length) % carouselImages.length;
    updateCarousel();
  }

  // Event listeners for navigation buttons
  if (prevButton && nextButton) {
    prevButton.addEventListener('click', prevImage);
    nextButton.addEventListener('click', nextImage);

    // Optional: Auto-advance the carousel every 5 seconds
    setInterval(nextImage, 5000);
  }


  // --- Product Highlighting Functionality ---
  const highlightedProducts = document.querySelectorAll('.highlighted-product');

  highlightedProducts.forEach(product => {
    product.addEventListener('mouseover', function() {
      // Add a subtle animation or visual cue on hover
      this.classList.add('hovered');
    });

    product.addEventListener('mouseout', function() {
      this.classList.remove('hovered');
    });
  });


  // --- Interactive Elements (Example: Modal Popup) ---
  const showcaseModalButton = document.querySelector('#showcase-modal-button');
  const showcaseModal = document.querySelector('#showcase-modal');
  const showcaseModalCloseButton = document.querySelector('#showcase-modal-close');

  if (showcaseModalButton && showcaseModal && showcaseModalCloseButton) {
    showcaseModalButton.addEventListener('click', function() {
      showcaseModal.classList.remove('hidden'); // Show the modal
    });

    showcaseModalCloseButton.addEventListener('click', function() {
      showcaseModal.classList.add('hidden'); // Hide the modal
    });

    // Close the modal if the user clicks outside of it
    window.addEventListener('click', function(event) {
      if (event.target == showcaseModal) {
        showcaseModal.classList.add('hidden');
      }
    });
  }


  // --- Helper Functions (Example: Debounce) ---
  // A debounce function to limit the rate at which a function can fire.
  function debounce(func, delay) {
    let timeout;
    return function(...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), delay);
    };
  }

  // --- Example: Responsive adjustments (using debounce for performance) ---
  function handleResize() {
    // Adjust carousel display based on screen size (example)
    if (window.innerWidth < 768) {
      // Smaller screens: show only one carousel image at a time
      // (This might require CSS adjustments as well)
    } else {
      // Larger screens: show multiple carousel images
    }
  }

  window.addEventListener('resize', debounce(handleResize, 250)); // Debounce to prevent excessive calls

  // Initial call to handleResize on page load
  handleResize();


  // --- Future Enhancements ---
  // - Implement product filtering and sorting.
  // - Add more sophisticated animations and transitions.
  // - Integrate with backend data to dynamically load products.

});