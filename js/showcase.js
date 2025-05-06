// js/showcase.js

// This file handles the dynamic behavior of the showcase section on the homepage.
// It includes functionalities like image carousel, product highlighting, and interactive elements.

// DOMContentLoaded ensures the script runs after the HTML is fully loaded.
document.addEventListener('DOMContentLoaded', () => {

  // --- Image Carousel Functionality ---
  const carouselContainer = document.querySelector('.showcase-carousel');
  const carouselImages = document.querySelectorAll('.showcase-carousel img');
  const prevButton = document.querySelector('.showcase-prev-button');
  const nextButton = document.querySelector('.showcase-next-button');
  const carouselIntervalTime = 5000;
  let carouselInterval;
  let currentIndex = 0;

  if (carouselContainer && carouselImages.length > 0 && prevButton && nextButton) {

    const updateCarousel = () => {
      carouselImages.forEach((img, index) => {
        const isVisible = index === currentIndex;
        img.classList.toggle('hidden', !isVisible);
        img.setAttribute('aria-hidden', !isVisible); // Accessibility
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
      if (!carouselInterval) {
        carouselInterval = setInterval(nextImage, carouselIntervalTime);
      }
    };

    const stopCarousel = () => {
      clearInterval(carouselInterval);
      carouselInterval = null;
    };

    const resetCarousel = () => {
      stopCarousel();
      startCarousel();
    };

    const handlePrevClick = (event) => {
      event.preventDefault();
      prevImage();
      resetCarousel();
    };

    const handleNextClick = (event) => {
      event.preventDefault();
      nextImage();
      resetCarousel();
    };

    prevButton.addEventListener('click', handlePrevClick);
    nextButton.addEventListener('click', handleNextClick);

    updateCarousel();
    startCarousel();

    // Accessibility: Pause carousel on hover
    carouselContainer.addEventListener('mouseenter', stopCarousel);
    carouselContainer.addEventListener('mouseleave', startCarousel);

    // Accessibility: Pause carousel on focus
    prevButton.addEventListener('focus', stopCarousel);
    nextButton.addEventListener('focus', stopCarousel);
    prevButton.addEventListener('blur', startCarousel);
    nextButton.addEventListener('blur', startCarousel);


    // Optional: Keyboard navigation for carousel
    carouselContainer.setAttribute('tabindex', '0'); // Make container focusable
    carouselContainer.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') {
        handlePrevClick(event);
      } else if (event.key === 'ArrowRight') {
        handleNextClick(event);
      }
    });

  } else {
    console.warn("Carousel elements not found. Carousel functionality will not be initialized.");
  }


  // --- Product Highlighting Functionality ---
  const highlightedProducts = document.querySelectorAll('.highlighted-product');

  highlightedProducts.forEach(product => {
    const handleMouseEnter = () => {
      product.classList.add('hovered');
    };

    const handleMouseLeave = () => {
      product.classList.remove('hovered');
    };

    product.addEventListener('mouseenter', handleMouseEnter);
    product.addEventListener('mouseleave', handleMouseLeave);
  });


  // --- Interactive Elements (Example: Modal Popup) ---
  const showcaseModalButton = document.querySelector('#showcase-modal-button');
  const showcaseModal = document.querySelector('#showcase-modal');
  const showcaseModalCloseButton = document.querySelector('#showcase-modal-close');

  if (showcaseModalButton && showcaseModal && showcaseModalCloseButton) {
    const openModal = () => {
      showcaseModal.classList.remove('hidden');
      showcaseModal.setAttribute('aria-hidden', 'false'); // Accessibility
      document.body.classList.add('modal-open');
      document.addEventListener('keydown', handleEscapeKey);
      showcaseModalButton.setAttribute('aria-expanded', 'true'); // Accessibility
      showcaseModal.focus(); // Set focus to the modal for accessibility
      // Prevent scrolling of the background when the modal is open
      document.body.style.top = `-${window.scrollY}px`; // Store the current scroll position
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    };

    const closeModal = () => {
      showcaseModal.classList.add('hidden');
      showcaseModal.setAttribute('aria-hidden', 'true'); // Accessibility
      document.body.classList.remove('modal-open');
      document.removeEventListener('keydown', handleEscapeKey);
      showcaseModalButton.setAttribute('aria-expanded', 'false'); // Accessibility
      showcaseModalButton.focus(); // Return focus to the button that opened the modal

      // Restore scrolling of the background
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    };

    const handleModalButtonClick = (event) => {
      event.preventDefault();
      openModal();
    };

    const handleModalCloseButtonClick = (event) => {
      event.preventDefault();
      closeModal();
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    showcaseModalButton.addEventListener('click', handleModalButtonClick);
    showcaseModalCloseButton.addEventListener('click', handleModalCloseButtonClick);

    // Close the modal if the user clicks outside of it
    showcaseModal.addEventListener('click', (event) => {
      if (event.target === showcaseModal) {
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

});