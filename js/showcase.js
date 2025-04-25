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
  let carouselInterval;
  const carouselIntervalTime = 5000;

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

    const resetCarousel = () => {
      stopCarousel();
      startCarousel();
    };

    // Use passive event listeners for improved performance
    prevButton.addEventListener('click', () => {
      prevImage();
      resetCarousel();
    }, { passive: true });

    nextButton.addEventListener('click', () => {
      nextImage();
      resetCarousel();
    }, { passive: true });

    updateCarousel();
    startCarousel();
  } else {
    console.warn("Carousel elements not found. Carousel functionality will not be initialized.");
  }


  // --- Product Highlighting Functionality ---
  const highlightedProducts = document.querySelectorAll('.highlighted-product');

  highlightedProducts.forEach(product => {
    // Use passive event listeners for improved performance
    product.addEventListener('mouseover', () => {
      product.classList.add('hovered');
    }, { passive: true });

    product.addEventListener('mouseout', () => {
      product.classList.remove('hovered');
    }, { passive: true });
  });


  // --- Interactive Elements (Example: Modal Popup) ---
  const showcaseModalButton = document.querySelector('#showcase-modal-button');
  const showcaseModal = document.querySelector('#showcase-modal');
  const showcaseModalCloseButton = document.querySelector('#showcase-modal-close');

  if (showcaseModalButton && showcaseModal && showcaseModalCloseButton) {
    const openModal = () => {
      showcaseModal.classList.remove('hidden');
      document.body.classList.add('modal-open');
    };

    const closeModal = () => {
      showcaseModal.classList.add('hidden');
      document.body.classList.remove('modal-open');
    };

    // Use passive event listeners for improved performance
    showcaseModalButton.addEventListener('click', openModal, { passive: true });

    showcaseModalCloseButton.addEventListener('click', closeModal, { passive: true });

    // Close the modal if the user clicks outside of it
    showcaseModal.addEventListener('click', (event) => {
      if (event.target === showcaseModal) {
        closeModal();
      }
    }, { passive: true });

    // Close the modal when the Escape key is pressed
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    });

  } else {
    console.warn("Modal elements not found. Modal functionality will not be initialized.");
  }


  // --- Helper Functions (Example: Debounce) ---
  const debounce = (func, delay) => {
    let timeoutId; // Renamed timeout to timeoutId for clarity
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
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

  const debouncedHandleResize = debounce(handleResize, 250);

  // Use passive event listeners for improved performance
  window.addEventListener('resize', debouncedHandleResize, { passive: true });

  handleResize();


  // --- Future Enhancements ---
  // - Implement product filtering and sorting.
  // - Add more sophisticated animations and transitions.
  // - Integrate with backend data to dynamically load products.

});