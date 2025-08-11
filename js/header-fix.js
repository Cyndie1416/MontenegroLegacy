// Header Visibility Fix - Ensures header is always visible on all pages EXCEPT when hero section is present
document.addEventListener('DOMContentLoaded', function() {
    // Get the header navigation element
    const headerNav = document.querySelector('.header-nav');
    const heroSection = document.querySelector('.hero-section');
    
    // Only apply header fix if there's no hero section
    if (headerNav && !heroSection) {
        // Force header to be visible
        headerNav.classList.add('visible');
        headerNav.classList.add('permanent');
        
        // Apply inline styles to override any CSS that might hide it
        headerNav.style.transform = 'translateY(0) !important';
        headerNav.style.opacity = '1 !important';
        headerNav.style.pointerEvents = 'auto !important';
        headerNav.style.position = 'fixed';
        headerNav.style.top = '0';
        headerNav.style.left = '0';
        headerNav.style.right = '0';
        headerNav.style.zIndex = '10000';
        
        // Ensure content has proper top margin to account for fixed header
        const contentWrapper = document.querySelector('#content-wrapper');
        if (contentWrapper) {
            contentWrapper.style.marginTop = '60px';
        }
        
        // Also ensure the body content starts below the header
        const content = document.querySelector('#content');
        if (content) {
            content.style.marginTop = '60px';
        }
    }
    
    // Additional scroll event listener to ensure header stays visible (only when no hero section)
    if (!heroSection) {
        window.addEventListener('scroll', function() {
            if (headerNav) {
                headerNav.style.transform = 'translateY(0)';
                headerNav.style.opacity = '1';
            }
        });
    }
});

// Also run immediately in case DOM is already loaded
if (document.readyState === 'loading') {
    // DOM is still loading
} else {
    // DOM is already loaded, run immediately
    const headerNav = document.querySelector('.header-nav');
    const heroSection = document.querySelector('.hero-section');
    
    // Only apply header fix if there's no hero section
    if (headerNav && !heroSection) {
        headerNav.classList.add('visible');
        headerNav.classList.add('permanent');
        headerNav.style.transform = 'translateY(0) !important';
        headerNav.style.opacity = '1 !important';
        headerNav.style.pointerEvents = 'auto !important';
        headerNav.style.position = 'fixed';
        headerNav.style.top = '0';
        headerNav.style.left = '0';
        headerNav.style.right = '0';
        headerNav.style.zIndex = '10000';
    }
}
