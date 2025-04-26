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

    const handlePrevClick = (event) => {
      event.preventDefault(); // Prevent default button behavior
      prevImage();
      resetCarousel();
    };

    const handleNextClick = (event) => {
      event.preventDefault(); // Prevent default button behavior
      nextImage();
      resetCarousel();
    };

    prevButton.addEventListener('click', handlePrevClick);

    nextButton.addEventListener('click', handleNextClick);

    updateCarousel();
    startCarousel();
  } else {
    console.warn("Carousel elements not found. Carousel functionality will not be initialized.");
  }


  // --- Product Highlighting Functionality ---
  const highlightedProducts = document.querySelectorAll('.highlighted-product');

  highlightedProducts.forEach(product => {
    const handleMouseOver = () => {
      product.classList.add('hovered');
    };

    const handleMouseOut = () => {
      product.classList.remove('hovered');
    };

    product.addEventListener('mouseover', handleMouseOver);

    product.addEventListener('mouseout', handleMouseOut);
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

    const handleModalButtonClick = (event) => {
      event.preventDefault(); // Prevent default button behavior
      openModal();
    };

    const handleModalCloseButtonClick = (event) => {
      event.preventDefault(); // Prevent default button behavior
      closeModal();
    };

    showcaseModalButton.addEventListener('click', handleModalButtonClick);

    showcaseModalCloseButton.addEventListener('click', handleModalCloseButtonClick);

    // Close the modal if the user clicks outside of it
    showcaseModal.addEventListener('click', (event) => {
      if (event.target === showcaseModal) {
        closeModal();
      }
    });

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
    let timeoutId;
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

  window.addEventListener('resize', debouncedHandleResize);

  handleResize();


  // --- Future Enhancements ---
  // - Implement product filtering and sorting.
  // - Add more sophisticated animations and transitions.
  // - Integrate with backend data to dynamically load products.

});