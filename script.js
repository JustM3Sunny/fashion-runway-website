document.addEventListener('DOMContentLoaded', () => {
    // GSAP animations will be added here
    gsap.from('header h1', {
        opacity: 0,
        y: -50,
        duration: 1,
        ease: 'power3.out'
    });
});