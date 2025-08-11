// Professional Hero Section Transitions
document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const headerNav = document.querySelector('.header-nav');
    const heroSection = document.querySelector('.hero-section');
    const contentWrapper = document.querySelector('#content-wrapper');
    
    // Add body class for hero styling
    document.body.classList.add('has-hero');
    
    // Function to hide header
    function hideHeader() {
        if (headerNav) {
            headerNav.classList.add('hidden');
            headerNav.classList.remove('visible');
            headerNav.classList.remove('permanent');
        }
    }
    
    // Function to show header
    function showHeader() {
        if (headerNav) {
            headerNav.classList.remove('hidden');
            headerNav.classList.add('visible');
            headerNav.classList.add('permanent');
            headerNav.style.position = 'fixed';
            headerNav.style.top = '0';
            headerNav.style.left = '0';
            headerNav.style.right = '0';
            headerNav.style.zIndex = '10000';
        }
    }
    
    // Initially hide header if hero section exists
    if (heroSection) {
        hideHeader();
    } else {
        // If no hero section, show header immediately
        showHeader();
    }
    
    // Professional transition function
    function transitionToCore() {
        // Step 1: Fade out hero content
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = 'translateY(-30px)';
            heroContent.style.opacity = '0';
        }
        
        // Step 2: Hide hero section with professional animation
        setTimeout(() => {
            if (heroSection) {
                heroSection.classList.add('hidden');
            }
        }, 300);
        
        // Step 3: Show header permanently with smooth entrance
        setTimeout(() => {
            showHeader();
        }, 600);
        
        // Step 4: Reveal core content
        setTimeout(() => {
            if (contentWrapper) {
                contentWrapper.classList.add('visible');
            }
        }, 900);
    }
    
    // Professional CTA button interaction
    const heroCta = document.querySelector('.hero-cta');
    if (heroCta) {
        heroCta.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add loading state to button
            this.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Loading Core...';
            this.style.pointerEvents = 'none';
            
            // Execute professional transition
            transitionToCore();
            
            // Scroll to core after transition
            setTimeout(() => {
                const coreElement = document.querySelector('#core');
                if (coreElement) {
                    coreElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }, 1200);
        });
    }
    
    // Scroll-based transition - hide hero and show header when scrolling down
    let heroHidden = false;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Show header and hide hero when scrolling down past 100px
        if (scrollTop > 100 && !heroHidden && heroSection) {
            heroHidden = true;
            transitionToCore();
        }
        
        // If hero is hidden, ensure header stays visible
        if (heroHidden && headerNav) {
            showHeader();
        }
    });
    
    // Professional auto-transition after user engagement
    let userEngaged = false;
    
    // Track user engagement
    document.addEventListener('mousemove', function() {
        if (!userEngaged) {
            userEngaged = true;
            // Extend hero visibility when user is engaged
            clearTimeout(autoTransitionTimer);
        }
    });
    
    let autoTransitionTimer = setTimeout(() => {
        if (!userEngaged && heroSection && !heroSection.classList.contains('hidden')) {
            transitionToCore();
        }
    }, 8000); // Extended to 8 seconds for better UX
    
    // Initialize Bootstrap dropdowns for header
    $('.dropdown-toggle').dropdown();
});
