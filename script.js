document.addEventListener('DOMContentLoaded', () => {
    const headerTitle = document.querySelector('header h1');

    if (headerTitle) {
        gsap.from(headerTitle, {
            opacity: 0,
            y: -50,
            duration: 1,
            ease: 'power3.out',
            delay: 0.2 // Optional: Add a slight delay for a smoother feel
        });
    } else {
        console.warn('Header title element not found.');
    }
});