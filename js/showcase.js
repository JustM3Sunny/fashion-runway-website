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
  let carouselInterval; // Store the interval ID
  const carouselIntervalTime = 5000; // Store interval time in a constant

  if (carouselContainer && carouselImages.length > 0 && prevButton && nextButton) {
    let currentIndex = 0;

    const updateCarousel = () => {
      carouselImages.forEach((img, index) => {
        img.classList.toggle('hidden', index !== currentIndex);
      });
    };

    const nextImage = () => {
      currentIndex = (currentIndex + 1) % carouselImages.length;
      updateCarousel();
    };

    const prevImage = () => {
      currentIndex = (currentIndex - 1 + carouselImages.length) % carouselImages.length;
      updateCarousel();
    };

    const startCarousel = () => {
      carouselInterval = setInterval(nextImage, carouselIntervalTime);
    };

    const stopCarousel = () => {
      clearInterval(carouselInterval);
    };

    const handleCarouselButtonClick = () => {
      stopCarousel(); // Stop auto-advance on manual navigation
      startCarousel(); // Restart auto-advance
    };

    prevButton.addEventListener('click', () => {
      prevImage();
      handleCarouselButtonClick();
    });

    nextButton.addEventListener('click', () => {
      nextImage();
      handleCarouselButtonClick();
    });

    updateCarousel(); // Initial display
    startCarousel(); // Auto-advance the carousel
  }


  // --- Product Highlighting Functionality ---
  const highlightedProducts = document.querySelectorAll('.highlighted-product');

  highlightedProducts.forEach(product => {
    product.addEventListener('mouseover', () => {
      product.classList.add('hovered');
    });

    product.addEventListener('mouseout', () => {
      product.classList.remove('hovered');
    });
  });


  // --- Interactive Elements (Example: Modal Popup) ---
  const showcaseModalButton = document.querySelector('#showcase-modal-button');
  const showcaseModal = document.querySelector('#showcase-modal');
  const showcaseModalCloseButton = document.querySelector('#showcase-modal-close');

  if (showcaseModalButton && showcaseModal && showcaseModalCloseButton) {
    const openModal = () => {
      showcaseModal.classList.remove('hidden');
    };

    const closeModal = () => {
      showcaseModal.classList.add('hidden');
    };

    showcaseModalButton.addEventListener('click', openModal);

    showcaseModalCloseButton.addEventListener('click', closeModal);

    // Close the modal if the user clicks outside of it
    showcaseModal.addEventListener('click', (event) => { //Event delegation on the modal itself
      if (event.target === showcaseModal) {
        closeModal();
      }
    });
  }


  // --- Helper Functions (Example: Debounce) ---
  // A debounce function to limit the rate at which a function can fire.
  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  // --- Example: Responsive adjustments (using debounce for performance) ---
  const handleResize = () => {
    // Adjust carousel display based on screen size (example)
    if (window.innerWidth < 768) {
      // Smaller screens: show only one carousel image at a time
      // (This might require CSS adjustments as well)
    } else {
      // Larger screens: show multiple carousel images
    }
  };

  const debouncedHandleResize = debounce(handleResize, 250); // Store the debounced function

  window.addEventListener('resize', debouncedHandleResize); // Debounce to prevent excessive calls

  // Initial call to handleResize on page load
  handleResize();


  // --- Future Enhancements ---
  // - Implement product filtering and sorting.
  // - Add more sophisticated animations and transitions.
  // - Integrate with backend data to dynamically load products.

});