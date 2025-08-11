// Hero Slideshow Functionality
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;
    const slideInterval = 4000; // 4 seconds per slide

    // Function to show a specific slide
    function showSlide(index) {
        // Remove active class from all slides
        slides.forEach(slide => slide.classList.remove('active'));
        
        // Add active class to current slide
        slides[index].classList.add('active');
    }

    // Function to go to next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Function to go to previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Start the slideshow
    function startSlideshow() {
        // Show the first slide
        showSlide(currentSlide);
        
        // Set up automatic transitions
        setInterval(nextSlide, slideInterval);
    }

    // Initialize slideshow when hero section is visible
    function initSlideshow() {
        const heroSection = document.getElementById('hero');
        if (heroSection && !heroSection.classList.contains('hidden')) {
            startSlideshow();
        }
    }

    // Start slideshow immediately if hero is visible
    initSlideshow();

    // Re-initialize slideshow when hero becomes visible again
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const heroSection = document.getElementById('hero');
                if (heroSection && !heroSection.classList.contains('hidden')) {
                    // Reset to first slide when hero becomes visible
                    currentSlide = 0;
                    showSlide(currentSlide);
                    startSlideshow();
                }
            }
        });
    });

    // Observe hero section for class changes
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        observer.observe(heroSection, { attributes: true });
    }
});
