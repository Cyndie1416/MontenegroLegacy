/**
 * MontenegroLegacy Global Floating Search Bar
 * Persistent search bar that appears on all pages and searches everything across the entire website
 */

// Site-wide Search Functionality
class SiteSearch {
    constructor() {
        this.searchIndex = [];
        this.searchResults = [];
        this.init();
    }

    init() {
        this.buildSearchIndex();
        this.setupSearchHandlers();
    }

    // Build search index from all pages
    buildSearchIndex() {
        this.searchIndex = [
            {
                title: "Core",
                url: "index.html",
                            keywords: ["core", "overview", "main", "home", "venture", "board", "business", "management"],
            description: "Main core with business overview and key metrics",
            content: "MontenegroLegacy core provides comprehensive business management overview with performance tracking and strategic analytics"
            },
            {
                title: "Piggery Management",
                url: "piggery.html",
                keywords: ["piggery", "pigs", "livestock", "farm", "animals", "breeding", "production"],
                description: "Manage piggery operations, livestock tracking, and production metrics",
                content: "Piggery management system for tracking pigs, breeding programs, health monitoring, and production metrics"
            },
            {
                title: "Daily Mart",
                url: "grocery.html",
                keywords: ["grocery", "store", "retail", "inventory", "products", "sales", "food"],
                description: "Daily Mart management with inventory and sales tracking",
                content: "Daily Mart management system for inventory control, sales tracking, product management, and customer service"
            },
            {
                title: "Glam Again",
                url: "thrift.html",
                keywords: ["thrift", "store", "secondhand", "used", "clothing", "donations", "charity"],
                description: "Glam Again operations and donation management",
                content: "Glam Again management for handling donations, inventory of used items, pricing, and charitable operations"
            },
            {
                title: "Apartments",
                url: "apartments.html",
                keywords: ["apartments", "rental", "property", "tenants", "maintenance", "real estate"],
                description: "Apartment rental and property management",
                content: "Apartment management system for tenant tracking, maintenance requests, rent collection, and property management"
            },
            {
                title: "Small Cafe",
                url: "cafe.html",
                keywords: ["cafe", "coffee", "restaurant", "food", "beverages", "service"],
                description: "Cafe management and food service operations",
                content: "Cafe management system for food service, beverage sales, customer orders, and cafe operations"
            },
            {
                title: "Team Management",
                url: "management.html",
                keywords: ["management", "team", "employees", "staff", "hr", "personnel"],
                description: "Team and employee management system",
                content: "Team management system for employee tracking, performance management, scheduling, and human resources"
            }
        ];
    }

    // Setup search event handlers
    setupSearchHandlers() {
        // Desktop search form
        const desktopSearchForm = document.querySelector('.navbar-search form');
        if (desktopSearchForm) {
            desktopSearchForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const searchInput = desktopSearchForm.querySelector('input[type="text"]');
                this.performSearch(searchInput.value);
            });
        }

        // Mobile search form
        const mobileSearchForm = document.querySelector('.dropdown-menu .navbar-search form');
        if (mobileSearchForm) {
            mobileSearchForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const searchInput = mobileSearchForm.querySelector('input[type="text"]');
                this.performSearch(searchInput.value);
            });
        }

        // Search button clicks
        const searchButtons = document.querySelectorAll('.navbar-search .btn');
        searchButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const form = button.closest('form');
                const searchInput = form.querySelector('input[type="text"]');
                this.performSearch(searchInput.value);
                });
            });
        }

    // Perform search across all indexed content
    performSearch(query) {
        if (!query || query.trim() === '') {
            return;
        }

        query = query.toLowerCase().trim();
        this.searchResults = [];

        // Search through the index
        this.searchIndex.forEach(page => {
            let score = 0;
            const searchableText = `${page.title} ${page.keywords.join(' ')} ${page.description} ${page.content}`.toLowerCase();

            // Exact title match (highest priority)
            if (page.title.toLowerCase().includes(query)) {
                score += 100;
            }

            // Keyword matches
            page.keywords.forEach(keyword => {
                if (keyword.toLowerCase().includes(query)) {
                    score += 50;
                }
            });

            // Content matches
            if (searchableText.includes(query)) {
                score += 10;
            }

            // Partial word matches
            const words = query.split(' ');
            words.forEach(word => {
                if (searchableText.includes(word)) {
                    score += 5;
                }
            });

            if (score > 0) {
                this.searchResults.push({
                    ...page,
                    score: score
                });
            }
        });

        // Sort by relevance score
        this.searchResults.sort((a, b) => b.score - a.score);

        // Navigate to search results page
        this.showSearchResults(query);
    }

    // Show search results
    showSearchResults(query) {
        // Store results in sessionStorage for the results page
        sessionStorage.setItem('searchQuery', query);
        sessionStorage.setItem('searchResults', JSON.stringify(this.searchResults));
        
        // Navigate to search results page
        window.location.href = 'search-results.html';
    }

    // Get search results (for results page)
    getStoredResults() {
        const query = sessionStorage.getItem('searchQuery');
        const results = JSON.parse(sessionStorage.getItem('searchResults') || '[]');
        return { query, results };
    }

    // Clear stored results
    clearStoredResults() {
        sessionStorage.removeItem('searchQuery');
        sessionStorage.removeItem('searchResults');
    }
}

// Initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.siteSearch = new SiteSearch();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SiteSearch;
}
